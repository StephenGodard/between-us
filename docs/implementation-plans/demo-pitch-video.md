# Implementation plan: Show the fictional journey in a two-minute pitch

Story: [US-D-06](../user-stories/demo-pitch-video.md), READY FOR REVIEW; acceptance must also cover V-R1–V-R5  
Horizon: fictional demo, lot 1  
Status: READY  
Sources: [approved lot 1 PRD](../prds/build-in-public-video-lot-1.md) V-R1–V-R5; [initial PRD](../prds/entre-nous-initial.md) D-R5 (approved); [intake A-39/A-40/A-41](../context/product-context/intake/espaces-ecoute-ephemeres.md); [hackathon source](../context/hackathon-kickoff.md); [experience context](../context/experience-context/README.md), [design context](../context/design-context/README.md). [ADR 0001](../adr/0001-web-demo-infrastructure.md) governs only any real application footage.  
Date: 2026-10-25

## Outcome and boundaries

Produce a scripted, fictional submission cut of no more than two minutes: in-person listening, then a staged remote written chat with subject choice, reciprocal participation and a visible end. The audio-call scene is excluded by A-41 and remains a lot 2 concern. The video communicates “on est tous aidants” without implying a working lot 2 or proven mental-health impact. Publication is outside this story. No storyboard, footage or final video exists in the inspected repository; planned media paths are hypotheses.

## Implementation slices

| Order | Slice and expected boundaries | Story criteria | Dependencies | Verification |
| --- | --- | --- | --- | --- |
| 1 | Draft a concise storyboard and timed beat sheet for in-person opening, transition, user-created subject, deliberate subject choice, two-sided written chat, visible closure and closing message. Use the selected grief example and warm human direction; keep dialogue fictional and omit any audio-call beat. | AC-1, AC-2; V-R1–V-R4 | Lot 1 PRD and source review; A-41 | NOT RUN — storyboard sequence, call exclusion, timing and message review. |
| 2 | Decide truthful on-screen representation for the current lot 2 state: staged interface/mockup if the app is not working; actual capture only after relevant checks. Mark illustrative scenes in narration/captions as needed. Prepare a shot list and asset list. | AC-3; V-R2, V-R5 | Slice 1; actual app state | NOT RUN — claim-by-claim review of UI footage, captions and narration against implementation evidence. |
| 3 | Record or assemble fictional scenes and interface shots, edit a first cut with readable two-person actions, then export a submission cut. Keep project/source files and output under a documented media directory; select export format from the actual event submission rules. | AC-1, AC-2; V-R1–V-R4 | Slices 1–2; available cast/assets/tools | NOT RUN — standalone viewing confirms the transition, subject choice, reciprocal written chat, visible end and absence of an audio-call scene. |
| 4 | Time the exported cut, review factual claims and fictional framing, and perform a final playback of the actual export. | AC-1–AC-3; V-R1–V-R5 | Slice 3 | NOT RUN — duration at most two minutes, no audio-call scene and no claim that staged lot 2 behavior was verified. |

## Integrated verification

NOT RUN — storyboard review, timed beat sheet, export timing, standalone clarity review, call-scene exclusion and claim audit. If application footage is used, inspect what the application actually supports at capture time. The event's publication flow and destination are outside this plan.

## Decisions and blockers

Not provided: exact script, cast, shot sequence and export format. These are production choices to settle during slices 1–3; they do not block drafting. Hypothesis: a staged interface can convey the product before lot 2 is built, provided its illustrative status is clear. The older story says the remote scene passes through the local demo, but A-39 puts video first and the approved lot 1 PRD permits truthful staged depiction; do not make working application footage a prerequisite.

## Progress and evidence

The original planning pass performed no production checks. On 25 October 2026, the owner accepted the landing-to-application sequence in intake A-43, replacing the in-person opening above. A silent captioned first cut and reproducible production sources now exist in [media/product-demo](../../media/product-demo/README.md). The cut uses live application clients and fictional messages; it has no call scene.

Observed: all four messages were received on the other client, closure was visible on both clients and conversation messages disappeared. The final H.264 MP4 is 1920 × 1080 at 25 fps, exactly 120 seconds, with 3,000 frames decoded. Fourteen exported samples were reviewed, with full-size conversation and closure inspection. No real-time playback or owner final-cut acceptance is claimed. Narration is supplied as text only; publication was not requested or performed. The earlier in-person criterion is superseded by A-43 for this cut, not reported as passed.
