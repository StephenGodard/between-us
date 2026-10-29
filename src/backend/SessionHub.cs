using Microsoft.AspNetCore.SignalR;

namespace BetweenUs.Api;

public sealed class SessionHub(SessionCoordinator sessions) : Hub
{
    public Task<SubjectSummary[]> ListSubjects() => sessions.List();
    public Task<Membership> CreateSubject(string subject) => sessions.Create(Context.ConnectionId, subject);
    public Task<Membership> JoinSubject(string sessionId) => sessions.Join(Context.ConnectionId, sessionId);
    public Task SendMessage(string sessionId, string exchangeId, string capability, string text) =>
        sessions.Send(Context.ConnectionId, sessionId, exchangeId, capability, text);
    public Task CloseSubject(string sessionId, string capability) => sessions.Close(Context.ConnectionId, sessionId, capability);
    public Task LeaveSubject(string sessionId, string exchangeId, string capability) =>
        sessions.Leave(Context.ConnectionId, sessionId, exchangeId, capability);
    public Task<CallSnapshot> RequestCall(string sessionId, string exchangeId, string capability) =>
        sessions.RequestCall(Context.ConnectionId, sessionId, exchangeId, capability);
    public Task RespondCall(string sessionId, string exchangeId, string capability, string callId, bool accept) =>
        sessions.RespondCall(Context.ConnectionId, sessionId, exchangeId, capability, callId, accept);
    public Task EndCall(string sessionId, string exchangeId, string capability, string callId, string reason) =>
        sessions.EndCall(Context.ConnectionId, sessionId, exchangeId, capability, callId, reason);
    public Task Signal(string sessionId, string exchangeId, string capability, string callId, string kind, string payload) =>
        sessions.Signal(Context.ConnectionId, sessionId, exchangeId, capability, callId, kind, payload);
    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        await sessions.Disconnect(Context.ConnectionId);
        await base.OnDisconnectedAsync(exception);
    }
}
