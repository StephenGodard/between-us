# Project coding guidelines

**Applies to:** all future application code, configuration, and tests in this repository.
**Scope source:** [product context](../../product-context/README.md), [technical context](../technical-context.md), [constraints](../constraints.md), and the selected scoped PRD and ADR when they exist. Context remains editable; proposals stay labeled.

## Before changing code

1. Identify the delivery scope and trace the behavior to an intake answer or scoped PRD requirement. The current demonstration uses fictional participants on two devices on one LAN (A-8, A-12, A-13, A-22, A-23). Real-user matching, stored conversations, moderation and emergency operation are outside this demo.
2. Read the relevant ADR and actual code/configuration. An observed pattern in `prototype/` is evidence about the old prototype, not a requirement to copy it.
3. Record a material new architecture choice in an ADR or update the existing proposal. For a reversible implementation detail, state the reason in the change and keep moving.
4. Check the installed framework versions against official documentation using the [lookup workflow](README.md#documentation-lookup-for-agents).

## Code boundaries and style

- Make each change a small, working slice of the user journey. Keep UI rendering, session rules, transport, and browser media control in distinct modules with explicit inputs and outputs. Avoid abstractions that have only a hypothetical future use.
- Use descriptive names and types for session identifiers, participant roles, messages and signaling events. Define one contract for messages crossing the frontend/backend boundary; validate untrusted input on the backend as well as in the UI.
- Treat session state as ephemeral for the demo. Do not add a database, browser storage, analytics, or message recording without a sourced requirement. Clear participant-visible state and release microphone and peer-connection resources on the agreed closure path. A future administrator archive is a separate scope.
- Keep configuration out of source code when it varies by environment. Never commit secrets. Do not place secrets in a browser-exposed configuration field. Do not log message text, audio data, full signaling payloads, or unnecessary identifiers; review logs when claiming that conversations are not stored.
- Explain error states in user-facing language, and make retry or reconnect behavior explicit. Do not silently restore a closed session.
- Keep comments for intent, constraints, or surprising behavior. Do not duplicate what the code already states. Match the repository formatter and linter once they are configured; do not invent a style rule that conflicts with the chosen toolchain.

## Verification proportional to the change

- Run the affected formatter, type/build check, and focused tests when those tools exist. Add a test for a meaningful rule or failure mode, not a test that merely repeats an implementation.
- For the real-time journey, verify two distinct devices on the actual LAN: join, two-way messages, microphone permission and denial, call setup, audio in both directions, end/teardown in both views, and disconnect handling. A same-browser test does not establish this requirement.
- Confirm the second device uses a secure browser context before claiming microphone support. [MDN documents the secure-context and permission requirements for `getUserMedia()`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia).
- Report what passed, what was `NOT RUN`, and why. Do not claim privacy, security, accessibility, performance, or production readiness from a local happy-path test.

Update the relevant context, PRD or ADR if the code exposes a new constraint or changes a documented decision. The goal is an explainable, verifiable implementation, with the smallest set of mechanisms needed for the scoped behavior.
