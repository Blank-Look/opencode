---
sidebar_position: 5
---

# Disposal

Secure and environmentally responsible disposal of ICT assets at end of life.

## Disposal Workflow

```
Identify → Sanitise → Approve → Dispose → Deregister
```

### 1. Identification

- Triggered by: end of life, end of support, hardware failure, replacement
- Verify asset is no longer needed
- Check for any data or service dependencies

### 2. Data Sanitisation

| Method | Standard | When to Use |
|---|---|---|
| Cryptographic erase | NIST SP 800-88 | SSDs, encrypted drives |
| Overwrite (3-pass) | DoD 5220.22-M | HDDs, non-encrypted media |
| Physical destruction | — | Failed drives, classified data |
| Factory reset | Vendor spec | Smartphones, tablets, network gear |

### 3. Approval

- ICT Manager approval required for all disposals
- Finance notified for assets > $500 book value
- Data owner sign-off for data-bearing assets

### 4. Disposal Method

| Method | Suitable For | Notes |
|---|---|---|
| Certified recycling | All hardware | Use approved e-waste vendor |
| Donation | Working equipment < 4 years | Remove asset tags, wipe data |
| Resale | High-value equipment | ICT Manager approval required |
| Scrap | Broken / obsolete | Physical destruction certification |

### 5. Deregistration

- Remove from asset register (status: Disposed)
- Update financial system if capital asset
- Remove from monitoring, backup, and inventory systems
- Cancel support contracts
- Archive disposal certificate

## Disposal Certificate

For each disposed asset, retain:
- Asset ID and description
- Disposal date and method
- Data sanitisation method and verification
- Certificate of destruction (if applicable)
- Approver name
