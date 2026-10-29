# Agent onboarding

This file is the entry point for coding agents. [README.md](README.md) is the human entry point; [.agents/README.md](.agents/README.md) maps the agent framework. Product and technical context are living scaffolding: update them as evidence and decisions evolve. Repository layout work does not select a PRD, infrastructure ADR, or implementation.

## Read before changing the product

1. Read the [context index](docs/context/README.md), then [product context](docs/context/product-context/README.md) and its [current summary](docs/context/product-context/product-context.md).
2. For a disputed product statement, check the cited answer in `docs/context/product-context/intake/espaces-ecoute-ephemeres.md` or the supplied hackathon source. Later explicit user decisions refine earlier ones.
3. Use the relevant active skill and role contract below. Skills define a workflow; role contracts do not create autonomous subagents.
4. Before writing application code, read the [engineering guidelines](docs/context/technical-context/guidelines/README.md) and the frontend or backend guide relevant to the change. Check framework APIs against the installed version and official documentation.

| Work | Skill | Role contract |
| --- | --- | --- |
| Idea, discovery, business brief | `.agents/skills/scaffold-project/SKILL.md` | `.agents/agents/ba-agent.md` |
| PRD | `.agents/skills/create-prd/SKILL.md` | `.agents/agents/po-agent.md` |
| PRD to features | `.agents/skills/create-features/SKILL.md` | `.agents/agents/po-agent.md` |
| PRD and features to user stories | `.agents/skills/create-user-story/SKILL.md` | `.agents/agents/us-agent.md` |
| User story to implementation plan | `.agents/skills/plan-implementation/SKILL.md` | `.agents/agents/planning-agent.md` |
| Implement a planned user story | `.agents/skills/implement-story/SKILL.md` | `.agents/agents/dev-agent.md` |
| Design context and interface mockups | `.agents/skills/create-design/SKILL.md` | `.agents/agents/design-agent.md` |
| Technical options, ADR, technical context | `.agents/skills/shape-architecture/SKILL.md` | `.agents/agents/architect-agent.md` |
| Hackathon Build in Public updates | `.agents/skills/share-progress/SKILL.md` | `.agents/agents/build-in-public-agent.md` |

The active rules, templates, and checklists are under `.agents/`. Follow `.agents/rules/project-core-rules.md` and the role-specific files named by the skill. These eight roles are active. The planning role turns a story into an executable plan; the dev role implements and verifies it. The design role maintains living design context and mockups, while the Build in Public role documents progress. Role contracts do not grant product or technical approval.

## Source and decision boundaries

- The user selected a fictional hackathon demo, web delivery, and a Vue/Nuxt preference (intake A-18 and A-19). The discovery and brief are working context, not approval gates. The current initial PRD, three demo features and infrastructure ADR 0001 are approved; a scoped delivery PRD and implementation checks remain open.
- `docs/context/product-context/` holds functional evidence and working context; `docs/context/experience-context/` holds journey and UX synthesis; `docs/context/design-context/` holds visual design synthesis and mockup links; `docs/context/technical-context/` holds technical context; `docs/adr/` holds proposed or accepted technical decisions. The exploratory `prototype/` is observed code, not a source of product requirements or an approved architecture.
- Do not infer unconfirmed choices, technology, metrics, safety rules, or impact claims from the prototype or `agentic-sandbox`. Use only the current conversation and sources explicitly supplied for this project. Mark missing information `Not provided.` and proposals `Hypothesis`, with a source trail.
- Keep functional and technical context current, sourced, and editable without an `APPROVED` status or context approval step. A PRD or ADR records a scoped decision separately; do not claim one is accepted without the user's explicit decision about that artifact. Build readiness depends on a coherent delivery scope, resolved material blockers, and executable checks, not approval labels on context files.
- Preserve the user's exact wording in intake records and quoted requirements. Framework files are written in English.

## Repository boundaries

- `.agents/`: active agent framework and discoverable skills.
- `docs/`: separated functional and technical context, ADRs, PRDs, user stories, and implementation plans.
- `prototype/`: exploratory hackathon code; see its README before running it.
- `src/`: reserved for future implementation after a delivery scope and architecture are chosen.
- `tests/`: reserved for executable validation of the chosen solution.
- `tools/`: repository maintenance and validation scripts.
- Older framework ports and deferred role drafts live in the separate local `agentic-sandbox` repository. They are not instructions or product evidence for this project. Historical `.kiro/`, if present, is likewise inactive.

Run `python3 tools/validate_scaffold.py` after scaffold changes.
