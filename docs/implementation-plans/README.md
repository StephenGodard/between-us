# Implementation plans

Plans in this directory turn a selected [user story](../user-stories/README.md) into ordered implementation slices and checks. Use the [planning skill](../../.agents/skills/plan-implementation/SKILL.md) to create one and the [development skill](../../.agents/skills/implement-story/SKILL.md) to execute it.

`READY` means the plan has an executable path; it does not mean code exists. `BLOCKED` means a material decision prevents executable acceptance. The owner approved both scoped PRDs on 25 October 2026. The plans below use the newer lot 2 scope (A-38) where earlier feature or story wording was narrower. Application code and automated checks now exist; physical-device checks remain `NOT RUN`. See each plan’s progress evidence.

| Story | Plan | State | Material blocker |
| --- | --- | --- | --- |
| [US-D-06 — chat-centered pitch video, lot 1](../user-stories/demo-pitch-video.md) | [Video plan](demo-pitch-video.md) | READY | None; script and storyboard are production work; no audio-call scene (A-41). |
| [US-D-07 — local two-service access](../user-stories/demo-local-two-service-access.md) | [Access plan](demo-local-two-service-access.md) | IMPLEMENTED; verification pending | Phone trust must be verified. |
| [US-D-08 — shared session foundation](../user-stories/demo-shared-session-foundation.md) | [Session plan](demo-shared-session-foundation.md) | IMPLEMENTED; verification pending | Disconnect/expiry remain open. |
| [US-D-01 — open and join](../user-stories/demo-open-and-join-subject.md) | [Entry plan](demo-open-and-join-subject.md) | IMPLEMENTED; verification pending | Physical-device checks remain. |
| [US-D-02 — reciprocal chat](../user-stories/demo-reciprocal-chat.md) | [Chat plan](demo-reciprocal-chat.md) | IMPLEMENTED; verification pending | Physical-device checks remain. |
| [US-D-03 — optional audio](../user-stories/demo-optional-audio.md) | [Audio plan](demo-optional-audio.md) | IMPLEMENTED; verification pending | A-42 resolved call flow; physical two-phone audio remains unverified. |
| [US-D-04 — opener closes](../user-stories/demo-opener-closes-subject.md) | [Closure plan](demo-opener-closes-subject.md) | IMPLEMENTED; verification pending | Physical-device AC-3 remains unverified. |
| [US-D-05 — joiner leaves](../user-stories/demo-joiner-leaves.md) | [Departure plan](demo-joiner-leaves.md) | IMPLEMENTED; verification pending | Physical-device AC-3 remains unverified. |

Start lot 1 with US-D-06 storyboard and truthfulness review. For lot 2, start with US-D-07 slice 1 (two selected services and a shared backend probe), then US-D-08. The remaining app stories follow their explicit dependencies. A complete application lifecycle still needs product decisions for unexpected disconnect and subject expiry; the plans do not treat those as voluntary actions.
