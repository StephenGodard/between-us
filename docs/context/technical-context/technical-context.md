# Technical context — short-lived listening between citizens

Date: 2026-10-24
Functional sources: `docs/context/product-context/discovery/entre-nous-product-discovery.md`, `docs/context/product-context/briefs/espaces-ecoute-ephemeres.md`, and `docs/context/product-context/intake/espaces-ecoute-ephemeres.md` (especially A-20 to A-23 for frontend/backend, skill order and two-device LAN scope). These are living context and cited user decisions, not approval gates.
PRD: The [initial product PRD](../../prds/entre-nous-initial.md) is a draft inventory for decomposition, not an accepted scoped implementation PRD.
Implementation readiness: The web demo scope, Nuxt preference, frontend/backend direction and two-device LAN requirement are known. A scoped PRD, secure LAN access, audio verification and the infrastructure ADR's material choices remain to resolve before claiming a build baseline.

## Delivery scope

The user chooses the **hackathon demonstration** as the immediate architecture target and accepts a later redesign (A-18). They select a **web application** and prefer Vue/Nuxt (A-19). In the 24 October 2026 engineering-context request, they add a **frontend and backend** and ask for a lightweight backend language suited to their skills. Their follow-up ranks skills **.NET, Python, TypeScript/Node, Java, PHP** and requires the two fictional participants to use **distinct devices on the same LAN**. Their goal is to win the event; this is an aspiration, not a predicted result. The deliverable remains a local fictional demonstration with sample messages, two-way chat, a real audio call, and an end that removes the exchange from both participant views (A-8, A-10, A-12, A-13). The existing web prototype is exploratory, not the selected target architecture (A-14).

A possible later service would connect real adults in France. Its safety, identity, moderation, archive, emergency, and operational rules remain open or deferred (A-5, A-7, A-11; [product context](../product-context/product-context.md)). This document does not define that service as ready to implement.

## Required capabilities and quality concerns

| Need | Source | Technical implication | State |
| --- | --- | --- | --- |
| Two fictional participants exchange messages and audio using distinct devices on one LAN. | A-12, A-13; owner's 24 October 2026 answers | The demo needs a backend-accessible session, a two-party message channel and WebRTC call signaling. LAN connectivity still needs testing. | Confirmed demo need; target implementation pending. |
| Ending the call closes the participant exchange. | A-5, A-10, A-13 | Both participant views must clear the session and stop audio; future administrator retention is a separate concern. | Confirmed demo behaviour; future retention undecided. |
| Participant identities are concealed from each other to reduce fear of judgment. | A-1, BR-3 | What the operator knows and how a real service establishes identity remain undefined. | Not decided. |
| The hackathon demo should make the first exchange understandable in a two-minute pitch. | A-9, A-11, A-18; [kickoff](../hackathon-kickoff.md) | The technical journey should support a repeatable, easy-to-film sequence; presentation quality and actual reliability need verification. | Confirmed priority; implementation acceptance pending. |
| The hackathon application is web based, with a Vue/Nuxt preference. | A-19 | Choose a browser-oriented implementation and assess whether a Nuxt migration is worth the remaining demo time. | Web selected; framework preference expressed; implementation pending. |
| The solution has a frontend and backend, with a backend language matching the owner's skills. | Owner's 24 October 2026 request and follow-up | Compare backend choices with .NET as the strongest skill, then Python and TypeScript/Node. | Backend requested; language and framework proposed below, not selected. |
| A later real service might use a mobile app. | A-17, A-18 | Defer platform, tooling, installation, and device support decisions until the later service is scoped. | Hypothesis. |
| Real-person exchanges could involve reports, retained history, and urgent distress. | A-4, A-5, A-11 | Data boundaries, authorized access, moderation operations, and escalation require product and specialist decisions before design. | Deferred; not part of the demo. |

## Observed systems

- `prototype/server.js` serves static files on `127.0.0.1`. This is a local demo server, not an application backend.
- `prototype/app.js` uses `BroadcastChannel` for same-browser tabs and `RTCPeerConnection` with microphone access for audio. It clears in-memory messages, closes the peer connection, and stops microphone tracks when the session ends.
- `prototype/index.html` declares a mobile viewport, and `prototype/styles.css` contains layouts for narrower screens. This is observed responsive styling; device compatibility has not been tested.
- `prototype/README.md` records no accounts, database, remote API, or persistent conversation storage. The two tabs must run on the same device. **This cannot satisfy the owner's new two-device requirement.** These observations do not prove production privacy or deletion behaviour.
- The active `prototype/` has no Nuxt project or cloud deployment configuration. A Nuxt application would be a new implementation or migration, not a description of the current prototype.
- An initial draft product PRD now inventories discovery capabilities; no accepted scoped implementation PRD, deployed service, mobile client, or selected target architecture is present.

## Candidate architecture and boundaries

**Web demo implementation.** The user has selected web, prefers Vue/Nuxt, and now requests a backend and two-device interaction. The [revised proposed infrastructure ADR](../../adr/0001-web-demo-infrastructure.md) compares these choices:

