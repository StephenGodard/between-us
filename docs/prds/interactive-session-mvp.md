# Entre nous — interactive session MVP, lot 2

Type: Scoped delivery PRD  
Status: APPROVED — owner accepted this PRD on 25 October 2026 (A-40)  
Date: 2026-10-25  
Source discovery: [Product Discovery](../context/product-context/discovery/entre-nous-product-discovery.md), especially “Functional needs” and “Hackathon journey and MVP”; its single-grief application example is refined by A-38.  
Source BA brief: [Business brief](../context/product-context/briefs/espaces-ecoute-ephemeres.md), BR-1, BR-2, BR-6, BR-7 and BR-11; its scripted-message candidate checks are refined by A-37 and A-38.  
Additional evidence: [Intake](../context/product-context/intake/espaces-ecoute-ephemeres.md), A-8 to A-13, A-22 to A-23, A-28, A-30 to A-41; [event summary](../context/hackathon-kickoff.md) for the separate video.  
Build readiness: Intentional session and call paths may be implemented. A-42 resolves call entry/acceptance and permission failure; unexpected disconnection remains undecided and integrated checks require execution.

## Goal and delivery boundary

Deliver **lot 2**, a locally testable **interactive web micro-application** in which people operating two client devices create and join server-held conversation sessions by subject, then exchange messages, optionally use live audio, and end the exchange. The user chooses each action and writes each message; the application does not play a scripted conversation (A-37, A-38). This is a functional hackathon MVP exercised with fictional participation, not a public service for people seeking support (A-8, A-10, A-12). It follows the rapid [lot 1 video](build-in-public-video-lot-1.md) (A-39); the exact interval is Not provided.

The scripted, chat-centered two-minute pitch video is the **separate lot 1 deliverable**, also inventoried by the [initial PRD](entre-nous-initial.md), D-R5 (A-9, A-39, A-41 and the hackathon event constraint). The optional real audio call remains in this lot 2 application (A-13, A-41).

## People and journey

1. A person using client A chooses to open a conversation, enters a subject they want to discuss, and sees their server-held session waiting for someone to join (A-31 to A-33, A-38).
2. A person using client B sees open sessions and their subjects, chooses the one that interests them, and joins that session (A-31, A-32, A-38). The list must permit a meaningful choice between different subjects; no relevance algorithm or automatic assignment is requested.
3. Both people can write, send, receive and answer messages without a prescribed turn order (A-28, A-37). They may choose live audio or stay in chat (A-13, A-32).
4. The opener can cancel while waiting or intentionally end an active session; the joiner can leave without closing the subject. The latter clears the old exchange and returns the opener's subject to waiting. Ordinary audio hangup returns both to chat (A-35, A-36).

The entry intentions orient the experience; they do not restrict either participant's ability to converse (A-28, A-32).

## Scope

### In scope

- User-entered conversation subjects and multiple open sessions that another client can inspect and choose among.
- Server-held waiting and active session states, shared across two devices on one LAN (A-22, A-23, A-33 to A-35).
- Live reciprocal text chat and an optional real two-way audio-call capability (A-13, A-28, A-32).
- Intentional cancellation, departure, hangup and closure transitions described below (A-35, A-36).
- Fictional local use with no stored conversation history (A-8, A-12); no automatic messages or scripted in-app sequence (A-37, A-38).

### Out of scope

- A scripted application journey, fixed grief-only subject, prewritten messages sent on behalf of participants, or simulated audio. Grief may be entered by a demonstrator but is not hard-coded as the only choice (A-13, A-26, A-37, A-38).
- Public real-person deployment, accounts, permanent profiles, matching by lived experience, administrator archives, operational moderation, emergency response and benefit claims (A-8, A-10 to A-12). These remain later-service questions.
- Video production within this application PRD; it is [lot 1](build-in-public-video-lot-1.md).

## Requirements

