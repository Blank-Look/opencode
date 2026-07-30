# SharePoint Governance Manager

Automated governance scanning for SharePoint Online — external sharing audit, owner validation, inactivity detection, and lifecycle management.

> **Product landing pages:** [SharePoint Governance](https://blank-look.github.io/opencode/products/sharepoint-governance/) · [App Mockup](https://blank-look.github.io/opencode/products/sharepoint-governance/app-mockup.html)

## Design Mockup

[App Mockup →](https://blank-look.github.io/opencode/products/sharepoint-governance/app-mockup.html)
Interactive HTML mockup covering dashboard, site inventory, external sharing audit, owner validation, inactive sites, and lifecycle queue.

## Architecture

[Architecture docs →](https://github.com/Blank-Look/opencode/tree/master/products/sharepoint-governance) *(in progress)*
Microsoft Graph API, Governance Scanner, SharePoint List queue, and Power BI dashboard. Read-only scanning, no write-back, no agents.

## Documentation

| Doc | Description |
|---|---|
| [Product Requirements](docs/product-requirements.md) | Functional and non-functional requirements, user personas, MVP scope |
| [Architecture](docs/architecture.md) | Component architecture, scanner design, data model |
| [Governance Rules](index.html#governance-detection-rules) | External sharing, owner validation, inactivity, permission inheritance |
| [Lifecycle Management](index.html#lifecycle-management) | Active, Review, Archive, Delete stages |

### Architecture Decision Records

| ADR | Decision |
|---|---|
| [001](docs/adr/001-read-only-scanner.md) | Read-only scanning over write-back agent for governance detection |
| [002](docs/adr/002-graph-api-scanning.md) | Microsoft Graph API over SharePoint CSOM for site enumeration |
| [003](docs/adr/003-sharepoint-list-queue.md) | SharePoint List queue over custom database for governance findings |
| [004](docs/adr/004-power-bi-reporting.md) | Power BI over built-in reporting for governance dashboards |

## Governance Detection Rules

| Rule | Detection | Severity |
|---|---|---|
| External Sharing | Site allows sharing with anyone, new/existing guests, or anyone in the organisation | High |
| No Site Owner | Site has no owners, or all owners are inactive/disabled | Critical |
| Inactive Site | No activity for 90+ days (configurable threshold) | Medium |
| Broken Inheritance | Unique permissions that don't inherit from parent | Warning |
| Sensitive Content Overshared | Site with sensitive/confidential content has external sharing enabled | Critical |
| Large Site | Site exceeds storage threshold (default 25 GB) | Info |
| Orphaned Site | Teams-connected site where the team has been deleted but site remains | High |

## Lifecycle Management

| Stage | Description |
|---|---|
| Active | Site is in use with valid owners and acceptable governance posture |
| Review | Site flagged for governance issue — owner notified |
| Archive | Site inactive for extended period — content preserved, access restricted |
| Delete | Site approved for removal — retention period enforced |

## Status

**Phase 0: Discovery** — in progress. Architecture and requirements being defined.
