# User story: Hold a reciprocal fictional chat

ID: US-D-02  
Status: READY FOR REVIEW  
Horizon: fictional demo  
Parent PRD: [interactive-session MVP](../prds/interactive-session-mvp.md) (`APPROVED`; M-R3, M-R7)  
Parent feature: [F-D-01](../features/demo-fictional-exchange-chat.md) (`APPROVED`)  
Technical sources: [technical context](../context/technical-context/technical-context.md) (living); [ADR 0001](../adr/0001-web-demo-infrastructure.md) (`APPROVED`)  
Date: 2026-10-25

## User value

As either fictional participant in the joined exchange, I want to send and receive messages freely, so the demo shows a genuine two-way conversation rather than fixed “speaker” and “listener” turns.

## Flow and boundaries

After US-D-01 joins both clients, each person can compose, send, receive and respond over multiple turns. Participants write fictional content of their choice; a grief example may guide the video, but does not constrain application chat. No message is automatically sent and the exchange does not play itself (A-37). The browser presents current messages, and the separate backend relays them only within the active exchange. The demo has no stored conversation history. How sample content appears and the exact grief script are `Not provided.`

## Acceptance criteria

| ID | Given / When / Then | Functional source | Verification evidence |
| --- | --- | --- | --- |
| AC-1 | Given two fictional participants have joined from distinct LAN devices, when each chooses to send at least two messages in turn, then each sees the other's messages in the same active exchange, neither entry intention prevents writing or replying, and no message is sent automatically. | PRD M-R3; F-D-01 “Requirements and evidence”; A-28, A-37 | Two-device hands-on walkthrough with contributions from both. |
| AC-2 | Given the demonstrated exchange uses fictional participants, when its content and integrated message path are reviewed, then no persistent conversation-history store or message-bearing logs are present. | PRD M-R7; F-D-01 “Requirements and evidence” | Content review plus storage and message-bearing-log inspection. |

## Technical constraints and dependencies

Depends on US-D-01. ADR 0001 selects SignalR for chat delivery and a backend authoritative for membership. The technical context proposes browser-held visible messages and transient backend relay; exact payloads and log controls remain to design. D-R4 is also checked after US-D-04 and US-D-05 transitions.

## Exclusions

No real participants, public matching, conversation archive, moderation or claim of emotional benefit (PRD horizon D; F-D-01).

## Open decisions

`Not provided.`: message format and size and unexpected disconnect effect. **Hypothesis:** keeping only the active view in browser memory, subject to integrated inspection. These do not block the reciprocal messaging outcome.

## Review and verification record

Checked D-R1/D-R4, F-D-01, intake A-8, A-12, A-26, A-28 and A-37, technical context and ADR 0001. **NOT RUN:** two-device chat or storage/log inspection; implementation is pending. Story approval: none.
