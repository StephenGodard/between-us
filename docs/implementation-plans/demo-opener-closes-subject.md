# Implementation plan: Cancel or close my subject

Story: [US-D-04](../user-stories/demo-opener-closes-subject.md), implementation in verification  
Horizon: fictional demo, lot 2  
Status: IMPLEMENTED — physical-device verification pending  
Sources: [approved lot 2 PRD](../prds/interactive-session-mvp.md) M-R5/M-R7; [F-D-03](../features/demo-exchange-closure.md) (approved); [experience context](../context/experience-context/README.md), [design context](../context/design-context/README.md), [technical context](../context/technical-context/README.md), [constraints](../context/technical-context/constraints.md), [stack](../context/technical-context/stack.md), [ADR 0001](../adr/0001-web-demo-infrastructure.md) (approved), [engineering guidelines](../context/technical-context/guidelines/README.md).  
Date: 2026-10-25

## Outcome and boundaries

The opener cancels a waiting subject or ends an active one from chat or call. The backend closes it, revokes access and notifies both clients. Both participant views clear the current exchange; any audio ends. The joiner cannot close a subject. Clearing views is distinct from a universal erasure claim. src/ and tests/ have no selected implementation yet.

## Implementation slices

| Order | Slice and expected boundaries | Story criteria | Dependencies | Verification |
| --- | --- | --- | --- | --- |
| 1 | Implement backend cancel/close transitions in the shared session service and contract, with opener capability checks, idempotent closed-state response, removal from open list and revocation of current exchange access. | AC-1, AC-2, AC-4 | US-D-08 | NOT RUN — waiting cancel and active close succeed for opener; joiner/stale/third-party attempts fail and cannot resume. |
| 2 | Add an explicit opener-only cancel action in waiting and close action in chat. Drive both views from the server closure event; clear in-memory messages and show a clear ended state. | AC-1, AC-2 | US-D-01/02; slice 1 | NOT RUN — both independent clients clear and old links or capabilities cannot restore the exchange. |
| 3 | Wire the same close transition into the call state and stop microphone tracks and peer connections on both clients. | AC-3 | US-D-03 call establishment; slices 1–2 | NOT RUN — from an audible call, opener closes; both devices stop audio, clear messages and cannot resume. |
| 4 | Inspect active-state disposal and backend/proxy/browser logs after each close path. | AC-1–AC-3 | Slices 1–3; US-D-02 message relay | NOT RUN — no conversation history store or message-bearing logs remain. |

## Integrated verification

NOT RUN — waiting cancellation, chat closure, rejected joiner closure and old-session resumption attempts on two independent clients, then two LAN devices. AC-3 remains NOT RUN until US-D-03's call flow is resolved and implemented. Repeat storage/log inspection with actual messages and an active call.

## Decisions and blockers

The story was updated from its earlier D-R3/D-R4 references to approved M-R5/M-R7; the intentional outcome remains aligned. Not provided: unexpected disconnect and exact closure copy. They do not block explicit close/cancel. A-42 resolves US-D-03 call entry; all slices can proceed. Physical audio acceptance remains to verify.

## Progress and evidence

2026-10-25 implementation: Implemented waiting cancel and active close with server-enforced opener authority, idempotent close retry, session disposal and both-view cleanup. Call resources share the same client teardown path. Integration tests reject unauthorized/stale actions and old-session resumption, including after a call invitation.

Observed backend checks: `dotnet build src/backend` passed; `dotnet test tests/backend` passed 5 tests; `dotnet format src/backend --verify-no-changes --no-restore` and the same command for `tests/backend` passed. `docker compose config --quiet` passed. Frontend typecheck, build and format check passed on Node 22.22.3. Packaged verification passed: `docker compose up -d --build` runs all three services at `https://localhost:8443`; `tests/browser/demo-smoke.cjs` passed with three isolated Chromium contexts at 390px. It verified reciprocal chat, chat-only without microphone access, decline, synthetic WebRTC connection, hangup preserving chat, simulated microphone denial, leave and close during connected calls with tracks/peer connections released, fresh join without prior messages, waiting cancellation, empty local/session storage and no page errors. HTTPS errors were bypassed for automation: this is not certificate-trust acceptance. Synthetic audio is not audible physical-device evidence. See the shared [runbook](../local-demo-runbook.md).

**NOT RUN:** physical two-phone LAN trust, microphone permission and audible two-way media. These remaining acceptance criteria prevent a completed-story claim. Unexpected-disconnect expiry/recovery remains undecided; no automatic leave/rejoin is inferred. See the [implementation contract](../context/technical-context/implementation-contract.md) for exact protocol, limits, logging and data-lifetime evidence.

Final integrated inspection: gateway/backend/frontend logs contained neither the exercised fictional marker nor observed message payloads; desktop/mobile screenshots were inspected with no horizontal overflow at 390px. Services remain running for review. See the runbook for reproducible checks and their limits.
