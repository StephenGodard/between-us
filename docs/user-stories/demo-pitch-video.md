# User story: See the fictional journey in the hackathon pitch

ID: US-D-06  
Status: READY FOR REVIEW  
Horizon: fictional demo  
Parent PRD: [Build in Public video, lot 1](../prds/build-in-public-video-lot-1.md) (`APPROVED`; V-R1–V-R5)  
Parent feature: none; D-R5 is a separate event deliverable, not an application feature  
Technical sources: [technical context](../context/technical-context/technical-context.md) (living); [ADR 0001](../adr/0001-web-demo-infrastructure.md) (`APPROVED`, application architecture only)  
Date: 2026-10-25

## User value

As a hackathon viewer, I want to see an in-person listening moment lead into the fictional remote exchange and its visible end, so I can understand the idea and the owner's message “on est tous aidants” within the required pitch length.

## Flow and boundaries

A scripted video starts with listening in person, moves to a fictional remote written chat and shows participant-visible closure. The lot 1 video contains no audio-call scene (A-41). The story and scenes remain fictional. The video can be planned and edited, while the later application remains a hands-on tool whose actions are chosen by participants (A-37). The submitted pitch is no more than two minutes under the supplied event constraint. A staged interface may be used before lot 2 works, with its illustrative status clear. The exact grief script and storyboard are `Not provided.` and must be authored as part of the deliverable; this story does not prescribe their wording or shots.

## Acceptance criteria

| ID | Given / When / Then | Functional source | Verification evidence |
| --- | --- | --- | --- |
| AC-1 | Given a draft storyboard, when reviewed in sequence, then it begins with in-person listening, moves to reciprocal remote written chat, includes its participant-visible end and has no audio-call scene. | PRD V-R1–V-R4; intake A-9/A-11/A-41 | Storyboard review against the stated sequence and lot boundary. |
| AC-2 | Given a rendered pitch, when timed and reviewed, then it lasts no more than two minutes and communicates “on est tous aidants” through the fictional journey without representing it as a real support service. | PRD V-R1–V-R4; [hackathon event summary](../context/hackathon-kickoff.md); intake A-8/A-11 | Timed playback and content review. |
| AC-3 | Given the video includes interface shots, captions or narration, when checked against the actual lot 2 implementation state, then illustrative scenes are identified as such and no unverified capability is presented as working. | PRD V-R5; A-39 | Claim-by-claim review before sharing the cut. |

## Technical constraints and dependencies

The technical context calls for a repeatable local journey. Actual working-app chat footage depends on US-D-01, US-D-02 and US-D-04; staged interface shots can be created before lot 2. Audio-call handling is reserved for US-D-03 in lot 2. ADR 0001 governs the application shown, not the video editing workflow.

## Exclusions

No claim of demonstrated mental-health benefit, real participant footage presented as a service interaction or production deployment (PRD horizon D).

## Open decisions

`Not provided.`: exact grief script, storyboard, shot list and final wording. Their creation is the deliverable work; the required sequence and timing remain testable.

## Review and verification record

Checked D-R5, intake A-8/A-9/A-11/A-26/A-41, event summary and technical context. **NOT RUN:** storyboard review or timed playback; no final video is present. Story approval: none.
