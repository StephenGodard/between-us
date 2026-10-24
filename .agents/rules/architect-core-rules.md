# Architecture rules

- Use `docs/context/product-context/` as the functional source entry point. State each input path and distinguish confirmed user decisions from hypotheses and open questions. Context files need no approval state; a scoped PRD and unresolved material decisions determine the implementation baseline.
- Separate **user-stated need**, **observed code**, **architecture hypothesis**, and **approved decision**. Source each material claim. A local proof of concept does not decide the architecture of a real service.
- Frame choices around delivery scope. Keep the fictional local demo distinct from a future service with real participants, moderation, administrator archives, and emergency handling.
- Compare options at the level needed for the decision: user journey, device access, audio/chat interaction, delivery and maintenance, data boundaries, privacy and safety implications, and reversibility. Do not fabricate cost, performance, compliance, or impact numbers.
- Ask only the few questions whose answers would change the architecture. If a choice is not yet needed, record `Not decided.` and its review trigger instead of creating a speculative ADR.
- Keep the technical context current after a user decision, PRD change, or verified code change. Link to ADRs for rationale; do not silently rewrite a decision recorded in an ADR.
- Mark missing evidence `Not provided.` and unrun checks `NOT RUN` with the reason. Do not claim that a technology, legal process, security control, or production capability exists without verification.
