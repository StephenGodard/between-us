# User story rules

- Use the current request and selected PRD, feature specifications, product context, technical context and ADR as sources. The old `agentic-sandbox` US agent is a framework reference, not product or architecture evidence.
- Keep the fictional demo separate from a possible real-person service. Select one horizon per story. Do not import later-service moderation, archives or emergency behaviour into the demo.
- Functional behaviour, actors and value must trace to the PRD or a linked feature. Technical responsibilities and constraints must trace to technical context or an accepted ADR. An unaccepted proposal remains a proposal.
- Keep each acceptance criterion observable and testable from the stated source. Record missing decisions as `Not provided.`; mark optional suggestions `Hypothesis`. Never invent values, timeouts, UI copy, protocols or success claims.
- Show the boundary between participant-facing clients and the separate backend where it affects the story. A single user story may require both services; do not mistake implementation components for user outcomes.
- Record dependencies and verification work without claiming any test ran unless there is observed evidence. Use `NOT RUN` with a reason for pending checks.
- `APPROVED` requires explicit acceptance of the story itself. Parent PRD, feature and ADR approvals do not transfer. A story with an unresolved material blocker is `BLOCKED`, even when its sources are approved.
