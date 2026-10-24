# Product context — short-lived listening between citizens

**Status:** Working summary, 24 October 2026. The demonstration scope is confirmed. The [Product Discovery](discovery/entre-nous-product-discovery.md) and [BA brief](briefs/espaces-ecoute-ephemeres.md) have not been approved as a whole. “Entre nous” is an unapproved working name.

**Purpose:** Give agents the context needed before working on the project. This summary points to sources; it does not replace the user's [exact words](intake/espaces-ecoute-ephemeres.md) or the detailed discovery. A-n IDs refer to answers in the intake.

## Need and intent

The project owner has seen isolated people face a difficult situation without knowing whom to talk to. They observed that listening could help those people move forward (A-1). They want to offer an **initial conversation between citizens** to people who keep difficulties to themselves and hesitate to contact a psychologist or healthcare professional (A-1, A-6). The envisioned service is occasional: one person talks, another listens, without judgment or an ongoing relationship afterward (A-1, A-2, A-5). Contributing to mental well-being is the project's **intent, not a demonstrated effect** (A-3, A-6).

For a **possible first real launch**, the proposed audience is **adults in France** (A-7). The hackathon does not include a launch for real people seeking support (A-8, A-10).

## Product decisions expressed by the owner

| Subject | Expressed decision or wish | Source and limit |
| --- | --- | --- |
| First experience | Show an exchange between someone who needs to talk and a citizen available to listen; separation and grief are proposed subjects. | A-2 to A-4. The video's main scenario is still undecided. |
| Type of response | An informal exchange: some people only want to be heard; others welcome lived experience or advice. | A-3, A-4. Boundaries around advice remain undefined. |
| Roles | “On est tous aidants” is central; the owner questions permanent “helper” and “victim” labels. | A-2, A-11. **Hypothesis:** choose an intention for each session rather than a permanent profile. |
| Identity and end of session | Concealed identities aim to make speaking without judgment easier. At the end, the exchange disappears for participants and no contact or link between them remains. | A-1, A-5. Operator-side identification rules remain open. |
| Purpose | Occasional help, without a retention, dating or profit goal. | A-2, A-5. No business model has been decided. |
| Future safety | Prevent a hurtful message from worsening someone's situation; retain history and reports for administrators in a real service. | A-4, A-5. Archives, moderation and access are deferred until after the demo (A-11). |
| Urgent situations | A possible route to emergency services is considered; the owner prefers the person's confirmation. | A-5. Procedure, exceptions and obligations: **Not provided.** Review before real use; no universal consent rule has been established. |

## Confirmed hackathon scope

The owner confirms that the “public” theme selected at registration refers to the hackathon's **Build in Public** track. They shared an X post presenting this Product Discovery with `#parisdevdayhack`; the [user-supplied screenshot](evidence/build-in-public-product-discovery.png) records that post (A-16). The individual post URL was not supplied. This progress post does not change the product decisions below.

The demonstration uses **fictional, acted exchanges only** (A-8, A-10). It has two deliverables:

1. A **scripted video** beginning with in-person listening and moving to a remote conversation in the application (A-9). The owner considered two to five minutes; the [kickoff](../hackathon-kickoff.md) requires a **two-minute** submission pitch.
2. A **locally testable mini-prototype** with two fictional participants, sample conversations, two-way chat and a real local audio call (A-12, A-13). Chat activation, messages and closure at the end of the call should illustrate that “everything disappears” **from the participants' views** (A-10, A-11). The demo does not store conversations (A-12).

The idea to make visible is that a human conversation can begin quickly and that “on est tous aidants” (A-11). The current [`prototype/`](../../../prototype/README.md) was begun before discovery; its behaviour and interface are exploratory, not validated product decisions (A-14).

The user now prioritizes architecture work for the **hackathon demonstration**, aiming to win the event, and accepts a later redesign (A-18). They choose a **web application** for this demo and prefer Vue/Nuxt (A-19). This does not approve the existing prototype or select hosting, rendering mode, or a backend.

**Outside this demo:** Matching real people in distress, a public service, administrator archives, operational moderation, actual emergency calls and proof of an effect on mental health (A-8, A-10 to A-13). Local disappearance of messages illustrates a session ending; it does not define retention policy for a future service.

## Later phase: conditions before real exchanges

For a future real service, the owner wants administrators to retain reported content and conversation history while participants lose access after closure (A-5). They explicitly deferred this policy until after the hackathon (A-11). Before a pilot with real people, decisions and specialist review are needed on participant information, access and retention, reports and moderation, urgent distress, possible emergency contact, listeners' responsibilities, and how to measure both benefits **and harms** (A-4, A-5; [preliminary research](research/securite-confidentialite-ecoute-citoyenne.md)). None of these rules has been approved or implemented for real use.

## Hypotheses and open questions

- **Hypothesis:** Per-session intentions such as “I need to talk” and “I can listen” may express “on est tous aidants” better than fixed profiles (A-2, A-11).
- **Hypothesis:** Comparable experience in a listener may make an exchange more useful; the needed similarity and matching approach remain untested (A-2, A-3).
- **Not provided:** The single topic and exact video script among separation and grief (A-4, A-9).
- **Not provided:** Rules distinguishing listening, lived-experience sharing and acceptable advice (A-3, A-4).
- **Not provided:** Criteria for claiming a real version helps without increasing harm (A-4, A-6).
- **Not provided:** Complete legal and operational rules for data, moderation and emergencies in a real version (A-5, A-11).
- **Hypothesis:** A mobile app may suit the later service; the user suggested it, then selected a web demo and accepted a later redesign (A-17 to A-19). See the [technical context](../technical-context/technical-context.md).

## Reading order for agents

Read the [context index](README.md), then this summary. For a disputed requirement or decision, check its A-n answer in the [intake](intake/espaces-ecoute-ephemeres.md); later answers may refine earlier ones. Use the [discovery](discovery/entre-nous-product-discovery.md) for the problem and journey, the [brief](briefs/espaces-ecoute-ephemeres.md) for BA scope, the [technical context](../technical-context/technical-context.md) for observed code and architecture options, the [kickoff](../hackathon-kickoff.md) for event facts, and the [research](research/securite-confidentialite-ecoute-citoyenne.md) for questions requiring review. Do not infer product facts from code, historical examples or the Animesphere discovery, which was supplied as a **structure reference only** (A-14).
