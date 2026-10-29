# Feature: Close and clear the exchange

ID: F-D-03  
Status: APPROVED
Horizon: fictional demo  
Parent PRD: [Entre nous — initial product PRD](../prds/entre-nous-initial.md) (`APPROVED`; D-R3 and D-R4 boundary)
Date: 2026-10-24

## Outcome and actors

The person who opened the fictional subject can cancel it while waiting or intentionally end its active exchange. When they end an active exchange, both participants see that it is over, lose access to its messages and cannot resume that exchange through the demonstrated session (A-5, A-10 to A-13, A-32, A-35, A-36; BR-7, BR-11). This specifies inventory F-05 for the demo. The visible end illustrates “tout s'efface” without claiming deletion of every technical trace or defining the future service's archive policy.

## Flow and boundaries

The subject opener may cancel before anyone joins. Once two people are present, the opener has an explicit session-end action available in written chat or during the optional F-D-02 call. That action closes the server-held subject session for both devices, removes its messages from both participant views and prevents reopening it. The joiner has a **Quitter** action instead: it removes that joiner, clears the current conversation for both, returns the opener to a waiting state with the same subject, and makes that subject available for a new joiner. A new joiner never sees the earlier conversation. Hanging up an optional call stops audio and returns both people to the same written chat; it does not close the subject session (A-35, A-36). Lost connection, browser close and unexpected call failure need separate rules before claiming a complete lifecycle.

| Intentional action | Result for the subject | Result for the current conversation |
| --- | --- | --- |
| Opener cancels while waiting | Closed; removed from the open list. | None has started. |
| Opener ends from chat or call | Closed for both; cannot be resumed. | Cleared from both views. |
| Joiner quits | Same subject returns to waiting for its opener. | Cleared from both views; a later joiner starts fresh. |
| Either hangs up | Still active with the same pair. | Written chat continues; audio stops. |

## Requirements and evidence

| PRD requirement | Feature behaviour | Source state | Acceptance evidence |
| --- | --- | --- | --- |
| D-R3 | The opener can cancel while waiting or explicitly end the subject session from chat or call. Joiner exit clears the current two-person exchange and restores the opener's waiting subject; hangup returns both to chat. No previous exchange can be resumed. | A-35 and A-36, refining A-5, A-10, A-13 and A-32 (BR-7, BR-11). Unexpected disconnect rule: `Not provided.` | Test opener cancellation, closure from chat and call, joiner exit and subject reopening, and hangup to chat on both devices. Verify a new joiner cannot see prior messages. |
| D-R4, shared with F-D-01 | No stored conversation history remains available through the demo; inspect the data path and logs before asserting the no-storage claim. | Confirmed demo boundary (A-12; BR-6, BR-7). Specific data lifetime: `Not provided.` | Inspect the integrated demo's storage and message-bearing logs, including after closure; distinguish view clearing from actual persistence. |

## Exclusions and dependencies

Depends on F-D-01's server-held subject session. The route from an optional call also depends on F-D-02; the chat-only route does not. D-R4's fictional sample content and active-message behaviour belong to F-D-01; its end-state is checked here. Technical session cleanup and secure two-device event delivery require design and verification under the [approved infrastructure ADR](../adr/0001-web-demo-infrastructure.md).

Excluded: a universal deletion claim, an administrator archive, a retention policy for real participants, reports, moderation, emergency action and a lasting participant relationship. The two-minute video remains D-R5 outside this application feature.

## Open decisions and source reconciliation

A-5 calls for administrator history in a later real service, A-11 defers its policy, and A-12 says the fictional demo stores no conversations. These apply to different horizons. A-10's “tout s'efface” is specified here as disappearance from both participant views and non-resumption of the prior exchange; A-32 allows an exchange that never enters voice. A-35 assigns intentional subject closure to the opener and cancellation during waiting. A-36 agrees with the proposed KISS transitions for joiner exit and hangup. Integrated storage inspection supports the separate no-history demo boundary. Unexpected disconnect handling and server-log behaviour are `Not provided.`

## Derived user stories

- [US-D-08 — Share and protect temporary subject sessions](../user-stories/demo-shared-session-foundation.md) covers backend-enforced authority and fresh exchange state required by the intentional transitions.
- [US-D-03 — Choose live audio and return to chat](../user-stories/demo-optional-audio.md) covers the shared hangup boundary.
- [US-D-04 — Cancel or close my fictional subject](../user-stories/demo-opener-closes-subject.md) covers opener cancellation and closure.
- [US-D-05 — Leave without closing the subject](../user-stories/demo-joiner-leaves.md) covers voluntary joiner exit and fresh rejoin.

## Review record

Checked the parent PRD, discovery, BA brief, cited intake A-5 and A-10 to A-13, and current technical context on 24 October 2026. **NOT RUN:** two-device closure, session-resumption attempt, and storage/log inspection; the selected implementation is not present. **Approval:** the owner explicitly approved the demo features in the current conversation on 25 October 2026. This does not establish implementation readiness.
