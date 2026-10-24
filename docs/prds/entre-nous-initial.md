# Entre nous — initial product PRD

Status: READY FOR REVIEW — revision after the approved 24 October baseline
Date: 2026-10-24  
Purpose: Product-wide inventory for feature decomposition. The 24 October baseline was approved; this revision incorporates the owner's later UX decision A-32 and needs review as an artifact. No scoped delivery PRD is approved.
Build readiness: Not ready. The fictional demo needs its own scoped PRD and executable checks; the real-person service has unresolved safety, data and operational decisions.

## Sources and precedence

- [Product discovery](../context/product-context/discovery/entre-nous-product-discovery.md), updated 24 October 2026: functional synthesis and feature candidates.
- [BA brief](../context/product-context/briefs/espaces-ecoute-ephemeres.md), dated 24 October 2026: BR-1 to BR-11 and candidate acceptance checks.
- [Intake](../context/product-context/intake/espaces-ecoute-ephemeres.md): original wording and explicit decisions A-1 to A-32. Later answers refine earlier ones.
- [Product summary](../context/product-context/product-context.md), updated 24 October 2026: current boundary and open questions.
- [Technical context](../context/technical-context/technical-context.md), dated 24 October 2026: constraints and proposed options only. Its proposed infrastructure ADR is not selected here.
- [Hackathon event summary](../context/hackathon-kickoff.md): the two-minute submission constraint, not a product requirement for the later service.

The exploratory `prototype/` is not a requirements source. The working name “Entre nous” is not a final product-name decision.

## Product intent and people

The owner wants someone isolated by a difficult situation to find an initial, nonjudgmental listening exchange with another citizen (A-1, A-6). An exchange is brief and ends without an ongoing participant link (A-2, A-5). The intended first real audience is adults in France (A-7); the immediate hackathon uses only fictional participants (A-8, A-10). Better mental well-being is an intended effect, not an established outcome (A-3, A-6).

The two demo entry intentions are “need to talk” and “available to listen” (A-30 to A-32). They orient entry, without limiting either person's messages (A-28). Whether a later real service uses permanent profiles remains **Not provided.** The owner’s phrase “on est tous aidants” informs the demo message (A-11), but exact interface wording is Not provided.

## Delivery horizons

| Horizon | Outcome | Boundary |
| --- | --- | --- |
| D — fictional hackathon demonstration | A repeatable web exchange on two distinct devices on one LAN, with subject-led entry, sample conversation, two-way chat, an optional real audio-call capability and participant-visible closure from either path; accompanied by a scripted two-minute video. | Confirmed by A-8 to A-13, A-18 to A-23 and A-30 to A-32, plus the event constraint. No real support seekers, saved conversation history, operational moderation or real emergency response. |
| S — possible real-person service | Let adults in France seek or offer a short listening exchange, with an end and participant privacy. | Product intent from A-1 to A-7. Real launch, matching policy, identity, safety operations, archives and evidence of benefit remain undecided or deferred by A-11. This horizon is not build-ready. |

## Feature inventory

IDs identify product capabilities for later decomposition; they are not approved feature specifications. “Confirmed” means supported by an explicit owner decision for the stated horizon. “Hypothesis” means a proposed behaviour or unresolved design choice. A-IDs link to the intake; BR-IDs link to the BA brief.

