# Innovation Playground

A governed, short-lived, anonymised sandbox environment where teams ideate, build, and validate ideas before they enter the formal Asset Lifecycle.

> **Product landing pages:** [Innovation Playground](https://blank-look.github.io/opencode/innovation-playground/) · [Interactive Mockup](https://blank-look.github.io/opencode/innovation-playground/app-mockup.html) · [Product Requirements](docs/product-requirements.md)

## Design Mockup

[App Mockup →](https://blank-look.github.io/opencode/innovation-playground/app-mockup.html)
Interactive HTML mockup covering the playground dashboard, sandbox management, idea submission, governed IDE workspace, pipeline kanban, guardrail policies, and activity audit log.

## Architecture

[Architecture docs →](docs/) *(in progress)*
The Playground sits **before** the standard SDLC. Once an idea passes validation, it graduates into the formal Asset Lifecycle with all governance metadata preserved. The output is a validated, documented, policy-compliant starting point — not throwaway code.

### Key Principles

| Principle | Description |
|---|---|
| **Short-lived** | Sandboxes auto-expire (default 7 days, max 30). No entropy. |
| **Heavily governed** | Guardrails enforce policy at creation time. No secrets, no production data, no unapproved dependencies. |
| **Always anonymised** | All sandbox data is scrubbed of PII and business-confidential information. IDs are opaque. |
| **Disposable by design** | Everything is infrastructure-as-code. Tear down and rebuild in minutes. |
| **Funnel-forward** | Ideas flow through a standard pipeline: Ideate → Validate → Move to Asset Lifecycle. |

### The Funnel

```
Ideate → Validate → Peer Review → Security Scan → Ready for Lifecycle
```

## Documentation

| Doc | Description |
|---|---|
| [Product Requirements](docs/product-requirements.md) | Functional and non-functional requirements, user personas, sandbox lifecycle, validation pipeline, API surface |

## Status

**Phase 0: Discovery & Foundation** — in progress.
