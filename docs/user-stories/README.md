# User stories — fictional hackathon demo

All eight stories now have [implementation plans](../implementation-plans/README.md). The [interactive-session MVP PRD](../prds/interactive-session-mvp.md) is `APPROVED`; A-38's user-created, multiple-subject scope has been reconciled in US-D-01 to US-D-05 and their plans. US-D-07 and US-D-08 provide the architecture foundation.

Date: 2026-10-25. Horizon D only. Both scoped delivery PRDs, the [initial product PRD](../prds/entre-nous-initial.md), [F-D-01](../features/demo-fictional-exchange-chat.md), [F-D-02](../features/demo-audio-call.md), [F-D-03](../features/demo-exchange-closure.md) and [ADR 0001](../adr/0001-web-demo-infrastructure.md) are `APPROVED`. The stories remain `READY FOR REVIEW` or `BLOCKED`; planning does not approve them or prove implementation.

The owner clarified in intake A-37 that the mini-prototype is **hands-on**: participants choose its actions. The separate pitch video may be scripted. Example content does not automatically send messages or advance the app journey.

| Order | Story | Outcome | Parent feature | PRD coverage | Status |
| --- | --- | --- | --- | --- | --- |
| Foundation 1 | [US-D-07](demo-local-two-service-access.md) | Open the local web application and reach its separate backend from two devices | F-D-01 access dependency; F-D-02 secure-origin dependency | M-R7; M-R4 secure-origin prerequisite | READY FOR REVIEW |
| Foundation 2 | [US-D-08](demo-shared-session-foundation.md) | See and choose shared temporary subjects with backend-enforced two-person access | F-D-01; F-D-03 lifecycle dependency | M-R1, M-R2, M-R5, M-R6, M-R7 | READY FOR REVIEW |
| 1 | [US-D-01](demo-open-and-join-subject.md) | Enter an original subject, wait, then choose among open subjects from a second LAN device | F-D-01 | M-R1/M-R2 | READY FOR REVIEW |
| 2 | [US-D-02](demo-reciprocal-chat.md) | Exchange fictional messages freely in both directions | F-D-01 | M-R3/M-R7 | READY FOR REVIEW |
| 3 | [US-D-03](demo-optional-audio.md) | Choose live audio or stay in chat; hang up back to chat | F-D-02; F-D-03 hangup boundary | M-R4 | BLOCKED |
| 4 | [US-D-04](demo-opener-closes-subject.md) | Opener cancels while waiting or closes an active exchange | F-D-03 | M-R5/M-R7 | BLOCKED (call-path AC-3) |
| 5 | [US-D-05](demo-joiner-leaves.md) | Joiner quits; opener waits again with a cleared exchange | F-D-03 | M-R6/M-R7 | BLOCKED (call-path AC-3) |
| Lot 1 | [US-D-06](demo-pitch-video.md) | View a scripted, timed chat-centered presentation without an audio call (A-41) | No application feature; separate event deliverable | V-R1–V-R5 | READY FOR REVIEW |

## Coverage boundaries and deferrals

- **M-R7 architecture foundation:** US-D-07 covers the two-service local access and trusted phone origin; US-D-08 covers authoritative temporary session state and the no-history boundary. Integrated storage and message-bearing-log inspection remains required. These stories do not claim that the services run.
- **M-R1/M-R2/M-R5/M-R6 technical prerequisites:** US-D-08 covers shared subject state, atomic two-person admission and server-enforced authority. US-D-01, US-D-04 and US-D-05 cover participant-facing flow. M-R3 and M-R4 map to US-D-02 and US-D-03; US-D-03 remains `BLOCKED` on call invitation/acceptance.
- **Unresolved scoped decisions:** unexpected disconnect and restart behaviour, subject expiry, and call invitation/acceptance are `Not provided.` They prevent claiming a complete lifecycle or audio interaction specification. The two foundation stories only cover the stated intentional and access paths.
- **D-R1:** US-D-01 covers the subject-led meeting and two-device entry; US-D-02 covers reciprocal chat. Their integrated check must use two distinct LAN devices.
- **D-R2:** US-D-03 covers live audio, the chat-only path and ordinary hangup. Its call invitation/acceptance flow is `Not provided.` and blocks executable interaction acceptance.
- **D-R3:** US-D-03 covers hangup without closure; US-D-04 covers opener cancellation and explicit closure from chat or call; US-D-05 covers voluntary joiner exit and fresh rejoin. Unexpected disconnection remains `Not provided.` and needs an explicit product decision before claiming a complete lifecycle.
- **D-R4:** US-D-02 covers fictional participant content and no stored active conversation history; US-D-04 and US-D-05 cover cleared end states. No-history verification is an integrated data-path and log inspection, not proof from cleared screens alone.
- **D-R5:** US-D-06 covers the separate video deliverable; no application feature owns it.
- **F-06** demo identity presentation is `Not provided.` in the PRD and has no executable acceptance condition. It needs a scoped decision before adding a story. F-07 to F-10 and the future real-person portions of F-01 to F-06 are deferred to horizon S by the parent PRD. Public matching, persistent profiles, real participants, moderation, administrator archives and emergency response are outside this story set.

**Verification:** Source and link coverage reviewed against the PRD, features, product and technical context, and ADR 0001. **NOT RUN:** application, LAN device, audio, storage/log and timed video checks; the selected implementation and final video are not present.
