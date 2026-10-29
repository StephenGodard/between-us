# Solution stack — web demonstration

**Mode:** Living technical context; ADR 0001 approves the demo stack direction, while implementation and checks remain pending.
**Date:** 2026-10-24
**Scope:** Fictional hackathon demonstration, not a real-person service.
**Sources:** [intake A-8 to A-13, A-18 to A-23 and A-30 to A-36](../product-context/intake/espaces-ecoute-ephemeres.md); [discovery](../product-context/discovery/entre-nous-product-discovery.md); [BA brief](../product-context/briefs/espaces-ecoute-ephemeres.md); [initial PRD revision](../../prds/entre-nous-initial.md). The owner requests a user-facing site and separate backend service, prefers Vue/Nuxt, ranks backend skills **.NET, Python, TypeScript/Node, Java, PHP**, and requires **two distinct devices on the same LAN**.

## Current direction

| Layer | Direction | Status and reason |
| --- | --- | --- |
| Frontend | Nuxt user-facing website. | Approved in ADR 0001, following the owner's Vue/Nuxt preference. Exact version, rendering mode and UI libraries are undecided. |
| Backend | Separate small C#/ASP.NET Core service. | Approved in ADR 0001, aligned with the owner's strongest backend skill. Exact version and service structure need implementation. |
| Realtime chat and call setup | [ASP.NET Core SignalR](https://learn.microsoft.com/en-us/aspnet/core/signalr/introduction) for chat, session events and [WebRTC signaling](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Signaling_and_video_calling). | Approved in ADR 0001. SignalR groups can target the pair, but [group membership does not authorize actions](https://learn.microsoft.com/en-us/aspnet/core/signalr/groups). The backend must check opener/joiner authority. SignalR is not an audio media relay. |
| Audio | Browser microphone and WebRTC for live audio. | Approved in ADR 0001; microphone permission, secure origin and actual two-phone connectivity require verification. |
| Conversation data | No saved conversation history for the demo. | A-12. Ephemeral server memory, if used, would be a technical hypothesis to test; a database is not justified by the demo scope. |
| Hosting | The owner's PC hosts separate frontend and backend containers run by [Docker Compose](https://docs.docker.com/compose/), behind one trusted HTTPS entry point for two phones. | Approved in ADR 0001. First test with two browser clients on the PC, then verify LAN reachability, certificate trust and microphone access on the phones. |

## Backend options considered in ADR 0001

The owner's ranking favors .NET. No language is selected on the basis of the exploratory Node server in `prototype/server.js`.

| Candidate | Why it may fit | Cost or limitation | Decision trigger |
| --- | --- | --- | --- |
| Separate C#/ASP.NET Core backend with [SignalR](https://learn.microsoft.com/en-us/aspnet/core/signalr/introduction) | Best match to the owner's strongest backend skill; real-time client/server model can carry chat and WebRTC signaling for two devices. | Two services, HTTPS routing and a secure browser origin to test. SignalR does not provide the audio media path. | **Selected in approved ADR 0001.** |
| Separate Python/FastAPI backend | Owner's second strongest skill; [FastAPI supports WebSockets](https://fastapi.tiangolo.com/advanced/websockets/) for chat and signaling. | Requires a chosen message protocol and second runtime. | Fallback if the owner prefers Python for implementation or .NET setup proves inconvenient. |
| Separate TypeScript/Node backend | Shares the frontend language while preserving the selected separate-service boundary. | Owner ranks this below .NET/Python; realtime support and host compatibility require verification. | Reconsider if shared language matters more than backend familiarity. |

**Selected direction and remaining design:** The backend publishes open subjects, creates or joins a temporary fictional exchange, relays chat and optional call setup between two devices, and enforces opener-controlled closure. Separate temporary participant capabilities are the approved direction for distinguishing opener and joiner without accounts; their exact format and transport remain to design. Joiner exit revokes access, clears both views and reopens the same subject; ordinary hangup returns both to chat (A-36). Browsers hold visible messages and handle microphone/audio when chosen. Neither a database nor a retained conversation history is part of the demo. Session membership, unexpected disconnect, expiry and logging must be specified so “nothing stored” is testable. “Back-office” in A-34 is an analogy for the separate backend, not a selected administrator interface.

See [constraints](constraints.md), the [full technical context](technical-context.md) and [ADR 0001](../../adr/0001-web-demo-infrastructure.md). The LAN boundary is now known; the secure browser origin and tested WebRTC path remain open.

## Implementation evidence — 25 October 2026

The selected services now exist in `src/frontend` and `src/backend`, with Compose/Caddy at the repository root. ASP.NET Core targets .NET 10 (local SDK 10.0.302); integration packages are pinned at 10.0.13. Nuxt dependencies are pinned in its package lock. See the [implemented contract](implementation-contract.md) and [runbook](../../local-demo-runbook.md). Real-phone trust and audible media remain to verify; the earlier table records the selected baseline rather than current code absence.
