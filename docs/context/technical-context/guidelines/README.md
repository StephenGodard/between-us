# Engineering guidelines

These are living coding guidelines for the fictional, two-device LAN demonstration described in the [technical context](../technical-context.md). They tell agents how to work once implementation is authorized and scoped. They do not select a Nuxt or .NET version, a rendering mode, a hosting topology, or the proposed [infrastructure ADR](../../../adr/0001-web-demo-infrastructure.md).

Read in this order:

1. [Project coding guidelines](project-coding.md) — evidence, boundaries, code quality, and verification for every change.
2. [Vue/Nuxt frontend guidelines](frontend-vue-nuxt.md) — when writing the web client.
3. [.NET backend guidelines](backend-dotnet.md) — when writing the proposed C#/ASP.NET Core service.

## Documentation lookup for agents

The owner supplied [Context7](https://context7.com/) as a documentation discovery tool. Its library indexes currently point to [Vue's documentation](https://context7.com/vuejs/docs), [Nuxt's documentation](https://context7.com/websites/nuxt_4_x), and [ASP.NET Core's documentation](https://context7.com/dotnet/aspnetcore.docs). The Nuxt index shown here is for version 4; **the project's version is not yet selected**. A Context7 snippet is a way to locate the relevant page, not a substitute for checking the publisher's documentation and the version actually installed in this repository.

For a framework or browser API that affects a change:

1. Inspect the repository's installed version and configuration. If no application exists yet, record the version choice when scaffolding it.
2. Find the relevant official page through Context7 or the publisher's documentation. Prefer [Vue](https://vuejs.org/guide/introduction.html), [Nuxt](https://nuxt.com/docs), [Microsoft Learn](https://learn.microsoft.com/en-us/aspnet/core/), and [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API) for browser APIs.
3. Follow the page for the installed major version. Check breaking changes before adopting a newer example. Link the source in a design note or code review when it explains a non-obvious choice.
4. If the documentation or required version cannot be verified, mark the point `Not provided.` or `NOT RUN` and keep it out of a claimed implementation result.

Context7 access is optional tooling. Agents can use its website or an available integration; they should not install a global tool, add an API key, or change editor configuration just to follow these guidelines.
