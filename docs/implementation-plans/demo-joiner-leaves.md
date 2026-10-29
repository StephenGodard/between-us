# Implementation plan: Leave without closing the subject

Story: [US-D-05](../user-stories/demo-joiner-leaves.md), implementation in verification  
Horizon: fictional demo, lot 2  
Status: IMPLEMENTED — physical-device verification pending  
Sources: [approved lot 2 PRD](../prds/interactive-session-mvp.md) M-R6/M-R7; [F-D-03](../features/demo-exchange-closure.md) (approved); [experience context](../context/experience-context/README.md), [design context](../context/design-context/README.md), [technical context](../context/technical-context/README.md), [constraints](../context/technical-context/constraints.md), [stack](../context/technical-context/stack.md), [ADR 0001](../adr/0001-web-demo-infrastructure.md) (approved), [engineering guidelines](../context/technical-context/guidelines/README.md).  
Date: 2026-10-25

## Outcome and boundaries

The joiner voluntarily leaves. The previous exchange disappears from both views, the opener waits with the same subject, and a new joiner enters a fresh exchange without prior messages or access for the former joiner. Any active call stops. Network loss and browser closure are not voluntary leave. No selected application exists yet.

## Implementation slices

| Order | Slice and expected boundaries | Story criteria | Dependencies | Verification |
| --- | --- | --- | --- | --- |
| 1 | Implement a joiner-only leave transition in the backend session service: revoke joiner access, retire the exchange identity, retain the opener and same subject, return it to waiting, then publish the new state. | AC-1, AC-2 | US-D-08 | NOT RUN — unauthorized leave fails; former joiner cannot send, signal or re-enter the retired exchange. |
| 2 | Add an explicit leave action for the joiner and an opener waiting transition. On the leave event, both clients clear previous messages; the departing client exits the exchange. | AC-1 | US-D-01/02; slice 1 | NOT RUN — two clients show the correct distinct states and no old messages. |
| 3 | Reopen the subject in the list and admit a new joiner to a fresh exchange, without replaying previous messages. Test against concurrent stale operations from the former joiner. | AC-2 | Slices 1–2 | NOT RUN — new joiner sees the same subject and no prior content; former joiner cannot act. |
| 4 | On leave during a live call, stop audio tracks and peer connections on both devices before the waiting state; do not close the subject. | AC-3 | US-D-03 call establishment; slices 1–3 | NOT RUN — audible call stops, both views clear, opener waits on the same subject. |

## Integrated verification

NOT RUN — voluntary leave, reopened subject, fresh join, stale-access rejection and no-history/log inspection with two LAN devices. AC-3 is NOT RUN until US-D-03 establishes a real call. Verify that ordinary hangup in US-D-03 keeps the pair active, whereas leave retires the exchange.

## Decisions and blockers

The story was updated from its earlier D-R3/D-R4 references to M-R6/M-R7, with the same intentional transition. Not provided: browser-close or unexpected-disconnect policy and exact leave copy. Those do not block deliberate leave. A-42 resolves US-D-03 call entry; all slices can proceed. Physical audio acceptance remains to verify.

## Progress and evidence

2026-10-25 implementation: Implemented joiner-only voluntary departure, both-view clearing, opener waiting on the same subject and fresh exchange identity for the next joiner. Old access is revoked. Call resources share teardown; integration tests verify stale-call and old-exchange rejection after fresh admission.

Observed backend checks: `dotnet build src/backend` passed; `dotnet test tests/backend` passed 5 tests; `dotnet format src/backend --verify-no-changes --no-restore` and the same command for `tests/backend` passed. `docker compose config --quiet` passed. Frontend typecheck, build and format check passed on Node 22.22.3. Packaged verification passed: `docker compose up -d --build` runs all three services at `https://localhost:8443`; `tests/browser/demo-smoke.cjs` passed with three isolated Chromium contexts at 390px. It verified reciprocal chat, chat-only without microphone access, decline, synthetic WebRTC connection, hangup preserving chat, simulated microphone denial, leave and close during connected calls with tracks/peer connections released, fresh join without prior messages, waiting cancellation, empty local/session storage and no page errors. HTTPS errors were bypassed for automation: this is not certificate-trust acceptance. Synthetic audio is not audible physical-device evidence. See the shared [runbook](../local-demo-runbook.md).

**NOT RUN:** physical two-phone LAN trust, microphone permission and audible two-way media. These remaining acceptance criteria prevent a completed-story claim. Unexpected-disconnect expiry/recovery remains undecided; no automatic leave/rejoin is inferred. See the [implementation contract](../context/technical-context/implementation-contract.md) for exact protocol, limits, logging and data-lifetime evidence.

Final integrated inspection: gateway/backend/frontend logs contained neither the exercised fictional marker nor observed message payloads; desktop/mobile screenshots were inspected with no horizontal overflow at 390px. Services remain running for review. See the runbook for reproducible checks and their limits.
