# Experience context — fictional hackathon demo

**Updated:** 24 October 2026  
**Scope:** The web demonstration with two fictional participants on distinct devices on one LAN. This document is living context. It proposes a coherent experience for review; it does not approve a screen design or a future real-person service.

The companion [user-flow map](user-flows.md) follows the owner's AnimeSphere flow-document structure (A-27) for a rapid pass. It traces two entry perspectives that converge in one reciprocal conversation. The [conversation UX options](conversation-ux-options.md) compare ways to express that both people can write and reply regardless of an initial intention (A-28).

The owner asked to **experiment before selecting** an entry pattern (A-29), then reviewed the [clickable mockup](entry-flow-lab.html) and selected variant A (A-32). The [entry-flow experiment](entry-flow-experiment.md) records the comparison; owner selection does not establish usability with other participants.

The selected [subject-led entry](subject-entry-flow.md) lets the person who needs to talk open a topic and wait; the available listener sees open topics and chooses one (A-30 to A-32). The demo can use one fictional grief subject. The owner also clarified that voice is optional for people who want only written chat (A-32). This does not add a public subject directory or matching service.

## Sources and decision state

- [Intake](../product-context/intake/espaces-ecoute-ephemeres.md): A-1 to A-5 for the listening purpose and end of contact; A-8 to A-13 for the fictional journey, video and “on est tous aidants”; A-19 and A-22 to A-23 for web and two-device LAN delivery; A-24 to A-26 for the UX request, warm and human atmosphere, and grief as the main fictional topic. Later explicit answers refine earlier open questions.
- [Product discovery](../product-context/discovery/entre-nous-product-discovery.md) and [BA brief](../product-context/briefs/espaces-ecoute-ephemeres.md): functional synthesis, not independent design decisions.
- [Initial PRD revision for review](../../prds/entre-nous-initial.md): D-R1 to D-R5; the original baseline was approved before A-32. The revised requirements reflect optional voice and both ending routes, and await artifact review.
- [Feature specifications](../../features/README.md): F-D-01 to F-D-03 are ready for review after A-36 resolved the planned joiner exit and hangup paths. [Technical context](../technical-context/technical-context.md) describes constraints and proposed architecture, not visual requirements.

## Experience intent

The demonstration should let a viewer follow one understandable human exchange: someone needs to talk about a bereavement, another person is available to listen, **each can write and answer throughout the conversation**, and they may either stay in written chat or use voice before the exchange visibly ends (A-2 to A-4, A-10 to A-13, A-26, A-28, A-32). The owner wants the atmosphere to feel **warm and human** (A-25) and the video to communicate **“on est tous aidants”** (A-11). These are direction and message, not evidence that the service helps real people.

| Confirmed anchor | Implication for experience | Still open |
| --- | --- | --- |
| Two fictional participants on separate LAN devices (A-8, A-12, A-13, A-22, A-23) | Each side needs a legible role and a visible shared exchange. | Entry/join mechanism, device form factors, browser targets. |
| Grief is the principal fictional topic (A-26) | The scenario and copy can have one consistent context. | The exact script, relationship and degree of detail in the fictional bereavement. |
| Two-way chat and optional real audio (A-10, A-13, A-32) | Chat must stand on its own; a real call remains available and testable, with no recorded substitute. | Call invitation, consent/permission screens, failure and disconnect states. |
| The subject opener may cancel while waiting and explicitly close the active exchange from chat or call (A-35); joiner exit and hangup follow A-36. | Closure needs an unmistakable state on each device. Joiner exit clears the current exchange and returns the opener to waiting; hangup returns both to chat. | Exact wording and unexpected interruption. |
| Warm and human atmosphere (A-25) | Candidate visual treatments should feel approachable and calm. | Color, type, imagery, motion, density and final design system. |

## Candidate journey for review

The sequence below combines the owner's selected entry and optional voice (A-32) with layout hypotheses. It is not a new PRD requirement.

