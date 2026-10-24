# Entre nous — DevDay Paris hackathon

This repository explores an initial listening exchange between citizens. The confirmed hackathon scope is a **fictional demonstration** with a locally testable prototype and a two-minute pitch video. The complete product discovery and BA brief remain under review; architecture for the demo is the next product step.

## Where to start

| Area | Contents | Start here |
| --- | --- | --- |
| Product context | User answers, discovery, brief, event source, and research | [Product context](docs/context/product-context/README.md) |
| Technical context and decisions | Observed code, architecture options, and ADRs | [Technical context](docs/context/technical-context/README.md) |
| Agent framework | Active BA, PO and architect roles, rules, templates, checklists and discoverable skills | [Agent framework](.agents/README.md) and [agent entry point](AGENTS.md) |
| Exploratory code | A local, two-participant demo begun before discovery | [Prototype instructions](prototype/README.md) |
| Future implementation | Code for a chosen delivery scope, once designed | [Source boundary](src/README.md) |
| Validation | Future solution tests and current repository checks | [Tests](tests/README.md) and [tools](tools/README.md) |

The [document index](docs/README.md) separates functional sources, technical context, ADRs, and future PRDs. The current [web demo infrastructure ADR](docs/adr/0001-web-demo-infrastructure.md) is **PROPOSED**. `prototype/` is not an approved product or architecture baseline. No production source or solution tests have been scaffolded yet.

## Try the exploratory prototype

```sh
node prototype/server.js
```

Open `http://127.0.0.1:4173` and follow the [prototype instructions](prototype/README.md). Use fictional scenarios only. It has no accounts, database or archive and is not for people seeking real support.

## Check the repository scaffold

```sh
python3 tools/validate_scaffold.py
```

This check validates the active role and skill catalog plus local references. It does not verify the prototype's behaviour or approve any product or architecture artifact.

Earlier agent drafts and the historical framework port are kept in the separate local `agentic-sandbox` repository, outside this project.
