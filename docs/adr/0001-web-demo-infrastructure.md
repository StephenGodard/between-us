# Architecture decision: two-device web demo infrastructure

Status: PROPOSED
Date: 2026-10-24
Delivery scope: fictional hackathon demonstration on two devices on the same local network
Functional sources: `docs/context/product-context/intake/espaces-ecoute-ephemeres.md` (A-8, A-10 to A-13, A-18 to A-23); living `docs/context/product-context/discovery/entre-nous-product-discovery.md` and `docs/context/product-context/briefs/espaces-ecoute-ephemeres.md`.
Technical context: `docs/context/technical-context/technical-context.md`

## Decision needed

Choose a frontend/backend shape that demonstrates fictional two-way chat and a real audio call between two devices on one local network, using a backend the owner can maintain. The owner's previous web direction and Vue/Nuxt preference remain. This revision replaces the earlier static, browser-only recommendation because two tabs on one device no longer satisfy the requested scope.

## Constraints and decision criteria

- The demo must show fictional participants, sample messages, two-way chat, a real audio call and closure in both views, without a saved conversation history (A-8, A-10 to A-13).
- The owner ranks backend competence .NET, Python, TypeScript/Node, Java, PHP, strongest to weakest, and specifies two devices on the same LAN (24 October 2026 answers).
- The current `prototype/` uses same-browser `BroadcastChannel` and cannot connect two devices (`prototype/README.md`, `prototype/app.js`; [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API)).
- Browser microphone access needs a secure context and permission; a plain HTTP LAN address is insufficient for the second device ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)). [WebRTC call setup needs signaling](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Signaling_and_video_calling); LAN media connectivity still requires testing.
- The two-minute pitch deadline favors a repeatable, locally controlled path ([event summary](../context/hackathon-kickoff.md)). No throughput or production availability target is provided.

## Options considered

| Option | Fit with needs | Tradeoffs | Evidence / unknowns |
| --- | --- | --- | --- |
| Nuxt frontend + small C#/ASP.NET Core backend with SignalR | Aligns with preferred UI and strongest backend skill; [SignalR](https://learn.microsoft.com/en-us/aspnet/core/signalr/introduction) supports chat-like client messages and groups, so it can relay chat and WebRTC signaling. | Two processes and a browser-accessible, secure LAN setup. SignalR does not carry the WebRTC audio stream. | Requires a two-device end-to-end test, including HTTPS/trusted origin and call teardown. |
| Nuxt frontend + Python/FastAPI backend | Fits the second strongest backend skill; [FastAPI supports WebSockets](https://fastapi.tiangolo.com/advanced/websockets/). | Separate runtime and a custom realtime message protocol; same LAN/secure-origin test. | Reasonable fallback if the owner prefers Python or .NET setup proves unsuitable. |
| Nuxt frontend + TypeScript backend or Nuxt server API | One language can cover browser and backend; [Nuxt has server routes](https://nuxt.com/docs/guide/concepts/server-engine). | Owner ranks TypeScript/Node third. Realtime server support and deployment need checking for the chosen Nuxt runtime. | Revisit if one runtime matters more than owner familiarity. |
| Existing static two-tab prototype | Already illustrates the fictional journey on one computer. | Cannot meet the distinct-device requirement. | Observed in `prototype/README.md` and `prototype/app.js`; use only as a journey reference. |

## Decision and rationale

**Provisional recommendation, pending approval of this ADR:** Build a Nuxt web frontend and a small, separate C#/ASP.NET Core backend. Use SignalR to create/join a temporary two-person session and relay chat, WebRTC signaling and closure. Use WebRTC in the browsers for audio. Keep sample content fictional and conversation messages out of persistent storage. No account, archive, moderation or emergency feature is selected for this demo.

This choice follows the owner's backend proficiency and the new two-device LAN requirement. Frontend rendering mode, exact .NET/Nuxt versions, secure LAN access, session expiry and logging behavior still need design and verification. The user approved neither this exact ADR nor the earlier infrastructure recommendation; status remains `PROPOSED`.

## Consequences and review trigger

- Design a trusted, secure browser origin reachable by both devices before claiming microphone support. Verify the complete Nuxt-to-backend connection on the actual LAN and browsers.
- Define a two-person session contract, message and signaling events, closure/disconnect behavior, and what server logs or memory retain. Test both views and confirm no conversation archive is created.
- Validate WebRTC audio and teardown on two distinct devices; LAN proximity alone is not a proof of connectivity. Any relay or network service is a later decision based on the test.
- Revisit if the demo must work across different networks, be publicly accessible, use real participants, or retain reports/history. Those changes affect hosting, safety, data and the approved scope.
