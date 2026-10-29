# Two-minute product presentation

The owner requested and accepted a landing-to-application presentation in the chat on 25 October 2026. This cut starts on the product identity and landing, replacing the earlier planned in-person opening. It uses the current application in `src/`, not the exploratory `prototype/` or a simulated chat interface.

## Deliverables

- `between-us-presentation-2min.mp4`: 1920 × 1080 presentation, 120 seconds, with French captions burned in. Silent first cut; no voice performance or music is included.
- `voiceover-fr.md`: optional French narration to record separately.
- `stage.html`: presentation framing and captions around the unchanged landing and live application.
- `record.cjs`: repeatable browser capture, including the four fictional messages and assertions on reception and closure.
- `capture.json`: observed run metadata and checks.
- `capture/`: raw browser video and scene stills.

## Sequence

| Time | Scene |
| --- | --- |
| 00:00–00:05 | Product title and need |
| 00:05–00:20 | Existing landing page |
| 00:20–00:36 | Open the fictional grief subject |
| 00:36–00:51 | Second participant deliberately chooses the subject |
| 00:51–01:34 | Four reciprocal written messages |
| 01:34–01:50 | Explicit closure and both participant views cleared |
| 01:50–02:00 | “On est tous aidants” |

Both application views have their own live session clients. The script performs user actions through visible fields and buttons; it does not inject conversation state. The landing-to-app cut is an editorial transition, not a claim that the landing currently links to the application. No audio call is demonstrated.

## Reproduce

Start the local application using `docs/local-demo-runbook.md`. Serve the repository root with `python3 -m http.server 4174 --bind 127.0.0.1`. Run `node media/product-demo/record.cjs` with Playwright available in Node's module path, Chrome installed and Playwright's FFmpeg recorder installed. Export with `python3 media/product-demo/export.py`, with `imageio-ffmpeg` available to Python. Keep the two-minute run uninterrupted.

Recording uses the browser's local certificate bypass; it does not establish phone trust, LAN acceptance, production readiness, or real-person service suitability. All dialogue is fictional. Nothing is published by these scripts.

## Observed verification — 25 October 2026

- Capture: both clients received all four messages, both showed the closure notice and the conversation messages disappeared. No browser page errors were recorded.
- Final MP4: 1920 × 1080, 25 fps, exactly 120.00 seconds; all 3,000 frames decoded successfully. No audio track.
- Fourteen samples from the exported video were inspected as a contact sheet; full-size conversation and closure frames were also inspected. This was sampled visual review plus full decoding, not a real-time audiovisual playback.
- Repository scaffold validator: passed after source-decision updates.
- Owner review, recorded voiceover and publication: not performed.
