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

## Gate 4 — Release Approval

Approval confirms that:

- acceptance criteria have been met
- automated checks have passed
- risks are accepted or treated
- support documentation is complete
- monitoring is configured
- rollback is proven
- the change window is approved
- the business and technical owners agree to release
