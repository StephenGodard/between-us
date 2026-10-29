using System.Collections.Concurrent;
using BetweenUs.Api;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Client;

namespace BetweenUs.Tests;

public sealed class SessionTests : IAsyncLifetime
{
    private readonly WebApplicationFactory<Program> factory = new WebApplicationFactory<Program>()
        .WithWebHostBuilder(builder => builder.UseSetting("contentRoot", Path.GetFullPath("../../../../../src/backend")));
    private readonly List<HubConnection> connections = [];
    public Task InitializeAsync() => Task.CompletedTask;
    public async Task DisposeAsync()
    {
        foreach (var connection in connections) await connection.DisposeAsync();
        await factory.DisposeAsync();
    }
    private async Task<HubConnection> Connect()
    {
        var connection = new HubConnectionBuilder().WithUrl("http://localhost/hubs/sessions", options =>
        {
            options.Transports = HttpTransportType.LongPolling;
            options.HttpMessageHandlerFactory = _ => factory.Server.CreateHandler();
        }).Build();
        connections.Add(connection);
        await connection.StartAsync();
        return connection;
    }
    private static Task<Membership> Create(HubConnection client, string subject = "Sujet fictif") => client.InvokeAsync<Membership>("CreateSubject", subject);
    private static Task<Membership> Join(HubConnection client, Membership session) => client.InvokeAsync<Membership>("JoinSubject", session.SessionId);
    private static async Task Eventually(Func<bool> predicate)
    {
        using var timeout = new CancellationTokenSource(TimeSpan.FromSeconds(5));
        while (!predicate()) await Task.Delay(10, timeout.Token);
    }

    [Fact]
    public async Task Chosen_subject_and_atomic_admission_keep_other_subject_open()
    {
        var a = await Connect(); var b = await Connect(); var c = await Connect(); var d = await Connect();
        var first = await Create(a, "Un changement"); var second = await Create(b, "Une séparation");
        Assert.Equal(2, (await c.InvokeAsync<SubjectSummary[]>("ListSubjects")).Length);
        var attempts = new[] { Join(c, first), Join(d, first) };
        try { await Task.WhenAll(attempts); } catch (HubException) { }
        Assert.Equal(1, attempts.Count(t => t.IsCompletedSuccessfully));
        Assert.Equal(1, attempts.Count(t => t.IsFaulted));
        var remaining = Assert.Single(await a.InvokeAsync<SubjectSummary[]>("ListSubjects"));
        Assert.Equal(second.SessionId, remaining.Id);
        await Assert.ThrowsAsync<HubException>(() => Join(a, second));
    }

    [Fact]
    public async Task Relay_is_reciprocal_isolated_and_revoked_on_leave_and_close()
    {
        var a = await Connect(); var b = await Connect(); var c = await Connect(); var outsider = await Connect();
        var aMessages = new ConcurrentQueue<ChatMessage>(); var bMessages = new ConcurrentQueue<ChatMessage>();
        var cMessages = new ConcurrentQueue<ChatMessage>(); var outsiderMessages = new ConcurrentQueue<ChatMessage>();
        a.On<ChatMessage>("MessageReceived", aMessages.Enqueue); b.On<ChatMessage>("MessageReceived", bMessages.Enqueue);
        c.On<ChatMessage>("MessageReceived", cMessages.Enqueue); outsider.On<ChatMessage>("MessageReceived", outsiderMessages.Enqueue);
        var opener = await Create(a); var joiner = await Join(b, opener); await Create(outsider, "Autre sujet");
        await Assert.ThrowsAsync<HubException>(() => b.InvokeAsync("CloseSubject", opener.SessionId, joiner.Capability));
        await Assert.ThrowsAsync<HubException>(() => outsider.InvokeAsync("CloseSubject", opener.SessionId, opener.Capability));
        await Assert.ThrowsAsync<HubException>(() => a.InvokeAsync("SendMessage", opener.SessionId, joiner.ExchangeId, opener.Capability, new string('x', 2001)));
        for (var i = 0; i < 2; i++)
        {
            await a.InvokeAsync("SendMessage", opener.SessionId, joiner.ExchangeId, opener.Capability, $"Fiction A {i}");
            await b.InvokeAsync("SendMessage", opener.SessionId, joiner.ExchangeId, joiner.Capability, $"Fiction B {i}");
        }
        await Eventually(() => aMessages.Count == 4 && bMessages.Count == 4);
        Assert.Empty(outsiderMessages); Assert.Empty(cMessages);
        await b.InvokeAsync("LeaveSubject", opener.SessionId, joiner.ExchangeId, joiner.Capability);
        var fresh = await Join(c, opener);
        Assert.NotEqual(joiner.ExchangeId, fresh.ExchangeId); Assert.Empty(cMessages);
        await Assert.ThrowsAsync<HubException>(() => b.InvokeAsync("SendMessage", opener.SessionId, fresh.ExchangeId, joiner.Capability, "Ancien accès"));
        await Assert.ThrowsAsync<HubException>(() => a.InvokeAsync("SendMessage", opener.SessionId, joiner.ExchangeId, opener.Capability, "Ancien échange"));
        await a.InvokeAsync("CloseSubject", opener.SessionId, opener.Capability);
        await a.InvokeAsync("CloseSubject", opener.SessionId, opener.Capability); // Safe retry.
        await Assert.ThrowsAsync<HubException>(() => c.InvokeAsync("SendMessage", opener.SessionId, fresh.ExchangeId, fresh.Capability, "Après fermeture"));
        await Assert.ThrowsAsync<HubException>(() => Join(b, opener));
    }

