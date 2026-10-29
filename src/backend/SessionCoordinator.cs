using System.Security.Cryptography;
using Microsoft.AspNetCore.SignalR;

namespace BetweenUs.Api;

// One gate orders state changes AND publication, so a stale send cannot overtake an end event.
// Only session metadata is retained. Chat text exists solely in the current relay operation.
public sealed class SessionCoordinator(IHubContext<SessionHub> hub)
{
    private readonly SemaphoreSlim gate = new(1, 1);
    private readonly Dictionary<string, Session> sessions = [];
    // Idempotent close receipts contain no subject/message and are released on disconnect.
    private readonly Dictionary<string, (string SessionId, string Capability)> closed = [];

    private sealed class Participant(string connection, string role)
    {
        public string Connection { get; } = connection;
        public string Role { get; } = role;
        public string Capability { get; } = Convert.ToHexString(RandomNumberGenerator.GetBytes(32));
        public bool Connected { get; set; } = true;
    }

    private sealed class Session(string subject, Participant opener)
    {
        public string Id { get; } = Guid.NewGuid().ToString("N");
        public string Subject { get; } = subject;
        public Participant Opener { get; } = opener;
        public Participant? Joiner { get; set; }
        public string? ExchangeId { get; set; }
        public CallSnapshot? Call { get; set; }
        public string State => Joiner is null ? "waiting" : "active";
        public SessionSnapshot Snapshot => new(Id, Subject, State, ExchangeId);
        public string[] Connections => Joiner is null ? [Opener.Connection] : [Opener.Connection, Joiner.Connection];
        public Membership Membership(Participant participant) => new(Id, Subject, participant.Role, State, ExchangeId, participant.Capability);
    }

    private async Task<T> Serialized<T>(Func<Task<T>> operation)
    {
        await gate.WaitAsync();
        try { return await operation(); }
        finally { gate.Release(); }
    }

    private SubjectSummary[] OpenSubjects() => sessions.Values
        .Where(s => s.Joiner is null && s.Opener.Connected)
        .Select(s => new SubjectSummary(s.Id, s.Subject)).ToArray();
    private Task PublishSubjects() => hub.Clients.All.SendAsync("SubjectsChanged", OpenSubjects());
    private Task Publish(Session session) => hub.Clients.Clients(session.Connections).SendAsync("SessionChanged", session.Snapshot);
    private static HubException Refused() => new("Cette action n’est plus disponible pour cet échange.");
    private Session Find(string id) => sessions.TryGetValue(id, out var session) ? session : throw Refused();
    private void RequireFree(string connection)
    {
        if (sessions.Values.Any(s => s.Opener.Connection == connection || s.Joiner?.Connection == connection))
            throw new HubException("Vous participez déjà à un sujet.");
    }
    private static Participant Authorize(Session session, string connection, string capability)
    {
        var participant = session.Opener.Connection == connection ? session.Opener : session.Joiner;
        if (participant is null || participant.Connection != connection || !participant.Connected ||
            string.IsNullOrEmpty(capability) || participant.Capability != capability) throw Refused();
        return participant;
    }
    private static void RequireExchange(Session session, string exchange)
    {
        if (session.Joiner is null || session.ExchangeId != exchange) throw Refused();
    }
    private static string Bounded(string text, int limit)
    {
        if (string.IsNullOrWhiteSpace(text) || text.Length > limit)
            throw new HubException($"Saisissez un texte de 1 à {limit} caractères.");
        return text.Trim();
    }

