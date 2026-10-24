# Architecture decision: web demo infrastructure

Status: PROPOSED  
Date: 2026-10-24  
Delivery scope: fictional local hackathon demonstration  
Functional sources: `docs/context/product-context/discovery/entre-nous-product-discovery.md` — Ready for review; `docs/context/product-context/briefs/espaces-ecoute-ephemeres.md` — READY FOR REVIEW; `docs/context/product-context/intake/espaces-ecoute-ephemeres.md` — DISCOVERY (A-12, A-13, A-18, A-19).  
Technical context: `docs/context/technical-context/technical-context.md`

## Decision needed

The user selected a web application for the hackathon and prefers Vue/Nuxt (A-19). Decide how much Nuxt infrastructure this fictional, local two-participant demo needs before the submission deadline. The event requires a two-minute video; a project link is optional (`docs/context/hackathon-kickoff.md`).

## Constraints and decision criteria

- The demo must show fictional participants, two-way chat, a real local audio call, and participant-facing closure without stored conversation history (A-8, A-10, A-12, A-13).
- The current `prototype/` already contains a same-browser, two-tab implementation; its behaviour still needs rehearsal and parity checks after any migration (`prototype/README.md`, `prototype/app.js`).
- No real-user operation, remote matching, administrator archive, or moderation workflow is in the hackathon scope (A-8, A-10 to A-13).
- A browser microphone requires a secure context such as localhost or HTTPS and user permission ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)). `BroadcastChannel` communicates between compatible same-origin browsing contexts, not remote devices ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API)).

## Options considered

| Option | Fit with needs | Tradeoffs | Evidence / unknowns |
| --- | --- | --- | --- |
| Keep the current plain web prototype | Preserves an existing local journey and avoids migration work before the deadline. | Does not follow the expressed Vue/Nuxt preference; design and behaviour still need verification. | `prototype/README.md`, `prototype/app.js`; actual rehearsal NOT RUN. |
| Client-rendered Nuxt with static output | Follows Vue/Nuxt preference; the demo can run in the browser with no application backend. Nuxt supports client-side rendering and static generation ([Nuxt rendering](https://learn.nuxt.com/en/concepts/rendering-modes), [Nuxt static hosting](https://content.nuxt.com/docs/deploy/static)). | Migration can regress chat/audio/closure. Keep the existing prototype runnable until parity is demonstrated. | A-19 and current prototype; no Nuxt implementation yet. |
| Nuxt server runtime plus database | Could support future server features. | Adds setup and operational work without a confirmed demo need; archives and real-user rules are deferred. | A-11, A-12; future scope unresolved. |

## Decision and rationale

**Recommendation pending artifact approval:** Build the demo as a client-rendered Nuxt application that produces static assets. Keep fictional scenarios and session state in browser memory; reuse and verify the existing two-tab chat/audio approach. Run locally for filming. If a public project link is useful, serve the static output over HTTPS; [Cloudflare Pages supports Nuxt deployment](https://developers.cloudflare.com/pages/framework-guides/deploy-a-nuxt-site/), but no hosting provider has been selected or connected. Do not add an application backend or database for this demo.

The user has approved the **web direction** (A-19), not this exact infrastructure proposal. This ADR remains `PROPOSED`.

## Consequences and review trigger

- A public URL would allow viewing the demo but would not connect two participants on separate devices using the current `BroadcastChannel` design.
- The original `prototype/` remains a fallback until the Nuxt version passes the same local journey, including microphone permission, call, and closure in both tabs.
- Revisit this decision if the user requires a live cross-device call, public participation, accounts, stored data, or operational safety features; those needs would change the architecture and require an approved PRD.
