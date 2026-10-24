# Documentation map

Start with the [context index](context/README.md). It separates product evidence from technical analysis and identifies the hackathon source. Context is living scaffolding without an approval status; PRDs and ADRs record scoped decisions separately.

| Area | What belongs here | Current state |
| --- | --- | --- |
| [Product context](context/product-context/README.md) | Original user answers, discovery, BA brief, product summary, evidence and research | Living context; fictional demo scope confirmed, other questions labeled |
| [Experience context](context/experience-context/README.md) | Demo journey, candidate screens, warm and human direction, and open UX questions | Living context; grief story selected, visual details open |
| [Technical context](context/technical-context/README.md) | Observed code, architecture options, stack, constraints, [coding guidelines](context/technical-context/guidelines/README.md) and open questions | Living context; selected web direction, proposed infrastructure |
| [ADRs](adr/README.md) | One decision record per material architecture choice, linked from the technical context | One infrastructure ADR is `PROPOSED` |
| [PRDs](prds/README.md) | Product-wide and scoped, traceable requirements | Initial product PRD approved; no scoped delivery PRD yet |
| [Features](features/README.md) | Feature breakdowns derived from a PRD | Three demo features ready for review |
| [User stories](user-stories/README.md) | Future delivery stories derived from approved scope | No story yet |

An ADR records the options, rationale, consequences and status of one technical choice. The technical context summarizes the current architecture state and links to those records. A link to a proposed ADR does not approve its recommendation. The exploratory [`prototype/`](../prototype/README.md) is code evidence, not a product or architecture baseline.
