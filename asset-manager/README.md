# ICT Asset Governance Manager

Internal ICT governance tool for consolidated asset lifecycle, ownership, risk, and compliance management. ASP.NET Core modular monolith hosted in Azure Container Apps with PostgreSQL, Entra ID authentication, and read-only integrations.

## Architecture

[![Architecture](docs/architecture.md)](docs/architecture.md)
Azure Container Apps, PostgreSQL Flexible Server, Key Vault, Application Insights. Modular monolith with internal workflow engine and deterministic risk scoring.

## Documentation

| Doc | Description |
|---|---|
| [Product Requirements](docs/product-requirements.md) | Functional and non-functional requirements, user personas, MVP scope |
| [Architecture](docs/architecture.md) | Component architecture, hosting decisions, resource naming |
| [Data Model](docs/data-model.md) | Entity relationship diagram, entity definitions, design decisions |
| [Integrations](docs/integrations.md) | Freshservice, Entra ID, and Defender XDR connectors — permissions, field mappings, reconciliation rules |
| [Security Model](docs/security-model.md) | Authentication, application roles, policy-based authorisation, security controls |
| [Threat Model](docs/threat-model.md) | STRIDE analysis covering application, infrastructure, integrations |
| [Implementation Plan](docs/implementation-plan.md) | 6 delivery phases, effort estimates, first vertical slice file list |
| [Assumptions & Questions](docs/assumptions-and-questions.md) | Top assumptions, delivery risks, questions requiring clarification |
| [Permissions Matrix](docs/permissions-matrix.md) | Role vs. capability mapping for all 9 application roles |
| [Policy Traceability](docs/policy-traceability.md) | Policy requirements mapped to system entities, fields, controls, and workflows |

### Architecture Decision Records

| ADR | Decision |
|---|---|
| [001](docs/adr/001-modular-monolith.md) | Modular monolith over microservices |
| [002](docs/adr/002-azure-container-apps.md) | Azure Container Apps over Kubernetes or VMs |
| [003](docs/adr/003-postgresql.md) | PostgreSQL as single operational database |
| [004](docs/adr/004-server-rendered-ui.md) | Server-rendered ASP.NET Core over SPA |
| [005](docs/adr/005-source-systems-authoritative.md) | Source systems remain authoritative |
| [006](docs/adr/006-role-based-assignment.md) | Role-based over person-based workflow ownership |
| [007](docs/adr/007-deterministic-risk.md) | Deterministic rules over opaque AI risk scoring |
| [008](docs/adr/008-internal-workflow-engine.md) | Internal state machine over external workflow platform |
| [009](docs/adr/009-read-only-integrations-mvp.md) | Read-only external integrations for MVP |
| [010](docs/adr/010-bicep-iac.md) | Bicep for infrastructure as code |
| [011](docs/adr/011-managed-identity.md) | Managed identity over long-lived secrets |
| [012](docs/adr/012-built-in-reporting.md) | Built-in reporting over separate analytics platform |

## Status

**Phase 0: Discovery & Foundation** — complete. Architecture reviewed and approved. Ready for Phase 1 implementation.
