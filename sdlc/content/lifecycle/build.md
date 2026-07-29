---
title: 4. Build
---

The approved prompt is supplied to OpenCode within the designated GitHub repository.

## Deliverables

OpenCode creates or updates:

- application code
- scripts
- configuration
- infrastructure as code
- automated tests
- security checks
- deployment definitions
- technical documentation
- operational documentation
- change records
- release notes

## Suggested Repository Structure

```
/
├── README.md
├── AGENTS.md
├── docs/
│   ├── requirement.md
│   ├── governance.md
│   ├── architecture.md
│   ├── security.md
│   ├── testing.md
│   ├── deployment.md
│   ├── operations.md
│   └── decisions/
├── src/
├── tests/
├── infrastructure/
├── pipelines/
├── scripts/
├── CHANGELOG.md
└── CODEOWNERS
```

## AGENTS.md

AGENTS.md should give OpenCode the standing instructions for the repository, including:

- coding conventions
- approved commands
- testing expectations
- files it may and may not modify
- security requirements
- documentation requirements
- when it must stop and ask for assistance

## Required Working Practices

All changes should:

- be completed on a branch
- be associated with an approved work item
- be committed in small, reviewable increments
- use pull requests
- pass automated checks
- be reviewed by an accountable person
- preserve an audit trail of prompts, decisions and approvals

**OpenCode may generate the work, but it does not approve its own work.**

## Incident Response During Build

If the AI agent generates code or configuration that causes a security incident, data exposure, or service disruption during the Build phase:

1. **Stop the agent** immediately and revoke repository access
2. Follow the [Incident Response Process](https://blank-look.github.io/opencode/knowledgebase/docs/security/incident-response.html) in the ICT Knowledge Base
3. Preserve the agent's logs, prompts, and generated output as forensic evidence
4. Notify the Technical Owner and Security Reviewer before resuming

The AI Workspace is a disposable environment (see [Assure](../lifecycle/assure.html) phase). Treat any compromise as a full environment rebuild rather than attempting in-place remediation.
