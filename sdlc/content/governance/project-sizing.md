---
title: Project Sizing
---

Existing financial thresholds can be retained while adding risk-based criteria.

## Size Categories

| Dimension | Small | Medium | Large |
|---|---|---|---|---|
| 12-month cost | Under $25,000 | $25,000–$200,000 | Over $200,000 |
| Internal effort | Under 3 weeks | 3 weeks–6 months | Over 6 months |
| Typical oversight | CTO or delegate | IT Steering Group | Leadership Team |
| Approving bodies | CTO or delegate | ITEC / IT Steering Group / ISAC | IT BoD / ISAC / Leadership Team |
| Minimum gates | 3 | 5 | 5 plus additional assurance |
| AI prompt review | Technical peer | Technical owner and security | Architecture, security and project governance |
| Environment path | Sandbox → Test → Production | Sandbox → Development → Test → Production | Sandbox → Development → Test → Pilot → Production |

See [IT Governance](https://blank-look.github.io/opencode/products/knowledgebase/docs/policy-and-governance/it-governance.html) for council membership and terms of reference. See [Stage Gates](../governance/stage-gates.html) for the full gate-to-body mapping.

## Size Escalation Factors

Project size should be increased where the work involves:

- sensitive or regulated data
- privileged access
- identity or security controls
- critical infrastructure
- significant architectural change
- external integrations
- high operational impact
- public-facing services
- difficult rollback
- substantial use of generated code with limited internal expertise

**A low-cost but high-risk initiative should not be treated as a small project.**
