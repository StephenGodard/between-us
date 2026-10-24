# Feature: Fictional exchange and two-way chat

ID: F-D-01  
Status: READY FOR REVIEW  
Horizon: fictional demo  
Parent PRD: [Entre nous — initial product PRD](../prds/entre-nous-initial.md) (`READY FOR REVIEW` revision; D-R1, D-R4)  
Date: 2026-10-24

## Outcome and actors

Two fictional participants, one speaking and one listening, can enter the same short demonstrated exchange from separate devices on one LAN and send messages both ways. The chosen example makes the reason for the exchange understandable without claiming a real matching service (A-2 to A-4, A-8, A-12, A-13, A-22, A-23; BR-2, BR-6, BR-11). This groups the confirmed demo portions of inventory F-01, F-02 and F-03.

## Flow and boundaries

The demonstrator presents a fictional situation about grief (A-26). Following the owner-selected entry option A, one participant chooses « J'ai besoin de parler », proposes the subject and waits; another chooses « Je suis disponible pour écouter », sees the open subject and joins it (A-30 to A-32). Both can write, receive and respond freely during the active exchange; an initial intention does not assign messaging permissions or a turn order (A-28). Scripted example content may be present for the demonstration, while sending and receiving remains genuinely two-way. Participants may keep the exchange entirely in written chat and end it through [F-D-03](demo-exchange-closure.md), or use the optional call in [F-D-02](demo-audio-call.md). This feature does not define a permanent participant profile or automatic public subject matching.

The exact grief story, subject input constraints, waiting and cancellation rules, connection mechanics, and how sample content is introduced are `Not provided.` Their resolution must preserve the fictional, two-party scope. Exact interface copy remains a **Hypothesis**. See the [experience context](../context/experience-context/experience-context.md) for the owner-selected warm, human atmosphere (A-25) and selected entry structure (A-32).

## Requirements and evidence

| PRD requirement | Feature behaviour | Source state | Acceptance evidence |
| --- | --- | --- | --- |
| D-R1 | Two fictional participants on distinct devices on one LAN enter the same exchange; each can send, receive and respond across multiple turns regardless of initial intention. | Confirmed two-way outcome and later UX clarification (A-8, A-10, A-12, A-13, A-22, A-23, A-28; BR-2, BR-6, BR-11). Join mechanism: `Not provided.` | Simultaneous two-device walkthrough with at least two contributions from each participant and no role-based composer restriction. |
| D-R4 | The demonstrated content is fictional, with sample conversation material and no stored conversation history. | Confirmed demo boundary (A-8, A-12; BR-6, BR-7). Storage and log mechanisms: `Not provided.` | Review sample content and inspect the integrated message data path for any persistent conversation store or message-bearing logs. |

## Exclusions and dependencies

Depends on a way for two LAN devices to access the web demo and share an exchange; the [approved infrastructure ADR](../adr/0001-web-demo-infrastructure.md) selects the architecture direction, while implementation and verification remain separate work. [F-D-02](demo-audio-call.md) uses the active exchange; [F-D-03](demo-exchange-closure.md) terminates it. D-R4's no-history condition also applies after closure and is checked with F-D-03.

Excluded: real participants seeking support, public matching, accounts, persistent profiles, a validated relevance algorithm, administrator archives, moderation and claims of emotional benefit. The two-minute video is PRD requirement D-R5, not part of this application feature.

## Open decisions and source reconciliation

A-2 proposes topic matching and A-3 proposes comparable experience; A-8, A-10 and A-12 narrow this demo to a fictional exchange. Neither proposal becomes an automated demo requirement. A-26 selects grief from A-4's two examples, while the script remains `Not provided.` A-28 clarifies that the exchange must remain reciprocal regardless of any “aidant” label. A-30 and A-31 propose a first screen where one person opens a subject and waits while another chooses it from open subjects; A-32 confirms this as the entry direction after reviewing the [subject-led UX mockup](../context/experience-context/subject-entry-flow.md). This does not approve public subject discovery or matching for a real service. A-32 also makes voice optional within each exchange. A-11's “on est tous aidants” informs the presentation, while exact interface wording is `Not provided.` The secure two-device access and connection behaviour mentioned in technical context require design and verification, not a product decision here.

## Review record

Checked the parent PRD, discovery, BA brief, cited intake A-2 to A-4, A-8, A-10 to A-13, A-22 and A-23, and current technical context on 24 October 2026. **NOT RUN:** simultaneous LAN-device chat or storage/log inspection; the selected implementation is not present. Feature approval: `Not provided.` The owner's approval of the parent PRD does not approve this feature.
