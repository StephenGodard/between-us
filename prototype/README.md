# Entre nous — local hackathon prototype

An interactive prototype illustrating an initial listening exchange between citizens. **Both participants and their messages are fictional.** Do not open it to people seeking real support.

## Run locally

From the repository root:

```sh
node prototype/server.js
```

Open `http://127.0.0.1:4173` in a modern browser. The server listens only on `127.0.0.1`.

1. Click **Create a fictional session**.
2. Click **Open the second tab**. Both tabs must use the same browser and profile.
3. Load a fictional scenario or send messages from each tab.
4. Click the phone button in one tab, then **Answer** in the other. Allow microphone access. Use headphones to avoid audio feedback between the tabs.
5. Click **End call**: the chat, invitation link and call disappear from both tabs' session views.

## Technical scope

- No accounts, database, remote API, `localStorage` or `sessionStorage`.
- Messages pass between the tabs through `BroadcastChannel` and remain only in memory while the session is active.
- Audio uses WebRTC and both tabs' microphones; the local server relays neither messages nor audio.
- Closing a session clears application state in both tabs and stops the microphone tracks. This illustrates disappearance for participants; the prototype does not demonstrate a regulated deletion or archive policy.
- Both tabs must remain on **the same device**. This prototype does not connect people over the Internet.

Moderation, privacy, archiving and emergency rules for a version open to real users remain to be decided, as explained in `docs/context/product-context/research/securite-confidentialite-ecoute-citoyenne.md`.
