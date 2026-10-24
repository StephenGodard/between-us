# Technical context — short-lived listening between citizens

Status: DRAFT  
Date: 2026-10-24  
Functional sources: `docs/context/product-context/discovery/entre-nous-product-discovery.md` — Ready for review; `docs/context/product-context/briefs/espaces-ecoute-ephemeres.md` — READY FOR REVIEW; `docs/context/product-context/intake/espaces-ecoute-ephemeres.md` — DISCOVERY.  
PRD: Not provided.  
Build baseline: Not ready. The user selected a web demo and prefers Vue/Nuxt (A-19), but the functional sources remain unapproved and the infrastructure proposal has not been approved.

## Delivery scope

The user chooses the **hackathon demonstration** as the immediate architecture target and accepts a later redesign (A-18). They select a **web application** and prefer Vue/Nuxt (A-19). Their goal is to win the event; this is an aspiration, not a predicted result. The confirmed deliverable is a local fictional demonstration with two participants, sample messages, two-way chat, a real local audio call, and an end that removes the exchange from both participant views (A-8, A-10, A-12, A-13). The existing web prototype explores this journey; its technical choices are observed code, not an approved target architecture (A-14).

A possible later service would connect real adults in France. Its safety, identity, moderation, archive, emergency, and operational rules remain open or deferred (A-5, A-7, A-11; [product context](../product-context/product-context.md)). This document does not define that service as ready to implement.

## Required capabilities and quality concerns

| Need | Source | Technical implication | State |
| --- | --- | --- | --- |
| Two fictional participants exchange messages and audio locally. | A-12, A-13 | The demo needs a two-party message channel and local audio path. | Confirmed demo need; implementation observed below. |
| Ending the call closes the participant exchange. | A-5, A-10, A-13 | Both participant views must clear the session and stop audio; future administrator retention is a separate concern. | Confirmed demo behaviour; future retention undecided. |
| Participant identities are concealed from each other to reduce fear of judgment. | A-1, BR-3 | What the operator knows and how a real service establishes identity remain undefined. | Not decided. |
| The hackathon demo should make the first exchange understandable in a two-minute pitch. | A-9, A-11, A-18; [kickoff](../hackathon-kickoff.md) | The technical journey should support a repeatable, easy-to-film sequence; presentation quality and actual reliability need verification. | Confirmed priority; implementation acceptance pending. |
| The hackathon application is web based, with a Vue/Nuxt preference. | A-19 | Choose a browser-oriented implementation and assess whether a Nuxt migration is worth the remaining demo time. | Web selected; framework preference expressed; implementation pending. |
| A later real service might use a mobile app. | A-17, A-18 | Defer platform, tooling, installation, and device support decisions until the later service is scoped. | Hypothesis. |
| Real-person exchanges could involve reports, retained history, and urgent distress. | A-4, A-5, A-11 | Data boundaries, authorized access, moderation operations, and escalation require product and specialist decisions before design. | Deferred; not part of the demo. |

## Observed systems

- `prototype/server.js` serves static files on `127.0.0.1`. This is a local demo server, not an application backend.
- `prototype/app.js` uses `BroadcastChannel` for same-browser tabs and `RTCPeerConnection` with microphone access for audio. It clears in-memory messages, closes the peer connection, and stops microphone tracks when the session ends.
- `prototype/index.html` declares a mobile viewport, and `prototype/styles.css` contains layouts for narrower screens. This is observed responsive styling; device compatibility has not been tested.
- `prototype/README.md` records no accounts, database, remote API, or persistent conversation storage. The two tabs must run on the same device. These observations do not prove production privacy or deletion behaviour.
- The active `prototype/` has no Nuxt project or cloud deployment configuration. A Nuxt application would be a new implementation or migration, not a description of the current prototype.
- No PRD, deployed service, mobile client, or approved architecture is present in the active project documents as of this draft.

## Candidate architecture and boundaries

**Web demo implementation.** The user has selected web and prefers Vue/Nuxt (A-19). The [proposed infrastructure ADR](../../adr/0001-web-demo-infrastructure.md) compares these choices:

