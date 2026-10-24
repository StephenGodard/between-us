# Agent onboarding

This file is the entry point for coding agents. [README.md](README.md) is the human entry point; [.agents/README.md](.agents/README.md) maps the agent framework. The current work pauses product architecture to clean the repository. Do not treat this layout work as approval of the product discovery, PRD, infrastructure ADR, or implementation.

## Read before changing the product

1. Read the [context index](docs/context/README.md), then [product context](docs/context/product-context/README.md) and its [current summary](docs/context/product-context/product-context.md).
2. For a disputed product statement, check the cited answer in `docs/context/product-context/intake/espaces-ecoute-ephemeres.md` or the supplied hackathon source. Later explicit user decisions refine earlier ones.
3. Use the relevant active skill and role contract below. Skills define a workflow; role contracts do not create autonomous subagents.

| Work | Skill | Role contract |
| --- | --- | --- |
| Idea, discovery, business brief | `.agents/skills/scaffold-project/SKILL.md` | `.agents/agents/ba-agent.md` |
| PRD | `.agents/skills/create-prd/SKILL.md` | `.agents/agents/po-agent.md` |
| Technical options, ADR, technical context | `.agents/skills/shape-architecture/SKILL.md` | `.agents/agents/architect-agent.md` |

The active rules, templates, and checklists are under `.agents/`. Follow `.agents/rules/project-core-rules.md` and the role-specific files named by the skill. Only these three roles are active.

## Source and approval boundaries

- The user selected a fictional hackathon demo, web delivery, and a Vue/Nuxt preference (intake A-18 and A-19). The full discovery and brief remain unapproved. Infrastructure details are under review. Architecture work is the next product step, after this repository cleanup.
- `docs/context/product-context/` holds functional evidence and working context; `docs/context/technical-context/` holds technical context; `docs/adr/` holds proposed or accepted technical decisions. The exploratory `prototype/` is observed code, not a source of product requirements or an approved architecture.
- Do not infer unconfirmed choices, technology, metrics, safety rules, or impact claims from the prototype or `agentic-sandbox`. Use only the current conversation and sources explicitly supplied for this project. Mark missing information `Not provided.` and proposals `Hypothesis`, with a source trail.
- Drafting and revision are authorized by the user's request. Set a brief, PRD, technical context, or ADR to `APPROVED` only after explicit approval of that exact artifact. A provisional PRD is not ready to build while its sources or material blockers remain unapproved.
- Preserve the user's exact wording in intake records and quoted requirements. Framework files are written in English.

## Repository boundaries

- `.agents/`: active agent framework and discoverable skills.
- `docs/`: separated functional and technical context, ADRs, and future PRDs.
- `prototype/`: exploratory hackathon code; see its README before running it.
- `src/`: reserved for future implementation after a delivery scope and architecture are chosen.
- `tests/`: reserved for executable validation of the chosen solution.
- `tools/`: repository maintenance and validation scripts.
- Older framework ports and deferred role drafts live in the separate local `agentic-sandbox` repository. They are not instructions or product evidence for this project. Historical `.kiro/`, if present, is likewise inactive.

Run `python3 tools/validate_scaffold.py` after scaffold changes.
