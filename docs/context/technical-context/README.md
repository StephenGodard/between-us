# Technical context

This directory is the living technical entry point for agents. Read the [technical context](technical-context.md) for the current scope, observed prototype, architecture options, decision state, and open questions. Context files have no approval status.

An ADR is part of the project's technical knowledge, but it is a separate decision record. The technical context links to each relevant ADR and summarizes its decision status; the ADR keeps its options, rationale, consequences, and review trigger. See the [ADR index](../../adr/README.md). The two-device web demo infrastructure ADR is **PROPOSED**: Nuxt plus ASP.NET Core/SignalR is a recommendation, not a selected stack.

[Constraints](constraints.md) and [stack](stack.md) are sourced working files. They cover the owner's frontend/backend direction, backend skill order and two-device LAN scope. The [engineering guidelines](guidelines/README.md) describe how agents should research, code and verify the scoped implementation.

Read the [product context](../product-context/README.md) and cited intake answers before changing technical decisions. The existing [`prototype/`](../../../prototype/README.md) is exploratory code, not a product requirement or build baseline. Future implementation belongs in [`src/`](../../../src/README.md) after scope and architecture are chosen.
