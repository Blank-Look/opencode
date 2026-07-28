---
sidebar_position: 4
---

# Software Configuration

Standard software stack configuration across the environment.

## Web Server (Nginx)

```nginx
server {
    listen 443 ssl http2;
    server_name app.domain;

    ssl_certificate /etc/ssl/certs/domain.pem;
    ssl_certificate_key /etc/ssl/private/domain.key;

    # Security headers
    add_header Strict-Transport-Security "max-age=63072000" always;
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    add_header X-XSS-Protection "1; mode=block";

    # Rate limiting
    limit_req zone=login burst=5 nodelay;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Database (PostgreSQL 16)

```ini
# postgresql.conf tuning
max_connections = 100
shared_buffers = 1GB
effective_cache_size = 3GB
work_mem = 64MB
maintenance_work_mem = 256MB
wal_level = replica
max_wal_size = 4GB
min_wal_size = 1GB
```

### Backup Configuration

```bash
# pg_dump via cron
0 1 * * * pg_dump -U postgres -Fc mydb > /backup/db/mydb_$(date +\%Y\%m\%d).dump
```

## Monitoring (Prometheus)

```yaml
# Retention
retention: 30d
retention.size: 50GB

# Alerting rules
groups:
  - name: node_alerts
    rules:
      - alert: DiskSpaceWarning
        expr: disk_used_percent > 85
        for: 5m
        labels:
          severity: warning
      - alert: DiskSpaceCritical
        expr: disk_used_percent > 95
        for: 2m
        labels:
          severity: critical
```
