# Assumptions and Questions — ICT Asset Governance Manager

## Top 10 Assumptions

1. **Single-tenant Entra ID** — The application is internal and uses the organisation's existing Entra tenant. No multi-tenant or B2C support required for MVP.

2. **Australia East region** — Primary Azure region. Data residency requirements assumed to be satisfied by Australian hosting.

3. **AUD as default currency** — All financial values stored with ISO code; AUD used as default display currency.

4. **Freshservice is the CMDB of record** — Asset, vendor, contract, and department data originates from Freshservice. The governance application does not replace Freshservice.

5. **Microsoft Graph read-only permissions will be granted** — The Entra integration relies on `Application.Read.All`, `Directory.Read.All`, `Group.Read.All`, and `User.Read.All`. These are privileged permissions requiring tenant admin consent.

6. **Defender XDR is licensed** — The organisation has Microsoft Defender XDR (or equivalent) with API access. `AdvancedHunting.Read.All` requires E5 or equivalent licensing.

7. **No Blob Storage for MVP** — Evidence is stored as links or structured records until file upload becomes an approved requirement.

8. **Email as notification channel** — Microsoft Graph mail or organisational SMTP. No Teams, SMS, or push for MVP.

9. **Role-based assignment over person-based** — Workflow tasks target governance roles, not named individuals. This is a deliberate architectural choice that may differ from current organisational culture.

10. **CI/CD via GitHub Actions with OIDC** — GitHub OpenID Connect federation to Azure is used instead of long-lived service principal secrets.

## Confirmed Requirements (from spec, no further validation needed)

| Requirement | Source |
|---|---|
| ASP.NET Core modular monolith | Section 3.1 |
| PostgreSQL + EF Core | Section 3.1 |
| Azure Container Apps | Section 3.2 |
| Bicep infrastructure | Section 3.3 |
| Entra OIDC auth | Section 3.4 |
| Policy-based authorisation | Section 3.4 |
| Read-only external integrations (MVP) | Section 2.5 |
| Deterministic risk scoring | Section 2.4 |
| Internal workflow engine | Section 10 |
| Append-only audit events | Section 2.6 |
| Role-based governance (not person-based) | Section 2.2 |
| Source systems remain authoritative | Section 2.3 |
| CSV export with formula injection protection | Section 13 |
| No Blob Storage for MVP | Section 5.14 |
| Built-in reporting before analytics platform | Section 13 |

## Questions Requiring Clarification

1. **Freshservice plan level** — Does the organisation's Freshservice plan include Contracts API access? Contracts visibility varies by plan tier.

2. **Defender licensing** — Is `AdvancedHunting.Read.All` available under the current Microsoft 365/E5 licensing, or is only basic incident/alert retrieval supported?

3. **Notification sender identity** — Should notifications come from a shared mailbox, a service account, or a noreply address?

4. **Backup frequency and retention** — What are the operational RTO/RPO for the PostgreSQL database?

5. **User provisioning** — Are Entra groups for application roles pre-existing, or will they be created as part of this project?

6. **Existing Freshservice field configuration** — Are any custom fields in Freshservice that should be mapped to governance fields? Need a field inventory.

7. **Organisational role hierarchy** — Is there an existing role hierarchy or escalation path for governance tasks?

8. **Data classification scheme** — Are the suggested levels (Public, Internal, Confidential, Restricted) correct, or does the organisation use a different scheme?

9. **Privacy regulatory scope** — Beyond "personal data," are there specific regulations (APP, GDPR, etc.) that impose additional requirements?

10. **Support hours definition** — What constitutes the standard business hours / service window for support tier assignment?

## Delivery Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Graph API permissions blocked by tenant policy | Medium | High | Document every permission with justification; engage Identity team early |
| Freshservice API differences per plan | Medium | Medium | Field mapping stage before implementation |
| Defender Advanced Hunting not licensed | Medium | Medium | Fall back to incident/alert APIs; hunting queries are enhancement |
| Stakeholder expectation of CMDB replacement | Medium | High | Clear architecture decision: source systems remain authoritative |
| Organisational resistance to role-based (vs. person-based) workflows | Medium | Medium | Demonstrate role-change resilience in early demo |
| Azure subscription availability / quotas | Low | High | Verify subscription exists and Container Apps quota is available |
| PostgreSQL maintenance overhead | Low | Low | Azure managed service with automated backups |
| Integration credential expiry / rotation | Low | Medium | Managed identity where possible; Key Vault + monitoring for secrets |
| Data volume exceeding initial projections | Low | Medium | Design for 100k+ records; monitor and scale PostgreSQL tier if needed |
| Scope creep from additional integration requests | Medium | Medium | Clear phase gating; document stretch goals for post-MVP |
