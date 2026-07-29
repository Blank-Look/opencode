---
title: 2. Govern
---

Before information is provided to an AI service or coding agent, identify the rules that apply.

## Applicable References

Relevant references may include:

- information-security policies
- data-classification requirements
- privacy obligations
- architecture standards
- identity and access-management standards
- records-management requirements
- secure coding standards
- cloud and Azure standards
- procurement or licensing requirements
- change-management requirements
- approved AI tools and models

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
