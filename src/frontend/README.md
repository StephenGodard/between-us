# Between Us frontend

Nuxt 4.6.2, Vue 3.5.44 and SignalR JavaScript 10.0.0; Node 22.12 or later. This is a client-rendered application (`ssr: false`) served by Nuxt's Node server. The separate ASP.NET Core backend remains authoritative. Run through the repository's single-origin proxy so `/hubs/sessions` reaches the backend.

```sh
npm ci
npm run typecheck
npm run format:check
npm run build
npm start
```

`NUXT_PUBLIC_HUB_PATH` overrides the public hub URL when needed. No participant capability is placed in runtime configuration, URLs or persistent browser storage. The typed adapter in `app/lib/session-client.ts` is the frontend's transport contract. Session membership, messages, drafts and media are memory-only. An ordered admission-event buffer handles state/end/message events arriving before the create/join response; overflow terminates the connection instead of adopting an incomplete state.

`/diagnostic` is an operator-only diagnostic page, separate from participant navigation. Its explicit microphone action acquires and immediately stops every track. This checks permission availability, not two-device audio.

## Audio

Either participant proposes a call; the other accepts or declines. Permission is requested after the caller's proposal and before the recipient accepts. Failure stops local resources and informs the other client through the backend. Accepted calls use WebRTC with no external STUN/TURN service for this same-LAN demo. A 20-second connection-setup timeout is a technical failure bound, not a session-expiry rule. Hanging up keeps the written exchange. Closure, departure, transport interruption and media failure stop all acquired tracks and close the peer connection. A delayed microphone permission result is stopped if its call has already ended. Browser autoplay rejection offers an explicit “Activer le son” action.

Unexpected connection loss disables sending and automatic rejoin is deliberately absent. The remaining connected participant may explicitly close or leave; no automatic session-expiry policy is inferred. Actual phone certificate trust, microphone permission and audible two-phone media must be tested separately from simulated browser media.

## API references checked

- [Nuxt 4 page routing](https://nuxt.com/docs/4.x/directory-structure/app/pages)
- [Nuxt 4 runtime configuration](https://nuxt.com/docs/4.x/guide/going-further/runtime-config)
- [SignalR 10 JavaScript client](https://learn.microsoft.com/en-us/aspnet/core/signalr/javascript-client?view=aspnetcore-10.0)
- [RTCPeerConnection](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection)
- [Microphone secure-context and permission requirements](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
- [Stopping media tracks](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/stop)

Visuals adapt `landing/brand.md`'s existing proposal; the local font and its license are copied from the landing. This does not establish a newly approved brand or usability result.

## Dependency audit (25 October 2026)

`npm audit` reports seven high entries derived from one `node-forge <=1.4.0` RSA signature-verification advisory through `listhen → nitropack → Nuxt`. The registry's latest `node-forge` is 1.4.0; no compatible patched version was available in this check. The suggested automated change downgrades Nuxt to 4.1.3, so it was not applied. Neither `node-forge` nor `listhen` is in the generated production `.output/server/package.json`; the runtime image copies only `.output`. The development/build dependency finding remains open.