    public Task<SubjectSummary[]> List() => Serialized(() => Task.FromResult(OpenSubjects()));
    public Task<Membership> Create(string connection, string subject) => Serialized(async () =>
    {
        subject = Bounded(subject, 120);
        RequireFree(connection);
        closed.Remove(connection);
        var session = new Session(subject, new Participant(connection, "opener"));
        sessions.Add(session.Id, session);
        await PublishSubjects();
        return session.Membership(session.Opener);
    });
    public Task<Membership> Join(string connection, string id) => Serialized(async () =>
    {
        RequireFree(connection);
        var session = Find(id);
        if (session.Joiner is not null || !session.Opener.Connected) throw Refused();
        closed.Remove(connection);
        session.Joiner = new Participant(connection, "joiner");
        session.ExchangeId = Guid.NewGuid().ToString("N");
        await Publish(session);
        await PublishSubjects();
        return session.Membership(session.Joiner);
    });
    public Task Send(string connection, string id, string exchange, string capability, string text) => Serialized(async () =>
    {
        text = Bounded(text, 2000);
        var session = Find(id);
        var participant = Authorize(session, connection, capability);
        RequireExchange(session, exchange);
        if (!session.Opener.Connected || !session.Joiner!.Connected)
            throw new HubException("La connexion avec l’autre personne est interrompue.");
        await hub.Clients.Clients(session.Connections).SendAsync("MessageReceived",
            new ChatMessage(id, exchange, Guid.NewGuid().ToString("N"), participant.Role, text));
        return true;
    });
    public Task Close(string connection, string id, string capability) => Serialized(async () =>
    {
        if (closed.TryGetValue(connection, out var receipt) && receipt == (id, capability)) return true;
        var session = Find(id);
        if (Authorize(session, connection, capability).Role != "opener") throw Refused();
        sessions.Remove(id);
        closed[connection] = (id, capability);
        await hub.Clients.Clients(session.Connections).SendAsync("ExchangeEnded", new ExchangeEnd(id, "closed"));
        await PublishSubjects();
        return true;
    });
    public Task Leave(string connection, string id, string exchange, string capability) => Serialized(async () =>
    {
        var session = Find(id);
        if (Authorize(session, connection, capability).Role != "joiner") throw Refused();
        RequireExchange(session, exchange);
        var recipients = session.Connections;
        session.Call = null;
        session.Joiner = null;
        session.ExchangeId = null;
        await hub.Clients.Clients(recipients).SendAsync("ExchangeEnded", new ExchangeEnd(id, "left"));
        await Publish(session);
        await PublishSubjects();
        return true;
    });
    public Task<CallSnapshot> RequestCall(string connection, string id, string exchange, string capability) => Serialized(async () =>
    {
        var session = Find(id);
        var participant = Authorize(session, connection, capability);
        RequireExchange(session, exchange);
        if (session.Call is not null || !session.Opener.Connected || !session.Joiner!.Connected) throw Refused();
        session.Call = new(id, exchange, Guid.NewGuid().ToString("N"), "ringing", participant.Role);
        await hub.Clients.Clients(session.Connections).SendAsync("CallChanged", session.Call);
        return session.Call;
    });
    private static CallSnapshot RequireCall(Session session, string callId)
    {
        if (session.Call is null || session.Call.CallId != callId) throw Refused();
        return session.Call;
    }
    public Task RespondCall(string connection, string id, string exchange, string capability, string callId, bool accept) => Serialized(async () =>
    {
        var session = Find(id);
        var participant = Authorize(session, connection, capability);
        RequireExchange(session, exchange);
        var call = RequireCall(session, callId);
        if (call.State != "ringing" || call.InitiatorRole == participant.Role) throw Refused();
        if (accept)
        {
            session.Call = call with { State = "connecting" };
            await hub.Clients.Clients(session.Connections).SendAsync("CallChanged", session.Call);
        }
        else
        {
            session.Call = null;
            await hub.Clients.Clients(session.Connections).SendAsync("CallEnded", new CallEnd(id, exchange, callId, "declined"));
        }
        return true;
    });
    public Task EndCall(string connection, string id, string exchange, string capability, string callId, string reason) => Serialized(async () =>
    {
        var session = Find(id);
        Authorize(session, connection, capability);
        RequireExchange(session, exchange);
        RequireCall(session, callId);
        if (reason is not ("hangup" or "failed")) throw Refused();
        session.Call = null;
        await hub.Clients.Clients(session.Connections).SendAsync("CallEnded", new CallEnd(id, exchange, callId, reason));
        return true;
    });
    public Task Signal(string connection, string id, string exchange, string capability, string callId, string kind, string payload) => Serialized(async () =>
    {
        var session = Find(id);
        var participant = Authorize(session, connection, capability);
        RequireExchange(session, exchange);
        var call = RequireCall(session, callId);
        if (call.State != "connecting" || string.IsNullOrWhiteSpace(payload) || payload.Length > 10000 ||
            kind is not ("offer" or "answer" or "ice") ||
            (kind == "offer" && call.InitiatorRole != participant.Role) ||
            (kind == "answer" && call.InitiatorRole == participant.Role)) throw Refused();
        await hub.Clients.Clients(session.Connections.Where(c => c != connection).ToArray())
            .SendAsync("SignalReceived", new CallSignal(id, exchange, callId, kind, payload));
        return true;
    });
    public Task Disconnect(string connection) => Serialized(async () =>
    {
        closed.Remove(connection);
        foreach (var session in sessions.Values)
        {
            var participant = session.Opener.Connection == connection ? session.Opener : session.Joiner;
            if (participant?.Connection != connection) continue;
            participant.Connected = false;
            session.Call = null;
            await hub.Clients.Clients(session.Connections.Where(c => c != connection).ToArray())
                .SendAsync("PeerDisconnected", new PeerInterruption(session.Id));
        }
        // Preserve metadata pending a product decision: disconnect is not voluntary leave.
        await PublishSubjects();
        return true;
    });
}
