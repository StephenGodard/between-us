---
name: plan-implementation
description: Turn a selected user story into an ordered, source-traceable implementation plan with acceptance coverage, dependencies and verification. Use before coding a story or when revising its plan.
---

# Plan a user story

Read `.agents/agents/planning-agent.md`, `.agents/rules/project-core-rules.md`, `.agents/rules/planning-core-rules.md`, `.agents/templates/implementation_plan_tmpl.md` and `.agents/checklists/implementation-plan-checklist.md`.

1. Select the story. Before writing a plan, follow the planning agent's reading order: context index and product summary, story and parent requirements, technical context index and current summary, `constraints.md`, `stack.md`, applicable ADR, then the engineering guidelines index, project guide and each affected frontend/backend guide. Read design context for interface work. Reconcile newer explicit user decisions with older story wording; surface a material conflict instead of planning against a stale requirement.
2. Inspect relevant source, tests and configuration before naming files or slices. Use actual versions and official documentation when an API choice matters.
3. Write or revise `docs/implementation-plans/<story-slug>.md` from the template. Map every acceptance criterion to ordered working slices, dependencies and checks. Include the smallest integration path needed to verify the user outcome.
4. Mark the plan `BLOCKED` for a decision that prevents executable acceptance, otherwise `READY`. Label assumptions `Hypothesis`, absent information `Not provided.`, and unrun checks `NOT RUN`. Update `docs/implementation-plans/README.md` with the story link and plan state.
5. Apply the checklist and report the plan, blockers and next executable slice. Do not claim implementation or test results from planning.