| ID | Capability / outcome | Horizon and state | BR / discovery and intake trail | Main boundary or decision |
| --- | --- | --- | --- | --- |
| F-01 | Enter an exchange through a temporary intention to talk or be available to listen. | D: subject-led option A selected in A-32. S: session-level choice for a real service remains unscoped. | Discovery “Enter an exchange”; BR-2, BR-6; A-2, A-3, A-11, A-30 to A-32. | Entry intentions never restrict who may write. Permanent profiles for S: Not provided. |
| F-02 | Establish an exchange around a subject. | D: one fictional person opens the grief subject and waits; the other chooses it from the open-subject view (A-31, A-32). S: public topic discovery and lived-experience matching remain unscoped. | Discovery “Choose a subject”; BR-1, BR-2, BR-5, BR-6; A-2 to A-4, A-26, A-31, A-32. | Demo subject entry/join behaviour needs specification; no public matching service is approved. |
| F-03 | Send and receive messages in a short two-party conversation. | D: confirmed with fictional content. S: intended, subject to real-use safeguards. | Discovery “Begin, continue and end”; BR-2, BR-6, BR-11; A-2 to A-4, A-10, A-12, A-13. | Listening versus advice follows the exchange; any explicit preference control is Hypothesis. |
| F-04 | Offer a real audio call during the active exchange. | D: real call capability confirmed, optional for each exchange (A-13, A-32). S: possible later capability, not a launch decision. | Discovery “Begin, continue and end”; BR-11; A-10, A-13, A-32. | Demo must make the call available on two LAN devices (A-22, A-23); people may stay in chat. |
| F-05 | End the exchange and remove participant access and reconnection. | D: confirmed for a chat-only end or an ended call; demo stores no conversation history. S: participant disappearance and no further contact confirmed as intent, alongside a deferred administrator archive. | Discovery “Begin, continue and end”; BR-4, BR-7, BR-11; A-4, A-5, A-10 to A-13, A-32. | Disappearance from views does not prove erasure of all data. Disconnect and retention rules: Not provided. |
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
| D-R2 | During the active exchange, the two fictional participants can choose to conduct a real local audio call; written chat remains a valid path without a call. | BR-11 | Discovery “Hackathon journey and MVP”; A-13, A-22, A-23, A-32 | Audible two-way call is available on the chosen LAN devices, while a separate run can remain in chat. |
| D-R3 | From chat, a participant can end the exchange without calling; ending an optional call also ends the exchange. Either path clears both participant views and prevents resumption through that session. | BR-7, BR-11 | Discovery “Begin, continue and end”; A-5, A-10, A-13, A-32 | Test both paths on both devices and attempt to reopen each ended exchange. |
| D-R4 | The local demo uses fictional sample conversations without a stored conversation history. | BR-6, BR-7 | Discovery “Hackathon journey and MVP”; A-8, A-12 | Inspect the demonstrated data path and verify no conversation store; no claim about unrelated logs until checked. |
| D-R5 | A scripted two-minute video begins with in-person listening, moves to the remote exchange and communicates “on est tous aidants” and the participant-visible end. | No dedicated BR; event deliverable | Discovery “Hackathon journey and MVP”; A-9, A-11; event summary | Storyboard and timed video review. |

## Dependencies, exclusions and open decisions

The [infrastructure ADR](../adr/0001-web-demo-infrastructure.md) remains **PROPOSED**. Web delivery and the Vue/Nuxt preference are user direction (A-19); a frontend and backend are requested (A-20). The technical choice, secure access and real audio on two LAN devices still need verification. This PRD does not select them.

For D, real users seeking support, public matching, accounts, administrator archives, operational moderation, emergency calls and psychological-effect claims are excluded (A-8, A-10 to A-13). Grief is the chosen main fictional topic (A-26); its exact story, subject input, waiting and joining details, identity presentation and disconnect handling still need definition. For S, safety response, reports, archive governance, advice boundaries, legal analysis and a method for assessing effects are unresolved (A-4, A-5, A-11); none may be inferred from the demo.

## Feature decomposition and coverage

This decomposition selects **horizon D only**. These feature specifications are `READY FOR REVIEW`; approval of this PRD does not approve the features or authorize implementation.

| Feature specification | Inventory capabilities | Demo requirements | Boundary |
| --- | --- | --- | --- |
| [F-D-01 — Fictional exchange and two-way chat](../features/demo-fictional-exchange-chat.md) | F-01, F-02 and F-03, for their confirmed demo portions only | D-R1, D-R4 | Subject opening, waiting, joining and reciprocal messages on two LAN devices; no automatic public matching. |
| [F-D-02 — Optional real two-way audio call](../features/demo-audio-call.md) | F-04 | D-R2 | An optional audible call between the two devices during the fictional exchange. |
| [F-D-03 — Close and clear the exchange](../features/demo-exchange-closure.md) | F-05 | D-R3; D-R4's no-history boundary also applies | Ending the chat directly or ending a call closes both participant views and prevents resumption. |

