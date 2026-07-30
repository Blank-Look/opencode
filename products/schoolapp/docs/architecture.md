# SchoolApp — Architecture

## Overview

SchoolApp is designed as a Progressive Web App (PWA) — a single HTML/CSS/JS application that can be installed on Android and iOS home screens while also functioning identically in any web browser. This approach eliminates the need for separate native codebases while providing an app-like experience.

## Current State (Phase 0)

The current deliverable is a **static design mockup** — a single HTML file (`app-mockup.html`) that demonstrates the full UI, navigation, and content structure. No backend or API integration yet.

## Target Architecture

```
┌─────────────────────────────────────────────┐
│              PWA Shell (app-mockup.html)     │
│  ┌───────────────────────────────────────┐  │
│  │  Tab Bar (bottom nav / desktop tabs)  │  │
│  ├───────────┬───────────┬───────────────┤  │
│  │ Dashboard │ Subjects  │  Timetable    │  │
│  │───────────┤───────────┤───────────────│  │
│  │ Links Hub │ More      │               │  │
│  └───────────┴───────────┴───────────────┘  │
│                                             │
│  Service Worker (cache, offline)            │
│  Web App Manifest (install prompt)          │
└─────────────────────────────────────────────┘
           │               │
           ▼               ▼
┌──────────────────┐  ┌──────────────────┐
│  LMS APIs        │  │  Institutional   │
│  (Blackboard,    │  │  APIs (SIS,      │
│   Canvas)        │  │   M365 Graph)    │
└──────────────────┘  └──────────────────┘
```

## Component Breakdown

| Layer | Technology | Purpose |
|---|---|---|
| UI Shell | HTML5 + CSS3 + Vanilla JS | Single responsive page, tab-based navigation, card layout |
| Styling | CSS custom properties, Inter font, mobile-first | Consistent look across devices, PWA status bar |
| Navigation | Client-side tab switching (no router) | Instant page transitions, no network dependency |
| Offline | Service Worker (future) | Cache shell for offline access to key data |
| Install | Web App Manifest (future) | Add-to-home-screen on Android and iOS |
| API Layer | REST/GraphQL (Phase 1+) | Fetch from Blackboard, Canvas, Student Portal, M365 |

## Integration Architecture (Phase 1+)

Each institutional system is accessed via its public API. The PWA shell calls these APIs directly or through a lightweight BFF (Backend for Frontend) proxy.

```
SchoolApp PWA → Blackboard REST API
SchoolApp PWA → Canvas LMS API
SchoolApp PWA → M365 Graph API
SchoolApp PWA → Student SIS API
SchoolApp PWA → Timetabling API
```

## Security

- All API calls authenticated via OAuth 2.0 / OIDC (institutional SSO)
- No credentials stored in the PWA shell — tokens obtained via redirect flow
- Future: BFF proxy to hide API keys and enforce rate limiting

## Key Design Decisions

See [ADR-001](adr/001-pwa-approach.md) for the decision to use PWA over native apps.
