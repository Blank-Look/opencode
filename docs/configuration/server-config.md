---
sidebar_position: 3
---

# Server Configuration

Baseline configuration standards for all servers.

## OS Baseline (Ubuntu 24.04 LTS)

### System Settings

```bash
# Timezone
timedatectl set-timezone UTC

# NTP
apt install chrony

# Firewall
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh

# Automatic updates
apt install unattended-upgrades
dpkg-reconfigure --priority=low unattended-upgrades
```

### SSH Hardening

```
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
MaxAuthTries 3
ClientAliveInterval 300
ClientAliveCountMax 2
UsePAM no
```

### Logging

```bash
# Install rsyslog and configure remote logging
# Log rotation per OS defaults
# Forward all auth logs to SIEM
```

## Monitoring Agent

All servers must run:
- Node Exporter (Prometheus metrics)
- rsyslog remote forwarding
- osquery (for security visibility)
- CrowdStrike / Wazuh agent (EDR)

## Directory Structure

```
/opt/ict/          — Team-managed applications
/var/log/apps/     — Application logs
/backup/           — Local backup staging
/data/             — Application data
```

## Patching Schedule

| Environment | Day | Time | Max Downtime |
|---|---|---|---|
| Development | Monday | 09:00-12:00 | — |
| Staging | Wednesday | 12:00-14:00 | 30 min |
| Production | Thursday | 18:00-22:00 | 15 min |
