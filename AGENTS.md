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

## App Mockup Style (Default)

All new app mockups (`app-mockup.html`) should follow this established pattern:

**Structure:**
- Fixed top banner (`mockup-banner`) — navy background, white text, links to docs
- Fixed left sidebar (`sidebar`) — 240px, white background, nav sections with icons, active state has accent border-left
- Main content area — offset by sidebar width + banner height, max-width 1200px
- Top bar — page title left, avatar right

**Color themes per app:**
- Asset Manager: maroon (`--maroon: #7A1B2C`), blue-gray accents
- Travel Itineraries: amber (`--amber: #B45309`), orange-toned grays
- New apps should pick a distinct accent color

**Components:**
- `.stats` — stat card grid (`.stat-card` with label/value/sub)
- `.charts` — two-column chart grid (`.chart-card` with `.bar-chart`)
- `.two-col` — two-column card grid (`.card` with h3 header + `.more-link`)
- `.table-wrap` + `table` — data tables with uppercase header
- `.tabs` — horizontal tab bar with active underline
- `.detail-grid` — two-column detail field layout (`.detail-field` with label/value)
- `.alert-item` — alert/finding cards with left severity border
- `.severity-badge` — pill badges (critical/warning/advisory/info/safe)
- `.status-dot` — status indicator with colored dot
- `.src-badge` — source/system pill badges
- `.chip` — filter/tag pills

**Conventions:**
- Sidebar items use `onclick="showPage('id')"` to toggle `.page-section` visibility
- `showPage()` function in inline `<script>` at bottom
- Footer note with status badge
- Responsive: sidebar hidden, single-column on mobile (<768px)
- All sidebar items are `cursor: default` (non-interactive mockup)
- Inter font via Google Fonts

**New app template:** Copy `asset-manager/app-mockup.html` as starting point, swap accent colour variables, update sidebar sections, page sections, and mock data.