| Moment | What the participant sees and understands | Action or transition | Requirement |
| --- | --- | --- | --- |
| 1. Invitation | A shared initial screen explains the temporary conversation and offers two equally visible entry intentions. | One path proposes a fictional grief subject and waits; the other sees and chooses that open subject (A-31, A-32). | D-R1; F-D-01 |
| 2. Shared conversation | Both sides see the same topic and a simple message thread. Each can write and answer freely across several turns, regardless of the intention that brought them in. | Send, receive and respond in both directions. | D-R1, D-R4; F-D-01; A-28 |
| 3. Optional voice | A clear, in-context choice to use a live audio call, with the browser's microphone request understandable to the participant. | Continue in chat or start and answer the call. | D-R2; F-D-02; A-32 |
| 4. End | The opener explicitly ends the exchange from chat or call. Both views show a clear closed state; previous messages are no longer visible or resumable through that session. | Observe closure on both devices and attempt to return. | D-R3, D-R4; F-D-03; A-35 |

The scripted [two-minute video](../../prds/entre-nous-initial.md) begins with listening in person and moves into this remote journey (A-9, A-11; D-R5). **Hypothesis:** repeat the same grief scenario and visual cues in the video and prototype so the shift is easy to follow. The exact storyboard remains open.

## Candidate screen structure

These are **layout hypotheses** for a later wireframe. They describe information hierarchy, not a selected component design.

1. **Entry / intention and subject:** one brief sentence about a temporary, reciprocal conversation; two equally prominent actions, « J'ai besoin de parler » and « Je suis disponible pour écouter ». The first proposed path opens a subject and waits; the second lists open subjects and lets someone join (A-30, A-31). The demo uses one fictional grief topic. Exact subject input, empty-list and waiting behaviour remain hypotheses, and the wording should avoid permanent “victim” or “helper” labels (A-2, A-11).
2. **Conversation:** a modest topic header, a readable two-person message thread and the same prominent composer and send action on both devices. Each participant can continue, question or reply without a turn restriction. Show the optional voice action, an opener-only session-end action and a joiner exit. Joiner exit clears the messages and returns the opener to waiting with the same subject (A-36). The exact message script and whether examples are prefilled are `Not provided.`
3. **Audio state:** make it evident that this is a live call with the same person in the same exchange. Distinguish hanging up, which returns both to chat, from the opener intentionally ending the whole exchange (A-36). The controls for invitation, acceptance, microphone and unexpected failure are `Not provided.`
4. **Closed state:** tell both sides that the conversation is finished and no longer accessible through this session. Do not imply a universal data-erasure guarantee; the demo's no-history claim has its own technical inspection in D-R4. Exact copy and any new-demo action are `Not provided.`

**Low-fidelity composition hypothesis:** a compact page header can keep the fictional context visible, while one main panel changes with the interaction. The sketches show hierarchy only; labels and controls are candidates.

```text
INITIAL SCREEN                    SUBJECT PATHS
┌──────────────────────────┐      ┌─────────────────────────────┐
│ Parler ou écouter        │      │ Proposer « Deuil » → attendre│
│ [Besoin de parler]       │  →   │ Voir « Deuil » → rejoindre   │
│ [Disponible pour écouter]│      └─────────────────────────────┘
└──────────────────────────┘                   ↓
                                  CHAT: messages dans les deux sens
                                  [Appel facultatif] [Terminer : créateur]

AUDIO                         CLOSED
┌───────────────────────┐      ┌─────────────────────────────┐
│ Appel audio en cours  │      │ Cet échange est terminé     │
│ Avec cette personne   │  →   │ Messages non visibles       │
│ [Finir échange :    │      │ Aucun retour à cette session│
│  créateur]           │      │                             │
└───────────────────────┘      └─────────────────────────────┘
```

### Interaction-state sketch

