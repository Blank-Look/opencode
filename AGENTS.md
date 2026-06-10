# Project Context

This is an **ICT Knowledge Base** — a static documentation portal for a small ICT team covering governance, runbooks, processes, configuration, and asset life cycle management.

## Tech Stack

- **Site**: Markdown + Node.js generator (`generate.js`) → static HTML/CSS
- **Hosting**: GitHub Pages (https://blank-look.github.io/opencode/)
- **Dependencies**: `marked` for Markdown rendering

## Content

Edit `.md` files in `content/`, then regenerate with `node generate.js`. The sidebar structure is defined in `generate.js` — sections and pages are configured there.

## Asset Manager (`asset-manager/`)

A full app service built during the 2026-06-10 session. Purpose: IT asset inventory that discovers, tags, and assigns ownership across Entra ID, SharePoint, Defender, and Power Automate.

### Stack

- **Backend**: Node.js + Express
- **Database**: SQLite (via `better-sqlite3`, file at `data/asset-manager.db`)
- **Auth/API**: Microsoft Graph API via `@azure/identity` + `@microsoft/microsoft-graph-client`
- **Scheduler**: `node-cron` for sync jobs

### Project Structure

```
asset-manager/
├── src/
│   ├── index.js              Entry point (starts Express + scheduler)
│   ├── app.js                Express app, route mounting, static files
│   ├── db.js                 SQLite schema (7 tables + indexes)
│   ├── config.js             Environment config (.env)
│   ├── seed.js               Demo data seeder
│   ├── manual-sync.js        CLI: node src/manual-sync.js "<job-name>"
│   ├── scheduler.js          Registers cron jobs, supports pause/resume/trigger
│   ├── rules-engine.js       Business rule evaluator (last_seen, age, status, unassigned)
│   ├── routes/               REST API routes
│   │   ├── assets.js         CRUD, search, pagination, assign owner
│   │   ├── asset-types.js    Manage asset types (dynamic)
│   │   ├── sources.js        Manage data sources
│   │   ├── owners.js         Manage owners
│   │   ├── jobs.js           Sync jobs: trigger, pause, resume, edit, logs
│   │   ├── business-rules.js Business rules: CRUD + evaluate endpoint
│   │   └── stats.js          Dashboard aggregation (totals, by source/type/status)
│   └── connectors/           Microsoft Graph API integrations
│       ├── base.js           Base connector with upsertAsset(), logSync()
│       ├── entra.js          Groups + App Registrations
│       ├── sharepoint.js     SharePoint Sites
│       ├── defender.js       Security alerts + threat intelligence
│       ├── powerautomate.js  Power Automate service principals
│       └── manual.js         No-op connector for manual entries
├── public/
│   ├── index.html            Dashboard UI (6 tabs: Assets, Types, Sources, Jobs, Rules, Owners)
│   ├── css/style.css
│   └── js/app.js             Vanilla JS frontend, calls REST API
└── data/                     SQLite database (auto-created, gitignored)
```

### API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/stats` | Dashboard summary counts |
| GET | `/api/assets` | List assets (query: search, source, status, type, page, limit) |
| GET | `/api/assets/:id` | Get single asset |
| POST | `/api/assets` | Create asset |
| PUT | `/api/assets/:id` | Update asset |
| PATCH | `/api/assets/:id/owner` | Assign/change owner |
| DELETE | `/api/assets/:id` | Delete asset |
| GET/POST/PUT/DELETE | `/api/asset-types` | Asset type CRUD |
| GET/POST/PUT/DELETE | `/api/sources` | Source CRUD |
| GET/POST/PUT/DELETE | `/api/owners` | Owner CRUD |
| GET/POST/PUT/DELETE | `/api/jobs` | Sync job CRUD |
| POST | `/api/jobs/:id/trigger` | Run sync job immediately |
| POST | `/api/jobs/:id/pause` | Pause scheduled job |
| POST | `/api/jobs/:id/resume` | Resume scheduled job |
| GET | `/api/jobs/:id/logs` | View sync history |
| GET/POST/PUT/DELETE | `/api/business-rules` | Business rule CRUD |
| POST | `/api/business-rules/:id/evaluate` | Evaluate rule on matching assets |

### Database Schema (7 tables)

`asset_types`, `sources`, `owners`, `assets`, `sync_jobs`, `sync_logs`, `business_rules` — all created automatically by `db.js`.

### Sync Jobs (pre-configured)

| Job | Source | Schedule |
|-----|--------|----------|
| Entra ID Daily Sync | Entra ID | `0 6 * * *` |
| SharePoint Daily Sync | SharePoint | `30 6 * * *` |
| Defender Hourly Sync | Defender | `0 * * * *` |
| Power Automate Daily Sync | Power Automate | `0 7 * * *` |

### Business Rules (pre-configured)

1. **Flag stale assets** — Assets not seen in 90+ days → status set to `inactive`
2. **Flag unassigned critical assets** — Unassigned Defender alerts → tagged `needs-owner`

### Running the Asset Manager

```bash
cd asset-manager
cp .env.example .env   # fill in Azure AD app registration details
node src/seed.js       # seed demo data (skip if connecting real APIs)
npm start              # starts on http://localhost:3000
```

### Azure AD App Registration

Required Graph API permissions: `Group.Read.All`, `Application.Read.All`, `Sites.Read.All`, `SecurityAlert.Read.All`, `ThreatIndicators.Read.All`, `ServicePrincipalEndpoint.Read.All`.

### Deployment

The asset manager is designed for Azure App Service. Set env vars in App Settings, deploy the `asset-manager/` folder.

## opencode Configuration

No `opencode.json` exists yet. The project uses opencode's defaults. If configuring, the compaction settings control cross-session memory:

```json
{
  "compaction": {
    "auto": true,
    "tail_turns": 2
  },
  "instructions": ["AGENTS.md"]
}
```

The `instructions` field in `opencode.json` points to this file so context is loaded every session. Key facts from the 2026-06-10 session:
- AGENTS.md was created to persist project context across opencode sessions
- opencode sessions are stateless — `instructions` files are the mechanism for cross-session memory
- The asset manager was converted from a static mockup (`asset-inventory-mockup.html`) into a full app service
