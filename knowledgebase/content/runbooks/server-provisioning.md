---
sidebar_position: 2
---

# Server Provisioning

Provision a new Linux server for production or staging use.

## Prerequisites

- Access to the infrastructure management console
- DNS zone edit permissions
- Configuration management access (Ansible)
- Asset register entry created (see [Asset Life Cycle](../asset-life-cycle/overview))

## Steps

### 1. Create Server Instance

```
Provider: [AWS/Azure/On-prem]
OS: Ubuntu 24.04 LTS
Size: [per sizing guidelines]
Network: [production/staging VLAN]
```

### 2. Apply Base Configuration

```bash
# Run the base provisioning playbook
ansible-playbook -i inventory.ini site.yml --limit <hostname>
```

This configures:
- OS hardening (CIS benchmarks)
- Monitoring agent installation
- Log forwarding (rsyslog)
- Firewall rules (per baseline)
- SSH key deployment

### 3. Register in DNS

```
Type: A / AAAA
Name: <hostname>.<domain>
TTL: 300
```

### 4. Add to Monitoring

- Add to Nagios/Zabbix/Prometheus
- Configure alert thresholds
- Test alert delivery

### 5. Verify

```bash
# Check connectivity
ssh <hostname> hostname

# Verify services
systemctl status <critical-services>

# Check monitoring dashboard
# Confirm host appears in monitoring
```

## Rollback

1. Remove DNS records
2. De-register from monitoring
3. Terminate/decommission the instance (see [Disposal](../asset-life-cycle/disposal))
4. Verify alerts are clear
