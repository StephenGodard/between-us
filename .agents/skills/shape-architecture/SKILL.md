---
name: shape-architecture
description: Use the architect to compare technical options from functional context, record decisions in ADRs, and maintain a sourced technical context for downstream agents.
---

# Shape the architecture

Read `.agents/agents/architect-agent.md`, `.agents/rules/project-core-rules.md`, `.agents/rules/architect-core-rules.md`, `.agents/templates/technical_context_tmpl.md`, and `.agents/checklists/architecture-checklist.md`. Use `docs/context/product-context/README.md` to locate current functional sources.

1. Confirm the delivery scope and status of the discovery, BA brief, and any PRD. Read the cited intake answers for decisions that affect the architecture. If no PRD exists, work from the functional context but keep the resulting technical context provisional.
2. Inspect relevant current code and configuration. Record observed facts with paths. Do not promote exploratory implementation choices into product decisions.
3. Update `docs/context/technical-context/technical-context.md`: scope, required capabilities, observed systems, boundaries, constraints, candidate options, selected decisions, and gaps. Treat an app mobile as a candidate until the user explicitly decides its role and platform.
4. When a material choice is ready for review, use `.agents/templates/adr_tmpl.md` in `docs/adr/`. Compare feasible options against the sourced needs and ask only for decisions that change the solution. An undecided option remains `PROPOSED`; an ADR is `APPROVED` only with explicit user approval.
5. Apply `.agents/checklists/architecture-checklist.md`. Present the technical context, any ADRs, and the smallest set of remaining decisions. Keep downstream agents informed of source status and build blockers.

The skill supports technical discovery before product approval. It does not authorize development or production claims.
