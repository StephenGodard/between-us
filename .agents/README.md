# Active agent framework

`AGENTS.md` is the repository instruction entry point. This directory contains the eight currently active roles and their supporting material. A role contract describes responsibilities; a skill describes when and how to perform a task. Neither file launches a subagent by itself. The PO has separate PRD and feature-decomposition skills; the US role drafts delivery stories from those artifacts. The planning role turns a story into an implementation plan, and the dev role implements it. The design role maintains mockups and design context.

| Directory | Purpose |
| --- | --- |
| `agents/` | BA, PO, US, planning, dev, designer, architect, and Build in Public role contracts |
| `skills/` | Discoverable Codex workflows with `SKILL.md` metadata |
| `rules/` | Shared and role-specific operating rules |
| `templates/` | Shapes for intake, brief, PRD, feature, user story, implementation plan, technical context, and ADR artifacts |
| `checklists/` | Review checks for those artifacts |
| `config.yaml` | Informational path map; Codex does not load it automatically |

Start from the task's [discovery skill](skills/scaffold-project/SKILL.md), [PRD skill](skills/create-prd/SKILL.md), [feature skill](skills/create-features/SKILL.md), [user-story skill](skills/create-user-story/SKILL.md), [planning skill](skills/plan-implementation/SKILL.md), [development skill](skills/implement-story/SKILL.md), [design skill](skills/create-design/SKILL.md), [architecture skill](skills/shape-architecture/SKILL.md), or [Build in Public skill](skills/share-progress/SKILL.md). Read the [context index](../docs/context/README.md) before product or design work. [AGENTS.md](../AGENTS.md) explains the living-context and decision-record boundaries.

Other inactive ports and future role drafts live in the separate local `agentic-sandbox` repository. They are outside this project's skill discovery. To check this active scaffold, run `python3 tools/validate_scaffold.py` from the repository root.
