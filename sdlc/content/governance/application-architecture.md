---
title: Application Architecture
---

A small set of approved architecture choices, applied by default, keeps internal applications consistent, supportable and low-risk. Deviations are possible but must be recorded as an Architecture Decision Record (ADR) and reviewed at [Gate 3](stage-gates).

## Default Architecture

**Maxim: Prefer a modular monolith over microservices.** Build one application, deployed together, organised into clear internal modules. Microservices are only justified by a proven operational need, not by team preference.

**Maxim: Prefer server-rendered pages over a separate frontend and backend.** Do not create separate frontend and backend repositories.

## Reference Stack

| Layer | Standard |
|---|---|
| Application | ASP.NET Core on a supported long-term-support .NET release |
| User interface | Server-rendered Blazor or equivalent ASP.NET Core approach |
| Data access | Entity Framework Core |
| Database | PostgreSQL |
| Validation | FluentValidation or equivalent |
| Observability | Structured logging and OpenTelemetry-compatible metrics |
| Background work | Hosted services locally; Azure Container Apps jobs in production |

Use JavaScript only where a server-rendered approach is inadequate.

## Hosting Target

| Capability | Standard |
|---|---|
| Web application | Azure Container Apps |
| Scheduled work | Azure Container Apps jobs |
| Database | Azure Database for PostgreSQL Flexible Server |
| Secrets | Azure Key Vault |
| Containers | Azure Container Registry |
| Observability | Application Insights with Log Analytics |
| Identity | Microsoft Entra ID; managed identity wherever supported |
| Delivery | GitHub Actions for build, test, security, IaC and deployment |

Use one Azure resource group per environment. Support development and production initially; design so test or staging can be added without changing the architecture.

## Infrastructure as Code

**Maxim: Infrastructure is code.** Define all infrastructure in Bicep, stored in the repository, and deployed through the pipeline — never by manual console changes.

## Architecture Artefacts

The repository is the authoritative record. Each delivery must contain:

| Artefact | Location | Content |
|---|---|---|
| Architecture document | `docs/architecture.md` | System context, components, data flows, integration approach, environments |
| Decision records | `docs/adr/` | One file per significant decision, with context, options considered and outcome |
| Diagram | In `docs/architecture.md` | Mermaid or equivalent architecture diagram |

The required depth scales with project size: a diagram or brief for small work, a detailed document for medium, and a detailed document with architecture and security review for large work (see [Scaled Documentation](scaled-documentation)).

## Review

Architecture is reviewed at **Gate 3 — Design**. For medium and large work, the architecture document, threat model and data flows must be reviewed by the technical owner and security before implementation begins. The reference template is the [Delivery Prompt Template](../lifecycle/delivery-prompt), which contains the preferred technology architecture in full.

## Deviations

Any proposed deviation from the default architecture must:

- be recorded as an ADR with the rationale and alternatives considered
- be flagged in the Gate 3 review
- be approved by the technical owner (small) or Architecture + Security + Project Governance (medium and large)

## Sizing

This page will be linked with [Project Sizing](project-sizing). Small tools and applications that use the approved business-as-usual tool sets will be classified automatically as part of the sizing matrix, inheriting a default size without the need for a manual assessment.
