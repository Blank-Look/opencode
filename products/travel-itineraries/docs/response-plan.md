# Emergency Response Plan

## 1. Incident Detection

Automated monitoring scans regional news sources at configurable intervals:

- Japan Meteorological Agency (earthquake/tsunami alerts)
- GDACS (global disaster alerts)
- FCO / DFAT travel advisories
- WHO disease outbreak notifications
- Custom RSS feeds per region

When an incident matches a configured keyword, severity, and location, an alert is raised.

### Alert Severity Levels

| Level | Colour | Criteria | Response |
|---|---|---|---|
| Advisory | Yellow | Minor event, no immediate danger | Notify traveller, log |
| Watch | Orange | Credible risk in region | Contact traveller, confirm safety |
| Warning | Red | Imminent danger | Full escalation, evacuation support |
| Critical | Purple | Active crisis | Executive notification, consular liaison |

## 2. Notification Cascade

On incident detection:

1. **System** — Log incident, create case in Incident Response system
2. **Traveller** — Automated check-in request (email + SMS) with safety confirmation link
3. **Travel Manager** — Notification with affected traveller list
4. **Duty Officer** — Escalated if no check-in within 30 minutes
5. **Head of Security** — Escalated if no check-in within 60 minutes
6. **Executive** — Notified for Critical-level events

### Communication Channels

- Email (primary)
- SMS (secondary, via Twilio or equivalent)
- Microsoft Teams / Slack (internal alert channel)

## 3. Traveller Accountability

- Travellers must check in within 15 minutes of alert receipt
- Check-in options: "I am safe", "I need assistance", "I am not in the affected area"
- If no response in 30 minutes → Duty Officer calls traveller's emergency contact
- If no response in 60 minutes → Consular assistance contacted

## 4. Escalation Matrix

| Role | Responsibility | Contact |
|---|---|---|
| Travel Manager | Day-to-day travel oversight | TBD |
| Duty Officer | Incident response coordination | TBD |
| Head of Security | Crisis management authority | TBD |
| Executive Sponsor | Strategic decisions, repatriation approval | TBD |
| Consular Liaison | Embassy/consulate coordination | TBD |

## 5. Post-Incident

- After-action review within 72 hours
- Update risk assessments for affected regions
- Report to governance body (ISAC / ITEC)
- Continuous improvement of monitoring rules
