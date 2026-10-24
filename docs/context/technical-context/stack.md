# Solution stack — web demonstration

**Mode:** Living technical context; the recommended stack remains a hypothesis.
**Date:** 2026-10-24
**Scope:** Fictional hackathon demonstration, not a real-person service.
**Sources:** [intake A-8 to A-13 and A-18 to A-23](../product-context/intake/espaces-ecoute-ephemeres.md); [discovery](../product-context/discovery/entre-nous-product-discovery.md); [BA brief](../product-context/briefs/espaces-ecoute-ephemeres.md). The owner requests a front and back, prefers Vue/Nuxt, ranks backend skills **.NET, Python, TypeScript/Node, Java, PHP**, and requires **two distinct devices on the same LAN**. No PRD exists.

## Current direction

| Layer | Direction | Status and reason |
| --- | --- | --- |
| Frontend | Web application using Vue/Nuxt. | Web was selected in A-19; Nuxt was preferred there and repeated in the current request. Exact version, rendering mode and UI libraries are not decided. |
| Backend | **Hypothesis:** a separate, small ASP.NET Core service in C#. | A backend is requested, two devices need a shared coordination point, and .NET is the owner's strongest backend skill. The exact design is pending review. |
| Realtime chat and call setup | **Hypothesis:** [ASP.NET Core SignalR](https://learn.microsoft.com/en-us/aspnet/core/signalr/introduction) for chat, session events and [WebRTC signaling](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Signaling_and_video_calling). | SignalR supports browser clients and targeted/group messages; it is a candidate transport, not an audio media relay. |
| Audio | Browser microphone and WebRTC are candidate mechanisms. | Observed in `prototype/app.js`, not selected for the new application. Microphone permission and supported devices require verification. |
| Conversation data | No saved conversation history for the demo. | A-12. Ephemeral server memory, if used, would be a technical hypothesis to test; a database is not justified by the demo scope. |
| Hosting | Locally run frontend and backend, reachable from both demo devices on the same LAN. | A-12 and the owner's network answer. A trusted secure origin for microphone access on the second device still needs a concrete setup and test. |

## Backend options to review

The owner's ranking favors .NET. No language is selected on the basis of the exploratory Node server in `prototype/server.js`.

| Candidate | Why it may fit | Cost or limitation | Decision trigger |
| --- | --- | --- | --- |
| Separate C#/ASP.NET Core backend with [SignalR](https://learn.microsoft.com/en-us/aspnet/core/signalr/introduction) | Best match to the owner's strongest backend skill; built-in real-time client/server model can carry chat and WebRTC signaling for two devices. | Two processes, a cross-origin or reverse-proxy setup, and a secure browser origin to test. SignalR does not provide the audio media path. | **Recommended hypothesis** for this demo. |
| Separate Python/FastAPI backend | Owner's second strongest skill; [FastAPI supports WebSockets](https://fastapi.tiangolo.com/advanced/websockets/) for chat and signaling. | Requires a chosen message protocol and second runtime. | Fallback if the owner prefers Python for implementation or .NET setup proves inconvenient. |
| Separate TypeScript/Node backend, or [Nuxt server routes](https://nuxt.com/docs/guide/concepts/server-engine) | Shares the frontend language and could consolidate processes if the Nuxt runtime fits the realtime need. | Owner ranks this below .NET/Python; realtime support and host compatibility require verification. | Reconsider if one language/process matters more than backend familiarity. |

**Working hypothesis:** The backend creates or joins a temporary fictional session, relays chat and call setup between two connected devices, and broadcasts closure. The browsers hold the visible messages and handle microphone/audio. Neither a database nor a retained conversation history is part of the demo. Session membership, disconnect expiry and logging must be specified so that “nothing stored” is actually testable. No authentication, moderation, archive or emergency workflow is selected for the fictional demo.

See [constraints](constraints.md), the [full technical context](technical-context.md) and [ADR 0001](../../adr/0001-web-demo-infrastructure.md). The LAN boundary is now known; the secure browser origin and tested WebRTC path remain open.
