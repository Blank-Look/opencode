# Innovation Playground

A governed, short-lived sandbox environment where teams can ideate, build, and validate ideas before they enter the formal Asset Lifecycle. The Playground opens the funnel of innovation — increasing capacity and volume while maintaining the SDLC guardrails the COO expects.

## Why

The COO values the SDLC's standardised repo and block-model governance — it applies consistently to infra, documentation, code, apps, almost everything. But that same rigour can throttle early-stage ideation. The Playground solves this by providing a **heavily governed, always anonymised, short-lived space** where staff can explore freely, then move validated ideas into the asset lifecycle with minimal friction.

## Key Principles

| Principle | Description |
|---|---|
| **Short-lived** | Sandboxes auto-expire (default 7 days, max 30). No entropy. |
| **Heavily governed** | Guardrails enforce policy at creation time. No secrets, no production data, no unapproved dependencies. |
| **Always anonymised** | All sandbox data is scrubbed of PII and business-confidential information. IDs are opaque. |
| **Disposable by design** | Everything is infrastructure-as-code. Tear down and rebuild in minutes. |
| **Funnel-forward** | Ideas flow through a standard pipeline: Ideate → Validate → Move to Asset Lifecycle. |

## The Funnel

```
                  ┌─────────────┐
                  │   Ideate    │  ← Anyone can submit
                  └──────┬──────┘
                         │
                  ┌──────▼──────┐
                  │  Validate   │  ← Automated guardrails + peer review
                  └──────┬──────┘
                         │
                  ┌──────▼──────┐
                  │  Move to    │  ← Creates asset record, links to source,
                  │  Lifecycle  │    triggers onboarding workflow
                  └─────────────┘
```

## How It Fits In

The Playground sits **before** the standard SDLC. Once an idea passes validation, it graduates into the formal Asset Lifecycle (procurement → build → operate → retire) with all governance metadata preserved. The output of the Playground is a validated, documented, policy-compliant starting point — not throwaway code.

## Directory Structure

```
innovation-playground/
├── README.md                 ← This file
├── app-mockup.html           ← Interactive design mockup
└── docs/
    └── product-requirements.md
```

## Status

Phase 0: Discovery & Foundation — in progress.
