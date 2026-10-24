# Feature: Close and clear the exchange

ID: F-D-03  
Status: READY FOR REVIEW  
Horizon: fictional demo  
Parent PRD: [Entre nous — initial product PRD](../prds/entre-nous-initial.md) (`READY FOR REVIEW` revision; D-R3 and D-R4 boundary)  
Date: 2026-10-24

## Outcome and actors

When a fictional exchange ends, whether it stayed in chat or included an optional audio call, both participants see that it is over, lose access to its messages and cannot resume that exchange through the demonstrated session (A-5, A-10 to A-13, A-32; BR-7, BR-11). This specifies inventory F-05 for the demo. The visible end illustrates “tout s'efface” without claiming deletion of every technical trace or defining the future service's archive policy.

## Flow and boundaries

After F-D-01's messages, a participant may end the chat directly without starting a call. If they entered the optional F-D-02 call, ending it ends the exchange. In either path, the exchange closes for both devices, its messages disappear from both participant views, and the same session cannot be reopened or used to reconnect the pair. A new fictional demonstration may be possible, but any new-session flow is `Not provided.` What happens after a lost connection, browser close or unexpected call failure is also `Not provided.`; these cases must be decided and tested before claiming a complete closure lifecycle.

## Requirements and evidence

| PRD requirement | Feature behaviour | Source state | Acceptance evidence |
| --- | --- | --- | --- |
| D-R3 | Ending a written chat directly, or ending its optional call, closes the demonstrated exchange, clears both participant views, and prevents resumption through that session. | Confirmed participant-visible outcome and later chat-only clarification (A-5, A-10, A-13, A-32; BR-7, BR-11). Unexpected-disconnect rule: `Not provided.` | Test both end paths on both devices; attempt to return to each ended exchange from each device. |
| D-R4, shared with F-D-01 | No stored conversation history remains available through the demo; inspect the data path and logs before asserting the no-storage claim. | Confirmed demo boundary (A-12; BR-6, BR-7). Specific data lifetime: `Not provided.` | Inspect the integrated demo's storage and message-bearing logs, including after closure; distinguish view clearing from actual persistence. |

## Exclusions and dependencies

Depends on F-D-01's active exchange. The call-ending route also depends on F-D-02; the chat-only route does not. D-R4's fictional sample content and active-message behaviour belong to F-D-01; its end-state is checked here. Technical session cleanup and secure two-device event delivery require design and verification under the [proposed infrastructure ADR](../adr/0001-web-demo-infrastructure.md).

Excluded: a universal deletion claim, an administrator archive, a retention policy for real participants, reports, moderation, emergency action and a lasting participant relationship. The two-minute video remains D-R5 outside this application feature.

## Open decisions and source reconciliation

A-5 calls for administrator history in a later real service, A-11 defers its policy, and A-12 says the fictional demo stores no conversations. These apply to different horizons. A-10's “tout s'efface” is specified here as disappearance from both participant views and session non-resumption; A-32 adds an end route for exchanges that never enter voice. Integrated storage inspection supports the separate no-history demo boundary. Disconnect handling and server-log behaviour are `Not provided.`

## Review record

Checked the parent PRD, discovery, BA brief, cited intake A-5 and A-10 to A-13, and current technical context on 24 October 2026. **NOT RUN:** two-device closure, session-resumption attempt, and storage/log inspection; the selected implementation is not present. Feature approval: `Not provided.` The owner's approval of the parent PRD does not approve this feature.
