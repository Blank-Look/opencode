# Integrations — ICT Asset Governance Manager

## Integration Abstraction

Each source connector implements:

```
IConnector
  - Authenticate()
  - FetchChanges(cancellationToken)
  - FetchFull(cancellationToken)
  - Health() -> HealthStatus
  - DryRun(cancellationToken)
```

Common capabilities provided by base class:
- Paginated retrieval
- Throttling with retry (bounded exponential backoff)
- Request correlation
- Structured error handling
- Incremental sync (where supported)
- Full reconciliation
- External ID preservation
- Source-record tracking via ExternalSourceRecord table
- Test doubles

## 1. Freshservice

### Permissions Required
Read-only API key or OAuth token with access to:
- Assets / Configuration Items
- Asset Types
- Products
- Vendors
- Contracts (plan-dependent)
- Departments
- Agents / Requesters
- Tickets (linked to assets)

### Initial Mapping (to be validated against tenant)

| Freshservice Object | Freshservice Field | Local Entity | Local Field | Source of Truth | Direction |
|---|---|---|---|---|---|
| Asset | display_name | Asset | CanonicalName | Freshservice | Inbound |
| Asset | asset_type | Asset | AssetType | Freshservice | Inbound |
| Asset | status | Asset | OperationalStatus | Freshservice | Inbound |
| Asset | department | Asset | BusinessUnit | Freshservice | Inbound |
| Asset | location | Asset | Region | Freshservice | Inbound |
| Asset | cost | Asset | ActualAnnualCost | Freshservice | Inbound |
| Asset | purchase_date | Asset | OnboardingDate | Freshservice | Inbound |
| Asset | warranty_expiry | Asset | EndOfSupportDate | Freshservice | Inbound |
| Asset | serial_number | ExternalSourceRecord | ExternalId | Freshservice | Inbound |
| Asset | assigned_to | Asset | (ownership) | Freshservice | Inbound* |
| Asset | custom_fields | Asset | (per-config) | Freshservice | Inbound |

\* Ownership mapping is one-way informative; governance roles are managed locally.

### Reconcilation Rules
- Match on Freshservice asset ID stored in ExternalSourceRecord
- If source record disappears: mark Missing, do not delete
- If display_name conflict: Freshservice value takes priority for mapped fields
- Custom fields: mapped per configuration

## 2. Microsoft Entra ID

### Microsoft Graph Permissions

| Permission | Type | Justification | Required for MVP |
|---|---|---|---|
| Application.Read.All | Application | List app registrations and service principals | Yes |
| Directory.Read.All | Application | Read tenant groups and users | Yes |
| Group.Read.All | Application | Resolve group membership for role assignments | Yes |
| User.Read.All | Application | Look up user status for owner validation | Yes |
| ServicePrincipalEndpoint.Read.All | Application | (If needed for integration discovery) | No |

**No write permissions requested for MVP.**

### Data Retrieved
- Application registrations (id, displayName, publisherDomain, signInAudience, createdDateTime, tags, notes, api, requiredResourceAccess)
- Enterprise applications / service principals (id, appId, displayName, appOwnerOrganizationId, keyCredentials, passwordCredentials, tags, appRoles, oauth2PermissionScopes)
- App and service principal owners
- Groups (for role resolution)
- Users (basic profile, accountEnabled)

### Governance Conditions Detected
- No registered owner
- Owner no longer active
- Owner count below minimum (default: 2)
- Credential expiring within threshold (default: 90 days)
- Expired credential
- High-privilege application permission (e.g. Directory.ReadWrite.All)
- Admin consent granted
- Unverified publisher
- Assignment not required (for enterprise apps requiring it)
- Broad user assignment (assigned to "All users")
- No observed recent use
- Enterprise app / app registration with no linked governed asset
- Stale / orphaned registration (>1 year no activity)

## 3. Microsoft Defender XDR

### Permissions Required
- Alert.Read.All (Application) — read incidents and alerts
- Incident.Read.All (Application) — read incidents
- AdvancedHunting.Read.All (Application) — for defined hunting queries

### Data Retrieved
- Active incidents (id, title, severity, status, classification, determination, createdTime, lastUpdateTime)
- Related alerts (id, title, severity, category, affectedDevices, affectedUsers)
- Vulnerability / exposure data where licensed

### Mapping to Assets
Matching is performed through reliable identifiers:
- Entra application ID → Asset.ExternalSourceRecord
- Service principal ID → Asset.ExternalSourceRecord
- Device ID → Asset.ExternalSourceRecord
- Hostname / FQDN → Asset.CanonicalName (validated)
- Freshservice asset ID → cross-reference
- Manual relationship approved by user

**No fuzzy name matching.**

## 4. Integration Health

Displayed for each source:

| Metric | Description |
|---|---|
| Last attempted | Most recent sync attempt timestamp |
| Last successful | Most recent successful completion |
| Current state | Running / Idle / Failed / Disabled |
| Records processed | Count per sync run |
| Records created | New records added |
| Records updated | Existing records changed |
| Records marked missing | Source records no longer present |
| Warnings | Non-fatal issues |
| Errors | Fatal errors |
| Next scheduled | Upcoming run time |

## Stale Evidence Handling

- Risk calculations must identify evidence older than a configurable threshold (default: 24h)
- A failed integration must never appear as "no risks found" — show "source unavailable" instead
- Risk findings derived from stale evidence are flagged with a "stale" indicator
