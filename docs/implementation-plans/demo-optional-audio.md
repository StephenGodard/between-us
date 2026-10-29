# Implementation plan: Choose live audio and return to chat

Story: [US-D-03](../user-stories/demo-optional-audio.md), READY FOR REVIEW  
Horizon: fictional demo, lot 2  
Status: IMPLEMENTED — physical-device verification pending  
Sources: [approved lot 2 PRD](../prds/interactive-session-mvp.md) M-R4; [F-D-02](../features/demo-audio-call.md), [F-D-03](../features/demo-exchange-closure.md) (approved); [experience context](../context/experience-context/README.md), [design context](../context/design-context/README.md), [technical context](../context/technical-context/README.md), [constraints](../context/technical-context/constraints.md), [stack](../context/technical-context/stack.md), [ADR 0001](../adr/0001-web-demo-infrastructure.md) (approved), [engineering guidelines](../context/technical-context/guidelines/README.md).  
Date: 2026-10-25

## Outcome and boundaries

The pair can remain in chat or establish a live two-way WebRTC audio call on separate phones. Either hangs up to the same active written exchange. SignalR relays signaling, not audio. A-42 selects either-participant invitation, recipient acceptance or decline, and return to chat with explanatory feedback on microphone denial or setup failure.

## Implementation slices

| Order | Slice and expected boundaries | Story criteria | Dependencies | Verification |
| --- | --- | --- | --- | --- |
| 1 | Preserve the chat-only route with no microphone request when neither person chooses voice. | AC-1 | US-D-02 | NOT RUN — complete a separate text-only exchange and closure. |
| 2 | Following A-42, define the two-sided call states and typed invitation/acceptance/decline/failure/signaling contract; authorize each event for the current exchange only. | AC-2 | A-42; US-D-08 | NOT RUN — contract/state review and unauthorized/stale signaling tests. |
| 3 | Add client-only microphone and RTCPeerConnection control, with resource cleanup on denial, setup failure, hangup, leave or subject closure; use the trusted phone origin from US-D-07. | AC-2, AC-3 | Slice 2; US-D-07; US-D-01/02 | NOT RUN — both phones grant permission, hear each other's live voice, and denied permission releases tracks/state. |
| 4 | Relay SDP/ICE through the backend and implement either-side hangup as audio-only state change, retaining the same subject and written messages. Avoid payload-bearing logs. | AC-2, AC-3 | Slices 2–3; US-D-08 | NOT RUN — hang up from each side, confirm both stop audio and continue typing in the same exchange. |

## Integrated verification

NOT RUN — chat-only completion; secure-origin and permission checks on each phone; audible two-way call; each-side hangup; resumed chat; failure/denial; opener closure and joiner exit during a call after US-D-04/05. Inspect tracks, peer connection and logs. A same-PC browser test does not prove phone media connectivity.

## Decisions and blockers

Resolved by explicit owner decision A-42 on 25 October 2026: either participant may propose, the other accepts or declines, and microphone denial or setup failure returns both to chat with explanatory feedback. Exercise these failure paths for story AC-4. Unexpected network loss is separately Not provided; do not treat it as voluntary hangup. Hypothesis: direct LAN peer connectivity may work; verify before choosing any relay mechanism.

## Progress and evidence

2026-10-25 implementation: Implemented A-42 invitations from either role, recipient acceptance/decline, real browser WebRTC and microphone access, hangup preserving chat, permission/setup-failure return to chat and resource cleanup. The server validates call identity, roles and signaling scope. Integration tests cover invitation races, unauthorized acceptance, signaling before acceptance, decline/failure/hangup and stale call rejection.

Observed backend checks: `dotnet build src/backend` passed; `dotnet test tests/backend` passed 5 tests; `dotnet format src/backend --verify-no-changes --no-restore` and the same command for `tests/backend` passed. `docker compose config --quiet` passed. Frontend typecheck, build and format check passed on Node 22.22.3. Packaged verification passed: `docker compose up -d --build` runs all three services at `https://localhost:8443`; `tests/browser/demo-smoke.cjs` passed with three isolated Chromium contexts at 390px. It verified reciprocal chat, chat-only without microphone access, decline, synthetic WebRTC connection, hangup preserving chat, simulated microphone denial, leave and close during connected calls with tracks/peer connections released, fresh join without prior messages, waiting cancellation, empty local/session storage and no page errors. HTTPS errors were bypassed for automation: this is not certificate-trust acceptance. Synthetic audio is not audible physical-device evidence. See the shared [runbook](../local-demo-runbook.md).

**NOT RUN:** physical two-phone LAN trust, microphone permission and audible two-way media. These remaining acceptance criteria prevent a completed-story claim. Unexpected-disconnect expiry/recovery remains undecided; no automatic leave/rejoin is inferred. See the [implementation contract](../context/technical-context/implementation-contract.md) for exact protocol, limits, logging and data-lifetime evidence.

Final integrated inspection: gateway/backend/frontend logs contained neither the exercised fictional marker nor observed message payloads; desktop/mobile screenshots were inspected with no horizontal overflow at 390px. Services remain running for review. See the runbook for reproducible checks and their limits.