| Candidate | Fit to demo need | Tradeoffs and evidence gap |
| --- | --- | --- |
| Nuxt frontend + small ASP.NET Core/SignalR backend | Aligns with Vue/Nuxt preference, the owner's strongest backend skill (.NET), and two-device chat/signaling need. [SignalR supports browser clients and groups](https://learn.microsoft.com/en-us/aspnet/core/signalr/introduction). | Two running components, secure browser origins, connection lifecycle and a tested WebRTC media path. |
| Nuxt frontend + Python/FastAPI backend | Aligns with the owner's second strongest skill; [FastAPI supports WebSockets](https://fastapi.tiangolo.com/advanced/websockets/). | A manually specified realtime protocol; the same browser and LAN verification is needed. |
| Nuxt frontend + TypeScript/Node backend or Nuxt server routes | Shares the frontend language; [Nuxt has an API layer](https://nuxt.com/docs/guide/concepts/server-engine). | Owner ranks this language third; the chosen runtime's realtime support and host must be verified. |

**Architect's provisional recommendation:** Use a Nuxt frontend and a small ASP.NET Core backend with SignalR for temporary session membership, chat, WebRTC signaling and closure. Keep scripted examples explicit and avoid a persisted conversation history for the demo. This uses the owner's strongest backend skill and serves two devices. The architecture remains `PROPOSED` in its ADR. Keep the existing prototype as a reference for the journey, but its same-browser implementation is no longer a functional fallback for the two-device requirement.

**Proposed interaction contract, to refine in the scoped PRD:**

| Step | Browser responsibility | Backend responsibility | Data lifetime hypothesis |
| --- | --- | --- | --- |
| Enter a fictional session | Show the scenario and join the same session from each device. | Associate at most two connections with a temporary session. | Temporary membership only; join mechanism not decided. |
| Exchange messages | Display and send fictional chat messages. | Relay to the other participant. | Visible messages in browser memory; no conversation archive. |
| Start an audio call | Request microphone permission and exchange WebRTC setup data. | Relay offers, answers and ICE candidates; do not carry audio. | Signaling only for the active call. |
| End or disconnect | Stop microphone tracks, close the peer connection and clear the participant view. | Notify the other device and release temporary session state under a defined closure/disconnect rule. | No participant access after closure; server expiry still to define. |

This contract is a **Hypothesis** based on A-10 to A-13 and the two-device answer. Event names, join method, retries, reconnect behaviour and timeouts are Not provided. They must be specified and tested before implementation is treated as complete.

**Runtime boundary.** The browsers display the Nuxt interface, keep visible fictional messages during a session and own their microphone tracks. The backend would relay session events and signaling, with only temporary connection/session state. The final state lifecycle, server logs, and disconnect behaviour need specification. Microphone access requires a secure context such as localhost or HTTPS and user permission ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)); a second device opening a plain local IP URL is not automatically a secure context.

**Interaction boundary.** The prototype's `BroadcastChannel` connects same-origin browsing contexts, not the two devices now required ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API)). The proposed SignalR channel would relay chat and WebRTC offers, answers and ICE candidates; WebRTC would carry audio between browsers if connectivity succeeds ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Signaling_and_video_calling)). The owner specifies one LAN. A secure origin, LAN reachability and actual peer connectivity must be tested; do not assume the LAN eliminates all ICE or relay issues.

**Data boundary.** The demo has no conversation archive (A-12). An in-memory backend is a hypothesis; messages should be relayed without persistence, and session state removed after closure or an agreed disconnect timeout. Server request/error logging must be checked so the no-storage claim is accurate. A future service is expected to hide closed conversations from participants while retaining some history for administrators (A-5), but its purpose, access, duration, and legal basis remain undecided (A-11; [preliminary research](../product-context/research/securite-confidentialite-ecoute-citoyenne.md)). No database is selected here.

## Constraints and unknowns

- The hackathon submission requires a two-minute pitch video by 25 October 2026 before midnight Paris time ([kickoff](../hackathon-kickoff.md)); this is an event constraint, not a production architecture requirement.
- The first real-person audience is intended to be adults in France (A-7), but the real-user scope and safeguards remain undefined.
- The immediate architecture scope is the web hackathon demo (A-18, A-19), now on two distinct devices on one LAN (owner's 24 October 2026 answers). Not provided: whether a public project link is desired, exact devices/browsers, offline expectations, accessibility needs, expected scale, budget, and team capacity.
- Not provided: exact identity rules, moderation workflow, archive policy, emergency response, and accepted quality targets. These materially affect any future real-service architecture.

## Decisions and ADRs

**User decisions/direction:** Prioritize the hackathon demonstration now, allow a later redesign (A-18), use web with a Vue/Nuxt preference (A-19), include a frontend and backend, and support two distinct devices (owner's 24 October 2026 request and answers). The [web demo infrastructure ADR](../../adr/0001-web-demo-infrastructure.md) is `PROPOSED`; it recommends Nuxt plus ASP.NET Core/SignalR and no conversation database for the fictional demo. A later real-service architecture remains separate.

## Handoff to later agents

Later agents may rely on the selected web demo direction, the two-device LAN requirement, the owner's backend skill order and the observed prototype facts above. They must treat ASP.NET Core/SignalR, Nuxt rendering mode, HTTPS/local hosting topology and WebRTC connectivity plan as provisional. The current prototype is a reference for the fictional journey, not a two-device fallback. The next review should establish secure access from both devices, verify audio and closure, and make the two-minute filmed explanation repeatable. Use a scoped PRD for implementation planning and revisit this living context as decisions and test evidence arrive.

## Verification record

- Inspected `prototype/README.md`, `prototype/server.js`, `prototype/app.js`, `prototype/index.html`, and `prototype/styles.css` for the local demonstration facts above.
- Read the owner's 24 October 2026 engineering request and follow-up answers for backend skill ranking and distinct-device scope; reviewed [Nuxt server API](https://nuxt.com/docs/guide/concepts/server-engine), [SignalR](https://learn.microsoft.com/en-us/aspnet/core/signalr/introduction), [FastAPI WebSockets](https://fastapi.tiangolo.com/advanced/websockets/), and [WebRTC signaling](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Signaling_and_video_calling) documentation for candidate capabilities.
- NOT RUN: two-device chat or audio, secure-origin setup, network traversal, device compatibility, production privacy/security, or performance checks; the proposed target has not been implemented.
