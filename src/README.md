# Interactive fictional demo (lot 2)

The implementation follows the [lot 2 PRD](../docs/prds/interactive-session-mvp.md) and [ADR 0001](../docs/adr/0001-web-demo-infrastructure.md).

- `frontend/`: Nuxt browser application and WebRTC media adapter.
- `backend/`: ASP.NET Core 10 / SignalR; authoritative temporary subjects and participant capabilities.
- [Local runbook](../docs/local-demo-runbook.md): Compose, trusted LAN access and verification.
- [Implementation contract](../docs/context/technical-context/implementation-contract.md): events, limits and data lifetime.

This is a local fictional demonstration. Real phone acceptance and audible media require the runbook's physical-device checks. Unexpected-disconnect expiry/recovery remains an unresolved product decision; interruption is not treated as voluntary departure.
