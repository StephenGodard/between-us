---
name: implement-story
description: Implement a selected delivery user story from its source requirements and implementation plan, then verify and report the result. Use for application development, not story or plan drafting alone.
---

# Implement a user story

Read `.agents/agents/dev-agent.md`, `.agents/rules/project-core-rules.md`, `.agents/rules/dev-core-rules.md` and `.agents/checklists/development-checklist.md`.

1. Read the selected story and its plan in `docs/implementation-plans/` for what to change. Before coding, follow the dev agent's reading order: context index and product summary, parent requirements, technical context index and current summary, `constraints.md`, `stack.md`, applicable ADR, then the engineering guidelines index, project guide and each affected frontend/backend guide for how to change it. Read design context for interface work. If no plan exists, use `.agents/skills/plan-implementation/SKILL.md` to create one before substantive coding.
2. Inspect the actual code, configuration and tests. Resolve material conflicts with later explicit user decisions. Verify installed framework versions and affected APIs with official documentation. Choose routine implementation details; surface a material unresolved product or architecture decision that prevents the requested behaviour.
3. Implement coherent slices through the user outcome, including the affected client, backend and tests. Keep session authority and temporary data boundaries in the approved architecture. Adjust the plan when evidence changes the approach.
4. Run the relevant formatter, build, focused tests and integrated checks available in the environment. For two-device, audio or disappearance claims, use the specified devices and inspect the relevant data path and logs; otherwise report `NOT RUN` and the reason.
5. Update the plan's progress and any affected living technical context. Apply the checklist. Report changed files, observed results, remaining criteria and risks without promoting a story, PRD or ADR to approved status.
