---
name: create-prd
description: Use the product owner to create an initial product-wide PRD from discovery or a scoped delivery PRD from living product context.
---

# Create product requirements

Read `.agents/agents/po-agent.md`, `.agents/rules/project-core-rules.md`, `.agents/rules/po-core-rules.md`, `.agents/templates/prd_tmpl.md`, and `.agents/checklists/prd-checklist.md`. Start with `docs/context/product-context/README.md` and `docs/context/product-context/product-context.md` to locate the current discovery, brief, and intake.

1. Confirm the exact source paths and last updates. Read the discovery and brief, then inspect cited intake answers where a requirement, boundary, or conflict matters. A later explicit user decision may refine an earlier one; record the trail.
2. Choose the requested PRD type. An **initial product PRD** inventories all distinct capabilities and deliverables stated in discovery, including deferred and hypothetical ones, with a source and decision state for each. It is a map for later decomposition, not a build commitment. A **scoped delivery PRD** has one coherent outcome and uses `.agents/templates/prd_tmpl.md`.
3. Keep the fictional hackathon demo and future real-person service in separate horizons. Trace each confirmed requirement to a BA BR ID where one exists and to discovery or intake evidence. If a discovery item has no BR ID, state that explicitly; never invent one. Label hypotheses and missing decisions. Do not make the future service buildable before its safety and operational decisions exist.
4. Create or revise `docs/prds/<scope-slug>.md`. For an initial PRD, include a stable feature inventory, source and phase per item, delivery dependencies, and a coverage check against discovery. For a scoped PRD, state actors, observable requirements, acceptance evidence, in/out scope, dependencies, and open decisions. Apply `.agents/checklists/prd-checklist.md` and record unverified items.
5. Show the exact PRD and decisions needed next. Set `APPROVED` only after the user explicitly accepts that PRD and its material blockers are resolved. Neither initial inventory nor PO review alone establishes build readiness.

Use `.agents/skills/create-features/SKILL.md` when the user asks to decompose an existing PRD into feature documents. PRD creation does not start architecture, design, development, or QA work by itself.
