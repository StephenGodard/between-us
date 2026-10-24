---
name: create-features
description: Use the product owner to decompose an existing PRD into one or more traceable, reviewable feature specifications, without creating user stories or implementation tasks.
---

# Decompose a PRD into features

Read `.agents/agents/po-agent.md`, `.agents/rules/project-core-rules.md`, `.agents/rules/po-core-rules.md`, `.agents/templates/feature_tmpl.md`, and `.agents/checklists/feature-checklist.md`. Read the named PRD first, then its cited discovery, brief, intake answers, and the current product context. Consult technical context only for existing constraints and decision state; an unaccepted ADR does not turn into a product requirement.

1. Identify the PRD's outcome, status, numbered requirements, feature inventory if present, horizons, and open decisions. For an initial product PRD, choose one horizon or explicitly identify the selected items; do not blend demo and future-service behaviour into a buildable feature.
2. Group selected requirements by user-visible outcome or independently reviewable capability. Create one feature when that is sufficient, or several when each has a distinct outcome or decision boundary. Keep dependency order visible. Do not create one feature per technical component merely because the architecture has components.
3. Write each feature in `docs/features/<feature-slug>.md` using the template. Give it a stable `F-...` ID, parent PRD path and requirement IDs, actor and observable flow, acceptance evidence, dependencies, exclusions, source decision state, and unresolved questions. A feature may cover several PRD requirements; every selected requirement must appear in at least one feature or be recorded as deliberately deferred. Avoid duplicating a requirement across features without naming the shared boundary.
4. Reconcile changes: if the PRD is incomplete or contradictory, record the gap and keep the feature provisional. Do not silently amend the PRD or promote a hypothesis into a commitment. Update the PRD's feature index and coverage only when the mapping is source-supported; keep the PRD and feature links reciprocal.
5. Apply the feature checklist. Report created features, requirement coverage, decisions and verification still needed. `APPROVED` applies only after explicit user acceptance of the exact feature; feature approval does not approve the PRD or authorize implementation.

This workflow stops at feature specification. User stories, technical design and build tasks are later steps with their own source and decision trail.
