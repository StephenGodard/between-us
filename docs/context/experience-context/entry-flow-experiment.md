# Lightweight UX experiment — entering a reciprocal conversation

**Updated:** 24 October 2026  
**Purpose:** Record the lightweight comparison prepared after the owner asked to try alternatives rather than answer a closed choice question (intake A-29). After reviewing variant A, the owner selected its subject-led entry and clarified that voice is optional (A-32). This is a low-fidelity design exercise, not a research claim or an implementation test.

Try the [clickable two-panel mockup](entry-flow-lab.html) locally to compare the owner's proposed [subject-led entry](subject-entry-flow.md) with prepared accesses, then send messages from both perspectives. It is an in-browser UX simulation: its call button changes the displayed state but carries no audio, LAN connection or storage. It does not validate D-R1 to D-R4.

## What stays identical

Both variants lead to the **same** fictional grief conversation in the two-panel simulation. Each participant can compose, send, read, reply and continue at any point; the chat does not enforce speaker/listener turns (A-28; D-R1). Both can finish in written chat or choose the simulated call (A-32). The exact French sample script remains a hypothesis until reviewed.

```text
Person A → shares a thought about grief
Person B → responds and asks a question
Person A → answers and asks or clarifies something in return
Person B → responds again
Either → ends the written chat; or both continue through optional live audio
Exchange ends → both see it closed
```

## Variant A — intention, subject, then exchange

**Owner-selected entry direction (A-30 to A-32):** an initial screen offers « J'ai besoin de parler » and « Je suis disponible pour écouter » with equal prominence. The first path proposes the fictional grief subject and waits. The second sees that subject in an open list and joins it. Once the exchange opens, the entry intentions no longer control or dominate the conversation screen. Both participants have an equally visible composer, optional call action and chat-end action.

```text
[Parler ou écouter, le temps d'une conversation]
[J'ai besoin de parler]   [Je suis disponible pour écouter]
    ↓ propose « Deuil »          ↓ choose open « Deuil »
    ↓ wait                       ↓ join
[Échange en cours] [Messages des deux personnes] [Votre message] [Envoyer]
```

**Question to observe:** do people understand what each initial action leads to, find the open subject without help, and still feel free to write on both sides once joined?

## Variant B — prepared perspectives

**Hypothesis:** each demo device opens a prepared link to the same grief exchange. A short sentence explains the perspective on that device; there is no role-selection step. The same symmetric conversation screen appears on both devices.

```text
Device A: [Vous pouvez commencer cet échange fictif autour du deuil]
Device B: [Une personne souhaite échanger autour du deuil]
                  ↓
[Échange en cours] [Messages des deux personnes] [Votre message] [Envoyer]
```

**Question to observe:** does skipping subject creation and choice make entry easier, or does it leave the reason for the two perspectives and the conversation's topic unclear? The prepared links are a UX hypothesis; the join method has not been selected technically.

## One short walkthrough per variant

1. Give one person device A and another device B, or walk through both perspectives side by side with a reviewer. Say only: « Testez cette conversation fictive à deux autour du deuil. » Do not explain which person is “allowed” to write.
2. Let them open or join the subject, send the first message, exchange at least two contributions each, and end directly from chat. In a separate walkthrough, choose the optional call and end it. For a paper trial, point to the next screen when they choose an action; do not claim live chat or audio was tested.
3. Ask open questions immediately afterward: « Qu'avez-vous pensé qu'il se passerait après votre premier choix ? », « Comment avez-vous trouvé le sujet ? », « À quel moment avez-vous hésité ? », « Aviez-vous l'impression de pouvoir relancer ou répondre librement ? », « Que pensiez-vous qu'il se passerait en terminant l'appel ? »
4. Repeat with the other variant and the same fictional conversation. If possible, reverse who begins so the observed difference is not merely the first person's script.

| Observe without inventing a score | Evidence to note |
| --- | --- |
| Entry comprehension | The participant can explain what they are joining without a facilitator's explanation. |
| Subject path | The opener understands that the subject is waiting; the other person finds and joins the open subject. |
| Reciprocity | Each notices the composer and feels free to contribute again after receiving a reply. |
| Optional voice | Both understand that the call is a choice within the same exchange and that staying in chat is valid. |
| Closure | Both predict and observe that either ending route ends access to the session. |
| Friction | Record exact moments of hesitation, backtracking and requests for clarification, plus the words that caused them. |

## Decision after the walkthrough

The owner selected variant A after viewing the mockup (A-32). A later walkthrough can still reveal wording or interaction issues. Do not treat this preference as proof of usability. The symmetric conversation and two-device requirements remain fixed; optional voice now gives the exchange two valid endings.

**Status:** variant A selected by the owner (A-32); **NOT RUN** with external participants. On 24 October 2026, a local browser check confirmed the subject form, empty open-subject list, subject opening and waiting state, list update, joining, symmetric chat composers, simulated call, shared closure, and reset to the prepared-access variant. After A-32, a second browser check confirmed one message from each panel, the optional-call label, direct chat ending, disappearance of both message views and reset. These checks cover only mockup interaction, not product usability. No external participant observation, two-device journey or real audio test has been completed. Source trail: [conversation UX options](conversation-ux-options.md), [user flows](user-flows.md), [product context](../product-context/product-context.md), and the [revised PRD](../../prds/entre-nous-initial.md).
