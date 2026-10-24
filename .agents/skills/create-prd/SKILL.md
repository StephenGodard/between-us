---
name: create-prd
description: Use the product owner to create or revise traceable PRDs from a product discovery and BA brief, including provisional drafts while those sources await approval.
---

# Create product requirements

Read `.agents/agents/po-agent.md`, `.agents/rules/project-core-rules.md`, `.agents/rules/po-core-rules.md`, `.agents/templates/prd_tmpl.md`, and `.agents/checklists/prd-checklist.md`. Start with `docs/context/product-context/README.md` and `docs/context/product-context/product-context.md` to locate the current discovery, brief, and intake.

1. Confirm the exact source paths and statuses. Read the discovery and brief, then inspect cited intake answers where a requirement, boundary, or conflict matters. A later explicit user decision may refine an earlier one; record the trail.
2. Select one coherent delivery outcome per PRD. For this project, the fictional hackathon demo and a future real-person service have different boundaries. Do not make a future-service PRD buildable before its safety and operational decisions exist.
3. Create or revise `docs/prds/<scope-slug>.md` from the template. State the goal, people and journey, in/out scope, numbered requirements with acceptance evidence, supported nonfunctional needs, dependencies, hypotheses, and open decisions. Trace requirements to both BA business rules and discovery or intake evidence.
4. Apply the checklist and state what remains unverified. When source artifacts are unapproved, a reviewable PRD can be prepared but remains provisional. Do not claim build readiness or approval from the PO alone.
5. Show the user the exact PRD and the few decisions needed next. Set `APPROVED` only after the user explicitly approves that PRD and its source discovery and brief are approved.

This skill produces requirements for construction. It does not start architecture, design, development, or QA work by itself.
