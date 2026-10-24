# Feature: Optional real two-way audio call

ID: F-D-02  
Status: READY FOR REVIEW  
Horizon: fictional demo  
Parent PRD: [Entre nous — initial product PRD](../prds/entre-nous-initial.md) (`READY FOR REVIEW` revision; D-R2)  
Date: 2026-10-24

## Outcome and actors

The same two fictional participants can choose to speak and hear one another through a real local audio call while their demonstrated exchange is active (A-10, A-13, A-22, A-23, A-32; BR-11). Voice is optional for the participants: the exchange may remain written chat until it ends. This specifies inventory F-04 for the demo, independently of chat content.

## Flow and boundaries

After both participants have entered the exchange in [F-D-01](demo-fictional-exchange-chat.md), they may continue writing without a call or choose to start an audio call from separate devices on one LAN. In the call path, each hears the other's live voice. Ending the call triggers the participant-visible closure specified by [F-D-03](demo-exchange-closure.md); a chat-only exchange has its own end action. The call initiation and acceptance controls, permission handling, reconnection and disconnect response are `Not provided.` at product level; they require a coherent scoped flow before build readiness.

## Requirements and evidence

| PRD requirement | Feature behaviour | Source state | Acceptance evidence |
| --- | --- | --- | --- |
| D-R2 | During an active exchange, the two fictional participants may choose a real two-way audio call from distinct LAN devices; neither must call to complete an exchange. | Confirmed demo capability and later optionality (A-10, A-13, A-22, A-23, A-32; BR-11). Call mechanics: `Not provided.` | Hands-on call path: each participant speaks and the other audibly hears them. Separate chat-only path: the exchange can finish without invoking voice. |

## Exclusions and dependencies

Requires the two-party exchange in F-D-01 and two-device browser access. F-D-03 defines the effect of ending the call. The [infrastructure ADR](../adr/0001-web-demo-infrastructure.md) remains `PROPOSED`; it does not select the audio implementation here. Secure browser access, permission flow and actual LAN connectivity require technical verification.

Excluded: a simulated recording in place of live audio, calls with real support seekers, a public calling service, recordings, and emergency calling. The scripted video remains D-R5 outside this application feature.

## Open decisions and source reconciliation

A-13 explicitly confirms a **real audio-call capability** in a two-person local demo. A-32 clarifies that people may want only written chat, so an individual exchange need not use voice. A-10 ties the end of a call to “tout s'efface”; F-D-03 also defines the chat-only end. Exact call entry and unexpected-disconnect behaviour are `Not provided.` The technical context identifies secure-origin and network constraints, but they are verification concerns rather than settled product choices.

## Review record

Checked the parent PRD, discovery, BA brief, cited intake A-10, A-13, A-22 and A-23, and current technical context on 24 October 2026. **NOT RUN:** actual two-device audio and secure-origin checks; the selected implementation is not present. Feature approval: `Not provided.` The owner's approval of the parent PRD does not approve this feature.
