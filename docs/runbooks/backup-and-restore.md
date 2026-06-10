---
sidebar_position: 3
---

# Backup and Restore

Standard procedures for backing up systems and restoring data when needed.

## Backup Schedule

| System | Type | Frequency | Retention | Destination |
|---|---|---|---|---|
| Critical servers | Full + incremental | Daily | 30 days | Off-site storage |
| Databases | Transaction log | Every 15 min | 7 days | Replicated storage |
| Configuration files | Version controlled | On change | Indefinite | Git repository |
| User data | Differential | Weekly | 90 days | Cloud backup |

## Performing a Backup

### Automated Backup Check

```bash
# Check last backup status
./scripts/check-backups.sh

# Review backup logs
tail -100 /var/log/backup/backup.log
```

### Manual Backup

```bash
# Database dump
pg_dump -h dbhost -U admin -Fc mydatabase > /backup/mydatabase_$(date +%Y%m%d).dump

# File-level backup
rsync -avz /data/ backup-server:/backups/$(hostname)/
```

## Restore Procedure

### Database Restore

1. Stop the application service
2. Drop and recreate the database
3. Restore from dump:
   ```bash
   pg_restore -h dbhost -U admin -d mydatabase /backup/mydatabase_20251201.dump
   ```
4. Verify data integrity
5. Start the application service

### File Restore

1. Identify the file and snapshot date
2. Restore from latest backup:
   ```bash
   rsync -avz backup-server:/backups/$(hostname)/$(date)/ /data/
   ```
3. Verify file permissions and ownership
4. Test application functionality

## Verification

- Run `./scripts/verify-backup.sh` after every backup
- Perform a full restore test monthly
- Document and report any restoration failures
