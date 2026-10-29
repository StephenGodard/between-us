namespace BetweenUs.Api;

public record SubjectSummary(string Id, string Subject);
public record Membership(string SessionId, string Subject, string Role, string State, string? ExchangeId, string Capability);
public record SessionSnapshot(string SessionId, string Subject, string State, string? ExchangeId);
public record ExchangeEnd(string SessionId, string Reason);
public record ChatMessage(string SessionId, string ExchangeId, string Id, string Role, string Text);
public record PeerInterruption(string SessionId);
public record CallSnapshot(string SessionId, string ExchangeId, string CallId, string State, string InitiatorRole);
public record CallEnd(string SessionId, string ExchangeId, string CallId, string Reason);
public record CallSignal(string SessionId, string ExchangeId, string CallId, string Kind, string Payload);
