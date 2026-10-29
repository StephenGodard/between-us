# Implementation plan: Share and protect temporary subject sessions

Story: [US-D-08](../user-stories/demo-shared-session-foundation.md), READY FOR REVIEW  
Horizon: fictional demo, lot 2  
Status: IMPLEMENTED — physical-device verification pending  
Sources: [approved lot 2 PRD](../prds/interactive-session-mvp.md) M-R1, M-R2, M-R5, M-R6, M-R7; [F-D-01](../features/demo-fictional-exchange-chat.md) and [F-D-03](../features/demo-exchange-closure.md) (approved); [technical context](../context/technical-context/README.md), [constraints](../context/technical-context/constraints.md), [stack](../context/technical-context/stack.md); [ADR 0001](../adr/0001-web-demo-infrastructure.md) (approved); [engineering guidelines](../context/technical-context/guidelines/README.md).  
Date: 2026-10-25

## Outcome and boundaries

The backend owns multiple waiting subjects, atomically admits one joiner to a chosen subject, distinguishes opener and joiner without accounts, and invalidates old exchange access. This is the foundation for participant-facing journeys in US-D-01 to US-D-05. It covers intentional transitions only. No conversation archive is introduced. src/ and tests/ currently contain no application or executable tests; paths below denote proposed areas.

## Implementation slices

| Order | Slice and expected boundaries | Story criteria | Dependencies | Verification |
| --- | --- | --- | --- | --- |
| 1 | Define one typed client/backend contract for session summary, waiting/active state, temporary session and exchange identifiers, participant authority, and state events. Record issuance, transport, revocation and log redaction for unguessable per-participant capabilities; keep them out of URLs and persisted browser storage. | AC-1–AC-4 | US-D-07; ADR 0001 | NOT RUN — contract review covers every state/action and avoids message text or capabilities in logs. |
| 2 | Implement a concurrency-safe, in-memory session service in the ASP.NET Core backend: create and list subjects, atomic chosen-subject admission, two-person limit, and authoritative state snapshots. Keep state out of transient SignalR hub instances. | AC-1, AC-2 | Slice 1 | NOT RUN — concurrent join test admits exactly one; two different subjects remain distinct and the unchosen subject stays waiting. |
| 3 | Add backend authorization to every state-changing and exchange action, including opener-only cancel/close and joiner-only leave. Revoke closed and departed capabilities; advance exchange identity after a joiner leaves. SignalR groups route events but do not authorize them. | AC-3, AC-4 | Slice 2 | NOT RUN — direct unauthorized close, stale capability, third-join and cross-session action tests fail safely. |
| 4 | Publish snapshots and change events to connected clients through SignalR; expose a small typed frontend session adapter and in-memory state owner. Later UI stories consume this adapter. | AC-1, AC-3, AC-4 | Slices 2–3; US-D-07 | NOT RUN — two clients observe chosen-session activation, closure, and same-subject reopening without old exchange data. |
| 5 | Add integration coverage for the actual HTTP/SignalR contract and inspect persistence and message-bearing logs across create, join, leave and close. | AC-1–AC-4 | Slices 1–4; US-D-02 for real messages | NOT RUN — record observed restart behavior without treating it as a product rule; logs contain no message/capability payloads, and an old joiner cannot act in the new exchange. |

## Integrated verification

NOT RUN — two clients open distinct subjects, a third chooses one, two competing joiners race for one subject, an unauthorized participant attempts closure, and a departed joiner attempts to act after a fresh join. Repeat on two LAN devices after US-D-07 and US-D-01. Inspect the actual data path after US-D-02 adds messages; cleared views alone cannot prove no stored history.

## Decisions and blockers

Hypothesis: in-memory state and opaque temporary capabilities fit the fictional local demo. The developer must choose their exact representation and transport before slice 2, record validation/size limits, and check official ASP.NET Core/SignalR documentation for installed versions. Not provided: unexpected disconnect, server restart recovery and subject expiry. They prevent a complete lifecycle claim but do not block these intentional acceptance criteria; do not equate network loss with voluntary leave.

## Progress and evidence

2026-10-25 implementation: Implemented the typed contract, singleton serialized session coordinator, atomic admission, random connection-bound participant capabilities, role authorization, exchange revocation and ordered events. Five actual SignalR integration tests cover session rules and audio signaling.

Observed backend checks: `dotnet build src/backend` passed; `dotnet test tests/backend` passed 5 tests; `dotnet format src/backend --verify-no-changes --no-restore` and the same command for `tests/backend` passed. `docker compose config --quiet` passed. Frontend typecheck, build and format check passed on Node 22.22.3. Packaged verification passed: `docker compose up -d --build` runs all three services at `https://localhost:8443`; `tests/browser/demo-smoke.cjs` passed with three isolated Chromium contexts at 390px. It verified reciprocal chat, chat-only without microphone access, decline, synthetic WebRTC connection, hangup preserving chat, simulated microphone denial, leave and close during connected calls with tracks/peer connections released, fresh join without prior messages, waiting cancellation, empty local/session storage and no page errors. HTTPS errors were bypassed for automation: this is not certificate-trust acceptance. Synthetic audio is not audible physical-device evidence. See the shared [runbook](../local-demo-runbook.md).

**NOT RUN:** physical two-phone LAN trust, microphone permission and audible two-way media. These remaining acceptance criteria prevent a completed-story claim. Unexpected-disconnect expiry/recovery remains undecided; no automatic leave/rejoin is inferred. See the [implementation contract](../context/technical-context/implementation-contract.md) for exact protocol, limits, logging and data-lifetime evidence.

Final integrated inspection: gateway/backend/frontend logs contained neither the exercised fictional marker nor observed message payloads; desktop/mobile screenshots were inspected with no horizontal overflow at 390px. Services remain running for review. See the runbook for reproducible checks and their limits.
