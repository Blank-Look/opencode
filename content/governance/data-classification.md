---
sidebar_position: 4
---

# Data Classification

Data classification ensures that institutional data is handled appropriately based on its sensitivity, criticality, and regulatory requirements.

## Classification Levels

| Level | Definition | Examples |
|---|---|---|
| **Confidential** | Data protected by law, regulation, or contract. Unauthorised disclosure would cause severe harm. | SSNs, medical records, student grades, payment card data, FERPA-protected records |
| **Sensitive** | Data that requires protection due to institutional policy or risk of moderate harm if disclosed. | Internal financial data, research data, personnel records, security assessments |
| **Internal** | Data intended for internal use only. Not approved for public distribution but low risk if shared. | Policies and procedures, internal directories, training materials, meeting minutes |
| **Public** | Data approved for public dissemination. No harm from disclosure. | Course catalogues, news releases, published research, marketing materials |

## Classification Decision Tree

Use this flow to determine the appropriate classification for a data element:

```
Is the data protected by law or regulation?
├── Yes → Is it FERPA, HIPAA, PCI, or similar?
│   ├── Yes → CONFIDENTIAL
│   └── No → SENSITIVE
└── No → Would unauthorised disclosure cause harm to MBS?
    ├── Yes → Could it cause financial, reputational, or operational harm?
    │   ├── Yes → SENSITIVE
    │   └── No → INTERNAL
    └── No → Is it intended for public consumption?
        ├── Yes → PUBLIC
        └── No → INTERNAL
```

## Storage and Sharing Guidelines

| Classification | Approved Storage | Sharing Method |
|---|---|---|
| Confidential | Encrypted, access-controlled systems only | Secure file transfer, encrypted email |
| Sensitive | MBS-managed systems with access controls | MBS SharePoint, encrypted attachments |
| Internal | Any MBS-managed system | MBS email, SharePoint, Teams |
| Public | Any system, including external | Any method |

## Key Resources

- [Data Classification Decision Tree (PDF)](/docs/governance/data-classification)
- [Data Management Standard](data-governance#data-management-standard)
- [Data Storage and Sharing Guidelines](data-governance)
- [Report a Data or Security Concern](mailto:security@mbs.edu)

*Contact [its@mbs.edu](mailto:its@mbs.edu) for assistance with data classification.*
