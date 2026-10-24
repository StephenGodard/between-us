# Entre nous — initial product PRD

Status: DRAFT  
Date: 2026-10-24  
Purpose: Product-wide inventory for feature decomposition; no delivery scope is approved.  
Build readiness: Not ready. The fictional demo needs its own scoped PRD and executable checks; the real-person service has unresolved safety, data and operational decisions.

## Sources and precedence

- [Product discovery](../context/product-context/discovery/entre-nous-product-discovery.md), updated 24 October 2026: functional synthesis and feature candidates.
- [BA brief](../context/product-context/briefs/espaces-ecoute-ephemeres.md), dated 24 October 2026: BR-1 to BR-11 and candidate acceptance checks.
- [Intake](../context/product-context/intake/espaces-ecoute-ephemeres.md): original wording and explicit decisions A-1 to A-23. Later answers refine earlier ones.
- [Product summary](../context/product-context/product-context.md), updated 24 October 2026: current boundary and open questions.
- [Technical context](../context/technical-context/technical-context.md), dated 24 October 2026: constraints and proposed options only. Its proposed infrastructure ADR is not selected here.
- [Hackathon event summary](../context/hackathon-kickoff.md): the two-minute submission constraint, not a product requirement for the later service.

The exploratory `prototype/` is not a requirements source. The working name “Entre nous” is not a final product-name decision.

## Product intent and people

The owner wants someone isolated by a difficult situation to find an initial, nonjudgmental listening exchange with another citizen (A-1, A-6). An exchange is brief and ends without an ongoing participant link (A-2, A-5). The intended first real audience is adults in France (A-7); the immediate hackathon uses only fictional participants (A-8, A-10). Better mental well-being is an intended effect, not an established outcome (A-3, A-6).

The two exchange intentions are “need to talk” and “available to listen.” Whether these are chosen per session or represented as fixed profiles is **Hypothesis / open decision** (A-2, A-3, A-11). The owner’s phrase “on est tous aidants” informs the demo message (A-11), but exact interface wording is Not provided.

## Delivery horizons

| Horizon | Outcome | Boundary |
| --- | --- | --- |
| D — fictional hackathon demonstration | A repeatable web exchange on two distinct devices on one LAN, with sample conversation, two-way chat, real audio call and participant-visible closure; accompanied by a scripted two-minute video. | Confirmed by A-8 to A-13 and A-18 to A-23, plus the event constraint. No real support seekers, saved conversation history, operational moderation or real emergency response. |
| S — possible real-person service | Let adults in France seek or offer a short listening exchange, with an end and participant privacy. | Product intent from A-1 to A-7. Real launch, matching policy, identity, safety operations, archives and evidence of benefit remain undecided or deferred by A-11. This horizon is not build-ready. |

## Feature inventory

IDs identify product capabilities for later decomposition; they are not approved feature specifications. “Confirmed” means supported by an explicit owner decision for the stated horizon. “Hypothesis” means a proposed behaviour or unresolved design choice. A-IDs link to the intake; BR-IDs link to the BA brief.

| ID | Capability / outcome | Horizon and state | BR / discovery and intake trail | Main boundary or decision |
| --- | --- | --- | --- | --- |
| F-01 | Enter an exchange as the person speaking or listening. | D: two fictional positions confirmed. S: session-level choice is Hypothesis. | Discovery “Enter an exchange”; BR-2, BR-6; A-2, A-3, A-11. | Permanent profiles versus session intentions and exact labels: Not provided. |
| F-02 | Establish a relevant exchange around separation or grief. | D: scripted subject and two participants confirmed; automatic matching is not. S: topic and lived-experience matching are proposals. | Discovery “Choose a subject”; BR-1, BR-2, BR-5, BR-6; A-2 to A-4. | Demo's main story, matching rule and similarity threshold: Not provided. |
| F-03 | Send and receive messages in a short two-party conversation. | D: confirmed with fictional content. S: intended, subject to real-use safeguards. | Discovery “Begin, continue and end”; BR-2, BR-6, BR-11; A-2 to A-4, A-10, A-12, A-13. | Listening versus advice follows the exchange; any explicit preference control is Hypothesis. |
| F-04 | Hold a real audio call within the active exchange. | D: confirmed. S: possible later capability, not a launch decision. | Discovery “Begin, continue and end”; BR-11; A-10, A-13. | Demo must work on two LAN devices (A-22, A-23); call mechanics belong to technical design. |
| F-05 | End the exchange and remove participant access and reconnection. | D: confirmed; ending the call closes the exchange and demo stores no conversation history. S: participant disappearance and no further contact confirmed as intent, alongside a deferred administrator archive. | Discovery “Begin, continue and end”; BR-4, BR-7, BR-11; A-4, A-5, A-10 to A-13. | Disappearance from views does not prove erasure of all data. Disconnect and retention rules: Not provided. |
| F-06 | Conceal participant identities from one another. | D: presentation need; exact demo treatment Not provided. S: owner intent confirmed; operational identity rules open. | Discovery “Being able to confide”; BR-3; A-1, A-5. | What the operator knows and what participants see: Not provided. |
| F-07 | Report a hurtful exchange and have it reviewed. | S: desired later capability, deferred from D. | Discovery “Report and protect”; A-4, A-5; BA AC-H3. No dedicated BR for reporting action. | Reporting path, moderator, response and operating hours: Not provided. |
| F-08 | Retain conversation history and reports for authorized administrator review. | S: owner requirement, policy deferred; excluded from D. | Discovery “Report and protect”; BR-4, BR-8; A-5, A-11, A-12. | Purpose, access, notice, legal basis and duration: Not provided. |
| F-09 | Respond to serious distress or urgent danger. | S: possible later capability, not specified or approved; excluded from D. | Discovery “Building trust”; A-5, A-11; BA open questions. No dedicated BR. | Responsible party, consent boundary, exceptions and actual route: Not provided. |
| F-10 | Learn whether exchanges help or cause harm. | S: discovery question / Hypothesis, not an effect claim or launch requirement. | Discovery “Building trust” and “Hypotheses”; A-4, A-6; BA AC-H5. No dedicated BR. | Measures, voluntary feedback method, threshold and negative-event review: Not provided. |

