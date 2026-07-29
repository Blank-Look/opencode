---
title: 3. Generate
---

Feed the approved requirement and governance references into ChatGPT using a standard template. ChatGPT produces a structured OpenCode Delivery Prompt rather than directly producing uncontrolled implementation instructions.

## ChatGPT Request Template

Act as a solution analyst and delivery planner. Using the requirement and governance references below, create a complete implementation prompt for OpenCode.

The prompt must:

1. Restate the objective and acceptance criteria
2. Identify assumptions, uncertainties and questions
3. Define the permitted scope and prohibited actions
4. Specify the required technology and repository structure
5. Require infrastructure as code where applicable
6. Require unit, integration, security and deployment tests
7. Require architecture, support and operational documentation
8. Require traceability between requirements, code and tests
9. Define the expected Azure DevOps pipeline
10. Require OpenCode to stop and request approval at specified checkpoints
11. Prevent deployment to production without human approval
12. Produce a completion report listing files created, tests performed, risks, unresolved issues and recommended next actions

### Inputs

| Section | Content |
|---|---|
| Requirement | Insert approved AI Delivery Request |
| Governance references | Insert applicable policies, standards and architecture patterns |
| Repository and environment information | Insert approved technical context |

## Output

The generated prompt should contain:

- objective
- acceptance criteria
- applicable standards
- architecture constraints
- implementation tasks
- documentation tasks
- test requirements
- security requirements
- pipeline requirements
- agent permissions
- stop conditions
- approval checkpoints
- definition of done

## Gate 3 — Prompt and Design Approval

A technical owner reviews the generated prompt before it is supplied to OpenCode.

For medium and large work, this gate should also approve:

- solution design
- threat model
- data flows
- integration approach
- estimated effort and cost
- implementation and rollback approach
