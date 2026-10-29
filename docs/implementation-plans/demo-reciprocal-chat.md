# Implementation plan: Hold a reciprocal fictional chat

Story: [US-D-02](../user-stories/demo-reciprocal-chat.md), READY FOR REVIEW; grief-only example refined by A-38  
Horizon: fictional demo, lot 2  
Status: IMPLEMENTED — physical-device verification pending  
Sources: [approved lot 2 PRD](../prds/interactive-session-mvp.md) M-R3/M-R7 and [intake A-37/A-38](../context/product-context/intake/espaces-ecoute-ephemeres.md); [F-D-01](../features/demo-fictional-exchange-chat.md) (approved); [experience context](../context/experience-context/README.md), [design context](../context/design-context/README.md), [technical context](../context/technical-context/README.md), [constraints](../context/technical-context/constraints.md), [stack](../context/technical-context/stack.md), [ADR 0001](../adr/0001-web-demo-infrastructure.md) (approved), [engineering guidelines](../context/technical-context/guidelines/README.md).  
Date: 2026-10-25

## Outcome and boundaries

Both participants type and send original text freely in one active exchange, with no role-based turn rule or automatic message. A grief script may guide a demonstrator but is not application content required by lot 2. The backend relays to authorized current members only; visible messages remain in browser memory. No conversation-history store is added.

## Implementation slices

| Order | Slice and expected boundaries | Story criteria | Dependencies | Verification |
| --- | --- | --- | --- | --- |
| 1 | Extend the shared contract with a bounded text message and exchange identity. Implement backend input validation, current-membership authorization, per-exchange relay and cross-session isolation without persisting payloads. | AC-1, AC-2 | US-D-08 | NOT RUN — invalid/oversized and stale-member sends fail; two sessions cannot receive each other's messages. |
| 2 | Build one composer and message view usable by opener and joiner, wired through the typed adapter. Send only on an explicit participant action; render text safely and show send/connection errors without inventing an automatic retry. | AC-1 | US-D-01; slice 1 | NOT RUN — each participant sends at least two original messages and receives the other's in the same exchange. |
| 3 | Keep messages in one active in-memory view and clear them when US-D-04 closes or US-D-05 reopens the subject. Do not use browser storage, service-worker caches or a persistent server store. | AC-2 | Slices 1–2; US-D-04/US-D-05 integration | NOT RUN — old messages do not reappear after closure, reload or fresh join. |
| 4 | Inspect backend, proxy and client logging/configuration for message-bearing records, including errors, and add a focused integration check for the relay contract. | AC-2 | Slices 1–3; US-D-07 routing | NOT RUN — data-path review finds no persistent conversation text or payload-bearing logs. |

## Integrated verification

NOT RUN — two distinct LAN devices exchange at least two original messages each, with no automatic messages; another session remains isolated. Inspect storage and logs before claiming no stored conversation history. Repeat clearing checks after US-D-04 and US-D-05.

## Decisions and blockers

The older story's grief scenario is an optional fictional example; A-38 permits arbitrary user-created subjects and manually written dialogue. Not provided: exact message size, error copy or disconnect behaviour. Hypothesis: bounded plain text is enough for this demo; choose limits as input protection, document them, and avoid implying a product content policy.

## Progress and evidence

2026-10-25 implementation: Implemented both-role composer, memory-only message view, explicit bounded sends, safe text rendering, isolated relay and stale-exchange rejection. Integration tests send two original messages each, reject invalid/stale sends and verify other sessions receive none.

Observed backend checks: `dotnet build src/backend` passed; `dotnet test tests/backend` passed 5 tests; `dotnet format src/backend --verify-no-changes --no-restore` and the same command for `tests/backend` passed. `docker compose config --quiet` passed. Frontend typecheck, build and format check passed on Node 22.22.3. Packaged verification passed: `docker compose up -d --build` runs all three services at `https://localhost:8443`; `tests/browser/demo-smoke.cjs` passed with three isolated Chromium contexts at 390px. It verified reciprocal chat, chat-only without microphone access, decline, synthetic WebRTC connection, hangup preserving chat, simulated microphone denial, leave and close during connected calls with tracks/peer connections released, fresh join without prior messages, waiting cancellation, empty local/session storage and no page errors. HTTPS errors were bypassed for automation: this is not certificate-trust acceptance. Synthetic audio is not audible physical-device evidence. See the shared [runbook](../local-demo-runbook.md).

**NOT RUN:** physical two-phone LAN trust, microphone permission and audible two-way media. These remaining acceptance criteria prevent a completed-story claim. Unexpected-disconnect expiry/recovery remains undecided; no automatic leave/rejoin is inferred. See the [implementation contract](../context/technical-context/implementation-contract.md) for exact protocol, limits, logging and data-lifetime evidence.

Final integrated inspection: gateway/backend/frontend logs contained neither the exercised fictional marker nor observed message payloads; desktop/mobile screenshots were inspected with no horizontal overflow at 390px. Services remain running for review. See the runbook for reproducible checks and their limits.
