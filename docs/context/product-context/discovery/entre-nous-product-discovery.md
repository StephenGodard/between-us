# Entre nous — Product Discovery

**Status:** Ready for review; the document as a whole has not been approved  
**Date:** 24 October 2026  
**Name:** “Entre nous” is a working name taken from the exploratory prototype; the final name has not been chosen.  
**Notion copy:** [Entre nous — Product Discovery](https://app.notion.com/p/40332705124c81de9b82fbad881f7ce9).  
**Structure reference:** [Animesphere.io — Product Discovery](https://animesphere.notion.site/Animesphere-io-Product-Discovery-1bb32705124c8056bc3ff23392ebcf20).  
**Primary sources:** [intake](../intake/espaces-ecoute-ephemeres.md) for the user's product decisions and the [supplied hackathon PDF](../../DevDay-Paris-Hackathon-Kickoff.pdf) for event constraints. Answer IDs refer to the user's exact words in the intake; the [event summary](../../hackathon-kickoff.md) is a reading aid. The [BA brief](../briefs/espaces-ecoute-ephemeres.md) is a related draft, not an independent source for this discovery. A-14 places this discovery before development decisions.

> **Working vision.** Help someone going through a difficult time and feeling isolated find an initial listening ear in another citizen. Each conversation has a beginning and an end, with no relationship to maintain afterward. The idea that “we can all be there for someone” is central, without assigning anyone a permanent “victim” or “helper” identity (A-1, A-2, A-5, A-6, A-11). This English rendering of the user's phrase “on est tous aidants” is a translation, not an approved tagline.

## Project overview

The proposed service is a space for **citizens to listen to one another**, initially illustrated through separation and grief. One person shares what they are going through; another, available to listen and perhaps familiar with a comparable experience, responds. The exchange can stay focused on listening or include lived experience and advice if the speaker welcomes it. The intended interaction is brief and nonjudgmental, and is not presented as healthcare (A-1 to A-6).

**Origin of the idea:** The project owner has seen isolated people struggle with difficult emotions and observed that listening to them could help them move forward (A-1). They believe some people keep their difficulties to themselves because they hesitate to approach a psychologist or another healthcare professional (A-1, A-6). These observations motivate the idea; they do not establish that a platform would have the same effect.

**Confirmed hackathon scope:** A locally testable mini-prototype with two fictional participants, sample conversations, two-way chat and a real local audio call, plus a scripted two-minute video. The demonstration includes no real people seeking support, saved conversations or real emergency response (A-8 to A-13; kickoff video requirement).

## Who it is for 👤

The intended audience for a possible future service is **adults in France** (A-7). The two profiles below describe **intentions during an exchange**, not fixed categories of people. Whether the same citizen would take either role at different times remains a **hypothesis to confirm** (A-2, A-3, A-11).

### Profile 1 — “I need to talk”

- **Need:** Talk about a separation, bereavement or another difficult situation and receive an initial, nonjudgmental response (A-1, A-4, A-6).
- **Pain points:** Social isolation, emotions that are hard to explain, keeping problems to oneself and hesitating to contact a professional (A-1, A-6; the owner's observations, not user interview findings).
- **Proposed key question:** “Who can I tell what I am going through right now, without being judged?” **Wording hypothesis**, not a quote from an interviewed user.
- **Current alternatives:** Staying silent or contacting a psychologist are mentioned by the owner (A-1, A-6). Talking to a relative or in an online community is a **hypothesis to investigate**.
- **Barriers:** Fear of judgment (A-1). Trust in a stranger, confidentiality and the risk of a hurtful message are **risk hypotheses** raised by A-2, A-4 and A-5.
- **Candidate promise:** “Find someone willing to listen to what I am going through, for the length of a conversation.” **Messaging hypothesis**, without a guarantee of improved well-being.

### Profile 2 — “I can listen”

- **Need:** Offer availability and, where useful, experience of a comparable difficulty to someone who wants to talk (A-2, A-3).
- **Pain points:** **Not provided** by prospective listeners; their motivation or ability to offer support cannot be inferred from the owner's experience alone.
- **Proposed key question:** “How can I be there for someone on a subject I know without imposing a solution?” **Wording hypothesis** (A-3, A-4).
- **Alternatives:** **Not provided**; to discover with prospective participants.
- **Barriers:** Boundaries around advice, fear of responding badly and handling urgent distress are **risk hypotheses** raised by A-2 to A-5.
- **Candidate promise:** “Choose when and on which subjects I am available to listen.” **Hypothesis** to test against actual participant availability.

## Project objective

**Desired change:** Enable a socially isolated person to begin speaking about a difficult experience with another citizen, feel heard without judgment and, if wanted, receive relevant lived experience (A-1, A-3, A-4, A-6). The project aims to contribute to mental well-being, but that effect has not been measured (A-3, A-6).

**Demonstration objective:** Make the sequence understandable and testable: “I choose to talk or listen → a conversation begins → messages and an audio call can take place → the session ends and disappears from both participants' views.” The video starts with in-person listening and moves to a remote exchange in the application; the prototype lets people try the same principle locally (A-9 to A-13).

## Problems to address

### 1. Facing a difficult situation without an accessible first listening ear

The owner has observed isolated people becoming overwhelmed by emotions and unsure whom to talk to (A-1). Their priority is an initial conversation **between citizens**, without requiring a healthcare journey first (A-1, A-6).

**Need:** Create a simple opportunity to be heard on a specific subject. **To verify:** How often this situation occurs, what triggers it, and how a need to talk differs from a need for advice.

### 2. Being able to confide in someone without judgment

The owner asks for anonymity primarily to make speaking without judgment easier (A-1). Participants should not establish an ongoing link or be able to reconnect after the exchange (A-5).

**Need:** Conceal participants' identities from each other and provide a clear end to the conversation. **For a real service, define:** What is hidden, what the operator knows and what is retained.

### 3. Finding relevant listening without turning the exchange into a consultation

The owner proposes connecting people by subject, initially separation or grief, potentially with a listener who has experienced something comparable (A-2 to A-4). Some speakers want advice; others only want to be heard (A-4).

**Need:** Allow an informal exchange that follows the speaker's expressed preference. **Hypothesis to test:** Similar lived experience makes the exchange feel more relevant; this is not established.

### 4. Building trust without promising unproven safety

The owner wants to prevent a hurtful exchange from making things worse and asks how to show that the application really helps (A-4). They want reports and conversation history retained for administrators in a future real service (A-5), but have deferred the archive policy until after the hackathon (A-11).

**Need:** Before real use, define moderation, report handling, response to serious distress, confidentiality, archive access and evaluation criteria. The [preliminary research](../research/securite-confidentialite-ecoute-citoyenne.md) identifies these decisions; it does not resolve them.

## Functional needs

The behaviours below describe **proposed user needs**. The exploratory prototype's technology and architecture are not product requirements.

### Enter an exchange according to one's intention

A person should be able to say whether they want to **talk** or are **available to listen** in that exchange (A-2, A-3). Permanent “helper” and “victim” identities have not been chosen; the owner's “on est tous aidants” calls for non-stigmatizing wording (A-2, A-11).

### Choose a subject and find relevant listening

The speaker chooses a subject they want to discuss; the listener indicates the subjects on which they are willing to listen. Matching by subject and comparable experience is the owner's proposal and still needs definition and validation (A-2 to A-4). Separation and grief are the first examples (A-4).

### Begin, continue and end an exchange

Both people can send messages. Depending on the conversation, the speaker can be simply heard or welcome lived experience and advice (A-2 to A-4). An audio call is required in the local prototype (A-13). The session has an explicit end; afterward, participants cannot see the exchange or reconnect through it (A-5, A-10).

### Report and protect — later phase

A participant should be able to report a hurtful message; human review and administrator access to history are wanted for the real service (A-4, A-5). Archive, access, moderation and possible emergency-contact rules are **outside the hackathon scope** and need the specialist review already identified (A-5, A-11).

## Hackathon journey and MVP

**Demonstrated journey:** A fictional person experiences separation or grief → chooses to talk → another chooses to listen → the chat opens → a few messages show listening and perhaps shared experience → they start a local audio call → ending the call closes the session and removes the exchange from both views (A-3, A-4, A-9 to A-13).

**Confirmed deliverables:** A locally testable prototype with two fictional participants, chat, sample conversations and an audio call; and a scripted **two-minute** submission video (A-8 to A-13; `docs/context/hackathon-kickoff.md`). Code created in `prototype/` before this discovery is **exploratory**; its existence does not validate the detailed journey or the future service.

**Outside the demo:** Conversations with real people seeking help, public matching, accounts, archived exchanges, operational moderation, emergency calls and proof of improved well-being. Prototype data remains local and is not stored in a conversation history (A-8, A-10 to A-13).

**Demo success signals, without invented targets:** A viewer understands within two minutes who speaks, who listens, how the exchange starts and what happens when it ends; the owner can repeat the journey in the prototype; and both sides see that a closed session cannot be reopened. These signals demonstrate clarity and a technical journey, **not psychological effectiveness**.

## Hypotheses and decisions to investigate

| Subject | Current state | Discovery question |
| --- | --- | --- |
| Session intentions rather than fixed profiles | Hypothesis from A-2 and A-11 | Can someone naturally choose to speak one day and listen another? Which words avoid stigma? |
| Matching by comparable experience | Proposal in A-2/A-3; value unproven | How similar must experiences be for someone to feel understood? |
| Separation or grief as the main story | Both are confirmed examples (A-4) | Which makes the need clearest in a two-minute video? |
| Advice between citizens | Conditional wish in A-3/A-4 | How can the listener know whether the speaker wants listening or suggestions, and what boundaries apply? |
| Benefit and negative effects | Intention, not demonstrated (A-4/A-6) | How can voluntary feedback and negative experiences be gathered before making benefit claims? |
| Archives, safety, urgent distress | Later phase confirmed in A-11 | Which rules and capabilities are required before admitting real participants? |

## Project reference 📝

- [Intake — exact words and decisions](../intake/espaces-ecoute-ephemeres.md)
- [BA brief — scope and candidate checks](../briefs/espaces-ecoute-ephemeres.md)
- [Safety and privacy research — later phase](../research/securite-confidentialite-ecoute-citoyenne.md)
- [Hackathon constraints](../../hackathon-kickoff.md)
- [Exploratory prototype instructions](../../../../prototype/README.md)

**Next BA review:** Review this discovery with the owner and confirm the main story, the wording of the two intentions and the exact promise. These decisions come before revising the prototype and writing the storyboard. The document must not be marked `APPROVED` without explicit approval.
