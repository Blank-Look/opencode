# Product Requirements — ICT Asset Governance Manager

## 1. Product Objective

Build an internal ICT governance tool that provides a consolidated view of organisational technology assets, ownership, lifecycle status, cost, sensitivity, security exposure, governance obligations, and overdue actions.

## 2. User Personas

| Persona | Primary Need |
|---|---|
| Infrastructure Teams | Server, network, endpoint asset tracking |
| Applications Teams | Application lifecycle, ownership, integration mapping |
| Data Governance Teams | Data classification, retention, privacy assessments |
| Cybersecurity Teams | Risk findings, Defender incident correlation |
| CTO / Technology Leadership | Dashboard, risk overview, cost visibility |
| Service Desk | Asset lookup, ownership identification |
| Business Owners | Application accountability, review workflows |
| Service Owners | Operational ownership, support model |
| Data Owners | Data classification, privacy controls |
| Governance / Privacy / Records | Policy compliance, audit evidence |
| Procurement / Risk | Contract review, vendor risk, cost tracking |

## 3. Functional Requirements

### 3.1 Executive Dashboard
- Total governed assets count
- Assets by type (chart)
- Assets by lifecycle stage (chart)
- Assets by risk band (chart)
- Critical and high-risk asset count (linked)
- Ownerless assets (linked)
- Unsupported / end-of-life assets (linked)
- Overdue reviews (linked)
- Expiring credentials (linked)
- Expiring contracts (linked)
- Unresolved Defender incidents (linked)
- Active exceptions (linked)
- Vacant governance roles (linked)
- Integration health summary
- Annual cost totals and cost by business unit
- Recently increased risk items

### 3.2 Asset Register
- Searchable, filterable table
- Filters: type, lifecycle, status, risk band, criticality, data classification, business unit, owner role, vacancy, hosting, source, security status, workflow due state, contract renewal, end-of-life, cost range
- Saved views (future phase)
- CSV export with formula-injection protection

### 3.3 Asset Detail
- Sections: Overview, Ownership, Data & Classification, Risk Findings, Controls, Workflows, Security, Entra, Freshservice, Relationships, Cost & Contracts, Lifecycle, Exceptions, Evidence, Audit History
- Source provenance shown beside synchronised fields
- Distinguish: source-controlled, locally governed, calculated, stale

### 3.4 My Governance Work
- Tasks due soon
- Overdue tasks
- Approvals required
- Escalations
- Delegated tasks
- Access/ownership reviews
- Exceptions awaiting approval
- Retirement tasks

### 3.5 Reports
- Asset Register, Risk Register, Ownerless Assets, Vacant Roles
- Overdue Reviews, Access Reviews Due, Credentials Expiring, Contracts Expiring
- End-of-Life Assets, Defender-Linked Risks, Control Compliance
- Active Exceptions, Retirement Pipeline
- Assets by Data Classification, by Business Unit
- Annual Cost by Asset Type, High-Cost Low-Use
- Integration Synchronisation Health

### 3.6 Workflow Requirements
- Triggers: asset created, lifecycle stage entered, review date reached, ownership invalid, credential expiry, contract renewal, risk finding created, risk severity increased, Defender incident linked, exception expiry, end-of-support, retirement marked, integration record disappears
- Capabilities: role-based assignment, due dates, escalation, reminders, approve/reject/info/complete/cancel/delegate, comments, evidence, immutable history, idempotent triggers

### 3.7 Onboarding Pipeline
- Stages: Business Idea → Basic Triage → Data/Privacy Triage → Identity/Access Triage → Vendor/Commercial Triage → Architecture Review → Security Assessment → Records Review → Approval → Implementation → Handover → Go-Live
- Show-stopper rules with explanation, evidence, correction path, exception path

## 4. Non-Functional Requirements

| Requirement | Target |
|---|---|
| Responsive design | Desktop + tablet |
| Accessibility | WCAG 2.2 AA |
| Page response | <2s for common filtered views |
| Scale | 100,000+ records |
| Idempotent sync | Yes |
| Recoverable jobs | Yes |
| Database backups | Automated |
| Single Azure region | Yes (Australia East) |
| No permanent dev credentials in prod | Yes |
| No single-person dependency | Yes |

## 5. MVP Scope (Phase 1)

- Entra sign-in with app roles
- Asset register with manual entry
- Asset detail with ownership, classification, lifecycle
- Deterministic risk engine
- Executive dashboard
- Audit history
- Demonstration data
