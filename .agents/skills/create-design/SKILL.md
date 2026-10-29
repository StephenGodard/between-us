---
name: create-design
description: Create or revise Between Us design context and reviewable UI mockups using the landing's visual proposal and sourced demo journeys. Use for interface design, screen flows, and visual-system work; not for implementation or product requirements.
---

# Create design context and mockups

Read `.agents/agents/design-agent.md`, `.agents/rules/project-core-rules.md`, `.agents/rules/design-core-rules.md`, and `.agents/checklists/design-checklist.md`. Start with `docs/context/design-context/README.md` for the current baseline and source order.

1. Establish the requested screen, audience, and demo scope. Read the product summary, cited intake answers for material choices, current experience flows, relevant approved PRD/features and user stories, then the landing and its visual notes. Reconcile newer explicit user decisions with older summaries.
2. Inspect the actual landing assets and mockups before reusing colors, typography, composition, copy, or motion. Record the source path and distinguish what the owner selected from what is merely present in an artifact.
3. Maintain `docs/context/design-context/design-context.md` as a living design synthesis: source trail, selected directions, visual hypotheses, reusable patterns, screen/state coverage, adaptations from landing to application, and unresolved decisions. Do not place product requirements or technical architecture decisions there.
4. Create a `mockups/` subdirectory beside the design context when mockups are requested. Make them locally viewable, identify their scope and fictional nature, and show both participant perspectives where the journey differs. Cover the relevant entry, waiting, chat, optional audio and exit/closure states, or explicitly mark missing states. Use real application code only if the user asks for implementation and the engineering prerequisites in `AGENTS.md` are met.
5. Review against `.agents/checklists/design-checklist.md`. Verify only the behaviours and viewports actually exercised. Record `NOT RUN` for checks that have not occurred and keep open interaction or visual decisions visible for owner review.

Context and mockups are proposals until the owner selects a direction. The selected subject-led entry and optional voice are product experience decisions; the landing's palette and styling remain a visual proposal.
