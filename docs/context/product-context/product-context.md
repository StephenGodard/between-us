# Product context — short-lived listening between citizens

**Updated:** 25 October 2026. This is living scaffolding; the demonstration scope is confirmed, while the [Product Discovery](discovery/entre-nous-product-discovery.md) and [BA brief](briefs/espaces-ecoute-ephemeres.md) retain labeled hypotheses and gaps. The [experience context](../experience-context/experience-context.md) records the latest UX choices and open design questions. “Entre nous” is a working name, not a selected final name.

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

**Latest video production direction (A-43, 25 October 2026):** With the local application now available, the owner requests and accepts a two-minute presentation moving from the landing to actual application footage, a fictional grief exchange and its visible closure, ending with “On est tous aidants.” This replaces A-9's in-person opening and refines the original video-before-application order below. Production assets and the optional narration are in [media/product-demo](../../../media/product-demo/README.md). Publication and final-cut acceptance are separate from this production authorization.

The owner confirms that the “public” theme selected at registration refers to the hackathon's **Build in Public** track. They shared an X post presenting this Product Discovery with `#parisdevdayhack`; the [user-supplied screenshot](evidence/build-in-public-product-discovery.png) records that post (A-16). The individual post URL was not supplied. This progress post does not change the product decisions below.

The demonstration uses **fictional, acted exchanges only** (A-8, A-10). A-39 orders its two deliverables into lots: **lot 1 is the video** for Build in Public and rapid product presentation; **lot 2 is the interactive micro-application**, to follow quickly. The exact interval is Not provided.

The owner explicitly approved both scoped delivery PRDs on 25 October 2026 (A-40): [lot 1 video](../../prds/build-in-public-video-lot-1.md) and [lot 2 application](../../prds/interactive-session-mvp.md). This records scope approval; storyboard, implementation and acceptance checks remain outstanding.

1. **Lot 1:** a [scripted, chat-centered video PRD](../../prds/build-in-public-video-lot-1.md) beginning with in-person listening and moving to a fictional remote written exchange (A-9, A-39, A-41). The owner considered two to five minutes; the [kickoff](../hackathon-kickoff.md) requires a **two-minute** submission pitch. A staged interface scene does not prove the lot 2 application works. The video does not show an audio call (A-41).
2. **Lot 2:** a [locally testable, interactive micro-application PRD](../../prds/interactive-session-mvp.md) with user-created subjects, server-held sessions and a choice among open subjects on another client (A-33, A-37 to A-39). Two fictional participants exchange messages on distinct LAN devices and can optionally make a real local audio call (A-12, A-13, A-22, A-23, A-32, A-41). People choose and perform the actions themselves; the application does not automatically play through a scripted exchange (A-37, A-38). Closure makes the exchange disappear **from participants' views** (A-5, A-10, A-11). The demo does not store conversations (A-12).

The idea to make visible is that a human conversation can begin quickly and that “on est tous aidants” (A-11). The current [`prototype/`](../../../prototype/README.md) was begun before discovery; its behaviour and interface are exploratory, not validated product decisions (A-14).

The owner later chose **grief** as the principal fictional exchange topic and a **warm, human** interface atmosphere (A-24 to A-26). The exact script, screen layout, labels and visual system remain open; see the [experience context](../experience-context/experience-context.md).

The owner then emphasized that the product is a **reciprocal ephemeral conversation**: each participant can write and respond, regardless of an “aidant” framing (A-28). Entry intentions, if used, describe why someone joins; they do not restrict participation. The [conversation UX options](../experience-context/conversation-ux-options.md) compare ways to present this without fixed identities.

**Latest MVP scope correction (A-38):** The application is a real, interactive micro-application, not a scripted walkthrough. A client opens a server-held session by entering a conversation subject; another client sees open sessions and chooses one according to the subject they want to discuss. Subject choice must extend beyond the single grief example. Grief remains an example for the separate fictional video, not a fixed or automatically played application conversation. The [scoped MVP PRD](../../prds/interactive-session-mvp.md) records the delivery boundary for review.

The owner wanted to try entry alternatives before deciding which feels fluid and intuitive (A-29). After reviewing the [lightweight entry-flow mockup](../experience-context/entry-flow-experiment.md), they selected the subject-led variant A (A-32). This is their design direction, not an external usability finding.

