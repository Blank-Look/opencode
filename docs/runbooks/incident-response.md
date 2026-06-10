---
sidebar_position: 4
---

# Incident Response

Standardised procedure for detecting, responding to, and recovering from security incidents.

## Incident Severity Levels

| Level | Definition | Response Time | Escalation |
|---|---|---|---|
| P1 - Critical | Active breach, data loss, service down | 15 min | ICT Manager, Exec |
| P2 - High | Suspected breach, malware, privilege escalation | 30 min | Security Lead |
| P3 - Medium | Policy violation, suspicious activity | 4 hours | Team Lead |
| P4 - Low | Phishing report, minor anomaly | 24 hours | Assignee |

## Response Stages

### 1. Identification

- User reports incident via ticketing system
- Alert from monitoring / SIEM
- Automated scan detection

### 2. Triage

- Determine severity level
- Assign incident handler
- Create incident ticket
- Initial containment if needed

### 3. Containment

- Isolate affected systems from network
- Preserve evidence (disk images, memory dumps, logs)
- Apply temporary access blocks

### 4. Eradication

- Remove malware / malicious accounts
- Patch vulnerabilities
- Reset compromised credentials

### 5. Recovery

- Restore from clean backups
- Verify system integrity
- Monitor for recurrence

### 6. Lessons Learned

- Root cause analysis
- Update runbooks and controls
- Incident report for management

## Communication

- P1: Notify ICT Manager immediately by phone
- All incidents: Update ticket within 1 hour
- Post-incident: Written report within 5 business days

## Tools

- **SIEM**: Wazuh / Splunk
- **EDR**: CrowdStrike / Defender for Endpoint
- **Ticketing**: Jira Service Management
- **Forensics**: Autopsy / FTK Imager
