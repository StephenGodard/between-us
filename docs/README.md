# Documentation map

Start with the [context index](context/README.md). It separates product evidence from technical analysis and identifies the hackathon source. Context is living scaffolding without an approval status; PRDs and ADRs record scoped decisions separately.

| Area | What belongs here | Current state |
| --- | --- | --- |
| [Product context](context/product-context/README.md) | Original user answers, discovery, BA brief, product summary, evidence and research | Living context; fictional demo scope confirmed, other questions labeled |
| [Experience context](context/experience-context/README.md) | Demo journey, candidate screens, warm and human direction, and open UX questions | Living context; grief story selected, visual details open |
| [Design context](context/design-context/README.md) | Landing-derived visual proposal and future application mockups | Living context; visual treatment remains a proposal |
| [Technical context](context/technical-context/README.md) | Observed code, architecture options, stack, constraints, [coding guidelines](context/technical-context/guidelines/README.md) and open questions | Living context; approved demo architecture direction, implementation open |
| [ADRs](adr/README.md) | One decision record per material architecture choice, linked from the technical context | One infrastructure ADR is `APPROVED` |
| [PRDs](prds/README.md) | Product-wide and scoped, traceable requirements | Initial product PRD approved; scoped interactive MVP PRD ready for review |
| [Features](features/README.md) | Feature breakdowns derived from a PRD | Three approved demo features |
| [User stories](user-stories/README.md) | Future delivery stories derived from approved scope and architecture | Draft demo stories ready for review or blocked; none approved |
| [Implementation plans](implementation-plans/README.md) | Story-level development slices, dependencies and verification | Planning and dev workflows active; no plan yet |

An ADR records the options, rationale, consequences and status of one technical choice. The technical context summarizes the current architecture state and links to those records. The exploratory [`prototype/`](../prototype/README.md) is code evidence, not a product or architecture baseline.
