# Run the fictional interactive demo locally

The [lot 2 implementation](../src/README.md) is a separate Nuxt frontend and ASP.NET Core backend behind Caddy. Use fictional subjects and messages only.

## Start on the PC

Install/start Docker Desktop, then from the repository root:

```sh
cp .env.example .env
docker compose up --build -d
```

Open `https://localhost:8443` in two independent browser windows. Caddy generates a local CA. Export its **public certificate only**:

```sh
mkdir -p .local
docker compose cp gateway:/data/caddy/pki/authorities/local/root.crt .local/demo-root.crt
```

Import this certificate into the test devices' trusted certificate store. On macOS, use Keychain Access and explicitly trust it for SSL. A browser warning bypass is insufficient evidence for secure-context microphone access. Do not distribute or export the CA private key. Certificate trust changes are performed by the device owner.

## Use two phones on the same LAN

Set `DEMO_HOST` in `.env` to the PC's current LAN IP (for example `192.168.1.20`) and leave `DEMO_PORT=8443`. Recreate services with `docker compose up -d`. Permit inbound TCP 8443 through the PC firewall and use a LAN without client isolation. Open `https://<PC-LAN-IP>:8443` on both phones; never use `localhost` there.

Install the same public root certificate on each test phone. iOS requires installing its profile and enabling full trust in Certificate Trust Settings. Android certificate installation and browser trust behavior depend on device policy. Verify trust on the actual browsers rather than treating installation alone as success. Open `/diagnostic`, verify secure-context status, then explicitly request microphone permission; the diagnostic immediately releases acquired tracks. No audio call is made by this check. If either phone cannot trust the origin, stop the phone acceptance check and review ADR 0001's routing fallback.

## Hands-on acceptance sequence

1. With two PC clients, open an original fictional subject and choose it from the other client. Use a third client to open a different subject, confirming meaningful choice and isolation.
2. Each member sends two original messages. Verify both views; no messages should arrive automatically.
3. Try optional audio: either member proposes, recipient accepts. Verify audible voices in both directions. Hang up and continue the same chat. Repeat with decline and microphone denial: both stay in chat with explanation.
4. Have the joiner leave. Both views clear; the opener waits on the same subject. A new joiner sees no old messages. Repeat during a call and verify both microphones stop.
5. Close from the opener during chat, then during a call. Both views clear; the subject disappears. Test waiting cancellation separately.
6. Reload clients and inspect browser storage: no chat history returns. Unexpected loss shows interruption; it must not silently claim voluntary leave or reconnect. Restart backend to clear abandoned demo metadata while the disconnect/expiry policy remains undecided.
7. Repeat steps 1–6 on two actual phones; record devices, browsers, URL/trust and audible results separately from PC results.

## Developer checks and logs

```sh
dotnet build src/backend
dotnet test tests/backend
dotnet format src/backend --verify-no-changes
dotnet format tests/backend --verify-no-changes
cd src/frontend
npm ci
npm run typecheck
npm run build
```

Use the Node version required by `src/frontend/package.json` (the container supplies its own Node runtime). Run `python3 tools/validate_scaffold.py` from the repository root after documentation/framework changes. Inspect `docker compose logs --no-color` for unexpected payloads after a fictional run; do not enable debug/trace or HTTP-body logging. Stop with `docker compose down`. The Caddy volume retains certificate material only; no conversation store is mounted. Remove local trust from devices when the demo is no longer used.

## Verification limits

Transport integration tests use independent SignalR clients against the actual backend. They do not establish real browser media, audible voices, phone trust or LAN reliability. Record unexecuted checks as `NOT RUN`. Unexpected-disconnect expiry/recovery remains an explicit open product decision.

## Observed implementation checks — 25 October 2026

- `docker compose up -d --build`: PASS, all three services running at `https://localhost:8443`; backend health responds through the gateway.
- Backend build, both formatter checks and `dotnet test tests/backend`: PASS, five actual SignalR integration tests.
- Frontend typecheck, production build and format check: PASS, Node 22.22.3 / Nuxt 4.6.2.
- `tests/browser/demo-smoke.cjs`: PASS with three isolated Chromium contexts at 390px. Covers reciprocal messages, no microphone in text-only use, decline, connected synthetic WebRTC, hangup continuing chat, simulated microphone denial, leave and close during connected calls with resource cleanup, fresh join without old messages, waiting cancellation, empty local/session storage and zero page errors.
- `python3 tools/validate_scaffold.py`: PASS.

The automated browser test uses synthetic microphone input and `ignoreHTTPSErrors`. It does **not** verify audible voices, system certificate trust, actual permission prompts, physical phones or LAN connectivity. Those checks remain **NOT RUN**.

Dependency inspection found a development-toolchain `node-forge` advisory propagated through Nuxt's development dependencies; no compatible published fix was available in the inspected versions. The package is absent from the built production server package. This remains an update item, not a clean-audit claim.

Final inspection: `docker compose logs --no-color` produced 33 lines, with no test marker `Fiction-1792919957872` or observed message payload. Desktop 1440px and mobile 390px screenshots were inspected; no horizontal overflow was observed at 390px. This is focused visual QA, not an accessibility audit. Services were left running for review.

To repeat browser automation with Chrome installed and Playwright available:

```sh
NODE_PATH=/absolute/path/to/node_modules node tests/browser/demo-smoke.cjs
```

Replace the path with the module directory containing Playwright, or omit `NODE_PATH` when Playwright is already resolvable. The test supplies synthetic media and bypasses local TLS trust only for its isolated browser contexts.
