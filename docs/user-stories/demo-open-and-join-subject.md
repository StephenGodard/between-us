# User story: Open and join a chosen subject

ID: US-D-01  
Status: READY FOR REVIEW  
Horizon: fictional demo  
Parent PRD: [interactive-session MVP](../prds/interactive-session-mvp.md) (`APPROVED`; M-R1, M-R2)  
Parent feature: [F-D-01](../features/demo-fictional-exchange-chat.md) (`APPROVED`)  
Technical sources: [technical context](../context/technical-context/technical-context.md) (living); [ADR 0001](../adr/0001-web-demo-infrastructure.md) (`APPROVED`)  
Date: 2026-10-25

## User value

As a fictional participant needing to talk, I want to enter a subject and wait; as the other fictional participant, I want to choose an open subject, so we can begin one exchange from separate devices.

## Flow and boundaries

The opener chooses the “need to talk” path, enters a subject of their choice and sees it waiting. The joiner chooses the “available to listen” path, sees open subjects and selects one. At least two different subjects must be available for a meaningful choice (A-38). Neither action happens automatically: the mini-prototype is for people to take in hand (A-37). Both then reach the same active two-person exchange. These intentions determine entry only; [US-D-02](demo-reciprocal-chat.md) gives both equal messaging ability. The website shows state supplied by the separate backend, which owns the open subject and admits one joiner. Exact labels, subject input form and waiting duration are `Not provided.`

## Acceptance criteria

| ID | Given / When / Then | Functional source | Verification evidence |
| --- | --- | --- | --- |
| AC-1 | Given the fictional demo has no open subject, when the opener chooses the entry path and enters an original subject, then that subject is available to the other participant and the opener sees a waiting state; no subject opens before their action. | PRD M-R1; F-D-01 entry refined by A-38 | Two-device hands-on walkthrough and server-state check. |
| AC-2 | Given at least two different subjects are waiting, when the second participant selects one from another LAN device, then both enter the chosen active two-person exchange and the other subject stays open; joining does not occur on its own. | PRD M-R2; F-D-01 entry refined by A-38 | Simultaneous two-device walkthrough; attempt a third join. |

## Technical constraints and dependencies

ADR 0001 selects a Nuxt frontend, separate ASP.NET Core/SignalR backend and one trusted HTTPS entry point on the owner's PC. The backend owns membership and rejects a third join; the frontend renders its state. Exact admission protocol, capabilities, routing and trusted phone access remain implementation work. This story precedes US-D-02 to US-D-05.

## Exclusions

No public matching, real support seekers, permanent profiles or automatic recommendation. Grief is an optional fictional example, not a fixed application subject (A-38).

## Open decisions

`Not provided.`: exact subject input and display, waiting expiry, empty-list treatment and unexpected disconnect. These do not prevent testing the deliberate create/list/join path; a complete lifecycle still needs interruption rules.

## Review and verification record

Checked D-R1, F-D-01, intake A-26 and A-30 to A-35 plus A-37, technical context and ADR 0001. **NOT RUN:** LAN device journey, third-join enforcement and trusted-origin checks; implementation is pending. Story approval: none.
