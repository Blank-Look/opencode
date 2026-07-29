# Threat Model — ICT Asset Governance Manager (STRIDE)

## Application Overview

Internal ICT governance application with Entra authentication, PostgreSQL database, and read-only external integrations.

## Scope

- Application logic (ASP.NET Core)
- Azure Container Apps hosting
- PostgreSQL database
- Key Vault
- External API integrations
- CI/CD pipeline

## STRIDE Analysis

### Spoofing

| Threat | Risk | Mitigation |
|---|---|---|
| Attacker impersonates a user | Medium | Entra OIDC with MFA enforcement via Conditional Access |
| Attacker impersonates an integration | Medium | Managed identity + certificate-based authentication |
| API token theft | Low | No long-lived API tokens in MVP; Key Vault for secrets |
| Session hijacking | Low | Secure cookies, HTTPS-only, SameSite=Strict, short expiry |

### Tampering

| Threat | Risk | Mitigation |
|---|---|---|
| Unauthorised data modification | Medium | Policy-based authorisation on all write operations |
| Mass assignment attack | Low | DTO/ViewModel pattern with explicit mapping |
| Audit log tampering | Medium | Append-only audit events; database permissions prevent historical update |
| Query string manipulation | Low | Antiforgery tokens, input validation, EF Core parameterised queries |
| CSV formula injection | Low | Formula escaping on export (prefix with tab, strip `=+-@`) |

### Repudiation

| Threat | Risk | Mitigation |
|---|---|---|
| User denies performing an action | Medium | Append-only audit events with actor, timestamp, before/after values |
| Integration claims data not received | Low | Sync logs record attempted vs completed records |
| Approver denies approval | Medium | Cryptographic timestamp on audit events; workflow task records |

### Information Disclosure

| Threat | Risk | Mitigation |
|---|---|---|
| Unauthorised asset data access | High | Policy-based authorisation on all views and API endpoints |
| Integration payloads exposed to unauthorised users | Medium | Structured data surfaced through governed views, not raw payloads |
| Secrets in logs | Medium | Structured logging with redaction; Key Vault references not logged |
| Database breach | High | PostgreSQL TDE; network isolation; managed identity access |
| Error stack traces shown to users | Low | Secure error handling; no internal details in production responses |
| Browser caching of sensitive pages | Low | `Cache-Control: no-store` on sensitive responses |

### Denial of Service

| Threat | Risk | Mitigation |
|---|---|---|
| Resource exhaustion from sync jobs | Medium | Container App job isolation; paginated API calls; time-bounded queries |
| Slow queries on large datasets | Medium | Indexed columns; paginated lists; query optimisation |
| Authentication endpoint flooding | Low | Azure AD built-in throttling; rate limiting on sensitive endpoints |
| Storage exhaustion from audit logs | Low | Retention policy on audit events; database monitoring alerts |

### Elevation of Privilege

| Threat | Risk | Mitigation |
|---|---|---|
| User accesses functionality beyond role | High | Policy-based authorisation on every operation; unit tests for each policy |
| Bypassing lifecycle gate | Medium | Server-side enforcement; mandatory controls check before transition |
| Direct database modification | Low | Application-specific database credentials with least privilege |
| CI/CD pipeline compromise | Medium | OIDC federation; protected environments; branch protection |
| Container escape | Low | Container Apps runs in sandbox; no privileged containers |

## Integration-Specific Threats

| Scenario | Risk | Mitigation |
|---|---|---|
| Graph API token leaked | High | Managed identity; token lifetime < 24h |
| Freshservice API key leaked | High | Stored in Key Vault, not in code or config |
| Defender API returns malicious payload | Low | JSON parsing with schema validation; no dynamic execution |
| Integration returns stale data appearing as current | Medium | Source freshness indicators on all synchronised fields |

## Security Controls

| Control | Where Applied |
|---|---|
| Authentication | Entra OIDC middleware |
| Authorisation | Policy-based `[Authorize]` attributes |
| Input validation | FluentValidation |
| Output encoding | Razor auto-encoding |
| Anti-CSRF | Antiforgery tokens on all forms |
| HTTPS enforcement | Container Apps + ASP.NET Core HSTS |
| SQL injection protection | EF Core parameterised queries |
| Secrets management | Azure Key Vault + managed identity |
| Audit logging | Append-only AuditEvent table |
| Health checks | `/health` endpoint with liveness + readiness |
| Rate limiting | ASP.NET Core rate limiting middleware |
| Dependency scanning | GitHub Actions + Dependabot |
| Container scanning | Azure Container Registry + Defender for Cloud |
