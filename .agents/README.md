# Active agent framework

`AGENTS.md` is the repository instruction entry point. This directory contains the three currently active roles and their supporting material. A role contract describes responsibilities; a skill describes when and how to perform a task. Neither file launches a subagent by itself.

| Directory | Purpose |
| --- | --- |
| `agents/` | BA, PO, and architect role contracts |
| `skills/` | Discoverable Codex workflows with `SKILL.md` metadata |
| `rules/` | Shared and role-specific operating rules |
| `templates/` | Shapes for intake, brief, PRD, technical context, and ADR artifacts |
| `checklists/` | Review checks for those artifacts |
| `config.yaml` | Informational path map; Codex does not load it automatically |

Start from the task's [skill](skills/scaffold-project/SKILL.md), [PRD skill](skills/create-prd/SKILL.md), or [architecture skill](skills/shape-architecture/SKILL.md). Each points to its role, rules, template, and checklist. Read the [context index](../docs/context/product-context/README.md) before product work. Current source status and approval boundaries are in [AGENTS.md](../AGENTS.md).

The inactive port and future role drafts live in the separate local `agentic-sandbox` repository. They are outside this project's skill discovery. To check this active scaffold, run `python3 tools/validate_scaffold.py` from the repository root.