**D-R4 is shared:** F-D-01 covers fictional sample content and the absence of a conversation history during messaging; F-D-03 covers the end-state and verifies no history remains available. Its data-path inspection spans the integrated demo. **D-R5 is deliberately outside application features:** the scripted, timed video remains a separate delivery requirement to review against this PRD. F-06's exact identity presentation remains `Not provided.` for the demo; its real-service identity policy and F-07 to F-10 are deferred to horizon S. This mapping does not promote the future-service proposals into demo requirements.

## Source reconciliation and review record

A-5 asks for administrator archives in a real service; A-11 defers archive policy, and A-12 requires no stored demo conversations. These are different horizons, not a deletion rule for the real service. A-9 proposed a two-to-five-minute video; the supplied event constraint requires a two-minute submission. A-17 considered mobile; A-18 and A-19 select a web hackathon demo and allow later redesign. A-22 and A-23 replace any same-device assumption with two devices on one LAN.

Checked the discovery, BA brief, cited intake decisions, product and technical context, and event summary on 24 October 2026. **NOT RUN:** two-device and audio checks, storage/log inspection, storyboard timing and real-user safety or legal validation; no scoped implementation or operational service exists for those checks. **Earlier approval:** the owner explicitly approved the baseline `docs/prds/entre-nous-initial.md` in the conversation on 24 October 2026. That approval did not cover the A-32 revision below, the feature specifications, a scoped delivery PRD, the proposed infrastructure ADR or build readiness.

**Post-approval source update, 24 October 2026:** the owner selected grief as the principal fictional demo topic (intake A-26) and a warm, human interface atmosphere (A-25). These later choices resolve part of the original open story and experience questions recorded above. The approved requirement inventory remains unchanged; the current [experience context](../context/experience-context/experience-context.md) and [F-D-01](../features/demo-fictional-exchange-chat.md) carry the latest design context.

**Post-approval UX clarification, 24 October 2026:** the owner emphasized that either participant can write and answer throughout the ephemeral conversation, regardless of an “aidant” framing (A-28). D-R1 already requires messaging both ways; [F-D-01](../features/demo-fictional-exchange-chat.md) and the [conversation UX options](../context/experience-context/conversation-ux-options.md) make this explicit without changing the approved requirement inventory.

**Post-approval UX proposal, 24 October 2026:** the owner likes the two entry intentions and proposes opening a subject, waiting, and letting the other person select it from open subjects (A-30, A-31). The [subject-led UX exploration](../context/experience-context/subject-entry-flow.md) tests this as a fictional demo path. It is not yet an approved change to D-R1 or an authorization for public topic matching.

**Revision for review, 24 October 2026:** after trying the entry mockup, the owner said option A fits their intended experience and clarified that voice is optional for people who want written chat only (A-32). This revision updates F-01, F-02, F-04, F-05 and D-R2 to D-R3 accordingly. The earlier approval applies to the baseline, not automatically to this changed text. A real audio capability remains in the demo because A-13 explicitly required it; no public matching service is approved.

**Technical clarification, 24 October 2026:** the owner expects clients to open or join subject sessions coordinated by a server reachable on the network (A-33). This supports the selected entry path and two-device requirement; it does not select the backend stack, LAN host or a public deployment. See the [technical context](../context/technical-context/technical-context.md) and proposed [infrastructure ADR](../adr/0001-web-demo-infrastructure.md).

**Service-boundary clarification, 24 October 2026:** the owner wants participants to use a simple website URL while that app reads and sends session data through a separate backend service (A-34). This refines the architecture input without adding a durable history or an administrator interface to the fictional demo. Physical hosts and backend technology remain for the proposed ADR.
