# ICT Knowledge Base

A static documentation portal for a small ICT team covering governance, runbooks, processes, configuration, and asset life cycle management.

> **Product landing pages:** [ICT Knowledge Base](https://blank-look.github.io/opencode/products/knowledgebase/)

## Design Mockup

N/A — this is a documentation portal, not an application.

## Architecture

Built with markdown + a simple Node.js generator (`generate.js`) using the `marked` ESM library. Sidebar structure is hardcoded in the generator (not inferred from filesystem). Generated HTML is committed alongside source.

### Structure

```
content/                        ← Markdown source files (edit these)
├── policy-and-governance/      ← Governance, compliance, risk, data classification
├── enterprise-applications/    ← ICT asset lifecycle, procurement, maintenance
├── data-and-protection/        ← Access control, backup, security awareness, monitoring
├── security/                   ← Incident response, threat mgmt, vulnerability mgmt
├── service-operations/         ← Incident, problem, change, request fulfillment, user mgmt
└── systems-and-infrastructure/ ← Network, server, software, security configuration
security-standards/             ← Hand-authored HTML category (copied into docs/ by generate.js)
docs/                           ← Generated HTML pages (regenerate after editing content)
css/style.css                   ← Shared stylesheet
generate.js                     ← Markdown → HTML generator
index.html                      ← Homepage
```

### Workflow

Edit the `.md` files in `content/`, then regenerate:

```bash
node generate.js
```

Links in markdown use **extensionless relative paths** (e.g. `data-classification`, `it-governance#policies`).

### Deploy

The site is pure HTML/CSS — just push to GitHub. Configure GitHub Pages to serve from the `products/knowledgebase/` directory.

**Live**: https://blank-look.github.io/opencode/products/knowledgebase/

## Documentation

| Doc | Description |
|---|---|
| [content/](content/) | Markdown source files organised by domain silo |
| [generate.js](generate.js) | Static site generator — markdown to HTML with sidebar |

## Status

**Active** — content maintained and published to GitHub Pages.
