# Implemented demo contract

Date: 2026-10-25. Living technical evidence for [lot 2](../../prds/interactive-session-mvp.md), [ADR 0001](../../adr/0001-web-demo-infrastructure.md) and A-42. This records implementation choices, not new product approval.

## Services and versions

ASP.NET Core targets .NET 10; local SDK is 10.0.302. Integration testing uses Microsoft ASP.NET Core testing and SignalR client 10.0.13. The frontend uses Nuxt 4.6.2, Vue 3.5.44, Vue Router 5.4.0 and the SignalR JavaScript client 10.0.0 on Node 22.22.3. Exact dependencies are pinned in `src/frontend/package-lock.json`; its rendering mode is client-side. Compose runs separate frontend and backend containers, with Caddy 2.10 routing a single HTTPS origin. Caddy's internal CA is confined to its Docker volume. No certificates or private keys are committed. Image major/minor tags intentionally receive servicing updates; they are not immutable digests.

Official API references checked during implementation: [SignalR 10 hubs](https://learn.microsoft.com/en-us/aspnet/core/signalr/hubs?view=aspnetcore-10.0), [SignalR security](https://learn.microsoft.com/en-us/aspnet/core/signalr/security?view=aspnetcore-10.0), [Caddy proxy](https://caddyserver.com/docs/caddyfile/directives/reverse_proxy). The frontend records its installed Nuxt APIs in configuration and typed transport/media adapters.

## Session authority and ordering

`/hubs/sessions` provides `ListSubjects`, `CreateSubject`, `JoinSubject`, `SendMessage`, `CloseSubject` and `LeaveSubject`. A single injected `SessionCoordinator` serializes state transitions and their event publication; no state lives on transient hub instances. Participant delivery targets exact connection IDs, never a guessed session group. A connection may participate in one subject at a time. Subject and exchange identifiers are random GUIDs; each participant receives a separate cryptographically random 32-byte capability in the create/join response. The capability is held in browser memory and sent in hub invocation bodies, never a URL or browser storage. Authorization requires both the capability and its original connection for every participant action.

The backend retains subject, role, connection, capability, current exchange identity and optional call metadata in memory. It never retains chat text or signaling payloads after relay. A subject accepts 1–120 UTF-16 code units; a message 1–2000, after nonblank validation. These are technical input bounds, not content policy. SignalR frames are limited to 16 KiB and signaling payloads to 10,000 code units. Plain text is rendered through Vue text interpolation.

Joining atomically creates an exchange ID; only one competing joiner can succeed. Leave revokes that joiner's capability and exchange, clears both views and republishes the same subject. Close removes the session and sends `ExchangeEnded`; the opener can safely retry close on the same live connection through a one-entry receipt containing no subject or conversation. A new create/join or disconnect removes the receipt. Old IDs and capabilities cannot restore an exchange.

Events: `SubjectsChanged`, `SessionChanged`, `ExchangeEnded`, `MessageReceived`, `PeerDisconnected`. Messages carry session and exchange IDs; clients reject stale events and keep visible messages only in their current memory state.

## Optional audio

A-42 permits either member to propose, the other to accept or decline, and failure/permission denial to return both to chat. `RequestCall` creates one random call ID with initiator role and ringing state. `RespondCall` only accepts the recipient's answer. Acceptance moves to connecting; `Signal` relays offer/answer/ICE only for that current accepted call. Offer and answer roles are checked. `EndCall` permits either member to end ringing or connecting audio with `hangup` or `failed`, preserving membership and chat. Decline publishes `CallEnded` with `declined`. Call signaling cannot cross sessions or survive a retired exchange/call. Media itself stays in browser WebRTC; no backend audio relay or recording exists.

The browser owns permission prompts, microphone tracks and peer connections, releasing them on end, failure, closure, departure and interruption. The operator microphone diagnostic is separate from participant call controls. Accepted audio setup has a 20-second technical timeout; invitations have no automatic expiry. No external STUN/TURN service is configured; actual LAN connectivity must be tested before asserting audio works on phones.

## Interruption limit

There is no automatic reconnect, rejoin or expiry. On unexpected loss, the backend marks the connection unavailable, hides an unreachable waiting subject, notifies the peer and refuses further relay. It does not silently close or reopen the subject. A remaining connected opener can close; a connected joiner can leave. Abandoned metadata can remain until process restart; restarting discards all in-memory state. This observed limitation is not an approved expiry or recovery rule and prevents a complete lifecycle claim.

## Storage and logs

No database, filesystem conversation store, browser persistence, analytics, service worker or message replay endpoint is introduced. Backend log levels are Warning, detailed hub errors are disabled and no payload logging is configured. Caddy access logging is disabled. Origin validation applies to browser hub requests including WebSocket upgrades; `AllowedOrigins` is deployment configuration. Compose publishes only the gateway. These implementation boundaries do not claim universal erasure, anonymity or readiness for real participants.

Observed integrated inspection (25 October 2026): the 33-line Compose log output contained no exercised fictional marker or observed message payload; browser smoke found empty local/session storage after closure. This supports the inspected data-path boundary without asserting universal trace deletion.
