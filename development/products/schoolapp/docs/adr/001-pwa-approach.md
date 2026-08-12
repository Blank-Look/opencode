# ADR-001: PWA over Native Android/iOS Apps

## Status

Accepted

## Context

SchoolApp needs to work on Android, iOS, and desktop from a single codebase. The primary users are master's students who expect an app-like experience but cannot be asked to install separate native apps for a student hub.

## Decision

Use a Progressive Web App (PWA) as the delivery mechanism:

- Single HTML/CSS/JS codebase
- Installable on Android Chrome and iOS Safari home screens
- Works identically in any modern web browser on desktop
- Web App Manifest for install prompt, splash screen, and theme colour
- Service Worker for offline caching of shell and key data (Phase 1+)

## Alternatives Considered

| Alternative | Rejected Because |
|---|---|
| React Native / Flutter | Requires native build toolchain, separate app store submission, over-engineered for a content-aggregation hub |
| Native Android + iOS (separate) | 2x development cost, 2x maintenance burden, no desktop story |
| Responsive website only | No installability, no offline support, missed app-like feel students expect |

## Consequences

- Cross-platform by default with zero additional build steps
- Instant updates (no app store review cycle)
- Some iOS PWA limitations (no push notifications, no background sync on iOS < 16.4)
- Institutional APIs must support CORS or a BFF proxy must be deployed
