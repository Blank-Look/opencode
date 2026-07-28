---
sidebar_position: 3
---

# Access Control

Identity management, authentication, and authorization policies.

## Identity Management

- All identities managed via Microsoft Entra ID (Azure AD)
- Guest access via Entra ID B2B collaboration
- Service principals for automated systems
- Regular access reviews every 90 days

## Authentication

| Method | Use Case | MFA Required |
|---|---|---|
| Password + MFA | All users | Yes |
| FIDO2 key | Administrators | Yes |
| Certificate-based | Service accounts | No |
| Conditional Access | Risk-based policies | Yes |

## Authorization Model

- Role-based access control (RBAC)
- Just-in-time (JIT) access for privileged roles
- Privileged Identity Management (PIM) for admin roles
- Separation of duties enforced across systems
