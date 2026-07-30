---
title: 6. Release
---

Azure DevOps orchestrates the CI/CD process, even where GitHub is the source repository.

## Typical Pipeline Flow

```
GitHub Pull Request
        ↓
Build and Validation
        ↓
Automated Testing
        ↓
Security and Dependency Scanning
        ↓
Deploy to Sandbox
        ↓
Sandbox Approval
        ↓
Deploy to Development
        ↓
Development Approval
        ↓
Deploy to Test
        ↓
Business and Technical Approval
        ↓
Deploy to Production
        ↓
Verification and Monitoring
```

## Pipeline Principles

- Build once and promote the same artefact
- Do not rebuild separately for production
- Store secrets in an approved secrets-management service
- Use service connections with minimum required permissions
- Separate development and production credentials
- Require approval for protected environments
- Record approver, time, version and deployment result
- Automate rollback where practical
- Prevent the AI agent from bypassing branch or environment protections

## CI/CD and Change Management

CI/CD automation does not bypass the [ICT Change Management process](https://blank-look.github.io/opencode/products/knowledgebase/docs/service-operations/change-management.html). All production deployments must be recorded as change requests in the service management tool:

| Deployment Type | Change Type | Approval | Notes |
|---|---|---|---|
| Standard (documented, low-risk) | Standard Change | Pre-approved | Must match an approved change template |
| Major feature or architectural | Normal Change | CAB approval | Requires rollback plan and test evidence |
| Security hotfix | Emergency Change | Emergency CAB | Post-deployment review within 72 hours |

See [Change Management](https://blank-look.github.io/opencode/products/knowledgebase/docs/service-operations/change-management.html) for full definitions of Standard, Normal, and Emergency changes, blackout periods, and CAB membership.
