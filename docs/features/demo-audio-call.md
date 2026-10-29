# Feature: Optional real two-way audio call

ID: F-D-02  
Status: APPROVED
Horizon: fictional demo  
Parent PRD: [Entre nous — initial product PRD](../prds/entre-nous-initial.md) (`APPROVED`; D-R2)
Date: 2026-10-24

## Outcome and actors

The same two fictional participants can choose to speak and hear one another through a real local audio call while their demonstrated exchange is active (A-10, A-13, A-22, A-23, A-32; BR-11). Voice is optional for the participants: the exchange may remain written chat until it ends. This specifies inventory F-04 for the demo, independently of chat content.

## Flow and boundaries

After both participants have entered the exchange in [F-D-01](demo-fictional-exchange-chat.md), they may continue writing without a call or choose to start an audio call from separate devices on one LAN. In the call path, each hears the other's live voice. Either can hang up, stopping audio and returning both to the same written chat without ending the subject session (A-36). The subject opener can explicitly end the exchange from the call state as specified by [F-D-03](demo-exchange-closure.md). Call initiation and acceptance controls, permission handling, reconnection and unexpected disconnect response still need a coherent scoped flow before build readiness.

## Requirements and evidence

| PRD requirement | Feature behaviour | Source state | Acceptance evidence |
| --- | --- | --- | --- |
| D-R2 | During an active exchange, the two fictional participants may choose a real two-way audio call from distinct LAN devices; neither must call to complete an exchange. Either may hang up and return both to chat. | Confirmed demo capability, optionality and ordinary hangup (A-10, A-13, A-22, A-23, A-32, A-36; BR-11). Call setup mechanics: `Not provided.` | Hands-on call path: each participant speaks and the other audibly hears them, then hangs up and verifies both return to chat with the same exchange. Separate chat-only path: the exchange can finish without invoking voice. |

## Exclusions and dependencies

Requires the two-party exchange in F-D-01 and two-device browser access. F-D-03 defines the effect of the opener explicitly ending the exchange from a call; ordinary hangup returns to chat (A-36). The [approved infrastructure ADR](../adr/0001-web-demo-infrastructure.md) selects browser WebRTC as the audio direction. Secure browser access, permission flow and actual LAN connectivity require implementation and verification.

Excluded: a simulated recording in place of live audio, calls with real support seekers, a public calling service, recordings, and emergency calling. The scripted video remains D-R5 outside this application feature.

## Open decisions and source reconciliation

A-13 explicitly confirms a **real audio-call capability** in a two-person local demo. A-32 clarifies that people may want only written chat, so an individual exchange need not use voice. A-10 ties the end of a call to “tout s'efface”; A-35 later assigns intentional session closure to the opener, and A-36 selects ordinary hangup back to chat. Exact call entry and unexpected-disconnect behaviour are still open. The technical context identifies secure-origin and network constraints, but they are verification concerns rather than settled product choices.

## Derived user stories

- [US-D-07 — Access the local demo from two devices](../user-stories/demo-local-two-service-access.md) covers the trusted phone-origin prerequisite, not the live call outcome.
- [US-D-03 — Choose live audio and return to chat](../user-stories/demo-optional-audio.md) covers the optional call and ordinary hangup; its entry/acceptance flow remains blocked.

## Review record

Checked the parent PRD, discovery, BA brief, cited intake A-10, A-13, A-22 and A-23, and current technical context on 24 October 2026. **NOT RUN:** actual two-device audio and secure-origin checks; the selected implementation is not present. **Approval:** the owner explicitly approved the demo features in the current conversation on 25 October 2026. This does not establish implementation readiness.
