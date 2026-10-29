---
name: create-user-story
description: Create or revise traceable, testable delivery user stories from a PRD, its feature specifications and the applicable technical context and ADR. Use when preparing work for a future development agent.
---

# Create user stories

Read `.agents/agents/us-agent.md`, `.agents/rules/project-core-rules.md`, `.agents/rules/us-core-rules.md`, `.agents/templates/user_story_tmpl.md` and `.agents/checklists/user-story-checklist.md`. Read the selected PRD, its feature specifications and cited product sources. Read the technical context and applicable ADR for decided constraints and open architecture questions.

1. State the selected horizon, PRD status, feature statuses and ADR status. For the fictional demo, use `docs/prds/entre-nous-initial.md`, the F-D feature files, `docs/context/technical-context/technical-context.md` and `docs/adr/0001-web-demo-infrastructure.md`. A product-wide PRD can support story drafting, but do not claim a scoped delivery PRD or build readiness exists when it does not.
2. Derive stories by independently reviewable user outcome and dependency order. Cover each selected feature behaviour and PRD delivery requirement, or record an explicit deferral with its reason. Share a cross-cutting requirement between stories only when necessary and name the boundary. Do not split stories merely into client and server components.
3. Write each story under `docs/user-stories/` using the template and a stable `US-...` ID. Include exact source paths and IDs, an actor and source-supported value, observable flow, Given/When/Then acceptance criteria, decided client/server responsibilities, exclusions, dependencies, verification evidence and open questions. Cite PRD or feature evidence for functional behaviour; cite the technical context or an approved ADR for technical constraints. Preserve exact user-facing wording when quoted.
4. Set `BLOCKED` if a material decision or acceptance condition is missing, otherwise `READY FOR REVIEW`. Approval of parent artifacts does not approve the story. Do not turn an ADR proposal or implementation hypothesis into a product rule. Do not invent a concrete protocol, UI label, safety policy or test result to make a story appear ready.
5. Reconcile the coverage index in `docs/user-stories/README.md` and add reciprocal story links to the relevant features. Apply the checklist, report coverage, blocked questions and checks not run. Change a story to `APPROVED` only on explicit user acceptance of that exact story or clearly identified set.

This workflow creates story specifications for development handoff. It does not implement code, create task breakdowns or establish that the demo works on devices.
