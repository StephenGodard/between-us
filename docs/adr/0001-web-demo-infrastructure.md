# Architecture decision: two-device web demo infrastructure

Status: APPROVED
Date: 2026-10-24
Delivery scope: fictional hackathon demonstration on two phones on the same local network, with preliminary PC testing
Functional sources: `docs/context/product-context/intake/espaces-ecoute-ephemeres.md` (especially A-12, A-13, A-18 to A-23 and A-30 to A-36); `docs/prds/entre-nous-initial.md` (`READY FOR REVIEW` revision, D-R1 to D-R4); `docs/features/demo-fictional-exchange-chat.md`, `docs/features/demo-audio-call.md`, `docs/features/demo-exchange-closure.md` (`READY FOR REVIEW`).
Technical context: `docs/context/technical-context/technical-context.md`

## Decision scope

This ADR selects the backend, realtime transport, audio path and local routing direction for the owner's **two-service** model. Participants visit a user-facing website; a separate backend holds open subjects, allows at most one active two-person exchange per subject, relays chat and controls session transitions (A-33 to A-36). The owner selected the service boundary and their PC as the LAN host, with PC-first checks followed by two phones (A-34, A-35). Exact versions, routing configuration and trusted phone origin remain to implement and verify.

## Constraints and decision criteria

- The demo must show fictional participants, sample messages, reciprocal chat, an optional real audio call and opener-controlled closure from either chat or call, without a saved conversation history (A-8, A-10 to A-13, A-28, A-32, A-35, A-36; D-R1 to D-R4).
- The owner ranks backend competence .NET, Python, TypeScript/Node, Java, PHP, strongest to weakest, and specifies two devices on the same LAN (24 October 2026 answers).
- The owner identifies a server-held subject session, visible to two clients that open or join it (A-33). The server must be reachable from both phones over the LAN. The owner's PC is the intended host (A-35). This ADR selects one browser-facing HTTPS origin for UI and backend routes; exact routing and open-subject expiry remain to design.
- The user-facing website and backend are separate services (A-34). “Back-office” describes the separate backend in the owner's analogy; no administrator UI, database or durable conversation history follows from that wording. Both services run on the owner's PC for local testing (A-35); container and routing configuration remain to implement.
- The current `prototype/` uses same-browser `BroadcastChannel` and cannot connect two devices (`prototype/README.md`, `prototype/app.js`; [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API)).
- Browser microphone access needs a secure context and permission; a plain HTTP LAN address is insufficient for the second device ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)). [WebRTC call setup needs signaling](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Signaling_and_video_calling); LAN media connectivity still requires testing.
- The opener can cancel while waiting or intentionally close the subject session from chat or call. A voluntary joiner exit clears the current two-person exchange, makes the same subject available again and leaves its opener waiting; a new joiner sees none of the prior messages. An ordinary hangup stops audio and returns both to the same chat (A-35, A-36; D-R3). Unexpected disconnect remains to decide.
- The owner plans to test server services locally on their PC with Docker before connecting two phones to that PC over the LAN (A-35). Two browser clients on the PC are the first functional check; images or containers host services and do not themselves replace the clients.
- The two-minute pitch deadline favors a repeatable, locally controlled path ([event summary](../context/hackathon-kickoff.md)). No throughput or production availability target is provided.

## Options considered

| Option | Fit with needs | Tradeoffs | Evidence / unknowns |
| --- | --- | --- | --- |
| Nuxt frontend + small C#/ASP.NET Core backend with SignalR | Aligns with preferred UI and strongest backend skill; [SignalR groups](https://learn.microsoft.com/en-us/aspnet/core/signalr/groups) can target the two active connections with chat, subject events and WebRTC signaling. | Two services and a secure LAN entry point. Groups are delivery channels, not authorization; the backend must check who may close or leave. SignalR does not carry the WebRTC audio stream. | Requires two-phone checks for chat, microphone, WebRTC, closure and cleared rejoin. |
| Nuxt frontend + Python/FastAPI backend | Fits the second strongest backend skill; [FastAPI supports WebSockets](https://fastapi.tiangolo.com/advanced/websockets/). | Separate runtime and a custom realtime message protocol; same LAN/secure-origin test. | Reasonable fallback if the owner prefers Python or .NET setup proves unsuitable. |
| Nuxt frontend + separate TypeScript/Node backend | One language can cover browser and backend while keeping two services. | Owner ranks TypeScript/Node third. Realtime server support and deployment need checking for the chosen runtime. | Revisit if shared language matters more than owner familiarity. |
| Existing static two-tab prototype | Already illustrates the fictional journey on one computer. | Cannot meet the distinct-device requirement or the selected server-held subject lifecycle. | Observed in `prototype/README.md`, `prototype/server.js` and `prototype/app.js`; use only as a journey reference. |

For LAN browser access, the selected direction is a **single trusted HTTPS entry point** that routes website and backend traffic to separate services. It gives participants one URL and avoids browser cross-origin configuration. It adds a small routing component and requires the phones to trust the local certificate. Exposing website and backend as two HTTPS origins remains a fallback if the selected route proves unreliable on the phones; it adds cross-origin and connection configuration. Plain HTTP to a LAN IP cannot establish the required secure context for microphone access ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)).

