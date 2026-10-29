import {
  createSessionClient,
  type Membership,
  type SubjectSummary,
  type ChatMessage,
} from "~/lib/session-client";

export function useConversation() {
  const subjects = ref<SubjectSummary[]>([]);
  const member = ref<Membership | null>(null);
  const messages = ref<ChatMessage[]>([]);
  const connected = ref(false);
  const connecting = ref(true);
  const peerAvailable = ref(true);
  const busy = ref(false);
  const error = ref("");
  const notice = ref("");
  let disposed = false;
  let admitting = false;
  let admissionOverflow = false;
  let admissionEvents: Array<() => void> = [];
  function deliver(action: () => void) {
    if (admitting) {
      if (admissionEvents.length < 256) admissionEvents.push(action);
      else admissionOverflow = true;
    } else action();
  }
  const client = createSessionClient(useRuntimeConfig().public.hubPath, {
    callChanged: (value) => deliver(() => audio.changed(value)),
    callEnded: (value) => deliver(() => audio.ended(value)),
    signal: (value) => deliver(() => audio.signal(value)),
    subjects: (value) => {
      subjects.value = value;
    },
    state: (state) =>
      deliver(() => {
        if (member.value?.sessionId !== state.sessionId) return;
        if (member.value.exchangeId !== state.exchangeId) messages.value = [];
        Object.assign(member.value, state);
        peerAvailable.value = true;
      }),
    ended: (event) =>
      deliver(() => {
        if (member.value?.sessionId !== event.sessionId) return;
        messages.value = [];
        audio.cleanup();
        if (event.reason === "closed" || member.value.role === "joiner") {
          member.value = null;
          notice.value =
            event.reason === "closed"
              ? "Cet échange est terminé. Les messages ne sont plus affichés."
              : "Vous avez quitté l’échange. Les messages ne sont plus affichés.";
        } else {
          member.value.state = "waiting";
          member.value.exchangeId = null;
          notice.value =
            "L’autre personne a quitté l’échange. Votre sujet est à nouveau disponible.";
        }
      }),
    message: (message) =>
      deliver(() => {
        if (
          member.value?.exchangeId === message.exchangeId &&
          member.value.sessionId === message.sessionId
        )
          messages.value.push(message);
      }),
    peerDisconnected: ({ sessionId }) =>
      deliver(() => {
        if (member.value?.sessionId === sessionId) {
          peerAvailable.value = false;
          audio.cleanup();
          error.value =
            "La connexion de l’autre personne est interrompue. Vous pouvez encore terminer ou quitter cet échange.";
        }
      }),
    disconnected: () => {
      connected.value = false;
      audio.cleanup();
      if (!disposed)
        error.value =
          "Connexion interrompue. L’échange ne peut pas reprendre automatiquement. Rechargez la page pour revenir à l’accueil.";
    },
  });
  const audio = useAudioCall(member, client);
  async function run(action: () => Promise<void>, fallback: string) {
    if (busy.value || !connected.value) return;
    busy.value = true;
    error.value = "";
    try {
      await action();
    } catch {
      error.value = fallback;
    } finally {
      busy.value = false;
    }
  }
  function adopt(value: Membership) {
    member.value = value;
    messages.value = [];
    notice.value = "";
    peerAvailable.value = true;
  }
  async function admit(action: () => Promise<Membership>) {
    admitting = true;
    admissionOverflow = false;
    admissionEvents = [];
    try {
      const membership = await action();
      if (admissionOverflow || disposed || !connected.value) {
        await client.stop();
        throw new Error("admission-interrupted");
      }
      adopt(membership);
      admitting = false;
      const queued = admissionEvents;
      admissionEvents = [];
      queued.forEach((action) => action());
    } finally {
      admitting = false;
      admissionEvents = [];
    }
  }
  onMounted(async () => {
    try {
      await client.start();
      if (disposed) {
        await client.stop();
        return;
      }
      connected.value = true;
      subjects.value = await client.list();
    } catch {
      error.value =
        "Le service est indisponible. Rechargez la page lorsque la connexion est rétablie.";
    } finally {
      connecting.value = false;
    }
  });
  onBeforeUnmount(() => {
    disposed = true;
    audio.cleanup();
    messages.value = [];
    member.value = null;
    admissionEvents = [];
    void client.stop();
  });
  return {
    audio,
    subjects,
    member,
    messages,
    connected,
    connecting,
    peerAvailable,
    busy,
    error,
    notice,
    open: (subject: string) =>
      run(
        () => admit(() => client.create(subject.trim())),
        "Ce sujet n’a pas pu être ouvert. Vérifiez votre connexion et réessayez.",
      ),
    join: (id: string) =>
      run(
        () => admit(() => client.join(id)),
        "Ce sujet n’est plus disponible. Choisissez un autre sujet.",
      ),
    send: async (text: string) => {
      let sent = false;
      await run(async () => {
        if (member.value && peerAvailable.value) {
          await client.send(member.value, text.trim());
          sent = true;
        }
      }, "Le message n’a pas pu être envoyé. Il reste dans votre champ de saisie.");
      return sent;
    },
    end: () =>
      run(async () => {
        if (member.value)
          await (member.value.role === "opener"
            ? client.close(member.value)
            : client.leave(member.value));
      }, "L’action n’a pas pu être confirmée. Réessayez lorsque la connexion est rétablie."),
  };
}
