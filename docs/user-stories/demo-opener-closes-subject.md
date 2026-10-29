# User story: Cancel or close my fictional subject

ID: US-D-04  
Status: IMPLEMENTED — physical-device acceptance pending  
Horizon: fictional demo  
Parent PRD: [interactive-session MVP](../prds/interactive-session-mvp.md) (`APPROVED`; M-R5, M-R7)  
Parent feature: [F-D-03](../features/demo-exchange-closure.md) (`APPROVED`)  
Technical sources: [technical context](../context/technical-context/technical-context.md) (living); [ADR 0001](../adr/0001-web-demo-infrastructure.md) (`APPROVED`)  
Date: 2026-10-25

## User value

As the fictional subject opener, I want to cancel while waiting or intentionally close the active exchange, so the subject ends under my control and neither participant can resume that exchange.

## Flow and boundaries

From waiting, the opener cancels and the subject disappears from the open view. From active chat or optional audio, the opener explicitly ends the subject session. The backend verifies opener authority, closes the subject and current exchange, and informs both browsers. Both clear messages and any call media; the former exchange cannot be resumed. A joiner has no subject-close authority; their voluntary exit belongs to [US-D-05](demo-joiner-leaves.md). Participant-visible clearing does not establish universal technical erasure.

## Acceptance criteria

| ID | Given / When / Then | Functional source | Verification evidence |
| --- | --- | --- | --- |
| AC-1 | Given the opener is waiting and nobody has joined, when the opener cancels, then the subject closes and is absent from the open-subject view. | PRD M-R5; F-D-03 “Flow and boundaries” | Two-client waiting/cancel walkthrough. |
| AC-2 | Given an active written exchange, when the opener explicitly ends it, then both participant views clear, the subject closes and neither client can resume the former exchange. | PRD M-R5; F-D-03 “Requirements and evidence” | Two-device close and resumption attempt. |
| AC-3 | Given an active audio call, when the opener explicitly ends the exchange, then audio stops, both views clear, the subject closes and the exchange cannot resume. | PRD M-R5; F-D-03 “Requirements and evidence” | Two-device call-end and resumption attempt. |
| AC-4 | Given the subject is active and the joiner attempts a subject-close action, when the backend evaluates it, then the subject remains under opener control. | PRD M-R5; F-D-03 “Flow and boundaries”; A-35/A-36 | Backend authorization check. |

## Technical constraints and dependencies

Waiting cancellation depends on US-D-01; chat closure depends on US-D-02; call closure additionally depends on US-D-03. ADR 0001 makes the backend authoritative and requires opener-only enforcement, session release and revoked access. Exact capability format is implementation work. D-R4 requires an integrated post-closure storage/log inspection with US-D-02.

## Exclusions

No administrator archive, real-service retention policy, universal deletion claim or emergency action (F-D-03; PRD horizon D).

## Open decisions

`Not provided.`: unexpected disconnect and exact capability transport. These do not block the waiting and chat actions. A-42 resolves call setup and acceptance. AC-3 still needs observed two-device audio verification.

## Review and verification record

Checked D-R3/D-R4, F-D-03, intake A-5, A-10, A-12 and A-35/A-36, technical context and ADR 0001. **NOT RUN:** two-device closure, resumption, authorization, audio teardown or storage/log inspection; implementation is pending. Story approval: none.

Implementation evidence is recorded in the matching [implementation plan](../implementation-plans/demo-opener-closes-subject.md). This changes implementation progress only; no new artifact approval or physical-device acceptance is claimed.
