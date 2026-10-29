import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

export type Role = "opener" | "joiner";
export interface SubjectSummary {
  id: string;
  subject: string;
}
export interface SessionState {
  sessionId: string;
  subject: string;
  state: "waiting" | "active";
  exchangeId: string | null;
}
export interface Membership extends SessionState {
  role: Role;
  capability: string;
}
export interface ChatMessage {
  sessionId: string;
  exchangeId: string;
  id: string;
  role: Role;
  text: string;
}
export interface CallSnapshot {
  sessionId: string;
  exchangeId: string;
  callId: string;
  state: "ringing" | "connecting";
  initiatorRole: Role;
}
export interface CallEnd {
  sessionId: string;
  exchangeId: string;
  callId: string;
  reason: "declined" | "hangup" | "failed";
}
export interface CallSignal {
  sessionId: string;
  exchangeId: string;
  callId: string;
  kind: "offer" | "answer" | "ice";
  payload: string;
}
export interface EndEvent {
  sessionId: string;
  reason: "closed" | "left";
}

export function createSessionClient(
  url: string,
  events: {
    subjects: (items: SubjectSummary[]) => void;
    state: (state: SessionState) => void;
    ended: (event: EndEvent) => void;
    message: (message: ChatMessage) => void;
    peerDisconnected: (event: { sessionId: string }) => void;
    disconnected: () => void;
    callChanged: (call: CallSnapshot) => void;
    callEnded: (call: CallEnd) => void;
    signal: (signal: CallSignal) => void;
  },
) {
  const connection = new HubConnectionBuilder()
    .withUrl(url)
    .configureLogging(LogLevel.None)
    .build();
  connection.on("SubjectsChanged", events.subjects);
  connection.on("SessionChanged", events.state);
  connection.on("ExchangeEnded", events.ended);
  connection.on("MessageReceived", events.message);
  connection.on("PeerDisconnected", events.peerDisconnected);
  connection.onclose(events.disconnected);
  connection.on("CallChanged", events.callChanged);
  connection.on("CallEnded", events.callEnded);
  connection.on("SignalReceived", events.signal);
  return {
    requestCall: (m: Membership) =>
      connection.invoke<CallSnapshot>(
        "RequestCall",
        m.sessionId,
        m.exchangeId,
        m.capability,
      ),
    respondCall: (m: Membership, id: string, accept: boolean) =>
      connection.invoke(
        "RespondCall",
        m.sessionId,
        m.exchangeId,
        m.capability,
        id,
        accept,
      ),
    endCall: (m: Membership, id: string, reason: "hangup" | "failed") =>
      connection.invoke(
        "EndCall",
        m.sessionId,
        m.exchangeId,
        m.capability,
        id,
        reason,
      ),
    signal: (m: Membership, id: string, kind: string, payload: string) =>
      connection.invoke(
        "Signal",
        m.sessionId,
        m.exchangeId,
        m.capability,
        id,
        kind,
        payload,
      ),
    start: () => connection.start(),
    stop: () => connection.stop(),
    list: () => connection.invoke<SubjectSummary[]>("ListSubjects"),
    create: (subject: string) =>
      connection.invoke<Membership>("CreateSubject", subject),
    join: (id: string) => connection.invoke<Membership>("JoinSubject", id),
    send: (member: Membership, text: string) =>
      connection.invoke(
        "SendMessage",
        member.sessionId,
        member.exchangeId,
        member.capability,
        text,
      ),
    close: (member: Membership) =>
      connection.invoke("CloseSubject", member.sessionId, member.capability),
    leave: (member: Membership) =>
      connection.invoke(
        "LeaveSubject",
        member.sessionId,
        member.exchangeId,
        member.capability,
      ),
  };
}
