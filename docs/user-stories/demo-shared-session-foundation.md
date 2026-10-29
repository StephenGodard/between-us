# User story: Share and protect temporary subject sessions

ID: US-D-08  
Status: READY FOR REVIEW  
Horizon: fictional demo  
Parent PRD: [interactive-session MVP](../prds/interactive-session-mvp.md) (`APPROVED`; M-R1, M-R2, M-R5, M-R6 and M-R7)  
Parent feature: [F-D-01](../features/demo-fictional-exchange-chat.md) (`APPROVED`; opening/joining); [F-D-03](../features/demo-exchange-closure.md) (`APPROVED`; intentional lifecycle)  
Technical sources: [technical context](../context/technical-context/technical-context.md) (living); [ADR 0001](../adr/0001-web-demo-infrastructure.md) (`APPROVED`)  
Date: 2026-10-25

## User value

As two fictional participants, we want to see the same available subjects and enter only the subject we choose, so our exchange starts in one shared, temporary session and remains under our own controls.

## Flow and boundaries

An opener enters a subject; the backend holds it as waiting and publishes it to other clients. A joiner chooses one among available subjects; the backend admits one joiner to that subject and marks it active for both clients. The backend, rather than either browser, owns session availability, membership and intentional transitions. It distinguishes temporary opener and joiner authority without accounts. Opener cancellation or closure, voluntary joiner departure, and audio hangup remain distinct transitions in US-D-04, US-D-05 and US-D-03. This foundation defines shared state and authorization that those user outcomes depend on; it does not prescribe API routes, event names or capability format.

## Acceptance criteria

| ID | Given / When / Then | Functional source | Verification evidence |
| --- | --- | --- | --- |
| AC-1 | Given two different subjects have been opened from client devices, when another client views open sessions, then it sees both subjects; when it selects one, it joins that chosen session and the other remains waiting. | PRD M-R1/M-R2; F-D-01 “Flow and boundaries” as refined by A-38 | Two-client state walkthrough and backend state inspection. |
| AC-2 | Given one subject is waiting, when two clients attempt to join it at the same time, then at most one becomes its joiner and the other does not enter that active exchange. | PRD M-R2; F-D-01 two-party boundary | Concurrent admission check against authoritative backend state. |
| AC-3 | Given an active subject, when someone other than its opener attempts to cancel or close that subject, then the backend refuses the action; when its opener closes it, neither participant can resume that exchange. | PRD M-R5; F-D-03 “Flow and boundaries” | Direct backend authorization check plus two-client closure check in US-D-04. |
| AC-4 | Given a joiner has voluntarily left, when a new joiner chooses the same reopened subject, then the new exchange contains none of the prior exchange's messages and the former joiner cannot act in it. | PRD M-R6/M-R7; F-D-03 “Flow and boundaries” | Rejoin and former-access checks in US-D-05; integrated memory/log inspection. |

## Technical constraints and dependencies

Depends on US-D-07's reachable frontend and backend. ADR 0001 makes the backend authoritative for one opener, at most one current joiner and the session lifecycle. It selects SignalR for session events and separate unguessable, short-lived participant capabilities as the account-free authorization direction; SignalR group membership alone is insufficient authorization. The implementation plan must specify capability issuance, transport, revocation and log treatment, plus atomic admission. Active conversation content has no persistent history under M-R7; verify the integrated data path rather than inferring this from cleared screens. This story is a prerequisite for US-D-01, US-D-02, US-D-04 and US-D-05; audio signaling later uses the same active pair in US-D-03.

## Exclusions

No automatic subject matching, fixed grief-only subject, third participant in an active exchange, accounts, public service, retained history or administrator archive (PRD “Out of scope”). Unexpected browser or network disconnection is outside these intentional transitions until the product rule is decided.

## Open decisions

`Not provided.`: unexpected disconnection, server restart and subject expiry policy. They block a claim that the entire lifecycle is settled, but not these intentional-state acceptance checks. **Hypothesis:** temporary server memory can hold the demo sessions; inspect restart and logging behaviour before asserting no stored conversation history. Exact session identifiers, capability representation and realtime event contract remain implementation design under ADR 0001.

## Review and verification record

Checked PRD M-R1/M-R2/M-R5/M-R6/M-R7, F-D-01/F-D-03, technical context and approved ADR 0001. **NOT RUN:** shared-state, concurrent admission, authorization, rejoin, storage and logging checks; implementation is pending. Story approval: none.
