---
sidebar_position: 5
---

# Security Configuration

Security baselines and hardening standards for ICT systems.

## Access Control

### Identity Provider (Entra ID / Keycloak)

- MFA required for all privileged accounts
- Conditional Access: block legacy auth, require compliant devices
- Password policy: 14+ chars, no rotation required (NIST 2024 guidance)
- Session timeout: 15 min inactivity

### Privileged Access

- PAM (Privileged Access Management) for admin accounts
- Just-in-time (JIT) elevation with approval for production
- All privileged actions logged and monitored
- Admin accounts: separate from daily user accounts

## Endpoint Protection

| Control | Solution | Coverage |
|---|---|---|
| Antivirus / EDR | CrowdStrike / Defender | All endpoints & servers |
| DLP | Microsoft Purview | Email, file shares |
| Disk encryption | BitLocker / FileVault | All laptops |
| MDM | Intune / Jamf | All managed devices |

## Network Security

- All traffic inspected by next-gen firewall
- Segmentation per VLAN (see [Network Config](network-config))
- EDR traffic never traverses internet — dedicated management VLAN
- VPN with MFA for all remote access

## Vulnerability Management

```bash
# Weekly vulnerability scan (Nessus / OpenVAS)
0 2 * * 0 /opt/ict/scripts/scan.sh

# Critical patches: 24 hours
# High patches: 7 days
# Medium patches: 30 days
# Low patches: 90 days
```

## Audit Logging

| Log Source | Retention | Destination |
|---|---|---|
| Firewall | 90 days | SIEM |
| Server auth logs | 12 months | SIEM + cold storage |
| Application logs | 30 days | Centralised logging |
| AD / IdP logs | 12 months | SIEM |
| EDR alerts | 12 months | EDR console + SIEM |
