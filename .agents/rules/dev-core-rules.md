# Development rules

- Implement the selected story's observable outcome and agreed plan. If current source decisions conflict, reconcile the source trail before coding the affected behaviour.
- Follow `.agents/rules/project-core-rules.md` and the relevant engineering guidelines. Check the installed framework version against official documentation for APIs used in the change.
- Keep the fictional local demo separate from a future real-person service. Do not add persistence, analytics, accounts, moderation or emergency functions without a sourced requirement.
- Validate untrusted inputs at the backend, enforce participant authority at the backend, and avoid logging conversation content or unnecessary identifiers. Use the approved ADR for service boundaries.
- Prefer focused tests of session rules and failure paths over tests that restate the code. Run available format, build and test checks relevant to the change; record actual results and device coverage.
- Update plan status and technical context when implementation reveals a material constraint. State incomplete acceptance criteria and `NOT RUN` checks plainly; do not claim a story is done while a required check or behaviour remains unresolved.
