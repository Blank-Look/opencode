---
sidebar_position: 5
---

# User Management

Procedures for creating, modifying, and removing user accounts across ICT systems.

## User Life Cycle

```
Request → Approve → Create → Configure → Review → Disable → Archive
```

## Account Creation

### Prerequisites

- Approved access request form
- Manager approval recorded
- User's details verified

### Steps

1. **Create identity** in the identity provider (Entra ID / LDAP):
   - Username: `firstname.lastname`
   - Email: `firstname.lastname@domain`
   - Group memberships per role

2. **Provision applications**:
   - Email mailbox
   - VPN access (if remote)
   - File share access
   - Application accounts per onboarding checklist

3. **Distribute credentials**:
   - Temporary password (expire at first login)
   - MFA enrolment instructions
   - Welcome email with policies

### Verification

```bash
# Test login
ssh testuser@portal.domain

# Check group membership
id testuser

# Verify mailbox
curl -s https://webmail.domain/autodiscover
```

## Account Modification

- Role changes require re-approval
- Update group memberships within 24 hours
- Notify user of changes

## Account Termination

1. Disable account immediately on notification
2. Remove from all groups
3. Forward email with auto-reply
4. Archive home directory after 30 days
5. Delete account after 90 days (per policy)

## Quarterly Review

- Review all active accounts
- Disable accounts inactive for 90+ days
- Verify manager approvals are current
- Generate compliance report
