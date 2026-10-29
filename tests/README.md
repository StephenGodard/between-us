# Executable validation

Run `dotnet test tests/backend` for actual SignalR integration tests using ASP.NET Core TestServer and independent Long Polling clients. Coverage includes atomic admission, subject choice, payload validation, connection-bound authority, reciprocal isolated relay, stale exchange rejection, cancellation, departure/rejoin, idempotent closure, interruption and audio invitation/signaling lifecycle.

Run frontend scripts from `src/frontend` for type/build checks. See [local runbook](../docs/local-demo-runbook.md) for packaged browser and physical-phone checks. Automated transport tests do not establish audible WebRTC or real-phone behavior.

`browser/demo-smoke.cjs` exercises the actual packaged frontend through HTTPS with three isolated Chromium contexts. Run with a Playwright-capable Node runtime; `NODE_PATH` may identify its bundled module directory. It uses synthetic microphone input and ignores HTTPS certificate errors, so it is not the real-phone trust/audio acceptance check.
