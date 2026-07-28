---
sidebar_position: 2
---

# Application & Data Lifecycle Governance

This policy defines the governance, accountability, and control requirements for the management of applications and data throughout their lifecycle.

## Purpose

This policy ensures that:

- Applications are introduced, operated, changed, and retired in a controlled manner
- Data is created, accessed, stored, shared, retained, and disposed of in accordance with business, legal, regulatory, privacy, and security obligations
- Ownership and decision-making responsibilities are clearly assigned
- Risk is appropriately evaluated before applications or data services are adopted or materially changed

## Scope

Applies to:

- All business applications, platforms, SaaS services, integrations, databases, and supporting services
- All institutional data created, collected, processed, stored, shared, archived, or disposed of
- All staff, contractors, vendors, and third parties involved in the lifecycle
- All hosting environments: on-premises, cloud, managed service provider, or third-party SaaS

## Policy Statement

No application or material data service shall be introduced, materially changed, integrated, or retired without:

- A designated business owner
- A designated technical owner or service owner
- Appropriate security, privacy, legal, procurement, and records management review where applicable
- Formal approval consistent with governance and change control processes
- Documented operational, security, compliance, and lifecycle requirements

## Accountability

All applications and data must have clearly assigned accountability for:

- Business purpose and benefit
- Technical operation and support
- Information security and access control
- Privacy and regulatory obligations
- Records retention and disposal requirements
- End-of-life planning and decommissioning

## Sensitivity-Based Control Model

Controls are applied based on sensitivity classification:

| Sensitivity | Profile | Approval Path | Key Controls |
|---|---|---|---|
| **Low** | Non-critical tools, no sensitive data, limited integrations | Business Owner + Apps review (light) | SSO where available, group-based access, approved vendor list |
| **Medium** | Business systems with internal data, moderate integrations | Business Owner + Apps-led + Security/Data consulted | SSO + RBAC mandatory, logging enabled, data classification defined |
| **High** | Personal data, core system integrations, regulatory impact | Full governance path including Security + Privacy sign-off | SSO + RBAC, full logging, security validation, privacy review |
