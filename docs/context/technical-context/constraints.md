# Technical constraints — web demonstration

**Mode:** Living technical context derived from the functional sources.
**Date:** 2026-10-24
**Sources:** [intake](../product-context/intake/espaces-ecoute-ephemeres.md) (especially A-5, A-8 to A-13, A-18 to A-23 and A-30 to A-34), [discovery](../product-context/discovery/entre-nous-product-discovery.md), [BA brief](../product-context/briefs/espaces-ecoute-ephemeres.md), [initial PRD revision](../../prds/entre-nous-initial.md), and [event summary](../hackathon-kickoff.md).

| Constraint or boundary | Source | Engineering consequence | State |
| --- | --- | --- | --- |
| Web demo with a Vue/Nuxt preference and a frontend plus backend. | A-19; current request | Separate browser and backend responsibilities in the design. Their deployment topology is open. | Owner direction; detailed stack open. |
| Locally testable prototype with two fictional participants, two-way chat and an optional real local audio-call capability. | A-8, A-10, A-12, A-13, A-32 | Verify both participant views, message delivery and chat-only closure; separately verify microphone permission, call setup, call teardown and repeatability. | Confirmed demo scope; scoped acceptance detail pending. |
| The two fictional participants use distinct devices on one LAN. | Owner's 24 October 2026 answers | A shared backend channel must coordinate sessions, chat and WebRTC signaling. A two-tab `BroadcastChannel` cannot fulfill this requirement. | Confirmed technical scope. |
| Clients open or join subject sessions held by a server reachable by both devices. | A-30 to A-33 | The server coordinates the open-subject view, admits the second client, relays messages and closure, and limits an exchange to two clients. Exact session protocol and host remain to design. | User-stated client/server boundary; implementation pending. |
| The participant-facing website and backend are separate services; the browser reads and sends session data through the backend. | A-20, A-34 | Both services need addresses reachable by the two clients. Backend owns active session state; frontend displays it. This does not imply an administrator interface or persistent database for the fictional demo. | User-stated service boundary; routing and deployment pending. |
| Sample conversations; no conversation storage in the demo. | A-12 | Keep fictional content explicit. Avoid a persisted chat history. Specify and verify what remains in browser and server memory after closure. | Confirmed demo boundary; implementation undecided. |
| Ending written chat directly or ending an optional call removes the exchange from participants' views. | A-5, A-10, A-11, A-32 | Close the interaction and clear both views from either path; do not claim regulated deletion or imply a future archive rule. | Confirmed demo behaviour. |
| The pitch video is two minutes and due 25 October 2026 before midnight Paris time. | [Hackathon source](../hackathon-kickoff.md) | Favor a reliable, repeatable local journey; this is an event constraint. | Source stated; no performance target invented. |
| No real people seeking help, real matching, moderation operation, administrator archive or emergency contact in the demo. | A-8, A-10 to A-13 | Keep the demo isolated from a real service and avoid claims of production safety. | Confirmed scope boundary. |
| A later real service would hide closed chats from participants but retain some history for administrators. | A-5; A-11 defers policy | Separate participant visibility from retention. Access, notices, duration, reporting and escalation need decisions before that service is designed. | Future need; not a demo constraint. |

## Open technical constraints

- **Known:** The owner ranks backend skills as .NET, Python, TypeScript/Node, Java, PHP, strongest to weakest. The framework and exact version are Not provided.
- **Known:** Two distinct devices on the same LAN are required. The current `BroadcastChannel` implementation only connects compatible browsing contexts on the same origin ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API)); it cannot satisfy the new scope.
- **Not provided:** The secure-origin mechanism for both LAN devices and actual WebRTC connectivity on the chosen network. These need an end-to-end check; being on one LAN does not guarantee a call.
- **Not provided:** Target browsers/devices, internet conditions, offline use, accessibility criteria, budget, hosting, deployment provider, expected load and availability. Do not invent targets.
- **Known:** The selected demo entry is open subject → wait → list and join (A-30 to A-33). **Not provided:** Session identifier, concurrent-join handling, cancellation, reconnect rule, and how long in-memory state may remain after a disconnect. Record these in the scoped PRD and design before implementation.
- **Not provided:** Which LAN machine or machines will host the two services, their addresses/ports, firewall access, and whether routing gives them one browser origin or separate origins. A process bound only to `127.0.0.1` is reachable only from its own machine.
- A cross-device microphone call requires a secure browser context and permission ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)). Network traversal and any relay service are undecided; a local two-tab call does not validate remote connectivity.

See [stack](stack.md), [technical context](technical-context.md), and [ADR 0001](../../adr/0001-web-demo-infrastructure.md) for the options and decision status.