| Candidate | Fit to demo need | Tradeoffs and evidence gap |
| --- | --- | --- |
| Refine the existing plain web prototype | The observed code already contains the confirmed local two-participant journey, fictional scenarios, chat, audio, and session closure. | It does not satisfy the user's Vue/Nuxt preference. Rehearsal and audio permissions remain unverified. |
| Move the browser journey into client-rendered Nuxt | Fits the user's Vue/Nuxt preference and can be built as static assets without an application server for this local fictional demo. [Nuxt documents client rendering](https://learn.nuxt.com/en/concepts/rendering-modes) and [static generation](https://content.nuxt.com/docs/deploy/static). | Migration may introduce regressions before the deadline. The existing prototype should remain runnable until the Nuxt version passes the same two-tab journey. |
| Add a Nuxt application server now | Would provide a place for server-side features. | The confirmed local fictional demo has no account, remote matching, stored history, or API need. A runtime would add deployment and verification work without a sourced demo requirement. |

**Architect's provisional recommendation:** Use a small client-rendered Nuxt application with static output, reusing the existing browser journey and keeping the current prototype runnable as a fallback until parity is verified. Run it locally for rehearsal. If a shareable project link would help, publish only the static assets over HTTPS, with [Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-a-nuxt-site/) as one supported option. The event makes a project link optional ([kickoff](../hackathon-kickoff.md)). No application backend, database, account system, or storage service is needed for the confirmed fictional demo. This is a recommendation in a `PROPOSED` ADR, not an approved infrastructure decision.

**Runtime boundary.** Nuxt and a static host would serve the interface. Session state and scripted content stay in browser memory. The current `BroadcastChannel`/WebRTC approach is a candidate for the two-tab local journey; it must be checked after migration. Microphone access requires a secure context such as localhost or HTTPS and user permission ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)).

**Interaction boundary.** The demo's `BroadcastChannel` connects same-origin browsing contexts, not two remote citizens ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API)). An optional public URL would distribute the demo page; it would **not** turn it into a remote two-device chat. A real multi-device exchange would need a separately designed way to coordinate sessions and exchange messages and call setup. The exact services, network path, and data handling are Not decided.

**Data boundary.** The demo has no conversation archive (A-12). A future service is expected to hide closed conversations from participants while retaining some history for administrators (A-5), but its purpose, access, duration, and legal basis remain undecided (A-11; [preliminary research](../product-context/research/securite-confidentialite-ecoute-citoyenne.md)). No storage technology is selected here.

## Constraints and unknowns

- The hackathon submission requires a two-minute pitch video by 25 October 2026 before midnight Paris time ([kickoff](../hackathon-kickoff.md)); this is an event constraint, not a production architecture requirement.
- The first real-person audience is intended to be adults in France (A-7), but the real-user scope and safeguards have not been approved.
- The immediate architecture scope is the web hackathon demo (A-18, A-19). Not provided: whether a public project link is desired, the filming device, target mobile operating systems for any later app, offline expectations, accessibility needs, expected scale, budget, and team capacity.
- Not provided: exact identity rules, moderation workflow, archive policy, emergency response, and accepted quality targets. These materially affect any future real-service architecture.

## Decisions and ADRs

**User decisions:** Prioritize the hackathon demonstration now, allow a later redesign (A-18), and use web with a Vue/Nuxt preference (A-19). The [web demo infrastructure ADR](../../adr/0001-web-demo-infrastructure.md) is `PROPOSED`; it recommends client-rendered static Nuxt with no application backend or database, plus optional HTTPS static hosting. The user has not approved that exact ADR. A later real-service architecture remains separate.

## Handoff to later agents

Later agents may rely on the selected web demo direction, the cited functional demo scope, and the observed prototype facts above. They must treat the Nuxt rendering mode, hosting provider, and no-backend proposal as provisional. The current prototype is a fallback during any migration. The next review should check the demo journey from both participant views, a real local audio call, closure behaviour, and the two-minute filmed explanation. Before implementation planning, use an approved PRD for the demo scope and revisit this technical context against it.

## Verification record

- Inspected `prototype/README.md`, `prototype/server.js`, `prototype/app.js`, `prototype/index.html`, and `prototype/styles.css` for the local demonstration facts above.
- NOT RUN: device compatibility, remote-user call, production privacy/security, or performance checks; there is no selected target architecture or real-user implementation to test.
