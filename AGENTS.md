# Project Context

Two independent projects in one repo: **Knowledge Base** (`knowledgebase/`) and **Asset Manager** (`asset-manager/`). They share no code or dependencies.

## Knowledge Base (`knowledgebase/`)

Markdown + `generate.js` → static HTML/CSS, hosted on GitHub Pages.

**Workflow:**
- Edit `.md` files in `knowledgebase/content/` (frontmatter supports `title:` — `sidebar_position` is ignored by the generator)
- Sidebar structure is hardcoded in `knowledgebase/generate.js` (not inferred from filesystem)
- Regenerate with `node knowledgebase/generate.js` — this outputs to `knowledgebase/docs/`
- `knowledgebase/docs/` is git-tracked (generated HTML committed alongside source)
- Links in markdown use **extensionless relative paths** (e.g. `data-classification`, `it-governance#policies`)
- Dependency: `marked` (dynamically ESM-imported)

## Asset Manager (`asset-manager/`)

Express + SQLite + Microsoft Graph API connectors. No tests, linters, or CI.

**Commands** (run from `asset-manager/`):
```
npm start          # node src/index.js
npm run dev        # node --watch src/index.js (Node 18+)
npm run seed       # node src/seed.js (demo data)
npm run sync       # node src/manual-sync.js "<job-name>"
```

**Setup:**
- `cp .env.example .env` — fill in Azure AD app registration (Graph API permissions needed)
- DB auto-created at `data/asset-manager.db` (WAL mode, foreign keys on)
- 4 pre-configured cron sync jobs (Entra, SharePoint, Defender, Power Automate)

**Architecture:**
- Entry: `src/index.js` → starts Express + scheduler
- Routes: REST CRUD under `/api/` (assets, asset-types, sources, owners, jobs, business-rules, stats)
- Connectors: `src/connectors/` — each implements `sync(jobId)` with `upsertAsset()`/`logSync()` from base class
- Frontend: vanilla JS SPA in `public/` — calls REST API directly

## opencode Configuration

No `opencode.json` — project uses defaults. If creating one, reference this file via `"instructions": ["AGENTS.md"]` for cross-session context.
