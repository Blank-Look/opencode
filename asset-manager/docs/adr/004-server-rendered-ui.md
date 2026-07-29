# ADR-004: Server-Rendered ASP.NET Core UI

**Context:** Need a functional UI without the complexity of a separate SPA frontend and REST backend.

**Decision:** Use server-rendered ASP.NET Core (Razor Pages or Blazor Server/WebApp). JavaScript only where server-rendered approach is inadequate.

**Alternatives:** React/Vue SPA with REST API, Blazor WASM.

**Consequences:**
- Faster initial development (no API layer to build and maintain)
- Full control over security headers and auth (server-rendered)
- More limited UI interactivity compared to SPA
- Higher server load for page rendering (acceptable for internal tool)
- No separate frontend repository

**Risks:** Low. A separate SPA can be added later if UX requirements demand it.

**Revisiting:** If complex client-side interactivity becomes a core UX requirement, or if the team prefers a SPA architecture.
