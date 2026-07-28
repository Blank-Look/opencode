# ICT Knowledge Base

A static documentation portal for a small ICT team covering governance, runbooks, processes, configuration, and asset life cycle management.

Built with markdown + a simple Node.js generator.

## Structure

```
content/                        ← Markdown source files (edit these)
├── coo/
│   └── policy-and-governance/  ← Governance, compliance, risk
├── service-desk/
│   ├── process-runbooks/       ← Incident, request, change, problem, user mgmt
│   ├── config/
│   ├── projects/
│   └── standards/
├── enterprise-apps/
│   ├── process-runbooks/
│   ├── config/
│   ├── projects/
│   └── standards/
└── infrastructure-and-security/
    ├── process-runbooks/       ← Server provisioning, backup, incident response, monitoring, threat
    ├── config/                 ← Network, server, software, security config
    ├── projects/
    └── standards/              ← Asset life cycle, access control, security awareness
docs/          ← Generated HTML pages (regenerate after editing content)
css/style.css  ← Shared stylesheet
generate.js    ← Markdown → HTML generator
index.html     ← Homepage
```

## Edit Content

Edit the `.md` files in `content/`, then regenerate:

```bash
node generate.js
```

## Deploy

The site is pure HTML/CSS — just push to GitHub. Configure GitHub Pages to serve from the `knowledgebase/` directory (or browse it directly at the path below).

**Live**: https://blank-look.github.io/opencode/knowledgebase/