    [Fact]
    public async Task Invalid_inputs_and_waiting_cancellation_are_enforced_by_server()
    {
        var a = await Connect();
        await Assert.ThrowsAsync<HubException>(() => Create(a, "  "));
        await Assert.ThrowsAsync<HubException>(() => Create(a, new string('x', 121)));
        var opener = await Create(a);
        await Assert.ThrowsAsync<HubException>(() => a.InvokeAsync("CloseSubject", opener.SessionId, "invalid"));
        await a.InvokeAsync("CloseSubject", opener.SessionId, opener.Capability);
        Assert.Empty(await a.InvokeAsync<SubjectSummary[]>("ListSubjects"));
    }

    [Fact]
    public async Task Unexpected_disconnect_is_not_voluntary_leave_or_automatic_rejoin()
    {
        var a = await Connect(); var b = await Connect(); var c = await Connect();
        var opener = await Create(a); var joiner = await Join(b, opener);
        var interrupted = new TaskCompletionSource<PeerInterruption>();
        a.On<PeerInterruption>("PeerDisconnected", e => interrupted.TrySetResult(e));
        await b.StopAsync();
        await interrupted.Task.WaitAsync(TimeSpan.FromSeconds(5));
        Assert.Empty(await c.InvokeAsync<SubjectSummary[]>("ListSubjects"));
        await Assert.ThrowsAsync<HubException>(() => Join(c, opener));
        await Assert.ThrowsAsync<HubException>(() => a.InvokeAsync("SendMessage", opener.SessionId, joiner.ExchangeId, opener.Capability, "Interrompu"));
        await a.InvokeAsync("CloseSubject", opener.SessionId, opener.Capability);
        var waiting = await Create(c);
        await c.StopAsync();
        await Eventually(() => factory.Services.GetRequiredService<SessionCoordinator>().List().GetAwaiter().GetResult().Length == 0);
    }
    [Fact]
    public async Task Audio_invitation_acceptance_hangup_and_stale_signaling_preserve_chat()
    {
        var a = await Connect(); var b = await Connect(); var c = await Connect();
        var opener = await Create(a); var joiner = await Join(b, opener);
        var call = await b.InvokeAsync<CallSnapshot>("RequestCall", opener.SessionId, joiner.ExchangeId, joiner.Capability);
        await Assert.ThrowsAsync<HubException>(() => a.InvokeAsync<CallSnapshot>("RequestCall", opener.SessionId, joiner.ExchangeId, opener.Capability));
        await Assert.ThrowsAsync<HubException>(() => b.InvokeAsync("RespondCall", opener.SessionId, joiner.ExchangeId, joiner.Capability, call.CallId, true));
        await Assert.ThrowsAsync<HubException>(() => b.InvokeAsync("Signal", opener.SessionId, joiner.ExchangeId, joiner.Capability, call.CallId, "offer", "{}"));
        await a.InvokeAsync("RespondCall", opener.SessionId, joiner.ExchangeId, opener.Capability, call.CallId, true);
        var delivered = new TaskCompletionSource<CallSignal>();
        a.On<CallSignal>("SignalReceived", e => delivered.TrySetResult(e));
        await b.InvokeAsync("Signal", opener.SessionId, joiner.ExchangeId, joiner.Capability, call.CallId, "offer", "{}");
        Assert.Equal(call.CallId, (await delivered.Task.WaitAsync(TimeSpan.FromSeconds(5))).CallId);
        await Assert.ThrowsAsync<HubException>(() => a.InvokeAsync("Signal", opener.SessionId, joiner.ExchangeId, opener.Capability, call.CallId, "offer", "{}"));
        await a.InvokeAsync("EndCall", opener.SessionId, joiner.ExchangeId, opener.Capability, call.CallId, "hangup");
        await a.InvokeAsync("SendMessage", opener.SessionId, joiner.ExchangeId, opener.Capability, "Encore dans le chat");
        await Assert.ThrowsAsync<HubException>(() => b.InvokeAsync("Signal", opener.SessionId, joiner.ExchangeId, joiner.Capability, call.CallId, "ice", "{}"));
        var second = await a.InvokeAsync<CallSnapshot>("RequestCall", opener.SessionId, joiner.ExchangeId, opener.Capability);
        await b.InvokeAsync("RespondCall", opener.SessionId, joiner.ExchangeId, joiner.Capability, second.CallId, false);
        var third = await a.InvokeAsync<CallSnapshot>("RequestCall", opener.SessionId, joiner.ExchangeId, opener.Capability);
        await b.InvokeAsync("EndCall", opener.SessionId, joiner.ExchangeId, joiner.Capability, third.CallId, "failed");
        var fourth = await a.InvokeAsync<CallSnapshot>("RequestCall", opener.SessionId, joiner.ExchangeId, opener.Capability);
        await b.InvokeAsync("LeaveSubject", opener.SessionId, joiner.ExchangeId, joiner.Capability);
        var fresh = await Join(c, opener);
        await Assert.ThrowsAsync<HubException>(() => a.InvokeAsync("Signal", opener.SessionId, fresh.ExchangeId, opener.Capability, fourth.CallId, "offer", "{}"));
        var final = await c.InvokeAsync<CallSnapshot>("RequestCall", opener.SessionId, fresh.ExchangeId, fresh.Capability);
        await a.InvokeAsync("CloseSubject", opener.SessionId, opener.Capability);
        await Assert.ThrowsAsync<HubException>(() => c.InvokeAsync("EndCall", opener.SessionId, fresh.ExchangeId, fresh.Capability, final.CallId, "hangup"));
    }

}
