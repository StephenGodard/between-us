# User story: Leave without closing the subject

ID: US-D-05  
Status: IMPLEMENTED — physical-device acceptance pending  
Horizon: fictional demo  
Parent PRD: [interactive-session MVP](../prds/interactive-session-mvp.md) (`APPROVED`; M-R6, M-R7)  
Parent feature: [F-D-03](../features/demo-exchange-closure.md) (`APPROVED`)  
Technical sources: [technical context](../context/technical-context/technical-context.md) (living); [ADR 0001](../adr/0001-web-demo-infrastructure.md) (`APPROVED`)  
Date: 2026-10-25

## User value

As the fictional joiner, I want to leave my current exchange without closing its subject, so the opener can wait for someone else while our previous conversation disappears from both views.

## Flow and boundaries

During an active exchange, the joiner voluntarily quits. The backend removes their membership and former exchange, retains the same subject for its opener and publishes it as waiting again. Both browsers clear the previous messages; a new joiner starts a fresh exchange and receives no earlier messages. If audio is active, the departure also stops its media. This is distinct from ordinary hangup in US-D-03 and subject closure in US-D-04.

## Acceptance criteria

| ID | Given / When / Then | Functional source | Verification evidence |
| --- | --- | --- | --- |
| AC-1 | Given an active written exchange, when the joiner voluntarily quits, then both participant views clear the former messages, the opener sees the same subject waiting, and that subject becomes available to join again. | PRD M-R6; F-D-03 “Flow and boundaries” | Two-device departure walkthrough. |
| AC-2 | Given the subject has returned to waiting after a joiner exit, when another fictional participant joins it, then a fresh two-person exchange opens without messages from the previous exchange and the former joiner cannot resume it. | PRD M-R6; F-D-03 “Requirements and evidence” | Rejoin and old-access attempt. |
| AC-3 | Given an active audio call, when the joiner voluntarily quits, then audio stops, both views clear the former exchange and the opener returns to waiting on the same subject. | PRD M-R6; F-D-03 “Flow and boundaries” | Two-device call departure check. |

## Technical constraints and dependencies

Depends on US-D-01 and US-D-02; AC-3 also depends on US-D-03. ADR 0001 requires the backend to release the previous exchange, invalidate the former joiner's access and prevent old messages reaching a new joiner. D-R4 is checked through integrated data-path and log inspection after departure.

## Exclusions

No joiner authority to close the subject, resumption of the former exchange, real participant matching or administrator archive (F-D-03; PRD horizon D).

## Open decisions

`Not provided.`: unexpected disconnect and browser-close policy. This story covers **voluntary** quit only. Exact rejoin capability mechanics remain implementation design. A-42 resolves call setup and acceptance. AC-3 still needs observed two-device audio verification.

## Review and verification record

Checked D-R3/D-R4, F-D-03, intake A-35/A-36, technical context and ADR 0001. **NOT RUN:** two-device departure, fresh rejoin, access-revocation, audio teardown or storage/log checks; implementation is pending. Story approval: none.

Implementation evidence is recorded in the matching [implementation plan](../implementation-plans/demo-joiner-leaves.md). This changes implementation progress only; no new artifact approval or physical-device acceptance is claimed.