| ID | Actor and observable requirement | Source BR | Discovery / intake evidence | Acceptance evidence |
| --- | --- | --- | --- | --- |
| M-R1 | An opener enters a subject and opens a waiting session held by the server; they can see that it is waiting. | BR-1 (initially later-service behaviour); BR-6 covers the fictional demo | Discovery “Choose a subject”; A-31 to A-34, A-38 | From client A, enter an original subject and verify a waiting session exists on the server and appears to client B. |
| M-R2 | A prospective joiner sees open sessions with their subjects and chooses one. The server admits that joiner to the chosen session, shared with its opener. | BR-2, BR-5 (subject choice was proposed for later service), BR-6 | Discovery “Choose a subject”; A-31 to A-33, A-38 | Open at least two different subjects, select one on client B, and verify B joins the selected session while the other stays open. |
| M-R3 | In an active session, each participant can write, send, receive and respond to live messages; neither is limited by the entry intention or a scripted turn order. | BR-2, BR-6, BR-11 | Discovery “Begin, continue and end”; A-12, A-13, A-28, A-37, A-38 | On two devices, each types and sends at least two original messages and receives the other's messages; no message is sent automatically. |
| M-R4 | The same pair may start a real, optional two-way audio call; either can hang up and both return to the same written session. A chat-only session remains valid. | BR-11 | Discovery “Begin, continue and end”; A-13, A-22, A-23, A-32, A-36 | Hear both live voices on two LAN devices; hang up and continue writing. Complete a separate chat-only run. |
| M-R5 | The opener can cancel a waiting subject or explicitly close an active session from chat or call. Closure removes that session from the open list, clears its exchange from both participant views and prevents resumption. | BR-7, BR-11; BR-4's archive clause applies only to later real use | Discovery “Begin, continue and end”; A-5, A-12, A-35 | Test waiting cancellation, chat closure and call closure on both clients; attempting the old session again does not restore messages or contact. |
| M-R6 | A joiner can leave an active exchange; its messages clear for both, while the same subject returns to waiting for its opener. A later joiner begins a fresh exchange. | BR-2, BR-7 | Discovery “Begin, continue and end”; A-35, A-36 | B leaves; A sees waiting with the subject; a new client joins and sees none of the prior exchange. |
| M-R7 | The local application runs as a user-facing web client and separate backend service reachable by two devices on one LAN. It does not keep a persistent conversation history. | BR-6, BR-7; no dedicated BR for service separation | Discovery “Hackathon journey and MVP”; A-12, A-19, A-22, A-23, A-33 to A-35 | Open the client from two LAN devices; inspect the backend session path and persistence/logging before asserting that conversations are not stored. |

M-R2's multiple-subject check is the minimum observable way to verify A-38's request to choose a session **based on subject**. It does not set capacity, ranking, search, or automated matching policy.

## Nonfunctional and content needs

- The demo runs locally on the owner's PC with the clients reachable from two phones on the same LAN (A-22, A-23, A-35). A PC-based Docker check is part of the planned test sequence, not evidence that it works yet.
- A separate user-facing web client and backend service were specified in A-34; [ADR 0001](../adr/0001-web-demo-infrastructure.md) records the approved technical direction. This PRD does not choose implementation details.
- The application's participants and content remain fictional in this hackathon setting (A-8, A-10, A-12). The user writes messages during the test; sample text may inform a demonstrator but is not auto-played (A-37, A-38).
- No target for session capacity, response time, availability, subject length, identity display or reconnect duration has been provided. **Not provided.**

## Dependencies and open decisions

| Decision or dependency | State and effect |
| --- | --- |
| Call invitation, acceptance and microphone-permission flow | Resolved by A-42: either participant proposes, the other accepts or declines, and microphone denial or setup failure returns both to chat with an explanation. |
| Unexpected browser/network disconnect and server restart | **Not provided.** The intentional transitions are settled in A-35/A-36, but interruption handling must be set before calling the lifecycle complete. |
| Subject entry limits and how to present an empty open-session list | **Not provided.** Detailed UX/validation remains to be specified without narrowing A-38's user-created-subject choice to grief. |
| Existing approved initial PRD and demo features | Their single-example and sample-conversation wording predates A-38. They remain historical approved artifacts; align or revise them after this scoped boundary is reviewed. This new PRD has no inherited approval. |
| Two-device integrated checks | **NOT RUN.** The new requirements need execution evidence for chat, audio, session states and no-history behaviour. |

## Hypotheses to test

- **Hypothesis:** A simple list showing each open subject is sufficient for someone to choose a session. A-38 establishes the choice, not the final list design or ranking.
- **Hypothesis:** Server-held sessions can remain memory-only for the local fictional demo. A-12 requires no stored conversation history; exact session expiry and restart behaviour remain open.

## Source reconciliation

A-26 chose grief as the main **fictional example**. A-37 requested a hands-on app, and A-38 explicitly corrects its scope to user-created subjects and a choice among server-held sessions. Thus grief and sample dialogue cannot define or drive the application's only path. A-39 makes the scripted video lot 1 and this application lot 2, to follow quickly; A-41 clarifies that the video centers on chat and audio is handled in lot 2. No exact interval is provided. A-31/A-32 selected subject-led entry; A-38 turns that interaction into the operative MVP scope. A-35/A-36 settle intentional session endings and ordinary hangup. A-5's future administrator archive differs from A-12's no-history local demo.

## Review record

Checked the product summary, discovery, BA brief, intake A-8 to A-13 and A-22 to A-41, the initial PRD and approved demo features on 25 October 2026. **Approval:** the owner wrote “j'approuve ses deux PRD” in A-40 after both scoped PRDs were presented; this includes this lot 2 PRD. A-41 confirms audio belongs here; the later explicit A-42 decision resolves its interaction flow without establishing test results. **NOT RUN:** application journey, simultaneous two-device chat, audio, session lifecycle or persistence/log inspection; no implementation evidence was examined for this revision.
