# Business brief: short-lived listening spaces (working title)

Mode: Living product context
Date: 2026-10-24
Primary product source: `docs/context/product-context/intake/espaces-ecoute-ephemeres.md` (the user's exact answers).
Primary event source: `docs/context/DevDay-Paris-Hackathon-Kickoff.pdf` (hackathon constraints only).
Related draft: `docs/context/product-context/discovery/entre-nous-product-discovery.md` (a companion synthesis, not an independent source for product decisions; A-14).
Supporting research: `docs/context/product-context/research/securite-confidentialite-ecoute-citoyenne.md` (official-source questions on safety and privacy, not settled product choices).

## Original idea

The original French request is preserved verbatim below. The English analysis follows it.

```text
Lance-moi l'agent BA et prépare un brainstorming. Je pense que la première étape pour trouver une idée, c'est de déterminer le secteur d'activité. Quand je me suis inscrit à ce hackathon, j'ai choisi les thèmes impact et public, car chaque étape, je les documente en direct sur Twitter, je partage ce que je fais, ce que j'apprends. La première chose, c'est trouver un secteur d'activité que je connais ou où je peux avoir de l'impact. Car ce sérieux doit aller dans des éléments comme l'éducation ou des choses que je connais pas du tout, les énergies, etc. Je ne sais pas comment ça fonctionne, mais par contre, à partir de mon parcours et de mes expériences, que ce soit dans des groupes médias, que ce soit dans la fintech ou dans la création de contenu et la japonimation, je pense qu'il y a des éléments qu'on peut mettre en commun pour créer un projet qui aligne ces secteurs d'activité. Je vois bien quelque chose comme le média positif. Je sais pas si tu connais, un endroit, un espace où les gens peuvent créer et partager une information positive sur le monde, qui ne soit pas un média, que ce soit pas un relais de quelque chose qui soit là pour faire de l'argent, mais qui soit là pour aider les gens dans leur quotidien, leurs habitudes, etc. L'une des choses, l'une des plus grandes maladies qui se développe de plus en plus en France et en Europe, c'est tout ce qui est dépression, épisodes dépressifs, etc., où les personnes n'arrivent pas à expliquer leur mal-être, expliquer quelque chose qui va pas, etc., et sollicitent beaucoup de psychologues. Et beaucoup de personnes ont besoin d'un suivi psychologique. Je pense que créer un espace anonymisé qui permette aux personnes qui ont besoin de parler d'un sujet très précis et très dur à parler, comme par exemple le deuil, la séparation, la maladie, le cancer, quoi d'autre, tout ce qui est sujet profond, etc. des gens qui ont besoin d'être écoutés, de se sentir écoutés sur ces sujets-là et qui ont besoin de parler, créer un espace qui rassemble les gens qui vivent ce genre de situation pour créer des espaces de discussion sains. Et je pense que ça peut être une bonne idée. Pas forcément un réseau social, un réseau social, mais par contre une plateforme qui permet de créer des chats de discussion éphémères. C'est très important, anonymisé, éphémère, et le but, c'est d'échanger sur un sujet particulier, où les personnes pourront créer un topic, un peu comme sur un forum, et la personne qui répond lance un chat ou quelque chose du genre. J'ai pas encore, c'est une idée assez vague, mais qui pourrait servir de première ébauche pour un brief.
```

## Problem and current situation

The user has observed people facing social isolation who, when a difficult situation arises, feel blocked by their emotions and keep their problems to themselves (A-1). They say some people hesitate to contact a psychologist or medical professional and continue living with those problems; the unmet need they want to address is accessible first emotional support without requiring professional contact first (A-6). The user has personally been present to listen in some of these moments and observed that it helped those people move forward (A-1). This is the user's experience, not evidence that a platform would reproduce the same result. The user's statements about depression prevalence, how many people hesitate to seek care, and universal demand remain unverified.

## People affected

The first audience is adults in France experiencing social isolation who are going through something difficult and need to speak about it (A-1; A-7). The proposed listeners are fellow citizens, rather than health professionals (A-1), who have lived through a comparable difficult situation and are willing to share that experience (A-3). The first concrete situation and listener eligibility are Not provided.

## Intended outcome

The user wants an isolated person to receive first emotional support by speaking about a difficult subject without judgment and feeling listened to by another citizen (A-1; A-6). In the envisioned exchange, the listener can describe how they got through a comparable situation and offer related advice when that fits the informal conversation; some speakers want only to be heard (A-3; A-4). The user wants the demonstration to convey “on est tous aidants” (A-11), without yet defining permanent participant roles. The user's broader aim is to help participants feel better and contribute to mental well-being (A-3; A-6). These are intended outcomes, not demonstrated effects. The user envisions occasional use when needed, not retention or monetization as the goal (A-2).

## Candidate MVP boundary

### Hackathon demonstration boundary — confirmed

The user validates **a locally testable mini-prototype alongside the two-minute video**, with two fictional participants on distinct devices sharing one LAN, sample conversations, two-way chat and a real audio-call capability (A-8; A-10; A-12; A-13; A-22; A-23). After reviewing the UX mockup, they selected the subject-led entry and made voice optional for a person who wants written chat only (A-30 to A-32). In the video, the emphasis is the **start of a conversation**, the idea **“on est tous aidants”**, and the participant-facing **“tout s'efface”** ending (A-11). The application journey should show chat activation, reciprocal messages, an optional real call, and closure from either written chat or the call so neither participant can see or resume the exchange (A-5; A-9; A-10; A-13; A-28; A-32). The prototype is for local fictional demonstrations, not real chats with people seeking support, and does not establish readiness for public use.

The local prototype stores no conversation history (A-12); finishing a session clears its live messages and any active audio connection. This is distinct from the administrator-side archive wanted for a future real service (A-5; deferred by A-11). The demonstration must not claim that legal and safety rules for real conversations have already been resolved.

**Scope correction, 25 October 2026 (A-37, A-38):** The application is an interactive MVP micro-application, with server-held sessions, user-created conversation subjects and a second client choosing an open session by subject. The app does not auto-play a scripted dialogue or limit its session choice to the earlier grief example. The scripted pitch video is a separate deliverable. The [scoped delivery PRD](../../../prds/interactive-session-mvp.md) specifies the application boundary for review; older sample-message candidate checks below are historical proposals where they conflict with A-38.

**Delivery order and call boundary, 25 October 2026 (A-39, A-41):** [Lot 1](../../../prds/build-in-public-video-lot-1.md) is a chat-centered video for Build in Public and a rapid presentation of the product, with no audio-call scene. [Lot 2](../../../prds/interactive-session-mvp.md) is the working interactive micro-application, including the optional real audio call, and follows quickly; no dated interval is provided. Video scenes made before lot 2 works illustrate the intended interaction, not a verified implementation. This later decision refines the earlier video-call idea in A-10 and the historical event-fit wording below.

### Envisioned service — later real-user boundary

#### In scope

| ID | Business behaviour | Evidence |
| --- | --- | --- |
| BR-1 | A person experiencing social isolation can open a topic about a difficult situation they wish to discuss. | A-1; original request |
| BR-2 | Another citizen can respond and begin a listening exchange about that topic. | A-1; original request |
| BR-3 | Participants can enter an exchange without revealing their identity to each other, to make speaking without judgment easier; the exact identity rules remain to be defined. | A-1; original request |
| BR-4 | The participant conversation has a definite beginning and end; its content later remains in an administrator archive under rules still to be defined. | A-5 |
| BR-5 | A citizen willing to listen can indicate subjects they accept, such as grief or divorce; the service can connect them with a citizen seeking to speak about one of those subjects. | A-2 (proposed behaviour) |
| BR-6 | The first demonstration shows a matched speaker explaining a separation or bereavement, while a listener with relevant lived experience hears them and may share experience or advice according to the exchange. | A-2; A-3; A-4 |
| BR-7 | When the conversation ends, it disappears from both participants' view and they have no way to resume it or contact each other through the service. | A-4; A-5 |
| BR-8 | Conversation history, including reported messages, remains archived for administrator review rather than being deleted when the participant chat ends. | A-5 |
| BR-9 | A person can seek this first emotional support without first contacting a psychologist or medical professional. | A-6 |
| BR-10 | The first real-user launch is intended for adults in France only. | A-7 |
| BR-11 | A conversation may include an ephemeral call as well as chat messages; voice is optional for an exchange. In the demonstrated journey, ending written chat directly or ending an optional call closes the participant exchange so neither can resume it or reconnect through the service. | A-10; A-13; A-5; A-32 |

#### Outside current scope

The hackathon prototype excludes real conversations with people seeking support, persisted chat histories, and real emergency escalation (A-8; A-10; A-12). The envisioned service's first exchange is between citizens, not a consultation with a health professional (A-1; A-6). Ongoing participant connections, dating, retention, and making money are not the user's aims for this product (A-2; A-5). A closed conversation cannot continue or turn into direct contact through the service (A-5). Other exclusions are Not provided.

## Constraints and dependencies

- The user wants anonymity to reduce fear of judgment (A-1) and an ephemeral exchange (original request); the operational meaning of both is Not provided.
- Because proposed discussions concern painful and potentially urgent situations, the safety boundary and who responds to harmful or urgent messages must be decided before claiming the space is healthy (inference from A-1 and original request; open question, not a confirmed feature).
- The user questions whether fixed “aidant” and “victime” profiles are suitable (A-2); the role model remains undecided.
- The appropriate boundaries for advice offered by a citizen with lived experience are Not provided (A-3); this matters to the credibility and safety of the proposed exchange.
- The user requires moderation when a chat becomes hurtful, but the moderator, response process, and archive retention duration are Not provided (A-4; A-5).
- Administrator-side conversation archives are a user requirement for the envisioned service (A-5), but the user defers their policy to a second phase after the hackathon demo (A-11). Who may access them, for what purpose, how long they are kept, and how participants are informed are Not provided.
- The user prefers confirmation before any platform contact with authorities or emergency services in severe cases (A-5). This is a proposed consent principle, not a validated universal emergency rule; the exact response requires a separate safety and legal decision.
- Messages may contain data about mental health even outside care, and participant pseudonyms do not make administrator archives anonymous. The lawful basis, sensitive-data condition, information to participants, restricted administrator access, and finite retention periods must be established before real conversations are stored (`docs/context/product-context/research/securite-confidentialite-ecoute-citoyenne.md`, CNIL sources).
- An AIPD should be assessed before a real-user launch because the service may combine sensitive data and vulnerable participants. Whether HDS certification, medical-device rules, or platform-content rules apply depends on the final purpose and functions and requires specialist review (`docs/context/product-context/research/securite-confidentialite-ecoute-citoyenne.md`).
- A universal promise of outside contact only after user confirmation is not supported by the sources consulted: urgent danger and some harms to minors or people unable to protect themselves can raise different duties. The product must not imply that volunteer listeners themselves provide emergency response (`docs/context/product-context/research/securite-confidentialite-ecoute-citoyenne.md`, CNIL, Service-Public and Légifrance sources).

## Event fit

The user says they registered for “impact et public” and has confirmed that “public” refers to the event's **Build in Public** track (A-16). They supplied a screenshot of an X post presenting the Product Discovery with `#parisdevdayhack`; the individual post URL is not available (`docs/context/product-context/evidence/build-in-public-product-discovery.png`). This documents one published progress update, not completion of all event requirements. Submission is due 25 October 2026 before midnight Paris time and requires a **two-minute pitch video** (`docs/context/DevDay-Paris-Hackathon-Kickoff.pdf`, p. 6, checked directly).

The deliverables are a locally testable mini-prototype **and** a scripted, storyboarded pitch video using fictional actors and messages (A-8; A-9; A-10; A-12; A-13). The video first shows an in-person listening exchange, then a fictional remote chat; it need not show a working application (A-9, A-39, A-41). The remote scene prioritizes the beginning of the exchange, conveys “on est tous aidants,” and shows chat activation, reciprocal messages and the end of participant access/contact (A-2; A-5; A-10; A-11; A-28; A-41). A-10's earlier suggestion to show an ephemeral audio call is superseded for the video by A-41; the real call remains in lot 2. The user proposed a duration of two to five minutes (A-9); the submission version must fit the event's two-minute requirement. A longer cut would be a separate optional artifact, not the required pitch.

## Success signals

Hypothesis: In a test, an isolated participant can raise one difficult topic, receive a relevant lived-experience response from another citizen, and voluntarily report whether they felt heard without judgment, gained a useful perspective, or felt better afterward. Record harmful exchanges and whether participants could stop and report them. No target, measurement method, or platform evidence has been supplied. The user's belief that everyone needs this and that it will benefit society (A-6) remains an impact hypothesis; a positive result cannot be guaranteed for every exchange.

### Candidate acceptance criteria to validate

These are BA proposals in response to the user's concern (A-4), not confirmed requirements or a claim of effectiveness.

| ID | Observable check | Evidence needed |
| --- | --- | --- |
| AC-H1 | A person seeking support can choose separation or grief and enter a conversation with a citizen who has opted to listen on that subject. | Demonstrated journey and stated listener experience |
| AC-H2 | The speaker can ask to be heard or invite the listener's experience and suggestions during the informal exchange. | Demonstrated exchange reflecting the speaker's preference |
| AC-H3 | Either participant can leave or report a hurtful exchange, and a reported case reaches a responsible moderator. | Scenario test with a named response owner |
| AC-H4 | Closing the conversation removes it from both participants' view and prevents further contact or resumption. | Demonstrated closure from both participant accounts |
| AC-H5 | With consenting test participants, value is checked by asking whether they felt heard and whether the exchange caused harm or discomfort. | Voluntary feedback and a review of negative reports; no invented success threshold |
| AC-H6 | Archived conversation history remains available only to authorized administrators for defined moderation purposes, with an explicit retention and access rule. | Demonstrated administrator review and documented rule; details still to be decided |
| AC-H7 | Before a real-user test, a named moderator and backup, reporting procedure, operating hours, and severe-danger route are documented and exercised with fictional cases. | Dry-run record and assigned owners; proposal informed by `docs/context/product-context/research/securite-confidentialite-ecoute-citoyenne.md` |
| AC-H8 | In the hackathon demonstration, two fictional participants can activate a chat, exchange scripted messages, and finish the session without a call; an optional call is also available. Neither can reopen the exchange or contact the other in the demonstrated journey. | Recorded journey from both participant viewpoints for chat-only and call routes; disappearance is a participant-facing behaviour, not a claim of deletion from all storage. |
| AC-H9 | The two-minute video makes the start of the exchange and the message “on est tous aidants” understandable without suggesting that only a permanent class of “helpers” can listen. | Storyboard review against A-11; exact role labels remain a choice to make. |
| AC-H10 | The local prototype supports two fictional participants on separate devices on the same LAN sending messages and choosing a real audio call; either ending route clears the live exchange on both sides without storing conversation history. | Hands-on two-device demonstration of both chat-only and call routes, and check that no account, database, or persistent conversation store is used (A-12; A-13; A-32; owner's 24 October 2026 device and network decisions). |

## Environmental impact claim and evidence

Not provided. The user's chosen Impact theme does not imply an environmental claim.

## Hypotheses to test

- Topic-based, anonymous, ephemeral conversation makes it easier to speak and feel heard.
- One life situation could provide a credible first use case for the hackathon.
- The benefit the user observed from listening in person could also occur in an online exchange between strangers.
- Choosing “I need to talk” or “I can listen” for each conversation may avoid fixed and potentially stigmatizing profiles; the user has not decided this.
- A topic match alone, with a listener's current availability, may be sufficient for a first demonstration; the matching rule is not decided.
- A listener's comparable lived experience improves the usefulness of the exchange; this is a proposed mechanism, not a proven outcome.
- Participant feedback plus handling of negative incidents could provide initial evidence of usefulness and safety; neither would guarantee individual outcomes.
- A consent-first route to outside help could protect participant choice, but the response to imminent danger and availability of reliable identifying information require review.
- Accessible first emotional support could help people who hesitate to seek professional help feel better; the expected prevalence and benefit to society have not been established.
- Showing a fictional in-person exchange before the remote chat may make the service's intended emotional value understandable in the two-minute pitch; this is a presentation hypothesis, not evidence of effectiveness.
- Presenting speaking and listening as intentions for an exchange, rather than fixed identities, may convey “on est tous aidants” without stigmatizing either participant; the precise wording remains to be chosen (A-2; A-11).

## Open questions

1. Can the same person speak in one conversation and listen in another, or are these fixed profiles? How would a listener describe their relevant lived experience?
2. Should the demonstration use one separation scenario, one bereavement scenario, or both? What kind of advice should be allowed or avoided?
3. What is hidden from the other participant in the demonstration? Archive access and duration are explicitly deferred to the later real-service phase (A-11).
4. Who reviews harmful-message reports, when, and what response is expected when someone expresses urgent distress? Does “contacting authorities with confirmation” mean the participant initiates the call, the platform asks permission to call, or both? How are exceptions for imminent danger handled?
5. Later real-service phase: which retention periods, access roles, legal grounds, and participant notices justify the administrator archive of ordinary and reported chats for adults in France? See `docs/context/product-context/research/securite-confidentialite-ecoute-citoyenne.md` (A-11).
6. Which one separation or bereavement scenario will anchor the required two-minute video? The local mini-prototype may include more than one fictional example, but the pitch still needs a clear focal story (A-9; A-12; A-13; kickoff PDF p. 6).
