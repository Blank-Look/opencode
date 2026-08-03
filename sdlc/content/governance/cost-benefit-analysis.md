---
title: Build vs Buy — Cost-Benefit Analysis
---

The economics of building have changed. Five years ago, a small ICT team could not afford software engineers, DevOps, UX, testing, hosting, and maintenance, so "we don't build bespoke applications" was a sound rule. AI has collapsed the cost of building small internal tools. The binding constraint is no longer coding — it is governance, architecture, and product ownership.

**Maxim: Buy what is cheaper and safer. Build what is cheaper and better.** Sometimes the answer is commercial software. Sometimes it is Power Platform. Sometimes it is a 500-line Python app. The best answer is the one that delivers the most value for the least risk.

## Policy Recommendation

**Maxim: Commercial products by default; internal development where it demonstrably wins.**

> We adopt Commercial Off-The-Shelf (COTS) solutions by default. Internal applications may be developed where they demonstrably provide lower total cost of ownership, faster delivery, or capabilities unavailable in commercial products.

This is a decision about economics, not ideology.

## Investment Strategy

Your organisation spends around $xxM each year on ICT — infrastructure, business applications, corporate IT — yet its engineering capacity is thin. That is the signature of a systems integrator, not a software house. AI rewrites the leverage.

**Maxim: Invest in capability, not headcount.** The future is not more developers. It is an infrastructure team that becomes a team of automation engineers.

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

These are excellent AI-built applications.

## Cost Model

**Maxim: Judge every proposed tool on the same dimensions — licence, build, maintenance, roadmap, customisation, and room to improve.**

| Dimension | Buy | Build |
|---|---|---|
| Annual licence | $xx,xxx | $0 |
| Initial build | $0 | 80 hours |
| Maintenance | Vendor | 10 hours/year |
| Vendor roadmap | Yes | No |
| Customisation | Low | High |
| AI-assisted enhancement | No | Yes |

**Maxim: "Build" is no longer a year of developers.** It can be 60 hours, GitHub, Azure App Service, and Copilot.

## Tiered Governance Model

**Maxim: Classify before you choose.** Four tiers, each with a standing rule:

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

## Support and Ownership

**Maxim: Every build has a caretaker. An orphaned tool is a liability.**

Internal development spans two very different commitments, and the tier alone does not tell you who keeps the tool alive:

### ICT-Built Tools — Enterprise-Cared
- Resourced, funded, and maintained by the ICT team like any other system.
- Monitored, patched, and backed up as a matter of course.
- Subject to SLAs and covered by support. Someone is accountable for it.
- **The team carries the work; the business receives a promise.**

### User-Led Tools — Author-Cared
- Built by a user or a business team to solve their own problem.
- The author owns upkeep: fixes, compliance, and currency.
- Central security data (Defender and similar) watches the tool and pushes compliance and fix requests to the author automatically.
- If the author does not remediate in the allotted time, the platform takes the tool offline.
- **The author carries the risk; the platform carries the safety.**

**Maxim: Care is the price of build.** Build it only if someone will care for it. When central data flags a problem, the author fixes it — or the platform retires it.

## Total Cost of Ownership

**Maxim: Compare five years, not one price.** A licence and a build only meet on equal terms across the life of the decision.

**Buy:** Licence × 5 years + Implementation + Training + Support + Vendor increases + Consultants + Change requests

**Build:** 80 hours build + 10 hours/year maintenance + GitHub + Azure

That is the real comparison.

## Budget for AI

**Maxim: Treat AI as infrastructure, not experiment.** AI is a standing cost of doing business, budgeted like any other utility.

| Item | Annual |
|---|---|
| ChatGPT Enterprise / Business | $xxk–xxk |
| GitHub Copilot | $xxk–xxk |
| GitHub Enterprise | as required |
| Training | $xxk |

## Where New Money Goes

**Maxim: Spend on leverage, not on staff.**

An additional $xxk goes where it multiplies the team:

- **40%** on GitHub Enterprise, Copilot, and ChatGPT
- **30%** on targeted consulting to establish a modern engineering platform (GitHub, CI/CD, IaC, identity, security, reusable templates)
- **20%** on structured training and mentoring (GitHub, automation, AI-assisted development, cloud engineering)
- **10%** on innovation time to build and validate high-value internal tools

The objective is not to become a software house. It is to increase the leverage of a small team.

## Strategic Direction

Your organisation is already heavily invested in Microsoft 365, Azure, Dynamics, Fabric, SharePoint, and other SaaS platforms. Competing with those products is a waste of the advantage. Position your team as platform engineers who extend and integrate them.

**Maxim: Buy the enterprise. Configure the platform. Automate the routine. Build the gaps.**

- **Buy** enterprise capabilities (ERP, CRM, LMS, collaboration, finance).
- **Configure** Microsoft 365 and SaaS platforms to meet business needs.
- **Automate** every repeatable operational task using GitHub, PowerShell, Python, Power Automate, and Azure services.
- **Build** small, focused internal tools only where there is a clear productivity or capability gap, a positive five-year TCO compared to commercial software, and a named caretaker.

This keeps the long-standing "buy before build" philosophy while acknowledging that AI has changed the economics of lightweight internal solutions. It is an evolution, not a reversal — and it is easier to explain to executives and auditors.
