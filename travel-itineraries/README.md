# Travel Itineraries

Staff location tracking, regional hazard monitoring, and automated emergency response activation.

> **Product landing pages:** [Travel Itineraries](https://blank-look.github.io/opencode/travel-itineraries/) · [Interactive Mockup](https://blank-look.github.io/opencode/travel-itineraries/app-mockup.html) · [Response Plan](docs/response-plan.md) · [Safety Plan](docs/safety-plan.md)

## Purpose

When staff travel internationally, the organisation needs to know where they are. If an emergency occurs — earthquake, tsunami, political unrest, natural disaster — the system monitors live news sources in key regions and automatically triggers the response plan.

## Core Capabilities

- **Staff Itinerary Registry** — record traveller, destination, dates, contact details, accommodation
- **Regional News Monitoring** — live RSS/API feeds from region-specific sources (e.g. JMA for Japan earthquakes, GDACS for global disasters, FCO travel advisories)
- **Automated Incident Detection** — keyword matching against configured alerts per region
- **Emergency Response Activation** — notification cascade via email/SMS/Teams, traveller check-in request, escalation to duty officer
- **Safety Dashboard** — real-time view of all active travellers, regional alert status, outstanding check-ins

## Alignment to AI-Assisted Delivery Lifecycle

This project follows the [AI-Assisted Delivery Lifecycle](https://blank-look.github.io/opencode/sdlc/) governance framework:

| Phase | Artefact |
|---|---|
| Capture | Product requirements, user personas |
| Govern | Data classification (staff PII), risk assessment, privacy impact |
| Generate | Architecture decision records, data model |
| Build | ASP.NET Core / Node.js modular monolith |
| Assure | Threat model, security controls |
| Release | Deployment runbook, Bicep infrastructure |
| Operate | Incident response runbook, monitoring dashboard |

## Documentation

| Doc | Link |
|---|---|
| Response Plan | [docs/response-plan.md](docs/response-plan.md) |
| Safety Plan | [docs/safety-plan.md](docs/safety-plan.md) |
| Product Requirements | [docs/product-requirements.md](docs/product-requirements.md) |

## Status

**Phase 0: Discovery** — in progress. Architecture and requirements being defined.
