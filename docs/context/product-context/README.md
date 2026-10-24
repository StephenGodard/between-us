# Product context

This directory is the entry point for the product's functional context. Read the [current product summary](product-context.md) first. For a decision, requirement, or disputed statement, follow its A-n answer back to the [intake](intake/espaces-ecoute-ephemeres.md). The intake is the primary product source; the [supplied PDF](../DevDay-Paris-Hackathon-Kickoff.pdf) is the primary event source. The summary and derived documents do not create new user decisions.

## Reading order and authority

| Step | Location | What it contains | Status and authority |
| --- | --- | --- | --- |
| 1 | [Product summary](product-context.md) | Current intent, confirmed fictional demo scope, later phase and open questions | Working summary; follow citations to primary sources |
| 2 | [Intake](intake/espaces-ecoute-ephemeres.md) | Original user wording, answers A-1 to A-19 and dated decisions | Primary source for product choices; later explicit answers refine earlier ones |
| 3 | [Product discovery](discovery/entre-nous-product-discovery.md) | Structured problem, people, journey and MVP | Ready for review; not approved as a whole |
| 4 | [BA brief](briefs/espaces-ecoute-ephemeres.md) | Reviewable need, scope and business rules | `READY FOR REVIEW`; not `APPROVED` |

## Supporting sources

| Location | Purpose | Limit |
| --- | --- | --- |
| [Hackathon event](../hackathon-kickoff.md) and [supplied PDF](../DevDay-Paris-Hackathon-Kickoff.pdf) | Event dates, tracks and submission format | Event constraints; they do not define the product |
| [Evidence](evidence/build-in-public-product-discovery.png) | User-supplied screenshot of a Build in Public post | Evidence of that post, not proof of product impact |
| [Safety and privacy research](research/securite-confidentialite-ecoute-citoyenne.md) | Preliminary questions and official sources for a possible real service | Research, not approved legal or operational rules |

Scoped PRDs belong in [`docs/prds/`](../../prds/README.md). Observed code and architecture options belong in the separate [technical context](../technical-context/README.md); individual decisions belong in [ADRs](../../adr/README.md). The exploratory [`prototype/`](../../../prototype/README.md) is not a source of product requirements.

If summaries conflict, check the cited intake answer or supplied event document. Mark proposals as **Hypothesis** and missing information as **Not provided.** Preserve the user's original French wording in intake records and quotes.
