---
sidebar_position: 3
---

# Engineering Delivery Model

How the ICT engineering team builds, hosts, and governs internal tools — using SharePoint for authoring, GitHub for version control, Azure Static Web Apps for delivery, and OpenCode as the AI engineering agent.

## Problem

The team's tools (Knowledge Base, Foundry bootcamp, Innovation Playground mockup, Asset Manager) were built on GitHub Pages — **public by default**. Internal engineering products need:

- **Authentication** — only internal staff should access these tools
- **Familiar authoring** — docs live in SharePoint, edited by non-technical team members
- **Version control** — Git history for everything, PR workflows for review
- **AI-native tooling** — OpenCode builds and maintains the applications

## Architecture

```
SPO Doc Library (.md files)
       │
       │ Graph API (sync via GitHub Action or Azure Function)
       ▼
GitHub Repo (mirrored .md + OpenCode-built tools)
       │
       │ push → Azure Static Web Apps build + deploy
       ▼
Azure Static Web App
  ┌──────────────────────────────────────────┐
  │  Rendered docs    │  OpenCode-built      │
  │  (.md → .html)    │  tools (Foundry,     │
  │                   │  Innovation Playgr.) │
  └────────┬─────────────────────────────────┘
           │ Entra ID authentication
           ▼
      Internal users (SSO)
```

## Components

### SharePoint Online — Authoring

Doc Libraries are the source of truth for documentation. Team members edit `.md` files directly in SharePoint (or create `.docx` files that convert to Markdown via Pandoc). No knowledge of Git required for content authors.

- **Format:** Markdown (`.md`) for structured docs; `.docx` supported via conversion
- **Permissions:** Existing SPO access controls apply
- **Workflow:** Author creates/edits → sync picks up changes → site rebuilds

### Sync Layer — Bridge

A script (GitHub Action or Azure Function) runs on a schedule or SPO webhook trigger:

```
GET /drives/{id}/root:/path:/children  →  download .md files  →  commit to GitHub
```

- **Frequency:** Every 15 minutes (schedule) or near-real-time (webhook)
- **Conversion:** Pandoc for `.docx → .md`; direct copy for `.md`
- **Conflict resolution:** GitHub is authoritative — SPO changes always overwrite repo copies

### GitHub — Source of Truth

Everything is version-controlled. The repository stores:

- Documentation (synchronised from SPO)
- Application code (Foundry, Innovation Playground, Asset Manager)
- Configuration (workflows, deployment manifests)
- Architecture Decision Records (ADRs)

OpenCode interacts with this repository directly — reading, writing, and refactoring code and content under human supervision.

### Azure Static Web Apps — Hosting

SWA builds from the GitHub repository and deploys to a global static site. Key features:

- **Entra ID authentication** — built-in, toggle in portal, no code changes
- **Custom domains** — `tools.contoso.com` or similar
- **Staging environments** — PRs get auto-generated preview URLs
- **Free tier** — 3 apps, 1 GB bandwidth, 100 GB storage

### Entra ID — Access Control

Azure Static Web Apps supports Entra ID as an authentication provider out of the box. When a user visits the site:

1. Unauthenticated request is redirected to Entra ID login
2. User authenticates with their corporate credentials
3. SWA validates the token and serves the content
4. Optional: role-based access for different tools

### OpenCode — AI Engineering Agent

OpenCode is the primary tool for building and maintaining the applications. It works directly with the GitHub repository:

- **Build tools:** Create Foundry pages, Innovation Playground mockups, Knowledge Base content
- **Refactor:** Rename, restructure, update across multiple files
- **Review:** Analyse code quality, suggest improvements, catch issues
- **Automate:** Generate workflows, deployment configs, documentation

The workflow is: prompt → OpenCode builds/edits → human reviews → commit → auto-deploys.

## Decision Log

| Decision | Rationale |
|---|---|
| SPO Doc Library over SPO Pages | Doc Libraries support Markdown natively, are Git-syncable, and don't require SPFx |
| Azure SWA over Azure App Service | Static sites are simpler, cheaper, and sufficient for docs and mockups |
| Entra ID auth over custom auth | Zero code, zero maintenance, corporate credentials |
| GitHub as source of truth | Enables Git workflows, PR reviews, and OpenCode integration |
| SPO → GitHub sync (not GitHub → SPO) | Content authors don't need to learn Git; sync is invisible to them |

## Future Considerations

- **Asset Manager** requires a runtime (Express + SQLite). Deploy to Azure Container Apps with the same Entra ID auth pattern.
- **Innovation Playground** live TUI (real shell) would need a WebSocket-capable runtime. Possible with Azure Container Apps or a separate WebSocket server behind the same auth.
- **Multi-environment** setup (dev/staging/prod) using SWA deployment environments.
