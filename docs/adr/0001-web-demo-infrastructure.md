# Architecture decision: two-device web demo infrastructure

Status: PROPOSED
Date: 2026-10-24
Delivery scope: fictional hackathon demonstration on two devices on the same local network
Functional sources: `docs/context/product-context/intake/espaces-ecoute-ephemeres.md` (A-8, A-10 to A-13, A-18 to A-23, A-30 to A-34); living `docs/context/product-context/discovery/entre-nous-product-discovery.md` and `docs/context/product-context/briefs/espaces-ecoute-ephemeres.md`.
Technical context: `docs/context/technical-context/technical-context.md`

## Decision needed

Choose the technology and LAN hosting shape for the owner's **two-service** model: participants visit a simple user-facing website URL; that app calls a separate backend service holding subject sessions, connecting two clients, relaying fictional two-way chat, coordinating an optional real audio call and closure (A-33, A-34). The service boundary is user direction. Backend technology, origins and physical hosting remain to decide; two tabs on one device no longer satisfy the requested scope.

## Constraints and decision criteria

- The demo must show fictional participants, sample messages, two-way chat, an optional real audio-call capability and closure in both views from chat or call, without a saved conversation history (A-8, A-10 to A-13, A-32).
- The owner ranks backend competence .NET, Python, TypeScript/Node, Java, PHP, strongest to weakest, and specifies two devices on the same LAN (24 October 2026 answers).
- The owner now explicitly identifies a server-held subject session, visible to two clients that open or join it (A-33). The server must be reachable from both devices; a LAN host can satisfy that boundary without a public Internet deployment. Which device hosts it, whether UI and API share an origin, and how open sessions expire are `Not provided.`
- The user-facing website and backend are separate services (A-34). “Back-office” describes the separate backend in the owner's analogy; no administrator UI, database or durable conversation history follows from that wording. Whether the two services use one physical machine or two is `Not provided.`
- The current `prototype/` uses same-browser `BroadcastChannel` and cannot connect two devices (`prototype/README.md`, `prototype/app.js`; [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API)).
- Browser microphone access needs a secure context and permission; a plain HTTP LAN address is insufficient for the second device ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)). [WebRTC call setup needs signaling](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Signaling_and_video_calling); LAN media connectivity still requires testing.
- The two-minute pitch deadline favors a repeatable, locally controlled path ([event summary](../context/hackathon-kickoff.md)). No throughput or production availability target is provided.

## Options considered

| Option | Fit with needs | Tradeoffs | Evidence / unknowns |
| --- | --- | --- | --- |
| Nuxt frontend + small C#/ASP.NET Core backend with SignalR | Aligns with preferred UI and strongest backend skill; [SignalR](https://learn.microsoft.com/en-us/aspnet/core/signalr/introduction) supports chat-like client messages and groups, so it can relay chat and WebRTC signaling. | Two processes and a browser-accessible, secure LAN setup. SignalR does not carry the WebRTC audio stream. | Requires a two-device end-to-end test, including HTTPS/trusted origin and call teardown. |
| Nuxt frontend + Python/FastAPI backend | Fits the second strongest backend skill; [FastAPI supports WebSockets](https://fastapi.tiangolo.com/advanced/websockets/). | Separate runtime and a custom realtime message protocol; same LAN/secure-origin test. | Reasonable fallback if the owner prefers Python or .NET setup proves unsuitable. |
| Nuxt frontend + separate TypeScript/Node backend | One language can cover browser and backend while keeping two services. | Owner ranks TypeScript/Node third. Realtime server support and deployment need checking for the chosen runtime. | Revisit if shared language matters more than owner familiarity. |
| Existing static two-tab prototype | Already illustrates the fictional journey on one computer. | Cannot meet the distinct-device requirement. | Observed in `prototype/README.md` and `prototype/app.js`; use only as a journey reference. |

## Decision and rationale

**Provisional recommendation, pending approval of this ADR:** Serve a Nuxt user-facing website and a small, separate C#/ASP.NET Core backend service, each reachable by both LAN devices. Use SignalR to publish temporary open subjects, create/join a two-person session and relay chat, optional WebRTC signaling and closure. Use WebRTC in the browsers for audio if chosen; the proposed backend carries signaling, not the media stream. Keep sample content fictional and conversation messages out of persistent storage. No administrator back-office, account, archive, moderation or emergency feature is selected for this demo.

This choice follows the owner's backend proficiency, two-device LAN requirement and confirmed two-service model (A-33, A-34). The user has validated the separation between the user-facing site and backend, but has not approved this exact stack or topology; status remains `PROPOSED`. Frontend rendering mode, exact .NET/Nuxt versions, secure LAN access to both services, session expiry and logging behavior still need design and verification.

## Consequences and review trigger

- Design reachable addresses for the frontend and backend, plus a trusted, secure browser origin before claiming microphone support. Verify the complete frontend-to-backend connection from both devices on the actual LAN and browsers. The two services may share one physical host or use distinct hosts; this is not yet selected.
- Define the open-subject list, two-person session contract, admission when two clients try to join, message and signaling events, closure from chat or optional call, disconnect behavior, and what server logs or memory retain. Test both views on both paths and confirm no conversation archive is created.
- Validate WebRTC audio and teardown on two distinct devices; LAN proximity alone is not a proof of connectivity. Any relay or network service is a later decision based on the test.
- Revisit if the demo must work across different networks, be publicly accessible, use real participants, or retain reports/history. Those changes affect hosting, safety, data and the approved scope.
