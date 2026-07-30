---
title: Build vs Buy — Cost-Benefit Analysis
---

The economics of building internal tools have changed. Five years ago, "we don't build bespoke applications" was sensible — a small ICT team couldn't afford software engineers, DevOps, UX, testing, hosting, security, and ongoing maintenance. Today, with AI-assisted development, the cost of building small internal tools has dropped dramatically. The limiting factor is no longer coding — it's governance, architecture, and product ownership.

The question is no longer "Should we build apps?" It's: **What is the cheapest, safest way to solve internal problems?** Sometimes that's buying software. Sometimes it's Power Platform. Sometimes it's a 500-line Python app.

## Policy Recommendation

Instead of "We do not develop bespoke applications", adopt a modern framing:

> We adopt Commercial Off-The-Shelf (COTS) solutions by default. Internal applications may be developed where they demonstrably provide lower total cost of ownership, faster delivery, or capabilities unavailable in commercial products.

This changes the conversation from ideology to economics.

## Investment Strategy

Your organisation is probably spending around $2.5M in annual ICT operational expenditure — infrastructure, business applications, corporate IT. Yet engineering capability is often limited. That suggests your organisation is primarily a systems integrator, not a software organisation. AI changes the leverage.

**Where to invest:** Not in new developers. In making your infrastructure team into automation engineers.

| Current Model | Future Model |
|---|---|
| Infrastructure | Platform Engineering |
| Windows | Azure |
| Azure | M365 |
| Networking | GitHub |
| M365 | Automation |
| | AI |

Same people. Different tools.

## Capability Roadmap

### Stage 1 — Foundations (Everyone learns)
- GitHub
- Markdown
- GitHub Issues
- GitHub Projects
- Pull Requests

No coding yet.

### Stage 2 — Automation Skills
- PowerShell
- Python
- GitHub Actions
- Copilot

### Stage 3 — Replace Repetitive Work

| Current | Future |
|---|---|
| New AD User: 20 manual steps | GitHub Workflow + PowerShell + API — Done |

### Stage 4 — Internal Tools

Not enterprise systems. Things like:
- Certificate checker
- Room booking helper
- Azure reporting
- Licensing dashboard
- Firewall request tracker
- Intune packaging portal

These are fantastic AI-built applications.

## Cost Model

Evaluate every proposed internal tool using this framework:

| Question | Buy | Build |
|---|---|---|
| Annual licence | $35,000 | $0 |
| Initial build | $0 | 80 hours |
| Maintenance | Vendor | 10 hours/year |
| Vendor roadmap | Yes | No |
| Customisation | Low | High |
| AI-assisted enhancement | No | Yes |

Notice that "build" is no longer "12 months of developers." It might literally be 60 hours + GitHub + Azure App Service + Copilot.

## Tiered Governance Model

Classify software into four tiers:

### Tier 1 — Enterprise Systems
Dynamics, FinanceOne, Canvas, Qualtrics, core ERPs.
**Buy. Never build.**

### Tier 2 — Department Applications
Monday, Smartsheet, PowerApps.
**Evaluate. Maybe buy.**

### Tier 3 — Internal Operational Tools
These are ideal for AI. Examples: Intune package tracker, DNS manager, VM report, Azure cost explorer, user lifecycle dashboard.
**Build.**

### Tier 4 — Automation
PowerShell, Python, GitHub Actions, Azure Functions.
**Always build.**

## Total Cost of Ownership

Don't compare a $20k licence vs a $20k developer. Compare over five years:

**Buy:** Licence × 5 years + Implementation + Training + Support + Vendor increases + Consultants + Change requests

**Build:** 80 hours build + 10 hours/year maintenance + GitHub + Azure

That's the real TCO comparison.

## Budget for AI

Instead of treating AI as discretionary spend, make it a real budget item:

| Item | Annual |
|---|---|
| ChatGPT Enterprise / Business | $15k–25k |
| GitHub Copilot | $10k–20k |
| GitHub Enterprise | as required |
| Training | $10k |

## Where New Money Goes

If given an additional $100k:

- **40%** on GitHub Enterprise, Copilot, and ChatGPT
- **30%** on targeted consulting to establish a modern engineering platform (GitHub, CI/CD, IaC, identity, security, reusable templates)
- **20%** on structured training and mentoring (GitHub, automation, AI-assisted development, cloud engineering)
- **10%** on innovation time to build and validate high-value internal tools

The objective isn't to become a software house. It's to increase the leverage of a small team.

## Strategic Direction

Your organisation is already heavily invested in Microsoft 365, Azure, Dynamics, Fabric, SharePoint, and other SaaS platforms. Rather than trying to compete with those products, position your team as platform engineers who extend and integrate them.

A concise strategy:

- **Buy** enterprise capabilities (ERP, CRM, LMS, collaboration, finance).
- **Configure** Microsoft 365 and SaaS platforms to meet business needs.
- **Automate** every repeatable operational task using GitHub, PowerShell, Python, Power Automate, and Azure services.
- **Build** small, focused internal tools only where there is a clear productivity or capability gap and a positive five-year TCO compared to commercial software.

This keeps the long-standing "buy before build" philosophy, while acknowledging that AI has fundamentally changed the economics of creating and maintaining lightweight internal solutions. It's an evolution rather than a reversal, and it's much easier to explain to executives and auditors.
