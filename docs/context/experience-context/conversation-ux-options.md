# Conversation UX — reciprocal exchange options

**Updated:** 24 October 2026  
**Scope:** Product-owner brainstorming for the fictional grief demonstration. This is living experience context. It records the options considered and the owner's selection of option A (A-32), while exact interface copy and details remain open.

## Problem to solve

The owner corrected the first [user-flow map](user-flows.md): “CONVERSATION EPHEMERE” means messages can go **both ways**, regardless of who entered to talk or listen (intake [A-28](../product-context/intake/espaces-ecoute-ephemeres.md)). The [initial PRD](../../prds/entre-nous-initial.md) requires two-way messaging (D-R1), and [F-D-01](../../features/demo-fictional-exchange-chat.md) specifies send and receive on both devices. The UX risk lies in presenting one person as the only speaker and the other as a passive recipient.

The owner's earlier “on est tous aidants” (A-11) and doubts about fixed “aidant”/“victime” profiles (A-2) support temporary intentions rather than permanent identities. The owner selected the subject-led intention path for the demo (A-32). The confirmed scope is two fictional people on two LAN devices, grief as the main topic, a reciprocal chat, an optional real audio-call capability, and closure after either a chat-only exchange or a call (A-8 to A-13, A-22, A-23, A-26, A-32).

## Options for the entry and conversation frame

| Option | Entry and shared chat | What it makes clear | UX cost or risk | Decision state |
| --- | --- | --- | --- | --- |
| A. Intention and open subject, then shared conversation | The person needing to talk proposes a subject and waits; the available listener sees open subjects and chooses one. Once connected, both see the same chat capabilities. | The initial screen gives each intention an observable next step and a topic as the meeting point (A-30, A-31). | Waiting, empty list and visible subject details need care. A full public list would expand the confirmed demo scope. | **Selected by the owner** for the fictional demo (A-32); details remain to design. |
| B. Two prepared demo accesses | Device A and device B open prepared perspectives for the same fictional exchange; no intention-selection screen. Both receive the same chat controls. | Fast, repeatable hackathon path with little setup. Avoids labeling people in the product interface. | The viewer may need the video or an entry explanation to understand why these two people meet. Join mechanism remains a technical/product decision. | **Hypothesis**. |
| C. Persistent “speaker” and “listener” roles | Entry and conversation keep visible role labels; both still have the same composer and call capabilities. | Easy to tell the filmed perspectives apart. | A fixed label can imply that only one side should speak, weakening reciprocity and “on est tous aidants.” | **Hypothesis with high clarity risk**; retain only if a review shows the labels do not constrain interpretation. |

The owner declined to choose from descriptions alone (A-29), reviewed the [clickable entry-flow mockup](entry-flow-lab.html), and selected A as matching their intent (A-32). Option B remains in the [experiment record](entry-flow-experiment.md) for comparison. A's exact waiting, topic and joining details still need design; selection does not validate usability or approve a public matching service.

## Shared conversation contract for any option

These points are the confirmed product boundary expressed as an experience check, not new requirements:

- **Both can write at any time during the active exchange.** Neither side's composer is gated by a “speaker”, “listener” or “aidant” label (D-R1; A-28).
- **Both can respond to a received message.** The fictional script should show at least a second contribution from each person, so the viewer sees a conversation rather than one message and one answer (A-28; proposed demonstration method).
- **Both see the same conversation state.** Sender/recipient styling may distinguish messages, but the action area should have equal capability on both devices (D-R1).
- **The spoken role is contextual.** The grief scenario may begin with one person explaining a loss and another listening; either can ask a question, clarify, share an experience or continue the exchange. Whether advice is invited is settled by the fictional dialogue, not a forced mode (A-3, A-4).
- **Voice is optional.** Either participant may continue in written chat without entering a call (A-32; D-R2).
- **The end is shared.** Ending written chat directly or ending an optional call closes the conversation for both, clears participant views and prevents reopening that session (D-R3).

### Proposed demonstration rhythm

This is a **Hypothesis** for a short script, not final copy. It makes the two-way nature visible before voice:

```text
Person A: shares a grief-related thought
Person B: acknowledges it and asks one open question
Person A: replies, adding what they need from the exchange
Person B: responds to that need, perhaps sharing lived experience
Either: ends the written chat → both see the closed state
Or: choose a real audio call; ending it → both see the closed state
```

The exact loss, French words, advice boundary, order of call initiation and number of messages are `Not provided.` The script should not portray a guaranteed benefit or a professional consultation (A-1, A-4, A-6).

## UI implications to try in the next low-fidelity pass

| Element | Candidate treatment (**Hypothesis**) | What to check |
| --- | --- | --- |
| Entry label | Describe what a person needs or offers **for this exchange**; avoid permanent profile language. | Does a viewer understand the starting context without assuming one side is allowed to speak only once? |
| Conversation header | Show the topic and active exchange state; avoid a persistent “aidant/victime” hierarchy. | Can either participant recognize that this is one shared conversation? |
| Message composer | Same prominence and same send action on both devices. | Can both participants send and reply without waiting for an imposed turn? |
| Message bubbles | Distinguish “me” and “other person” consistently in each participant's own view. | Is authorship clear on both devices across several turns? |
| Optional audio transition | A shared call invitation/answer state within the same exchange, while chat remains a complete path. | Is voice understood as a choice, not a required step? |
| Closure | Same closed-state meaning on both devices. | Do both understand that this exchange has ended and cannot be resumed? |

## Decisions and quick review

The owner selected **temporary intentions and a subject-led entry** (A) after seeing the low-fidelity mockup (A-32). A short walkthrough can now focus on subject, waiting, optional audio and both endings. No extended UX research is required for this hackathon pass (A-27); details remain design hypotheses until observed on the target devices.

**NOT RUN:** external participant comparison of A/B, copy review, two-device interaction and usability study. The owner reviewed A and selected it (A-32). The source trail is the current intake, revised PRD, F-D-01 to F-D-03 and [experience context](experience-context.md). The exploratory prototype was not treated as a product decision.
