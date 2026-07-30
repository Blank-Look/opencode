---
title: 2. Govern
---

Before information is provided to an AI service or coding agent, identify the rules that apply.

Governance references are held in the [ICT Knowledge Base](https://blank-look.github.io/opencode/products/knowledgebase/index.html). This phase links to the authoritative sources rather than duplicating them.

## Applicable References

Relevant references may include:

- **Information-security policies** — see [Security](https://blank-look.github.io/opencode/products/knowledgebase/docs/security/overview.html)
- **Data-classification requirements** — see [Data Classification](https://blank-look.github.io/opencode/products/knowledgebase/docs/policy-and-governance/data-classification.html) (authoritative 4-tier model: Confidential, Sensitive, Internal, Public)
- **Privacy obligations** — see [Compliance](https://blank-look.github.io/opencode/products/knowledgebase/docs/policy-and-governance/compliance.html) (FERPA, GDPR, PCI DSS, HIPAA)
- **Architecture standards** — see [Systems & Infrastructure](https://blank-look.github.io/opencode/products/knowledgebase/docs/systems-and-infrastructure/overview.html) baselines
- **Identity and access-management standards** — see [Access Control](https://blank-look.github.io/opencode/products/knowledgebase/docs/data-and-protection/access-control.html)
- **Records-management requirements** — see [Data Governance](https://blank-look.github.io/opencode/products/knowledgebase/docs/policy-and-governance/data-governance.html)
- **Secure coding standards** — see [Security Config](https://blank-look.github.io/opencode/products/knowledgebase/docs/systems-and-infrastructure/security-config.html) (CIS, OWASP baselines)
- **Cloud and Azure standards** — see [Deployment](https://blank-look.github.io/opencode/products/knowledgebase/docs/data-and-protection/deployment.html) (IaC, tagging)
- **Procurement or licensing requirements** — see [Procurement](https://blank-look.github.io/opencode/products/knowledgebase/docs/data-and-protection/procurement.html)
- **Change-management requirements** — see [Change Management](https://blank-look.github.io/opencode/products/knowledgebase/docs/service-operations/change-management.html)
- **Approved AI tools and models** — defined by the [IT Governance](https://blank-look.github.io/opencode/products/knowledgebase/docs/policy-and-governance/it-governance.html) bodies

## Governance Bodies

Gate decisions are made by the following bodies as defined in the ICT Knowledge Base:

| Gate | Small | Medium | Large |
|---|---|---|---|
| 1. Intake | CTO or delegate | IT Executive Council (ITEC) | IT Board of Directors |
| 2. Governance | CTO or delegate | ITEC + ISAC | IT BoD + ISAC |
| 3. Design | Technical peer | Technical owner + Security | Architecture + Security + Project Governance |
| 4. Release | CTO or delegate | IT Steering Group | IT Board of Directors |
| 5. Operate | Operational owner | Operational owner + ISAC | IT BoD + ISAC |

See [IT Governance](https://blank-look.github.io/opencode/products/knowledgebase/docs/policy-and-governance/it-governance.html) for council membership and terms of reference.

## Role Mapping

The ICT Knowledge Base defines a richer role taxonomy than the simplified SDLC roles. Map accordingly:

| SDLC Role | KB Governance Role(s) |
|---|---|
| Business Owner | Data Owner, Business Owner, Service Owner |
| Technical Owner | Application Owner, Technical Owner, Platform Owner |
| Operational Owner | Service Owner, Support Team, Records Manager |
| Security Reviewer | Security Governance Manager, ISAC member |
| Privacy Reviewer | Data Steward, Privacy Officer |
| Procurement contact | Procurement Owner, Vendor Manager |

## Required Definitions

The governance step should explicitly define:

| Field | Description |
|---|---|
| Permitted AI tools | Which tools may be used |
| Permitted models | Which AI models are approved |
| Information that may be supplied | What data can be shared |
| Information that must not be supplied | What data is protected |
| Approved repositories | Where work may be stored |
| Required human approvals | Who must approve what |
| Permitted agent actions | What the agent may do |
| Prohibited agent actions | What the agent must not do |
| Required security checks | What scans are needed |
| Required deployment gates | What approvals are needed |

## Access Control

Access should follow least-privilege principles. The coding agent should normally be able to work only within the designated repository and sandbox environment. It should not have direct production access.

## Gate 2 — Approved for AI-Assisted Delivery

Approval confirms that:

- the proposed use of AI is appropriate
- sensitive information is protected
- the solution has an agreed risk classification
- required standards have been attached to the work
- the agent's permissions and boundaries are defined
