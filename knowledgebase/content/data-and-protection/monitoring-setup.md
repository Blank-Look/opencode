---
sidebar_position: 6
---

# Monitoring Setup

Configure monitoring for new servers, services, and applications.

## Monitoring Stack

| Component | Tool | Purpose |
|---|---|---|
| Metrics | Prometheus | Time-series data collection |
| Visualisation | Grafana | Dashboards and alerting |
| Logs | Loki / Elasticsearch | Centralised log aggregation |
| Alerting | Alertmanager | Alert routing and notification |
| Uptime | Uptime Kuma | External health checks |

## Adding a New Host

### 1. Install Node Exporter

```bash
# Download and install
wget https://github.com/prometheus/node_exporter/releases/latest/download/node_exporter-*.linux-arm64.tar.gz
tar -xzf node_exporter-*.tar.gz
sudo mv node_exporter-*/node_exporter /usr/local/bin/

# Create systemd service
sudo tee /etc/systemd/system/node_exporter.service << EOF
[Unit]
Description=Node Exporter
After=network.target

[Service]
User=nobody
ExecStart=/usr/local/bin/node_exporter
Restart=always

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl enable --now node_exporter
```

### 2. Configure Prometheus Target

Add to `/etc/prometheus/prometheus.yml`:

```yaml
scrape_configs:
  - job_name: '<hostname>'
    static_configs:
      - targets: ['<hostname>:9100']
```

Reload Prometheus:

```bash
curl -X POST http://localhost:9090/-/reload
```

### 3. Add Grafana Dashboard

- Import dashboard (Node Exporter Full) from grafana.com
- Configure alert rules per baseline
- Test alert delivery to Slack/Teams

## Verification

```bash
# Check node exporter is collecting
curl http://<hostname>:9100/metrics | head -20

# Verify target is up in Prometheus
curl http://prometheus:9090/api/v1/targets

# Confirm dashboard shows data
```
