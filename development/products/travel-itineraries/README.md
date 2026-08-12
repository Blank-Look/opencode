# Travel Itineraries

Staff location tracking, regional hazard monitoring, and automated emergency response activation.

> **Product landing pages:** [Travel Itineraries](https://blank-look.github.io/opencode/development/products/travel-itineraries/) · [Interactive Mockup](https://blank-look.github.io/opencode/development/products/travel-itineraries/app-mockup.html) · [Response Plan](docs/response-plan.md) · [Safety Plan](docs/safety-plan.md) · [Product Requirements](docs/product-requirements.md)

## Design Mockup

[App Mockup →](https://blank-look.github.io/opencode/development/products/travel-itineraries/app-mockup.html)
Interactive HTML mockup covering traveller dashboard, active alerts, itinerary management, region monitoring, emergency response, and news source integrations.

## Architecture

[Architecture docs →](docs/) *(in progress)*
When staff travel internationally, the organisation needs to know where they are. If an emergency occurs — earthquake, tsunami, political unrest, natural disaster — the system monitors live news sources in key regions and automatically triggers the response plan. ASP.NET Core / Node.js modular monolith with multi-source event monitoring.

## Documentation

| Doc | Description |
|---|---|
| [Product Requirements](docs/product-requirements.md) | Functional and non-functional requirements, user personas, MVP scope |
| [Response Plan](docs/response-plan.md) | Automated notification cascade, escalation matrix, traveller check-in workflow |
| [Safety Plan](docs/safety-plan.md) | Regional risk classification, duty of care obligations, privacy controls |

### Capabilities

- **Staff Itinerary Registry** — record traveller, destination, dates, contact details, accommodation
- **Regional News Monitoring** — live RSS/API feeds from region-specific sources (JMA, GDACS, FCO, WHO, USGS)
- **Automated Incident Detection** — keyword matching against configured alerts per region
- **Emergency Response Activation** — notification cascade via email/SMS/Teams, traveller check-in request, escalation to duty officer
- **Safety Dashboard** — real-time view of all active travellers, regional alert status, outstanding check-ins

### Architecture Decision Records

| ADR | Decision |
|---|---|
| [001](docs/adr/001-event-source-architecture.md) | Multi-source event monitoring over single provider for incident detection |
| [002](docs/adr/002-itinerary-registry.md) | Internal registry over Entra ID location data for staff tracking |
| [003](docs/adr/003-notification-cascade.md) | Email/SMS/Teams cascade over single-channel notification |
| [004](docs/adr/004-region-risk-classification.md) | Deterministic risk rules over external risk scoring API |

## Status

**Phase 0: Discovery** — in progress. Architecture and requirements being defined.
