# Implementation plan: Access the local demo from two devices

Story: [US-D-07](../user-stories/demo-local-two-service-access.md), READY FOR REVIEW  
Horizon: fictional demo, lot 2  
Status: IMPLEMENTED — physical-device verification pending  
Sources: [approved lot 2 PRD](../prds/interactive-session-mvp.md) M-R7 and M-R4; [F-D-01](../features/demo-fictional-exchange-chat.md), [F-D-02](../features/demo-audio-call.md) (approved); [technical context](../context/technical-context/README.md), [constraints](../context/technical-context/constraints.md), [stack](../context/technical-context/stack.md); [ADR 0001](../adr/0001-web-demo-infrastructure.md) (approved); [engineering guidelines](../context/technical-context/guidelines/README.md).  
Date: 2026-10-25

## Outcome and boundaries

Two independent PC clients, then two phones on the same LAN, load one user-facing URL and reach one separate backend. Both phones have a trusted secure origin usable for microphone permission. This establishes access, not working chat or audible audio. The current src/ and tests/ contain README files only; prototype/ is an exploratory two-tab reference, not the implementation baseline. Planned file areas under src/ and tests/ are hypotheses until scaffolding sets the actual layout.

## Implementation slices

| Order | Slice and expected boundaries | Story criteria | Dependencies | Verification |
| --- | --- | --- | --- | --- |
| 1 | Scaffold a minimal Nuxt frontend and separate ASP.NET Core backend under src/; select and record installed versions, runtime mode and reproducible package/build commands. Expose a small backend health/shared-session probe through a typed frontend client. | AC-1 | ADR 0001; official documentation for selected versions | NOT RUN — both services build independently; two browser clients read the same backend probe rather than browser-local state. |
| 2 | Add separate frontend/backend container builds and Compose configuration, with the backend session endpoint reachable from the frontend. Keep hostnames and ports in environment configuration. | AC-1 | Slice 1 | NOT RUN — start on the owner's PC and inspect both running services and backend requests from two independent PC clients. |
| 3 | Configure one LAN-reachable HTTPS entry point routing page and backend traffic to the separate containers. Document local certificate creation/trust and host firewall/URL steps without committing a key or certificate. Add an explicit operator diagnostic action to request then immediately release microphone access, separate from the later call UI. | AC-2, AC-3 | Slice 2; actual PC and phone environment | NOT RUN — both phones use the same URL, read one backend view, report secure context and display a microphone permission prompt only after that action. |
| 4 | Add a short operator runbook and an explicit shared-state probe usable until US-D-08 supplies real open sessions. Remove the probe from the participant journey when real session state exists. | AC-1, AC-2 | Slices 1–3; US-D-08 integration | NOT RUN — inspect backend-held session state from both clients after integration. |

## Integrated verification

NOT RUN — Compose startup, two independent PC clients, two phones on the same LAN, certificate trust, backend request inspection and permission prompt on each phone. Repeat AC-2 with US-D-08's open-session view; a health response alone does not prove shared session data. Audible WebRTC is US-D-03.

## Decisions and blockers

Hypothesis: one reverse proxy and a locally trusted certificate can serve the approved single-origin route; choose concrete tooling during slice 3 and record it. Not provided: phone models, browsers and hostname. These affect the runbook and actual validation, but do not prevent constructing the selected architecture. If the secure origin fails on either phone, revisit ADR 0001's routing fallback before claiming AC-3.

## Progress and evidence

2026-10-25 implementation: Implemented separate Nuxt and ASP.NET Core services, independent Dockerfiles, Compose/Caddy single HTTPS origin, configurable LAN address and isolated operator microphone diagnostic. Shared state uses the real subject service; no probe remains in the participant journey.

Observed backend checks: `dotnet build src/backend` passed; `dotnet test tests/backend` passed 5 tests; `dotnet format src/backend --verify-no-changes --no-restore` and the same command for `tests/backend` passed. `docker compose config --quiet` passed. Frontend typecheck, build and format check passed on Node 22.22.3. Packaged verification passed: `docker compose up -d --build` runs all three services at `https://localhost:8443`; `tests/browser/demo-smoke.cjs` passed with three isolated Chromium contexts at 390px. It verified reciprocal chat, chat-only without microphone access, decline, synthetic WebRTC connection, hangup preserving chat, simulated microphone denial, leave and close during connected calls with tracks/peer connections released, fresh join without prior messages, waiting cancellation, empty local/session storage and no page errors. HTTPS errors were bypassed for automation: this is not certificate-trust acceptance. Synthetic audio is not audible physical-device evidence. See the shared [runbook](../local-demo-runbook.md).

**NOT RUN:** physical two-phone LAN trust, microphone permission and audible two-way media. These remaining acceptance criteria prevent a completed-story claim. Unexpected-disconnect expiry/recovery remains undecided; no automatic leave/rejoin is inferred. See the [implementation contract](../context/technical-context/implementation-contract.md) for exact protocol, limits, logging and data-lifetime evidence.

Final integrated inspection: gateway/backend/frontend logs contained neither the exercised fictional marker nor observed message payloads; desktop/mobile screenshots were inspected with no horizontal overflow at 390px. Services remain running for review. See the runbook for reproducible checks and their limits.
