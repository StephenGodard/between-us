# Between Us — design context

**Updated:** 25 October 2026  
**Scope:** Visual and interface design for the fictional two-participant web demo. Living synthesis, not a final brand or screen approval.

## Source order and decision state

| Source | What the designer may use | State |
| --- | --- | --- |
| [Product context](../product-context/product-context.md) and [intake](../product-context/intake/espaces-ecoute-ephemeres.md) | Fictional demo, reciprocal exchange, warm and human atmosphere, subject-led entry and optional voice (A-25, A-28, A-32) | Owner decisions; consult exact answers for disputed wording |
| [Experience context](../experience-context/experience-context.md), [flows](../experience-context/user-flows.md) and [selected entry](../experience-context/subject-entry-flow.md) | Participant journey and unresolved interaction details | Living UX synthesis; entry direction selected, details open |
| [Initial PRD](../../prds/entre-nous-initial.md), [features](../../features/README.md) and [stories](../../user-stories/README.md) | Current requirement and delivery traceability | Follow each artifact's own decision state |
| [Landing](../../../landing/README.md), [brand proposal](../../../landing/brand.md), [HTML](../../../landing/index.html), [CSS](../../../landing/styles.css) | Existing color, type, composition, copy and animated phone illustration | Observed visual proposal; not a product requirement or approved app design |
| [Entry-flow mockup](../experience-context/entry-flow-lab.html) and [experiment record](../experience-context/entry-flow-experiment.md) | Existing interactive sequence and two participant perspectives | Local simulation; selected entry direction, not verified usability or working audio |

## Visual baseline from the landing

The landing uses a white canvas, dark ink text, teal emphasis, Plus Jakarta Sans, generous section spacing and rounded cards. Its phone illustration presents the opener's path from intention and « Deuil » through waiting, chat and closure. The exact palette and treatment live in [`landing/brand.md`](../../../landing/brand.md); duplicate token lists here would drift from the source. The owner requested a warm, human atmosphere (A-25) and MindDay as visual inspiration, as recorded in `landing/brand.md`. The resulting tokens, wordmark, component shapes and motion are **Hypotheses for review**, not selected application standards.

The earlier off-white and terracotta example in the [experience context](../experience-context/experience-context.md) remains an unselected hypothesis. The newer landing is the working visual reference for the next mockups; neither proposal is an approved brand decision.

**Adaptation hypothesis:** Carry the recognizable type, ink and teal accents into app mockups, then reduce landing-scale decoration around the conversation. Keep two equal chat participants readable on actual devices, with clear action hierarchy, focus states and controls that work without the landing's animation. Verify contrast and responsive layout before treating any landing token as reusable.

## Mockup coverage

The existing [entry-flow lab](../experience-context/entry-flow-lab.html) covers a simulated two-panel subject, waiting, reciprocal chat, optional call, joiner exit and closure sequence. The landing's phone is a presentation illustration of one path. No dedicated, landing-derived application mockup has yet been created in this directory. The next mockup should use this context, document which states it covers, and show each participant's view where it differs. Exact device dimensions are `Not provided.`

## Decisions and gaps for the next design pass

| Topic | Current state |
| --- | --- |
| Entry | Subject-led variant A selected by the owner (A-32); subject input, waiting and list details remain open. |
| Conversation | Both participants may send and respond (A-28); exact fictional message script is `Not provided.` |
| Optional audio | Selected as an option, with hangup returning to chat (A-32, A-36); A-42 selects invitation by either participant, acceptance or decline by the other, and return to chat with explanation on microphone denial or setup failure. Exact visual presentation remains a design detail. |
| Exit | Joiner leaves and opener waits on the same subject; opener ends the exchange (A-36). Exact interface copy is `Not provided.` |
| Visual system | Landing proposal exists; application palette, typography scale, components and motion are **Hypotheses for review**. |
| Devices and accessibility | Target device sizes are `Not provided.` Contrast, keyboard walkthrough, reduced-motion behaviour and assistive technology checks for future app mockups are **NOT RUN**. |

## Review evidence

The [entry-flow experiment](../experience-context/entry-flow-experiment.md) records its local simulated checks and limits. This design-context pass inspected the landing files and existing experience documents. **NOT RUN:** a new application mockup walkthrough, external participant study, two-device network test, real audio test or accessibility audit.
