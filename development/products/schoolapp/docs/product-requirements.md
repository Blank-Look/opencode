# SchoolApp — Product Requirements

## Vision

A single, unified student hub that master's students use daily to access everything they need — subjects, timetable, links to institutional apps, events, and personal resources — from any device.

## User Personas

| Persona | Needs |
|---|---|
| **Master's Student** | View timetable, check assignments across Blackboard/Canvas, access M365 email/files, find events and deadlines |
| **Postgraduate Coordinator** | Communicate key dates, push notifications about seminars and deadlines |
| **IT Services** | Single supported platform (PWA) rather than maintaining multiple student apps |

## Functional Requirements

### Phase 0 — Static Mockup (current)

- Tab-based navigation (Dashboard, Subjects, Timetable, Links, More)
- Today's schedule with class time, location, lecturer
- Quick links to Blackboard, Canvas, Student Portal, M365 (Mail, Teams, OneDrive)
- Subject list with progress indicators and grades
- Weekly timetable view with day navigation
- Events and deadlines feed
- Profile/settings panel

### Phase 1 — API Integration

- Live timetable from central timetabling API
- Course list from SIS
- Assignment due dates from Blackboard and Canvas APIs
- Outlook calendar sync via M365 Graph
- Push notifications for schedule changes and deadlines

### Phase 2 — Offline & Personalisation

- Offline access to cached timetable and links
- Customisable quick links
- Theme options (light/dark)
- Calendar export

## Non-Functional Requirements

| Requirement | Target |
|---|---|
| Performance | Initial load < 2s on 4G; tab switches instant |
| Offline | Core navigation and links work without network |
| Installability | Add-to-home-screen on Android Chrome and iOS Safari |
| Responsiveness | Usable from 320px to 1920px width |
| Accessibility | WCAG 2.1 AA minimum |
| Security | OAuth 2.0 / OIDC for all API integrations |

## MVP Scope

The current HTML mockup represents the full MVP UI. API integration begins in Phase 1.
