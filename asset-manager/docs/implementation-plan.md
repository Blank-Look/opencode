# Implementation Plan — ICT Asset Governance Manager

## Delivery Phases

### Phase 0: Discovery & Foundation (current)

| Deliverable | Status |
|---|---|
| Architecture document | ✅ |
| Product requirements | ✅ |
| Data model | ✅ |
| Integration mappings | ✅ |
| Security model | ✅ |
| Threat model | ✅ |
| Policy traceability | ✅ |
| Implementation plan | ✅ |
| Assumptions & questions | ✅ |
| AGENTS.md | ✅ |
| ADR documents | ✅ |
| Repository structure | ⬜ |

### Phase 1: Core Asset Governance MVP

**Priority: HIGH**

| Feature | Effort | Dependencies |
|---|---|---|
| Repository skeleton (.NET solution, projects) | S | None |
| Infrastructure skeleton (Bicep) | M | None |
| Entra OIDC authentication | M | Azure deployment |
| Role-based authorisation | M | Auth |
| Data model migrations (EF Core) | M | Database |
| Asset register (list + CRUD) | L | Data model |
| Asset detail page | M | Asset register |
| Ownership model + role assignments | M | Auth + data model |
| Classifications management | S | Data model |
| Lifecycle stage transitions | M | Asset register |
| Controls + assessments | M | Data model |
| Deterministic risk engine | L | Controls + assessments |
| Executive dashboard | M | Risk engine |
| Audit service | S | Core infrastructure |
| Seed data | S | Data model |
| CSV export | S | Asset register |

**MVP file list:**
```
src/AssetGovernance.Web/Program.cs
src/AssetGovernance.Web/Startup.cs
src/AssetGovernance.Web/Pages/
src/AssetGovernance.Web/Pages/Assets/
src/AssetGovernance.Web/Pages/Dashboard/
src/AssetGovernance.Web/Pages/Reports/
src/AssetGovernance.Web/Areas/
src/AssetGovernance.Application/Assets/
src/AssetGovernance.Application/Ownership/
src/AssetGovernance.Application/DataGovernance/
src/AssetGovernance.Application/Controls/
src/AssetGovernance.Application/Risks/
src/AssetGovernance.Application/Lifecycle/
src/AssetGovernance.Domain/Entities/
src/AssetGovernance.Domain/Enums/
src/AssetGovernance.Domain/ValueObjects/
src/AssetGovernance.Infrastructure/Persistence/
src/AssetGovernance.Infrastructure/Auth/
src/AssetGovernance.Infrastructure/Audit/
infra/main.bicep
infra/webapp.bicep
infra/database.bicep
infra/keyvault.bicep
infra/observability.bicep
```

### Phase 2: Freshservice Integration

| Feature | Effort |
|---|---|
| Connector abstraction | M |
| Freshservice connector | L |
| Reconciliation engine | M |
| Integration health UI | S |
| Source provenance display | M |

### Phase 3: Entra Integration

| Feature | Effort |
|---|---|
| Graph connector base | M |
| App registration sync | M |
| Enterprise app sync | M |
| Ownership resolution | M |
| Entra-specific risk findings | L |
| Credential expiry detection | M |

### Phase 4: Defender Integration

| Feature | Effort |
|---|---|
| Defender connector | M |
| Incident/alert sync | M |
| Asset mapping | M |
| Security findings generation | L |

### Phase 5: Workflow Automation

| Feature | Effort |
|---|---|
| Workflow engine (state machine) | L |
| Review workflows | M |
| Role-based task assignment | M |
| Escalations | M |
| Notifications (email) | M |
| Exception workflow | M |
| Retirement workflow | M |

### Phase 6: Onboarding Pipeline

| Feature | Effort |
|---|---|
| Guided request form | M |
| Triage stages | L |
| Show-stopper rules | M |
| Approval flow | M |
| Evidence collection | M |
| Go-live decision record | S |

## Effort Estimates

| Phase | Estimated Weeks | Dependencies |
|---|---|---|
| Phase 1 | 6-8 | Phase 0 |
| Phase 2 | 2-3 | Phase 1, Freshservice API access |
| Phase 3 | 3-4 | Phase 1, Graph permissions |
| Phase 4 | 2-3 | Phase 1, Defender licensing |
| Phase 5 | 4-6 | Phase 1 |
| Phase 6 | 3-4 | Phase 1, Phase 5 |

## First Vertical Slice

**Proposed first working feature: authenticated user can view a list of assets and see risk scores.**

This validates:
- Entra auth pipeline
- Role-based access
- Database migrations
- UI rendering
- Risk calculation
- Audit logging

Files required:
1. `.NET solution + project files`
2. `Directory.Build.props` + `Directory.Packages.props`
3. `Program.cs` — app bootstrap
4. `appsettings.Development.json` — config
5. `Asset entity` + EF Core mapping
6. `AssetController` or `AssetPageModel`
7. `Asset List` Razor Page
8. `Asset Detail` Razor Page
9. `RiskEngine` service
10. `SeedData` — demo assets
11. `Dashboard` page
12. `AuditService` — event logging
13. Dockerfile
14. Bicep — Container App + PostgreSQL + Key Vault
15. GitHub Actions — CI
