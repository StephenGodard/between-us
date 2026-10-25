# Between Us landing page

This is a standalone presentation page for the fictional hackathon concept. It does not implement the two-device conversation, Nuxt frontend, or backend service. Its copy and visual identity are a reviewable design proposal based on the owner's requested warm, human atmosphere (intake A-25), reciprocal exchange (A-28), subject-led entry (A-32), optional voice (A-32), and fictional demo boundary (A-8 to A-13). The portrait phone illustration follows the opener's screen from the selected UX mockup: choose to talk, type « Deuil », wait after opening the subject, then use the shared chat when another person joins. In that chat the opener types in the message field, sends a right-aligned “Vous” message, then the other person's left-aligned response appears. The sequence ends with a closed screen where messages are no longer visible. The loop lasts twenty seconds, with eight seconds for the conversation scene, and becomes a conversation still frame when reduced motion is requested.

From the repository root, run:

```sh
python3 -m http.server 4174
```

Open `http://127.0.0.1:4174/landing/`. The “Explorer la maquette UX” links lead to the existing local entry-flow experiment. They do not start a live conversation.

The proposed visual system is recorded in [brand.md](brand.md). It was revised using the owner's [MindDay](https://www.mindday.com/) reference for color, type and composition. The demo implementation planned for a later session should reuse it only after visual review; it is not a product or technical approval.
