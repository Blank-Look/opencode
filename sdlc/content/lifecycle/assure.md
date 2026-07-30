---
title: 5. Assure
---

Code and documentation move through progressively controlled environments.

## Environment Path

```
AI Workspace → Sandbox → Development → Test → Production
```

### AI Workspace

Used for planning and initial code generation.

Controls:

- no production credentials
- no production data
- restricted network and tool access
- disposable environment
- agent activity logged

### Sandbox

Used to prove the concept safely.

Checks may include:

- code builds successfully
- basic functional tests
- dependency validation
- initial security scanning
- architectural feasibility
- cost and performance assumptions

### Development

Used for integration and completion.

Checks include:

- peer review
- unit tests
- linting
- static analysis
- secret scanning
- software-composition analysis
- infrastructure validation
- documentation completeness

### Test

Used for formal assurance.

Checks include:

- functional acceptance
- integration testing
- security testing
- accessibility testing where applicable
- performance testing
- backup and recovery
- deployment and rollback testing
- operational readiness
- business-owner acceptance

## Risk Scoring

Risk during delivery uses the [ICT Knowledge Base risk framework](https://blank-look.github.io/opencode/products/knowledgebase/docs/policy-and-governance/risk-management.html) (ISO 31000-aligned, 5×5 likelihood × impact matrix) as the enterprise standard. The Delivery Prompt Template's deterministic point-based scoring (40/20/8/2 + multipliers) is a **project-level prioritisation tool** that feeds into, but does not replace, the enterprise risk register.

Risk findings identified during assurance must be recorded in both the project risk register and the enterprise risk management system per the [Risk Management process](https://blank-look.github.io/opencode/products/knowledgebase/docs/policy-and-governance/risk-management.html).

## Gate 4 — Release Approval

Approval confirms that:

- acceptance criteria have been met
- automated checks have passed
- risks are accepted or treated (per ISO 3100 / KB Risk Management framework)
- support documentation is complete
- monitoring is configured
- rollback is proven
- the change window is approved
- the business and technical owners agree to release
