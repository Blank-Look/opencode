# Innovation Playground — Product Requirements

## Problem Statement

The organisation's SDLC provides robust governance for assets in production, but there is no governed space for **pre-lifecycle ideation**. Teams currently either:
- Build outside governance (shadow IT risk)
- Skip ideation entirely (missed opportunities)
- Get stuck in process before validating an idea

The COO wants to open the innovation funnel while keeping SDLC guardrails intact.

## Users & Personas

| Persona | Role | Needs |
|---|---|---|
| **Innovator** | Any staff member | A sandbox to try ideas quickly without red tape |
| **Reviewer** | Domain expert / Tech lead | Validate ideas against policy and architecture |
| **Governance Admin** | GRC / Platform team | Monitor compliance, enforce guardrails, audit activity |
| **Asset Governance Manager** | Asset lifecycle owner | Receive validated ideas into the formal lifecycle |

## Functional Requirements

### 1. Sandbox Lifecycle

- User requests a sandbox with: name, description, category, estimated duration, resources (app type, repo template, dependencies)
- Sandbox is provisioned automatically with approved templates
- Sandbox has a **hard TTL** (default 7 days, configurable up to 30)
- Warnings at T-48h, T-24h, T-1h
- Auto-destroy at expiry with data retention policy (anonymised logs kept 90 days)
- User can extend once (max +7 days) with justification

### 2. Governed IDE

- Web-based IDE (code editor, terminal, file explorer)
- **Anonymisation layer**: all identifiers are opaque — real names, systems, and data are masked
- **Guardrail enforcement**: pre-commit hooks check for:
  - Secrets / credentials (blocked)
  - Production data references (blocked)
  - Unapproved dependencies (warn)
  - License compliance (block)
- **Immutable audit trail**: all actions logged (who, what, when)
- **One-click snapshot**: export anonymised workspace for reference

### 3. Validation Pipeline

| Stage | Gate | Owner |
|---|---|---|
| **Submitted** | Auto-checks pass | System |
| **Peer Review** | At least one approval from domain reviewer | Reviewer(s) |
| **Security Scan** | Automated SAST/SCA | System |
| **Governance Review** | Policy compliance check | Governance Admin |
| **Ready for Lifecycle** | All gates passed | System |

### 4. Handoff to Asset Lifecycle

- "Move to Lifecycle" button creates an asset record in Asset Governance Manager
- Links back to the original idea and sandbox (anonymised reference)
- Triggers onboarding workflow (procurement, security assessment, etc.)
- Playground resources are destroyed after handoff

## Non-Functional Requirements

| Requirement | Target |
|---|---|
| Sandbox provision time | < 5 minutes |
| Max concurrent sandboxes per user | 3 |
| Max sandbox duration | 30 days |
| Audit retention | 90 days (anonymised) |
| Anonymisation scope | Code, logs, metadata, network traces |

## API Surface

```
POST   /api/sandboxes          — Create sandbox
GET    /api/sandboxes          — List my sandboxes
GET    /api/sandboxes/:id      — Sandbox detail
DELETE /api/sandboxes/:id      — Destroy sandbox
POST   /api/sandboxes/:id/extend — Extend TTL

POST   /api/ideas              — Submit new idea
GET    /api/ideas              — List ideas
GET    /api/ideas/:id          — Idea detail
POST   /api/ideas/:id/validate — Submit for validation

GET    /api/pipeline           — Pipeline status
POST   /api/pipeline/:id/approve — Approve gate
POST   /api/pipeline/:id/reject  — Reject gate

POST   /api/ideas/:id/promote  — Move to Asset Lifecycle
```