## Decision and rationale

**Product and delivery inputs:** a web app with a Vue/Nuxt preference; a separate backend holding subject sessions; two phones on one LAN with the owner's PC as local host; the three distinct intentional transitions below (A-19, A-22, A-23, A-33 to A-36).

**Approved architecture direction:** Run a Nuxt user-facing service and a small, separate C#/ASP.NET Core backend on the owner's PC. Use [SignalR](https://learn.microsoft.com/en-us/aspnet/core/signalr/introduction) for the open-subject view, chat, session events and optional WebRTC signaling; use browser WebRTC for live audio. Package the services as separate containers and run them together with [Docker Compose](https://docs.docker.com/compose/) for the repeatable local demo. Use one trusted HTTPS entry point for the phones, routing to both services. The fictional demo has no database, administrator UI or real-user operations.

The backend is authoritative for one subject's opener, current joiner, availability and lifecycle. It must enforce opener-only cancel/end and joiner-only leave; hiding a button in the UI is insufficient. Separate unguessable, short-lived participant capabilities are the design direction for this account-free demo, while their exact format, transport and logging treatment remain to design and verify. SignalR groups can deliver events, but [do not themselves authorize access](https://learn.microsoft.com/en-us/aspnet/core/signalr/groups). A new joiner must enter a fresh exchange state, with the previous joiner's access invalidated and no old messages delivered.

| Event accepted by the backend | Authoritative state transition | Client effect |
| --- | --- | --- |
| Open subject / join subject | Create waiting subject / admit exactly one joiner and mark active. | Both see the same current subject and active exchange. |
| Opener cancels or ends | Close the subject and release its current exchange. | Both clear messages; no old session can resume. |
| Joiner voluntarily leaves | Release the current exchange and joiner access; keep the same subject waiting for its opener. | Both clear prior messages; the opener sees waiting; a new joiner starts fresh. |
| Either hangs up | Keep the subject and exchange active; end only the audio state. | Stop audio and return both to the same written chat. |

This decision follows the owner's backend proficiency, two-device LAN requirement, two-service model and KISS interaction choice. The owner explicitly approved this ADR with « je valide l'ADR » on 24 October 2026. Approval selects the architecture direction; it does not establish implementation readiness or working LAN audio. Exact versions, Nuxt rendering mode, certificate trust on both phones, open-subject expiry, unexpected disconnect handling and message-bearing logs still need design or verification.

## Consequences and review trigger

- First verify the packaged frontend and backend from **two independent PC browser clients**: open/list/join, reciprocal messages, opener cancellation and end, joiner exit followed by a fresh join, and hangup back to chat. This exercises service coordination but does not prove phone or LAN behaviour.
- Then verify the same flow from **two phones through the PC-hosted LAN entry point**, including both phones trusting the secure origin, microphone permission, audible two-way WebRTC, call teardown and clearing on each device. LAN proximity alone is not proof of WebRTC connectivity; any media relay decision follows that test.
- Specify atomic admission when two joiners race, capability issuance and revocation, event names, reconnect/expiry behaviour, and what server memory and logs retain. Inspect the integrated data path before claiming no conversation history. A browser close or unexpected network loss must not silently be treated as a voluntary joiner exit until that product rule is decided.
- If a trusted local HTTPS entry point cannot be made reliable on both phones, revisit the routing plan before changing the selected two-service or two-device boundary. A publicly reachable demo, different networks, real participants or retained reports/history each require a new architecture review.

**Verification state:** `NOT RUN` — the selected frontend/backend services, Compose setup, trusted phone origin and two-device audio path are not implemented. The exploratory `prototype/` cannot satisfy the selected two-phone flow.