```text
Shared initial screen
       ↓ one opens the grief subject; the other selects it
Two-person chat ↔ two-way messages
       ├─ opener ends exchange ───────────┐
       └─ optional live audio → opener ends┤
                                          ↓
                         Closed exchange on both devices
```

This sketch covers the opener's intentional end path. A-36 also selects joiner exit → clear current messages and return the opener to waiting with the same subject, plus hangup → written chat. Lost network connection, denied microphone permission, unanswered call, browser close and returning with an old session link require explicit experience decisions before detailed design and validation.

## Visual and verbal direction

**Owner decision:** warm and human (A-25). **Hypothesis for review:** use restrained warm neutrals, a clear reading hierarchy, generous space around the exchange, and a small accent for primary actions and live-call state. Use calm transitions around opening and closure. These are candidate design choices, not an approved palette, typography system or animation rule. The interface must remain legible on the two actual demo devices; their sizes are `Not provided.`

One concrete **visual hypothesis** to compare in a wireframe is an off-white canvas (`#F8F4EF`), dark charcoal text (`#252525`), and a muted terracotta accent (`#A64F3C`) for the primary action. Use a simple sans-serif for conversation text, rounded but restrained panels, and avoid decorative imagery inside the chat so the exchange stays central. These example values are not selected brand tokens; text contrast and actual device rendering have **NOT RUN** verification.

**Voice hypothesis:** short, direct French phrases that convey availability, listening and a definite end. Avoid medical claims and a promise of therapeutic benefit (A-1, A-4, A-6). Use the owner's exact “on est tous aidants” in the video context (A-11); whether it appears as interface copy is `Not provided.` Any example line below is proposed copy, not a quotation or approved requirement:

| Moment | Candidate copy (**Hypothesis**) | Why it exists |
| --- | --- | --- |
| Entry | « Parler ou écouter, le temps d'une conversation » | Gives the two paths a common purpose before the subject is chosen. |
| Listening perspective | « Je suis disponible pour écouter » | Expresses a temporary intention without a permanent identity. |
| Closed state | « Cet échange est terminé » | Makes the end clear without claiming that every technical trace was erased. |

## Questions to resolve before a detailed design

| Priority | Decision | Why it matters | Current state |
| --- | --- | --- | --- |
| 1 | Exact fictional grief story and message script | Determines emotional tone and what the video and prototype show. | `Not provided.` Main topic only is confirmed by A-26. |
| 1 | Subject input, open-list visibility, waiting and joining | Determines whether the selected first screen leads to a clear exchange without exposing personal detail in the subject list. | Direction selected in A-32; exact behaviour `Not provided.` |
| 1 | Joiner exit and optional audio hangup | Determines what the opener sees if the other person leaves and whether ending audio returns to chat. | Selected in A-36: clear the exchange and wait with the same subject; hangup returns to chat. Exact copy remains open. |
| 1 | Closure copy and handling of interruption | Prevents confusion between an intentional end, a connection failure and a claim of complete deletion. | `Not provided.` |
| 2 | Color, typography, imagery and motion | Turns “warm and human” into a reviewable visual system. | Atmosphere confirmed; treatment `Not provided.` |
| 2 | Actual device sizes and filmed framing | Determines spacing and whether both sides remain legible in the pitch. | `Not provided.` |

## Review and evidence

Review a low-fidelity sequence from both participant perspectives against F-D-01 to F-D-03. Then walk through it on the two intended device sizes, read the French labels aloud, and verify that a viewer can identify who speaks, who listens, when the live call begins, and what the end means. Check the storyboard separately against D-R5 and the two-minute event limit. These are proposed review activities, not claims of user research or implementation tests.

**Done in this context pass:** reconciled the initial PRD revision, feature specifications, discovery, BA brief and cited intake answers through A-32 on 24 October 2026. The owner reviewed the low-fidelity entry mockup and selected variant A; the local browser checks cover its scripted interactions and chat-only end. **NOT RUN:** external participant walkthrough, two-device test, real audio test, script timing or usability study. The exploratory implementation was not treated as product authority.