## Delivery requirement inventory

These requirements preserve the confirmed demo outcome for a later scoped PRD. They are not detailed enough to authorize construction as this product-wide document.

| ID | Actor and observable requirement | BR | Evidence | Acceptance evidence |
| --- | --- | --- | --- | --- |
| D-R1 | Two fictional participants on distinct devices on one LAN can enter the same demonstrated exchange and send messages both ways. | BR-2, BR-6, BR-11 | Discovery “Hackathon journey and MVP”; A-8, A-10, A-12, A-13, A-22, A-23 | Hands-on, simultaneous two-device journey. |
| D-R2 | The two fictional participants can conduct a real local audio call in that exchange. | BR-11 | Discovery “Hackathon journey and MVP”; A-13, A-22, A-23 | Audible two-way call on the chosen LAN devices. |
| D-R3 | Ending the call closes the exchange, clears it from both participant views and prevents resumption through that session. | BR-7, BR-11 | Discovery “Begin, continue and end”; A-5, A-10, A-13 | Both views show closure and cannot reopen that exchange. |
| D-R4 | The local demo uses fictional sample conversations without a stored conversation history. | BR-6, BR-7 | Discovery “Hackathon journey and MVP”; A-8, A-12 | Inspect the demonstrated data path and verify no conversation store; no claim about unrelated logs until checked. |
| D-R5 | A scripted two-minute video begins with in-person listening, moves to the remote exchange and communicates “on est tous aidants” and the participant-visible end. | No dedicated BR; event deliverable | Discovery “Hackathon journey and MVP”; A-9, A-11; event summary | Storyboard and timed video review. |

## Dependencies, exclusions and open decisions

The [infrastructure ADR](../adr/0001-web-demo-infrastructure.md) remains **PROPOSED**. Web delivery and the Vue/Nuxt preference are user direction (A-19); a frontend and backend are requested (A-20). The technical choice, secure access and real audio on two LAN devices still need verification. This PRD does not select them.

For D, real users seeking support, public matching, accounts, administrator archives, operational moderation, emergency calls and psychological-effect claims are excluded (A-8, A-10 to A-13). The demo story between separation and grief, the exact role labels, identity presentation and disconnect handling still need definition. For S, safety response, reports, archive governance, advice boundaries, legal analysis and a method for assessing effects are unresolved (A-4, A-5, A-11); none may be inferred from the demo.

## Coverage and next decomposition

The inventory covers discovery's four functional needs: entering by intention (F-01), subject and listening relevance (F-02), exchange and closure (F-03 to F-05), and later reporting/protection (F-07 to F-09). It also records anonymity (F-06) and the discovery's evidence question (F-10). The scripted video is a delivery requirement (D-R5), not an application feature. No feature documents have been created from this inventory yet. Use [create-features](../../.agents/skills/create-features/SKILL.md) on this PRD for a selected horizon or on a later scoped PRD.

## Source reconciliation and review record

A-5 asks for administrator archives in a real service; A-11 defers archive policy, and A-12 requires no stored demo conversations. These are different horizons, not a deletion rule for the real service. A-9 proposed a two-to-five-minute video; the supplied event constraint requires a two-minute submission. A-17 considered mobile; A-18 and A-19 select a web hackathon demo and allow later redesign. A-22 and A-23 replace any same-device assumption with two devices on one LAN.

Checked the discovery, BA brief, cited intake decisions, product and technical context, and event summary on 24 October 2026. **NOT RUN:** two-device and audio checks, storage/log inspection, storyboard timing and real-user safety or legal validation; no scoped implementation or operational service exists for those checks. Explicit approval of this PRD: Not provided.
