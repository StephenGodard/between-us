import type { Ref } from "vue";
import type {
  Membership,
  CallSnapshot,
  CallEnd,
  CallSignal,
  createSessionClient,
} from "~/lib/session-client";

type Client = ReturnType<typeof createSessionClient>;
export function useAudioCall(member: Ref<Membership | null>, client: Client) {
  const call = ref<CallSnapshot | null>(null);
  const status = ref("");
  const live = ref(false);
  const playbackBlocked = ref(false);
  const pending = ref(false);
  let media: MediaStream | null = null;
  let mediaPromise: Promise<MediaStream | null> | null = null;
  let peer: RTCPeerConnection | null = null;
  let audio: HTMLAudioElement | null = null;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let candidates: RTCIceCandidateInit[] = [];
  let generation = 0;
  let starting = false;
  let signalQueue = Promise.resolve();

  function cleanup() {
    generation++;
    status.value = "";
    if (timer) clearTimeout(timer);
    timer = null;
    media?.getTracks().forEach((track) => track.stop());
    media = null;
    mediaPromise = null;
    if (peer) {
      peer.onicecandidate = null;
      peer.onconnectionstatechange = null;
      peer.ontrack = null;
      peer.close();
    }
    peer = null;
    if (audio) {
      audio.pause();
      audio.srcObject = null;
    }
    audio = null;
    candidates = [];
    call.value = null;
    live.value = false;
    pending.value = false;
    playbackBlocked.value = false;
    starting = false;
  }
  function matches(event: {
    sessionId: string;
    exchangeId: string;
    callId: string;
  }) {
    return (
      member.value?.sessionId === event.sessionId &&
      member.value.exchangeId === event.exchangeId &&
      call.value?.callId === event.callId
    );
  }
  async function finish(reason: "hangup" | "failed") {
    const current = call.value;
    const membership = member.value;
    cleanup();
    status.value =
      reason === "failed"
        ? "L’appel n’a pas pu aboutir. Vous pouvez continuer par écrit."
        : "Appel terminé. La conversation écrite continue.";
    if (current && membership) {
      try {
        await client.endCall(membership, current.callId, reason);
      } catch {
        /* Local resources are released even if transport is unavailable. */
      }
    }
  }
  async function microphone() {
    if (media) return media;
    if (mediaPromise) return mediaPromise;
    const epoch = generation;
    mediaPromise = (async () => {
      try {
        if (!window.isSecureContext || !navigator.mediaDevices)
          throw new Error("microphone-unavailable");
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        if (epoch !== generation) {
          stream.getTracks().forEach((track) => track.stop());
          return null;
        }
        media = stream;
        return stream;
      } catch {
        if (epoch === generation) {
          await finish("failed");
          status.value =
            "Le microphone n’est pas accessible. L’appel est arrêté, vous pouvez continuer par écrit.";
        }
        return null;
      }
    })();
    return mediaPromise;
  }
  async function playAudio() {
    try {
      await audio?.play();
      playbackBlocked.value = false;
    } catch {
      playbackBlocked.value = true;
    }
  }
  async function makePeer() {
    if (peer) return peer;
    const current = call.value;
    const epoch = generation;
    const stream = await microphone();
    if (!stream || !current || !matches(current) || epoch !== generation)
      return null;
    if (peer) return peer;
    peer = new RTCPeerConnection({ iceServers: [] });
    const created = peer;
    stream.getTracks().forEach((track) => created.addTrack(track, stream));
    audio = new Audio();
    audio.autoplay = true;
    created.ontrack = (event) => {
      if (epoch !== generation || !audio) return;
      audio.srcObject = event.streams[0] || new MediaStream([event.track]);
      void playAudio();
    };
    created.onicecandidate = (event) => {
      if (event.candidate && member.value && matches(current)) {
        void client
          .signal(
            member.value,
            current.callId,
            "ice",
            JSON.stringify(event.candidate.toJSON()),
          )
          .catch(() => {
            if (epoch === generation && matches(current))
              return finish("failed");
          });
      }
    };
    created.onconnectionstatechange = () => {
      if (epoch !== generation) return;
      if (created.connectionState === "connected") {
        live.value = true;
        status.value = "Appel en cours";
        if (timer) clearTimeout(timer);
      } else if (
        created.connectionState === "failed" ||
        created.connectionState === "disconnected"
      )
        void finish("failed");
    };
    return created;
  }
  async function startOffer() {
    if (starting) return;
    starting = true;
    const current = call.value;
    try {
      const connection = await makePeer();
      if (!connection || !current || !matches(current) || !member.value) return;
      await connection.setLocalDescription(await connection.createOffer());
      if (!matches(current) || !member.value) return;
      await client.signal(
        member.value,
        current.callId,
        "offer",
        JSON.stringify(connection.localDescription),
      );
    } catch {
      if (current && matches(current)) await finish("failed");
    }
  }
  function changed(value: CallSnapshot) {
    if (
      member.value?.sessionId !== value.sessionId ||
      member.value.exchangeId !== value.exchangeId
    )
      return;
    if (call.value && call.value.callId !== value.callId) cleanup();
    call.value = value;
    if (value.state === "ringing")
      status.value =
        value.initiatorRole === member.value.role
          ? "Invitation envoyée…"
          : "L’autre personne vous propose un appel.";
    else {
      status.value = "Connexion audio en cours…";
      if (!timer)
        timer = setTimeout(() => {
          void finish("failed");
        }, 20000);
      if (value.initiatorRole === member.value.role) void startOffer();
    }
  }
  function ended(value: CallEnd) {
    if (!matches(value)) return;
    cleanup();
    status.value =
      value.reason === "declined"
        ? "Invitation déclinée. La conversation écrite continue."
        : value.reason === "failed"
          ? "L’appel n’a pas pu aboutir. Vous pouvez continuer par écrit."
          : "Appel terminé. La conversation écrite continue.";
  }
  function signal(value: CallSignal) {
    signalQueue = signalQueue
      .then(async () => {
        if (!matches(value)) return;
        const connection = await makePeer();
        if (!connection || !matches(value) || !member.value) return;
        const data = JSON.parse(value.payload);
        if (value.kind === "ice") {
          if (connection.remoteDescription)
            await connection.addIceCandidate(data);
          else candidates.push(data);
        } else {
          await connection.setRemoteDescription(data);
          for (const candidate of candidates)
            await connection.addIceCandidate(candidate);
          candidates = [];
          if (value.kind === "offer") {
            await connection.setLocalDescription(
              await connection.createAnswer(),
            );
            if (!matches(value) || !member.value) return;
            await client.signal(
              member.value,
              value.callId,
              "answer",
              JSON.stringify(connection.localDescription),
            );
          }
        }
      })
      .catch(() => {
        if (matches(value)) return finish("failed");
      });
  }
  async function request() {
    if (!member.value || call.value || pending.value) return;
    pending.value = true;
    const epoch = generation;
    try {
      // Server broadcasts CallChanged before returning. Never revive a call from a late response.
      await client.requestCall(member.value);
      if (epoch === generation && call.value) await microphone();
    } catch {
      if (epoch === generation)
        status.value =
          "L’invitation n’a pas pu être envoyée. Vous pouvez continuer par écrit.";
    } finally {
      if (epoch === generation) pending.value = false;
    }
  }
  async function respond(accept: boolean) {
    const current = call.value;
    if (!current || !member.value || pending.value) return;
    pending.value = true;
    const epoch = generation;
    try {
      if (accept && !(await microphone())) return;
      if (matches(current) && member.value)
        await client.respondCall(member.value, current.callId, accept);
    } catch {
      if (epoch === generation && matches(current)) await finish("failed");
    } finally {
      if (epoch === generation) pending.value = false;
    }
  }
  return {
    call,
    status,
    live,
    playbackBlocked,
    pending,
    changed,
    ended,
    signal,
    request,
    respond,
    finish,
    cleanup,
    playAudio,
  };
}
