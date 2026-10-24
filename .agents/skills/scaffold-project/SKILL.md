---
name: scaffold-project
description: Use the business analyst to interview a user about a new project idea and build a source-grounded, reviewable business brief. Use for initial product framing, requirements discovery, and brief revision.
---

# BA project discovery

The active discovery role is `.agents/agents/ba-agent.md`. Read it, `.agents/rules/ba-core-rules.md`, and the relevant templates and checklist. For question selection and answer handling, read [references/elicitation.md](references/elicitation.md). For this hackathon, read `docs/context/hackathon-kickoff.md` and its source PDF when a detail matters.

1. **No idea yet:** invite the user to describe the idea freely in their own words. Do not create product facts or a blank brief.
2. **Idea supplied:** save the original request verbatim to `docs/context/product-context/intake/<descriptive-slug>.md` using `.agents/templates/intake_tmpl.md`. Record supplied sources, the hackathon event context separately, and what is known versus hypothesized. Do not inspect historical `.kiro/` material or the separate `agentic-sandbox` repository for product facts.
3. **Discover:** ask a small batch of questions chosen from the actual gaps. After each reply, record the answer verbatim with an ID, update the fact and hypothesis tables, and decide which question now matters most. Never require the user to answer every possible question before progress.
4. **Draft:** once the problem, affected people, intended change, and candidate MVP boundary are understandable, create or revise `docs/context/product-context/briefs/<same-slug>.md` from `.agents/templates/brief_tmpl.md`. If these are still unclear, show the gap without pretending it is resolved.
5. **Review:** apply `.agents/checklists/brief-checklist.md`. Present the brief path, a short summary, and only material open questions. Revise from feedback; the brief remains living context and needs no approval status.

Stop after the BA brief. Do not activate PO, architecture, design, development, or QA in this skill. No ticket, mockup, repository code, chosen technology, or environmental dataset is required to begin.
