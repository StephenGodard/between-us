# .NET backend guidelines

**Applies when:** implementing the proposed C#/ASP.NET Core backend in [ADR 0001](../../../adr/0001-web-demo-infrastructure.md). ASP.NET Core/SignalR and the .NET major version are not yet selected. Apply the [project coding guidelines](project-coding.md) first.

## Shape of the service

- Keep the service focused on the fictional two-person session: join/leave, message relay, WebRTC signaling relay, closure and a small health endpoint if operationally useful. Use ASP.NET Core [Minimal APIs](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis/overview) for any simple HTTP endpoints only if the selected design needs them. Do not create controllers, persistence layers, accounts or background jobs without a scoped reason.
- Keep request/response and hub event contracts typed. Validate session identifiers, event kind, payload size and participant membership at the backend boundary. Treat the browser as untrusted even on a LAN.
- If SignalR is selected, use a Hub for transport and a separate injected session service for session rules. [Hub instances are transient](https://learn.microsoft.com/en-us/aspnet/core/signalr/hubs); do not keep room state in hub fields. Use the built-in [dependency injection](https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection-guidelines) with explicit lifetimes and concurrency-safe in-memory state where needed.
- A SignalR group can route events to a room, but [group membership is neither persisted across reconnects nor an authorization mechanism](https://learn.microsoft.com/en-us/aspnet/core/signalr/groups). Enforce at most two active demo participants and check membership for every message and signaling operation. Define the behavior for duplicate joins, disconnects, rejoin and closure before relying on it.
- Relay WebRTC offers, answers and ICE candidates; do not route the audio media through SignalR. [MDN describes signaling as a separate coordination step](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Signaling_and_video_calling). The chosen network path must be tested on two devices.

## Data and operational boundaries

- Keep demo session metadata only as long as the agreed active-session/disconnect policy requires. Do not persist conversation text or signaling payloads. Release session state on closure; define how abandoned sessions expire. Review request and error logs for accidental capture of message bodies or SDP/ICE details. [Microsoft notes that SignalR logs may contain sensitive information](https://learn.microsoft.com/en-us/aspnet/core/signalr/diagnostics).
- Allow only the expected frontend origin when frontend and backend are separate origins. Follow the installed version's [SignalR security and CORS guidance](https://learn.microsoft.com/en-us/aspnet/core/signalr/security). A LAN address or room code is not a substitute for input validation or access rules.
- Use configuration for network addresses and permitted origins; never commit secrets or local certificates. Keep error responses useful to the client without exposing internal exceptions or session data.
- Avoid claiming that this fictional demo implements real-user anonymity, moderation, emergency handling or regulated deletion. Those belong to a later scoped service with its own rules.

## Backend checks

Test meaningful session transitions and failure cases: first and second join, rejected third connection, invalid or oversized payload, message isolation between sessions, explicit closure, unexpected disconnect and expiry. Add an integration check for the actual SignalR contract if adopted. Run the selected .NET formatter, build and test commands once a project exists; record `NOT RUN` until then. Finish with the two-device LAN call and teardown check described in [project-coding.md](project-coding.md).
