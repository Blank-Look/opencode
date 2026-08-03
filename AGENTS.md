# Project Context

Two independent projects plus a products directory in one repo: **Knowledge Base** (`products/knowledgebase/`), **Asset Governance Manager** (`asset-governance-manager/`), and **Products** (`products/`). Knowledge Base and Asset Governance Manager share no code or dependencies.

## Knowledge Base (`products/knowledgebase/`)

Markdown + `generate.js` → static HTML/CSS, hosted on GitHub Pages.

**Workflow:**
- Edit `.md` files in `products/knowledgebase/content/` (frontmatter supports `title:` — `sidebar_position` is ignored by the generator)
- Sidebar structure is hardcoded in `products/knowledgebase/generate.js` (not inferred from filesystem)
- Regenerate with `node products/knowledgebase/generate.js` — this outputs to `products/knowledgebase/docs/`
- `products/knowledgebase/docs/` is git-tracked (generated HTML committed alongside source)
- Links in markdown use **extensionless relative paths** (e.g. `data-classification`, `it-governance#policies`)
- Dependency: `marked` (dynamically ESM-imported)
- Nav bar in generated HTML: SchoolCode link goes up to root via `upToRoot()` in generate.js (works automatically from any depth)

## Asset Governance Manager (`asset-governance-manager/`)

Express + SQLite + Microsoft Graph API connectors. No tests, linters, or CI.

**Commands** (run from `asset-governance-manager/`):
```
npm start          # node src/index.js
npm run dev        # node --watch src/index.js (Node 18+)
npm run seed       # node src/seed.js (demo data)
npm run sync       # node src/manual-sync.js "<job-name>"
```

**Setup:**
- `cp .env.example .env` — fill in Azure AD app registration (Graph API permissions needed)
- DB auto-created at `data/asset-governance-manager.db` (WAL mode, foreign keys on)
- 4 pre-configured cron sync jobs (Entra, SharePoint, Defender, Power Automate)

**Architecture:**
- Entry: `src/index.js` → starts Express + scheduler
- Routes: REST CRUD under `/api/` (assets, asset-types, sources, owners, jobs, business-rules, stats)
- Connectors: `src/connectors/` — each implements `sync(jobId)` with `upsertAsset()`/`logSync()` from base class
- Frontend: vanilla JS SPA in `public/` — calls REST API directly

## Nav Bar Template

All pages must have a **SchoolCode** brand link in the nav/header that links back to the root `index.html`:

- **Light-theme pages** (Travel Itineraries, Products, Cadence, etc.): SchoolCode link (uppercase, muted) + divider + page title
- **Dark-theme mockups** (Prism Academy): SchoolCode link (uppercase, subdued) + divider + product logo
- **Sidebar mockups** (Innovation Playground): SchoolCode link above the product name in the sidebar-brand

```html
<!-- Light nav bar pattern -->
<nav class="navbar">
  <div class="navbar-inner">
    <div class="navbar-left">
      <a href="../index.html" class="navbar-schoolcode">SchoolCode</a>
      <a href="index.html" class="navbar-brand">Product Name</a>
    </div>
    <div class="navbar-links">
      <a href="https://github.com/Blank-Look/opencode">GitHub</a>
    </div>
  </div>
</nav>
```

```css
.navbar-schoolcode {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--gray-600);
  text-decoration: none;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding-right: 0.75rem;
  margin-right: 0.75rem;
  border-right: 1px solid var(--gray-300);
  transition: color 0.15s;
}
.navbar-schoolcode:hover { color: var(--primary); }
```

Path to root is `../index.html` from top-level dirs, `../../index.html` from `products/` subdirs.

## App Mockup Style (Default)

All new app mockups (`app-mockup.html`) should follow this established pattern:

**Structure:**
- Fixed top banner (`mockup-banner`) — navy background, white text, links to docs
- Fixed left sidebar (`sidebar`) — 240px, white background, nav sections with icons, active state has accent border-left
- Main content area — offset by sidebar width + banner height, max-width 1200px
- Top bar — page title left, avatar right

**Color themes per app:**
- Asset Governance Manager: maroon (`--maroon: #7A1B2C`), blue-gray accents
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

**New app template:** Copy `asset-governance-manager/app-mockup.html` as starting point, swap accent colour variables, update sidebar sections, page sections, and mock data.

## Delivery Prompt Template

When asked to create a new product or application, follow the [Delivery Prompt Template](https://blank-look.github.io/opencode/sdlc/docs/lifecycle/delivery-prompt.html). This template enforces structured delivery:

- **Phase 0 first**: inspect the existing repo, produce architecture docs, assumptions, risks, and implementation plan before writing code
- **Modular monolith** over microservices unless there's a proven reason
- **Deterministic risk rules** over opaque AI
- **Role-based governance** over named individuals
- **Source systems remain authoritative** — the new app is an aggregation layer
- **Phase-based delivery** in vertical slices (Foundation → Core MVP → Integrations → Workflows → Onboarding)
- **Definition of done**: acceptance criteria, auth, validation, audit, tests, failure paths, safe logs, docs, migration, provenance, no secrets, no unrelated changes

Use the ICT Asset Governance Manager prompt as the structural template — adapt the architecture and technology choices to the specific product being built.
