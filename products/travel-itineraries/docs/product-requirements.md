# Product Requirements — Travel Itineraries

## Personas

| Persona | Role | Needs |
|---|---|---|
| Alex (Traveller) | Staff member travelling internationally | Simple itinerary entry, clear check-in process, emergency notifications |
| Sam (Travel Manager) | Operations / HR | Dashboard of active travellers, emergency alert management, compliance reporting |
| Jordan (Duty Officer) | Security / Risk | Real-time incident monitoring, escalation management, consular coordination |
| Casey (Executive) | Leadership | Visibility of staff location during crises, strategic decision support |

## Functional Requirements

### F1: Itinerary Management
- Staff submit travel itineraries with destination, dates, accommodation, contacts
- Itineraries require manager approval based on risk score
- Itineraries are searchable and filterable

### F2: Regional Monitoring
- System ingests live news feeds from region-specific sources
- Configurable alert keywords and severity thresholds per region
- Incident deduplication and correlation

### F3: Emergency Response
- Automated notification cascade on incident detection
- Traveller check-in with safety confirmation
- Escalation to Duty Officer on non-response
- Executive notification for Critical events

### F4: Safety Dashboard
- Real-time view of all active travellers on a map
- Regional alert status indicators
- Outstanding check-in tracker
- Incident timeline

### F5: Reporting
- Travel history by staff member
- Incident response metrics (time to check-in, time to resolve)
- Compliance reporting (insurance, training, approvals)

## Non-Functional Requirements

| Category | Requirement |
|---|---|
| Security | Staff PII encrypted at rest and in transit. Role-based access control. |
| Availability | 99.9% uptime during business hours. Alerting system high-availability. |
| Performance | Dashboard loads < 3 seconds. Alert notifications < 2 minutes from detection. |
| Privacy | Data retained per organisational data classification policy. GDPR / local law compliance. |
| Integration | Entra ID for authentication. Email/SMS/Teams for notifications. |

## MVP Scope

1. Itinerary submission and approval
2. Manual incident creation (proving automated monitoring)
3. Notification cascade to affected travellers
4. Check-in tracking dashboard
5. Regional risk scoring

## Future Phases

- Automated news feed ingestion
- Real-time traveller location (GPS check-in)
- Consular API integration
- Mobile app for travellers
