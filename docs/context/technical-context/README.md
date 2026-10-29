# Technical context

This directory is the living technical entry point for agents. Read the [technical context](technical-context.md) for the current scope, observed prototype, architecture options, decision state, and open questions. Context files have no approval status.

An ADR is part of the project's technical knowledge, but it is a separate decision record. The technical context links to each relevant ADR and summarizes its decision status; the ADR keeps its options, rationale, consequences, and review trigger. See the [ADR index](../../adr/README.md). The owner confirmed a participant-facing website plus a separate backend service with server-held subject sessions reachable by two clients (A-33, A-34), then explicitly approved ADR 0001 on 24 October 2026. Its Nuxt, ASP.NET Core/SignalR, WebRTC, Compose and trusted HTTPS direction is selected for the fictional demo; implementation and two-phone verification remain pending.

[Constraints](constraints.md) and [stack](stack.md) are sourced working files. They cover the owner's frontend/backend direction, backend skill order and two-device LAN scope. The [engineering guidelines](guidelines/README.md) describe how agents should research, code and verify the scoped implementation.

Read the [product context](../product-context/README.md) and cited intake answers before changing technical decisions. The existing [`prototype/`](../../../prototype/README.md) is exploratory code, not a product requirement or build baseline. Future implementation belongs in [`src/`](../../../src/README.md) after scope and architecture are chosen.

## Implemented application

See the [implementation contract](implementation-contract.md) for exact protocol, limits and remaining interruption gaps, and the [local runbook](../../local-demo-runbook.md) for Compose and phone acceptance. Implementation evidence is recorded in each plan; earlier pending statements above describe the architecture decision baseline.
