# Implementation planning rules

- Select a specific story and delivery horizon. Trace every planned outcome to its acceptance criteria and the current scoped PRD or feature; reconcile later explicit user decisions before reusing older story wording.
- Use the actual repository state for file and dependency assumptions. Proposed paths are hypotheses until inspected; the exploratory `prototype/` is not an implementation baseline.
- Distinguish required behaviour, accepted technical decisions, and reversible implementation choices. Do not invent UI copy, protocol details, timeouts or safety rules as product requirements.
- Make each slice independently reviewable, with expected files or boundaries, dependencies, and a check that can fail meaningfully. Include integrated checks for cross-device and no-history claims where the story requires them.
- Mark a plan `BLOCKED` when a material decision prevents executable acceptance; otherwise use `READY`. A source artifact's approval status is evidence, not an automatic implementation gate or an inherited plan status.
- Keep planned checks `NOT RUN` until execution evidence exists. Do not claim build readiness from a plan.
