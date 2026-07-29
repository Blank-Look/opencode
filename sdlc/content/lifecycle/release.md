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
