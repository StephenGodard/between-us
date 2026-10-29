# User story: Access the local demo from two devices

ID: US-D-07  
Status: READY FOR REVIEW  
Horizon: fictional demo  
Parent PRD: [interactive-session MVP](../prds/interactive-session-mvp.md) (`APPROVED`; M-R7, enabling M-R1 to M-R6)  
Parent feature: [F-D-01](../features/demo-fictional-exchange-chat.md) (`APPROVED`; two-device access dependency, not a separate feature outcome)  
Technical sources: [technical context](../context/technical-context/technical-context.md) (living); [ADR 0001](../adr/0001-web-demo-infrastructure.md) (`APPROVED`)  
Date: 2026-10-25

## User value

As a demonstrator using two fictional participants' devices, I want each device to open the same local web application and reach its shared backend, so I can exercise the interactive exchange across the LAN.

## Flow and boundaries

The owner starts the local services on their PC. Each participant opens the user-facing website through one LAN URL. The browser loads the frontend and communicates with a separate backend service through that entry point. The backend is reachable by both clients and provides shared session data; a browser's local state is only its own view. The planned verification sequence uses two independent PC browser clients first, then two phones on the same LAN. This story establishes access and service separation; it does not claim that chat or audio works before their own checks.

## Acceptance criteria

| ID | Given / When / Then | Functional source | Verification evidence |
| --- | --- | --- | --- |
| AC-1 | Given the owner starts the local demo services on their PC, when two independent PC browser clients open the user-facing URL, then both load the application and can obtain shared session data from the separate backend service. | PRD M-R7; F-D-01 “Exclusions and dependencies” | Running-service inspection and two-client PC check. |
| AC-2 | Given both phones are on the same LAN as the owner's PC, when each opens the user-facing URL, then both load the application and can reach the same backend-held open-session view. | PRD M-R7; M-R1/M-R2; F-D-01 two-device dependency | Two-phone LAN walkthrough with backend state inspection. |
| AC-3 | Given the phone URL is used for the optional call path, when each phone opens it and requests microphone access, then the browser treats the origin as secure and offers the microphone permission flow. | PRD M-R4/M-R7; F-D-02 “Exclusions and dependencies” | Inspect the phone origin and microphone permission on both devices; audible call is verified by US-D-03. |

## Technical constraints and dependencies

ADR 0001 selects a Nuxt frontend, a separate ASP.NET Core backend, Docker Compose on the owner's PC and one trusted HTTPS entry point routing to both services. SignalR serves realtime application traffic; WebRTC carries optional audio between browsers. The exact framework versions, rendering mode, host name, certificate provisioning and route configuration are implementation choices to record in a later plan. AC-3 is the secure-origin prerequisite for US-D-03; it does not settle call invitation or acceptance. This story precedes US-D-08 and the existing application stories US-D-01 to US-D-05.

## Exclusions

No public deployment, second physical server, administrator interface, persistent conversation archive or real support seekers (PRD “Out of scope”; ADR 0001). This story does not verify two-way chat, audible audio or lifecycle transitions.

## Open decisions

`Not provided.`: the exact phone models/browsers and local hostname. **Hypothesis:** the selected trusted HTTPS entry point works reliably on both phones; the phone check must confirm it. Failure of certificate trust would require revisiting the routing approach under ADR 0001.

## Review and verification record

Checked PRD M-R7 and M-R4, F-D-01/F-D-02 dependencies, technical context and approved ADR 0001. **NOT RUN:** Compose startup, two-client PC access, two-phone LAN access, certificate trust and microphone permission; the selected services are not implemented. Story approval: none.
