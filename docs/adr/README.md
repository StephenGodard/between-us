# Architecture decision records

ADRs document material technical choices individually. Each record states its scope, source evidence, options, rationale, consequences, status and review trigger. The [technical context](../context/technical-context/README.md) summarizes the current state and links to relevant ADRs; it does not replace their decision history.

| ADR | Status | Scope |
| --- | --- | --- |
| [0001 — Two-device web demo infrastructure](0001-web-demo-infrastructure.md) | `APPROVED` | Fictional hackathon demonstration on two LAN devices |

The owner explicitly approved ADR 0001 on 24 October 2026 with « je valide l'ADR ». This selects its demo architecture direction, including Nuxt, ASP.NET Core/SignalR, Docker Compose, a trusted HTTPS entry point and browser WebRTC. The implementation and two-phone checks remain outstanding; this approval does not approve the revised product PRD or feature specifications.
