---
sidebar_position: 2
---

# Network Configuration

Reference documentation for network infrastructure configuration.

## Network Topology

```
Internet
  └── Firewall (pfSense / Fortigate)
       ├── DMZ (web servers, reverse proxy)
       ├── Internal LAN (workstations, printers)
       └── Management LAN (servers, switches, APs)
```

## VLANs

| VLAN | ID | Purpose | Subnet |
|---|---|---|---|
| Native | 1 | Management | 10.0.0.0/24 |
| Internal | 10 | Workstations | 10.0.10.0/24 |
| DMZ | 20 | Public-facing services | 10.0.20.0/24 |
| Voice | 30 | VoIP phones | 10.0.30.0/24 |
| Guest | 40 | Guest WiFi | 10.0.40.0/24 |
| Management | 99 | Network device mgmt | 10.0.99.0/24 |

## Firewall Rules Baseline

| Rule | Source | Destination | Port | Action | Log |
|---|---|---|---|---|---|
| HTTP/S to DMZ | Any | DMZ servers | 80, 443 | Allow | Yes |
| RDP from management | Management LAN | Servers | 3389 | Allow | Yes |
| SSH from management | Management LAN | Servers | 22 | Allow | Yes |
| All other inbound | Any | Any | Any | Deny | Yes |
| Outbound internet | Internal LAN | Any | 80, 443 | Allow | No |
| All other outbound | Internal LAN | Any | Any | Deny | Yes |

## Wireless Configuration

- **SSID: ICT-Corp** — WPA3-Enterprise, 802.1X with RADIUS
- **SSID: ICT-Guest** — WPA2-PSK, isolated from internal LAN
- **SSID: ICT-IoT** — WPA2-PSK, restricted to IoT VLAN

## Monitoring

- SNMP v3 on all managed switches
- NetFlow / sFlow to monitoring server
- Interface utilisation alerts at 80%
- DHCP scope utilisation alerts at 85%
