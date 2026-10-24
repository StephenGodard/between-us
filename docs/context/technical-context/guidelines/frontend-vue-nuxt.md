# Vue/Nuxt frontend guidelines

**Applies when:** implementing the owner's web and Vue/Nuxt direction (A-19, A-20). The Nuxt major version, rendering mode and frontend package set are still open in [stack.md](../stack.md). Apply the [project coding guidelines](project-coding.md) first.

## Structure and components

- Use Vue single-file components with Composition API and `<script setup lang="ts">` as the working convention once a TypeScript Nuxt project is created. Keep props and emitted events typed. This follows [Vue's `<script setup>` guidance](https://vuejs.org/api/sfc-script-setup) and [TypeScript guidance](https://vuejs.org/guide/typescript/overview).
- Put route-level composition in Nuxt pages, reusable UI in components, reusable stateful behavior in composables, and transport/media adapters outside presentation components. Follow the directory conventions of the **installed Nuxt version**; [Nuxt documents its auto-import and directory behavior](https://nuxt.com/docs/4.x/guide/concepts).
- Keep components responsible for one visible task. Pass data through props and events rather than reaching into another component's internal state. Use stable keys for message lists and follow [Vue's essential style rules](https://vuejs.org/style-guide/rules-essential.html).
- Use semantic controls and labels for chat, call and closure actions. Keep keyboard focus and visible status/error feedback usable during the two-device journey. Avoid rendering message text as raw HTML; Vue's [security guidance](https://vuejs.org/guide/best-practices/security.html) explains the risk of untrusted templates and HTML.

## State, networking and media

- Keep fictional conversation messages and call state in memory for the active session. Do not persist them in `localStorage`, `sessionStorage`, IndexedDB, or a service worker. Define a single owner for the session lifecycle so closure clears both the UI and browser resources.
- Put the backend connection behind a small typed client adapter. Give joining, sending, signaling, closure, errors and disconnects explicit event shapes. Keep the UI independent of SignalR's raw event strings so a transport change does not spread through components.
- Handle browser-only APIs such as `window`, `navigator.mediaDevices` and `RTCPeerConnection` only on the client. Nuxt can render on a server; do not assume a rendering mode until selected. A client-side lifecycle hook or equivalent guard should own microphone acquisition and cleanup.
- Request microphone access in response to the call flow, handle denial and missing devices, stop every acquired track, and close the peer connection on closure or failure. Browser permission and secure-context behavior are documented by [MDN](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia); [WebRTC signaling](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Signaling_and_video_calling) is separate from the audio stream.
- Decide reconnect behavior explicitly with the backend contract. A reconnect must not expose a finished conversation or accidentally join a third device. Do not implement automatic rejoin just because a library offers it.
- Use Nuxt runtime configuration only for values safe for the browser, such as a public API origin. Never put secrets in public config. Confirm the exact API in the installed Nuxt version before coding it.

## Frontend checks

Run the project's type/build checks and focused component tests after implementation. Manually exercise the actual two-device LAN path, including permission denial, network loss, and closure. The final test must inspect both participant views and verify that no conversation history reappears after reload. [Nuxt's testing documentation](https://nuxt.com/docs/4.x/getting-started/testing) can guide the chosen test setup after the version is fixed.
