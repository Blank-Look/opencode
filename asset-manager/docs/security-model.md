# Security Model — ICT Asset Governance Manager

## Authentication

- Microsoft Entra ID OpenID Connect
- Single-tenant (no multi-tenant or B2C)
- No local usernames or passwords
- Session managed via secure cookies + ASP.NET Core antiforgery

## Application Roles

| Role | Permissions |
|---|---|
| Reader | View assets, dashboard, reports. No edit. |
| Contributor | Create/edit assets, manage classifications, manage relationships |
| AssetManager | Full CRUD on assets, lifecycle transitions, ownership assignment |
| WorkflowApprover | Approve/reject workflow tasks, exceptions |
| SecurityReviewer | View and update security findings, Defender data |
| DataGovernanceReviewer | Manage data classifications, privacy assessments |
| ServiceDesk | Read-only asset lookup (ticketing integration context) |
| Auditor | View all data including audit history, export reports. Read-only. |
| SystemAdministrator | Manage roles, integration configuration, system settings |

## Policy-Based Authorisation

- Authorisation is centralised via policy names, not role-string checks in code
- Policies map to one or more roles
- Named permissions per resource/operation

Example policies:
- `Asset.View` → Reader, Contributor, AssetManager, Auditor, ServiceDesk
- `Asset.Edit` → Contributor, AssetManager
- `Asset.Delete` → AssetManager
- `Workflow.Approve` → WorkflowApprover
- `Risk.View` → Reader, SecurityReviewer, Auditor
- `Admin.Integrations` → SystemAdministrator

## Least-Privilege Principles

- External integrations use read-only permissions for MVP
- Database connections use per-application credentials (not admin)
- No secrets stored in code, config files, logs, or database fields
- Managed identity for all Azure resource access
- Key Vault for any secret that cannot use managed identity

## Data Protection

| Measure | Implementation |
|---|---|
| Encryption in transit | HTTPS only, TLS 1.2+ |
| Encryption at rest | PostgreSQL transparent data encryption |
| Secrets | Azure Key Vault + managed identity |
| Input validation | FluentValidation on all models |
| Output encoding | ASP.NET Core Razor auto-encoding |
| Anti-forgery | Built-in antiforgery tokens on all forms |
| SQL injection | EF Core parameterised queries |
| Mass assignment | DTO/ViewModel pattern, AutoMapper or manual mapping |

## Security Headers

```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' fonts.googleapis.com; font-src fonts.gstatic.com
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

## Audit

All material governance actions create immutable audit events:
- Timestamp (UTC)
- Actor (user identifier)
- Actor's effective role
- Action name
- Entity type and ID
- Before/after values (where applicable)
- Reason or comment
- Correlation ID
- Related workflow or exception ID

## Threat Model (STRIDE)

See `docs/threat-model.md` for full STRIDE analysis.

## Key Security Decisions

| Decision | Rationale |
|---|---|
| No local auth | Entra ID provides MFA, conditional access, identity protection |
| App roles over individual permissions | Centralised management via Entra groups |
| Read-only integrations | Least privilege; source systems remain authoritative |
| Append-only audit events | Immutable record for governance compliance |
| No Blob Storage in MVP | Reduces attack surface; evidence stored as links + structured records |
| Managed identity over secrets | No long-lived credentials to rotate or leak |
