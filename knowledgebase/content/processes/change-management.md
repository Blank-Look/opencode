---
sidebar_position: 2
---

# Change Management

Ensure changes to ICT systems are assessed, approved, and implemented in a controlled manner.

## Change Types

| Type | Definition | Approval | Risk |
|---|---|---|---|
| Standard | Pre-approved, low risk (e.g., password reset, user add) | Pre-approved | Low |
| Normal | Requires assessment and approval | Change Advisory Board | Medium |
| Emergency | Urgent fix for active incident (e.g., security patch) | Emergency CAB | High |

## Workflow

### 1. Submission

- Raise a change request in the ticketing system
- Include: description, reason, scope, timeline, risk assessment
- Attach implementation and rollback plans

### 2. Assessment

- Technical review by ICT team
- Impact and resource assessment
- Risk classification

### 3. Approval

| Change Type | Approver | SLA |
|---|---|---|
| Standard | Auto-approved | Immediate |
| Normal | CAB (ICT Manager + 2 team members) | 2 business days |
| Emergency | Emergency CAB (ICT Manager) | 1 hour |

### 4. Implementation

- Follow the implementation plan
- Update configuration documentation
- Notify stakeholders

### 5. Review

- Post-implementation review within 5 days
- Verify change achieved the intended outcome
- Update the change record
- Identify lessons learned

## Rollback Plan

Every change must have a rollback plan approved before implementation. If rollback is required:

1. Execute the approved rollback procedure
2. Notify stakeholders
3. Create an incident ticket if service was affected
4. Schedule a post-mortem

## Blackout Periods

- No normal changes during: financial year-end, major audits, planned DR tests
- Emergency changes still permitted with appropriate approvals
