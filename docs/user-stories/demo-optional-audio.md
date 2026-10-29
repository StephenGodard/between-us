# User story: Choose live audio and return to chat

ID: US-D-03  
Status: READY FOR REVIEW  
Horizon: fictional demo  
Parent PRD: [interactive-session MVP](../prds/interactive-session-mvp.md) (`APPROVED`; M-R4)  
Parent features: [F-D-02](../features/demo-audio-call.md) and [F-D-03](../features/demo-exchange-closure.md) (`APPROVED`)  
Technical sources: [technical context](../context/technical-context/technical-context.md) (living); [ADR 0001](../adr/0001-web-demo-infrastructure.md) (`APPROVED`)  
Date: 2026-10-25

## User value

As either fictional participant in an active exchange, I want to choose live voice when useful and hang up back to the same written chat, so voice remains optional and the conversation can continue.

## Flow and boundaries

The pair may remain in chat for the whole exchange. An audio path, once established, lets each speak and hear the other on separate LAN devices. Either can hang up; both return to the existing chat and subject session. The opener's explicit closure during a call belongs to [US-D-04](demo-opener-closes-subject.md). The browser handles microphone permission and WebRTC media; the backend relays call setup and hangup state, not the audio stream. A-42 selects invitation by either participant, acceptance or decline by the other, and return of both to chat with explanatory feedback on microphone denial or setup failure.

## Acceptance criteria

| ID | Given / When / Then | Functional source | Verification evidence |
| --- | --- | --- | --- |
| AC-1 | Given an active exchange, when both participants stay in written chat, then they can continue and finish through the chat-only path without starting audio. | PRD M-R4; F-D-02 “Requirements and evidence” | Separate chat-only walkthrough. |
| AC-2 | Given an active exchange and a call proposed by either participant and accepted by the other (A-42), when either participant speaks, then the other hears live audio on a distinct LAN device. | PRD M-R4; F-D-02 “Requirements and evidence” | Two-phone audible call test. |
| AC-3 | Given a live call, when either participant hangs up, then audio stops on both devices and both return to the same written chat with the subject still active. | PRD M-R4; F-D-02 “Flow and boundaries”; F-D-03 “Flow and boundaries” | Two-device hangup and chat-continuity test. |
| AC-4 | Given a proposed call, when the recipient declines or either participant encounters microphone denial or setup failure, then both remain in or return to the same chat, with explanatory feedback and no active microphone tracks. | A-42 | Decline, denied-permission and setup-failure walkthrough; inspect media cleanup and chat continuity. |

## Technical constraints and dependencies

Depends on US-D-01 and US-D-02. ADR 0001 selects browser WebRTC with SignalR signaling, Compose-hosted services and a trusted HTTPS entry point. Microphone permission and actual LAN media connectivity need verification. The technical context leaves exact signaling and call state open.

## Exclusions

No recording, simulated audio substituted for a real call, public calling or emergency calling (F-D-02; PRD horizon D).

## Open decisions

The owner explicitly resolved call entry, acceptance/decline and microphone-denial/setup-failure outcomes in A-42 on 25 October 2026. Unexpected disconnect remains open; do not equate it with ordinary hangup. Two-phone execution evidence remains required.

## Review and verification record

Checked D-R2/D-R3, F-D-02/F-D-03, intake A-13, A-32 and A-36, technical context and ADR 0001. **NOT RUN:** trusted-origin, microphone, two-phone WebRTC and hangup checks; implementation is pending. Story approval: none.
