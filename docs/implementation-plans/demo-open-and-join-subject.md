# Implementation plan: Open and join a chosen subject

Story: [US-D-01](../user-stories/demo-open-and-join-subject.md), READY FOR REVIEW; reconciled with A-38  
Horizon: fictional demo, lot 2  
Status: IMPLEMENTED — physical-device verification pending  
Sources: [approved lot 2 PRD](../prds/interactive-session-mvp.md) M-R1/M-R2 and [intake A-38](../context/product-context/intake/espaces-ecoute-ephemeres.md); [F-D-01](../features/demo-fictional-exchange-chat.md) (approved, earlier example scope); [experience context](../context/experience-context/README.md), [design context](../context/design-context/README.md), [technical context](../context/technical-context/README.md), [constraints](../context/technical-context/constraints.md), [stack](../context/technical-context/stack.md), [ADR 0001](../adr/0001-web-demo-infrastructure.md) (approved), [engineering guidelines](../context/technical-context/guidelines/README.md).  
Date: 2026-10-25

## Outcome and boundaries

A participant enters any fictional subject and sees it waiting; another sees at least two open subjects, chooses one, and both see the chosen active exchange. Actions are manual. Grief may be entered as an example but is not hard-coded. The backend remains authoritative under US-D-08. No selected Nuxt application exists yet; likely frontend paths below are hypotheses.

## Implementation slices

| Order | Slice and expected boundaries | Story criteria | Dependencies | Verification |
| --- | --- | --- | --- | --- |
| 1 | Build the subject-entry route/component with a user-entered subject, explicit submit, and waiting view driven by the typed session adapter. Validate non-empty input in UI and backend; select a reasonable technical size limit without narrowing subjects to a preset topic. | AC-1 | US-D-07, US-D-08 | NOT RUN — no session exists before submit; entered subject appears in backend state and opener's waiting view. |
| 2 | Build open-subject list and chosen-subject join action; show empty and stale-choice feedback and distinguish the selected subject from others. Subscribe to backend state changes, without automatic matching or joining. | AC-2 | US-D-08; slice 1 | NOT RUN — two different subjects display, chosen one activates for both clients and unchosen one stays open; a stale join is refused. |
| 3 | Connect waiting and active participant views to authoritative membership, including a clear transition when another person joins; keep both entry intentions able to converse in later US-D-02. | AC-1, AC-2 | Slices 1–2 | NOT RUN — independent PC clients observe one shared active exchange and a third client cannot enter it. |

## Integrated verification

NOT RUN — create two original subjects from independent clients, select one from a third, verify server state and both chosen participants' views, then repeat from distinct LAN devices. Check that entry and join never happen automatically. A third-join race is covered by US-D-08.

## Decisions and blockers

The story was updated from its earlier D-R1 and single-grief wording to A-38 and the approved lot 2 PRD. Not provided: exact copy, subject limit, empty-list design, waiting expiry and unexpected disconnect. Hypothesis: a simple list and an explicit join button suffice; review against the selected subject-led direction. None prevents the deliberate create/list/join checks here.

## Progress and evidence

2026-10-25 implementation: Implemented manual subject entry and explicit chosen-subject joining with multiple open subjects, empty/stale feedback and authoritative waiting/active transitions. Subject input is bounded at 120 UTF-16 code units without restricting subject choice.

Observed backend checks: `dotnet build src/backend` passed; `dotnet test tests/backend` passed 5 tests; `dotnet format src/backend --verify-no-changes --no-restore` and the same command for `tests/backend` passed. `docker compose config --quiet` passed. Frontend typecheck, build and format check passed on Node 22.22.3. Packaged verification passed: `docker compose up -d --build` runs all three services at `https://localhost:8443`; `tests/browser/demo-smoke.cjs` passed with three isolated Chromium contexts at 390px. It verified reciprocal chat, chat-only without microphone access, decline, synthetic WebRTC connection, hangup preserving chat, simulated microphone denial, leave and close during connected calls with tracks/peer connections released, fresh join without prior messages, waiting cancellation, empty local/session storage and no page errors. HTTPS errors were bypassed for automation: this is not certificate-trust acceptance. Synthetic audio is not audible physical-device evidence. See the shared [runbook](../local-demo-runbook.md).

**NOT RUN:** physical two-phone LAN trust, microphone permission and audible two-way media. These remaining acceptance criteria prevent a completed-story claim. Unexpected-disconnect expiry/recovery remains undecided; no automatic leave/rejoin is inferred. See the [implementation contract](../context/technical-context/implementation-contract.md) for exact protocol, limits, logging and data-lifetime evidence.

Final integrated inspection: gateway/backend/frontend logs contained neither the exercised fictional marker nor observed message payloads; desktop/mobile screenshots were inspected with no horizontal overflow at 390px. Services remain running for review. See the runbook for reproducible checks and their limits.