After reviewing the mockup, the owner selected the two-intention, subject-led first screen: a person who needs to talk proposes a subject and waits; someone available to listen sees open subjects and chooses one (A-30 to A-32). The [selected demo entry direction](../experience-context/subject-entry-flow.md) explored this with one fictional grief topic; A-38 broadens the local application to user-created subjects and a choice among open sessions. A public real-person service, its privacy rules and matching behaviour remain outside the confirmed demo scope.

The user now prioritizes architecture work for the **hackathon demonstration**, aiming to win the event, and accepts a later redesign (A-18). They choose a **web application** for this demo and prefer Vue/Nuxt (A-19). They add a frontend and backend (A-20), rank backend skills .NET, Python, TypeScript/Node, Java, PHP (A-21), and require two devices on the same LAN (A-22, A-23). Looking at the selected entry flow, they explicitly identify a client/server model: clients open or join subject sessions, while a reachable server holds sessions and connects the two clients (A-33). They further clarify that participants visit a simple user-facing URL and that the app reads and sends session data through a **separate backend service** (A-34). The existing prototype does not select the final hosting, rendering mode, or backend technology.

The owner further specifies that the person opening a subject can cancel while waiting and intentionally end the active exchange, closing its server-held session (A-35). They propose withholding that close-session action from the joiner, but ask to challenge the rule; A-36 then confirms the joiner may leave: that clears the current exchange and returns the opener to waiting with the same subject. Hanging up an optional call returns both people to written chat without ending the subject session. For the demo, the services run locally on the owner's PC. The planned validation sequence starts with Docker-based services and clients on the PC, then uses two phones connecting to the PC over the LAN (A-35). This is the intended test plan, not a completed test.

**Outside this demo:** Matching real people in distress, a public service, administrator archives, operational moderation, actual emergency calls and proof of an effect on mental health (A-8, A-10 to A-13). Local disappearance of messages illustrates a session ending; it does not define retention policy for a future service.

**Optional audio interaction (A-42):** Either participant may propose a call; the other accepts or declines. Microphone denial or call setup failure returns both to the same chat with explanatory feedback. The owner explicitly requested implementation on 25 October 2026. Actual two-phone audio verification remains outstanding.

## Later phase: conditions before real exchanges

For a future real service, the owner wants administrators to retain reported content and conversation history while participants lose access after closure (A-5). They explicitly deferred this policy until after the hackathon (A-11). Before a pilot with real people, decisions and specialist review are needed on participant information, access and retention, reports and moderation, urgent distress, possible emergency contact, listeners' responsibilities, and how to measure both benefits **and harms** (A-4, A-5; [preliminary research](research/securite-confidentialite-ecoute-citoyenne.md)). These rules remain undefined and unimplemented for real use.

## Hypotheses and open questions

- **Hypothesis:** Per-session intentions such as “I need to talk” and “I can listen” may express “on est tous aidants” better than fixed profiles (A-2, A-11).
- **Hypothesis:** Comparable experience in a listener may make an exchange more useful; the needed similarity and matching approach remain untested (A-2, A-3).
- **Not provided:** The exact grief script and video storyboard (A-9, A-26). The principal fictional topic is now grief.
- **Not provided:** Rules distinguishing listening, lived-experience sharing and acceptable advice (A-3, A-4).
- **Not provided:** Criteria for claiming a real version helps without increasing harm (A-4, A-6).
- **Not provided:** Complete legal and operational rules for data, moderation and emergencies in a real version (A-5, A-11).
- **Hypothesis:** A mobile app may suit the later service; the user suggested it, then selected a web demo and accepted a later redesign (A-17 to A-19). See the [technical context](../technical-context/technical-context.md).

## Reading order for agents

Read the [context index](README.md), then this summary. For a disputed requirement or decision, check its A-n answer in the [intake](intake/espaces-ecoute-ephemeres.md); later answers may refine earlier ones. Use the [discovery](discovery/entre-nous-product-discovery.md) for the problem and journey, the [brief](briefs/espaces-ecoute-ephemeres.md) for BA scope, the [technical context](../technical-context/technical-context.md) for observed code and architecture options, the [kickoff](../hackathon-kickoff.md) for event facts, and the [research](research/securite-confidentialite-ecoute-citoyenne.md) for questions requiring review. Do not infer product facts from code, historical examples or the Animesphere discovery, which was supplied as a **structure reference only** (A-14).
