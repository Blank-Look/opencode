---
title: OpenCode Delivery Prompt Template
---

This is a complete OpenCode delivery prompt produced during the Generate phase. It follows the standard template and is ready to be supplied to OpenCode after Gate 3 (Prompt and Design Approval) is passed.

Paste the following into OpenCode from the root of a new Git repository.

---

You are the lead solution architect and senior full-stack engineer responsible for designing and building an internal ICT Asset Lifecycle Governance application.

The working product name is:

**ICT Asset Governance Manager**

**Existing asset register:** This repository already contains an [Asset Manager](https://github.com/Blank-Look/opencode/tree/master/asset-manager) application (Express + SQLite + Freshservice/Entra/Defender connectors). Before designing the architecture, inspect this existing application and document in `/docs/assumptions-and-questions.md` whether it should be evolved, replaced, or integrated with the new application. Reference this decision in an Architecture Decision Record under `docs/adr/`.

Your job is to create a secure, maintainable, production-ready MVP that can be hosted in Microsoft Azure with the fewest reasonable components.

Do not begin by writing the entire application.

First inspect the repository, identify what already exists, and then produce:

- docs/architecture.md
- docs/product-requirements.md
- docs/data-model.md
- docs/integrations.md
- docs/security-model.md
- docs/implementation-plan.md
- docs/assumptions-and-questions.md
- an initial AGENTS.md

After producing those documents, stop and present the proposed architecture, assumptions, risks, phases, and repository structure for review.

Do not start implementation until the architecture and implementation plan have been reviewed.

## 1. Product objective

Build an internal ICT governance tool that provides a consolidated view of organisational technology assets, ownership, lifecycle status, cost, sensitivity, security exposure, governance obligations, and overdue actions.

The tool will be used by:

- Infrastructure teams
- Applications teams
- Data governance teams
- Cybersecurity teams
- The CTO and technology leadership
- Service Desk
- Business owners
- Service owners
- Data owners
- Governance, privacy, records, procurement, and risk functions

The primary goal is to surface risky, unmanaged, unsupported, insecure, expensive, non-compliant, or ownerless assets.

Users must be able to understand, at a glance:

- what assets exist;
- who is accountable for them;
- which business role owns them;
- what information they process;
- how sensitive or critical they are;
- what they cost;
- where they are hosted;
- what systems they depend on;
- what security issues affect them;
- what lifecycle stage they are in;
- what governance controls are missing;
- what reviews or actions are due;
- which exceptions are active;
- which assets should be remediated or retired; and
- which ownership assignments have become invalid because of organisational change.

The product must generate role-based governance workflows such as:

- application ownership review;
- data ownership review;
- access review;
- security review;
- privacy review;
- records-retention review;
- vendor review;
- business-value review;
- technical-supportability review;
- disaster-recovery review;
- contract-renewal review;
- risk-acceptance review; and
- retirement and decommissioning workflow.

## 2. Core design principles

Apply these principles throughout the design and implementation.

### 2.1 Keep the architecture simple

Use a modular monolith unless there is a proven reason not to.

Do not introduce microservices, Kubernetes, a service bus, event streaming, Cosmos DB, Redis, API Management, a data lake, Power BI, Microsoft Fabric, Azure Functions, Logic Apps, or multiple databases for the MVP unless a documented requirement cannot reasonably be met without them.

Prefer:

- one web application;
- one relational database;
- one deployment unit;
- one source repository;
- one CI/CD workflow;
- scheduled background jobs within the same application codebase; and
- direct integrations with authorised APIs.

### 2.2 Governance by role, not by named individual

Accountability must be assigned primarily to organisational roles or groups, not permanently to individual people.

Examples:

- Applications Manager
- Business Owner – Finance
- Data Owner – Customer Data
- Infrastructure Platform Owner
- Security Governance Manager
- Records Manager

A person may currently occupy a role, but workflows must target the role assignment.

When a person leaves or changes position:

- the governance obligation remains assigned to the role;
- a new active role holder can inherit outstanding work;
- no workflow definition should need to be rewritten;
- unresolved role vacancies must be visibly escalated;
- historical records must preserve who performed each action at the time; and
- role changes must not change historical audit records.

Use Entra groups where practical to represent operational roles.

Separate these concepts in the data model:

- governance role;
- organisational role or group;
- current role assignment;
- individual user;
- accountable asset-role relationship; and
- workflow task assignee.

### 2.3 Source systems remain authoritative

The new application is an aggregation and governance layer.

Do not attempt to replace:

- Freshservice as the service-management or CMDB source;
- Microsoft Entra ID as the identity and application-registration source;
- Microsoft Defender as the security-alert source; or
- other authoritative systems introduced later.

Store:

- external identifiers;
- source-system names;
- synchronisation timestamps;
- synchronisation status;
- selected normalised fields;
- calculated governance fields;
- local ownership and classification data;
- workflow records;
- evidence;
- exceptions;
- audit history; and
- source-data snapshots only where needed for auditability.

Do not create uncontrolled duplicate master records.

### 2.4 Explainable risk

Every risk score must be explainable.

A user must be able to open an asset and see:

- its overall score;
- its risk band;
- every contributing rule;
- the evidence used;
- the source of that evidence;
- the points or weighting contributed;
- when it was last calculated;
- any suppression or accepted exception; and
- the recommended remediation action.

Do not use an opaque AI model for risk calculation.

Use deterministic, configurable rules.

### 2.5 Security and least privilege

Use least-privileged access for users and integrations.

Default to read-only integrations for the MVP.

Do not allow the application to change Entra, Defender, or Freshservice records during the first implementation phase unless explicitly approved.

Never store secrets in source code, committed configuration files, logs, or database fields.

### 2.6 Auditability

All material governance actions must create immutable audit events.

Audit events should include:

- timestamp;
- actor;
- actor's effective role;
- action;
- entity type;
- entity ID;
- before value where appropriate;
- after value where appropriate;
- reason or comment;
- source IP or request correlation data where appropriate; and
- related workflow, exception, or approval ID.

## 3. Preferred technology architecture

Use this as the default architecture unless repository constraints make it unsuitable.

### 3.1 Application

Build a modular monolith using:

- ASP.NET Core on the latest supported long-term-support .NET release available in the environment;
- server-rendered Blazor Web App or another ASP.NET Core server-rendered UI approach;
- Entity Framework Core;
- PostgreSQL;
- FluentValidation or equivalent maintainable validation;
- structured logging;
- OpenTelemetry-compatible observability;
- background hosted services for local development; and
- Azure Container Apps jobs for scheduled production synchronisation and workflow evaluation.

Prefer server-rendered pages over a separate single-page frontend and REST backend.

Do not create separate frontend and backend repositories.

Use JavaScript only where a server-rendered approach is inadequate.

### 3.2 Azure hosting

Target:

- Azure Container Apps for the web application;
- Azure Container Apps jobs for scheduled synchronisation and workflow processing;
- Azure Database for PostgreSQL Flexible Server;
- Azure Key Vault;
- Azure Container Registry;
- Application Insights with a Log Analytics workspace;
- Microsoft Entra ID for user authentication;
- managed identity wherever supported; and
- GitHub Actions for build, test, security checks, infrastructure deployment, database migration, and application deployment.

Use one Azure resource group per environment.

Initially support:

- development; and
- production.

Design so that test or staging can be added later without changing the architecture.

### 3.3 Infrastructure as code

Use Bicep.

Place infrastructure definitions under:

```
infra/
```

Infrastructure code must be idempotent and parameterised by environment.

Do not deploy resources manually as the normal operating model.

Create:

- resource group deployment entry point;
- Container Apps environment;
- web application;
- scheduled jobs;
- PostgreSQL;
- Key Vault;
- Container Registry;
- Application Insights;
- Log Analytics;
- managed identities;
- role assignments;
- environment-specific configuration; and
- diagnostic settings where appropriate.

Provide Azure CLI deployment instructions.

### 3.4 Authentication

Use Microsoft Entra ID OpenID Connect authentication.

The application is single-tenant.

Do not implement local usernames or passwords.

Authorisation must be application-role based.

Initial application roles:

- Reader
- Contributor
- AssetManager
- WorkflowApprover
- SecurityReviewer
- DataGovernanceReviewer
- ServiceDesk
- Auditor
- SystemAdministrator

Map Entra users or groups to application roles.

Use policy-based authorisation in code.

Do not scatter role-name checks throughout controllers or UI components.

## 4. External integrations

Create an integration abstraction so each source connector is isolated behind an interface.

Each connector must support:

- authentication;
- paginated retrieval;
- throttling;
- retry with bounded exponential backoff;
- request correlation;
- structured error handling;
- health status;
- last-successful synchronisation;
- incremental synchronisation where supported;
- full reconciliation;
- raw external identifier preservation;
- source-record deletion or disappearance handling;
- test doubles;
- contract tests where practical; and
- dry-run execution.

Never log access tokens, API keys, confidential payloads, or sensitive personal data.

### 4.1 Freshservice

Integrate with the current supported Freshservice REST API.

For the MVP, retrieve relevant available records such as:

- assets or configuration items;
- asset types;
- products where relevant;
- vendors;
- contracts if available under the organisation's Freshservice plan;
- departments;
- agents or requesters where needed for ownership matching;
- tickets linked to assets where beneficial;
- lifecycle or status fields;
- purchase and warranty fields;
- assigned users;
- location;
- serial number;
- asset tag;
- cost fields; and
- custom fields.

Before implementing, create a documented Freshservice field-mapping table.

The mapping must show:

- Freshservice object;
- Freshservice field;
- local entity and field;
- source of truth;
- transformation;
- null handling;
- synchronisation direction;
- sensitivity; and
- reconciliation rule.

Treat Freshservice as authoritative for fields explicitly mapped as CMDB-owned.

Authentication and API details must be configurable.

Use Key Vault for any Freshservice secret that cannot use managed identity.

### 4.2 Microsoft Entra ID

Use Microsoft Graph to retrieve a live governance view of:

- application registrations;
- enterprise applications and service principals;
- application and service-principal owners;
- verified publisher status where available;
- sign-in audience;
- enabled or disabled state;
- creation date;
- tags;
- notes where available;
- redirect URI summary;
- credentials and certificate expiry metadata;
- API permissions;
- app-role assignments;
- user and group assignments where authorised;
- assignment-required settings;
- service-principal type;
- last sign-in or activity data where available and licensed;
- tenant ownership relationship;
- groups used as governance roles; and
- users required to resolve current group membership.

Do not store credential secrets or certificate private data.

Clearly distinguish:

- an application registration;
- its corresponding service principal in the home tenant;
- third-party enterprise applications;
- managed identities;
- Microsoft first-party applications; and
- duplicate or linked records.

The application must detect governance conditions such as:

- no registered owner;
- owner no longer active;
- owner count below policy minimum;
- credential expiring soon;
- expired credential;
- high-privilege application permission;
- admin consent present;
- unverified publisher;
- assignment not required;
- broad user assignment;
- no recent observed use where data is available;
- enterprise application with no linked governed asset;
- app registration with no linked governed asset; and
- stale or orphaned registration.

Use least-privileged Microsoft Graph application permissions.

Document every required permission and why it is required.

Do not request write permissions for the MVP.

### 4.3 Microsoft Defender

Integrate with supported Microsoft Defender XDR or Microsoft Graph security APIs.

Begin with read-only retrieval of:

- active incidents;
- relevant alerts;
- severity;
- status;
- classification;
- determination;
- affected devices;
- affected users;
- affected applications or cloud resources where available;
- vulnerability or exposure information where licensed and supported;
- first seen;
- last updated;
- remediation state; and
- links back to the Defender portal.

Use advanced hunting only for defined, documented queries that cannot be satisfied through a simpler supported endpoint.

Each hunting query must be:

- version controlled;
- named;
- documented;
- bounded by time;
- tested;
- protected against excessive result volume; and
- associated with a specific governance use case.

Create a mapping mechanism that associates Defender entities to governed assets through reliable identifiers such as:

- Entra application ID;
- service-principal ID;
- Azure resource ID;
- device ID;
- hostname;
- fully qualified domain name;
- Freshservice asset ID;
- serial number; or
- an approved manual relationship.

Do not silently associate records based only on similar display names.

### 4.4 Integration freshness

Display integration freshness prominently.

For every source show:

- last attempted synchronisation;
- last successful synchronisation;
- current state;
- records processed;
- records created;
- records updated;
- records marked missing;
- warnings;
- errors; and
- next scheduled run.

Risk calculations must identify stale evidence.

A failed integration must never appear as "no risks found".

## 5. Core domain model

Create a normalised relational model.

The following are conceptual entities. Refine them carefully before implementation.

### 5.1 Asset

An Asset is the central governed object.

Support asset types including:

- Business Application
- SaaS Service
- Enterprise Application
- Application Registration
- Integration
- API
- Database
- Data Store
- Data Domain
- Dataset
- Server
- Virtual Machine
- Endpoint
- Network Device
- Cloud Resource
- Platform
- Vendor Service
- Certificate
- Contract
- Other Technology Service

Asset fields should include:

- internal ID;
- canonical name;
- description;
- asset type;
- lifecycle stage;
- operational status;
- criticality;
- business impact;
- confidentiality classification;
- integrity requirement;
- availability requirement;
- privacy-data indicator;
- regulated-data indicator;
- records category;
- hosting model;
- region or data residency;
- business unit;
- support tier;
- business hours or service window;
- recovery time objective;
- recovery point objective;
- estimated annual cost;
- actual annual cost where known;
- currency;
- contract renewal date;
- end-of-support date;
- end-of-life date;
- last review date;
- next review date;
- onboarding date;
- retirement target date;
- source authority;
- source freshness;
- governance status;
- risk score;
- risk band;
- created timestamp;
- updated timestamp; and
- archived timestamp.

Use AUD as the default display currency but store an ISO currency code on financial values.

### 5.2 ExternalSourceRecord

Track the relationship between a local governed entity and a source-system record.

Include:

- source system;
- external object type;
- external ID;
- local entity type;
- local entity ID;
- source URL;
- source version or change token;
- source modified time;
- first observed time;
- last observed time;
- last synchronised time;
- record hash;
- state;
- missing-since time; and
- synchronisation metadata.

### 5.3 AssetRelationship

Represent dependencies and associations.

Relationship types should include:

- depends on;
- hosted on;
- integrates with;
- exchanges data with;
- authenticates through;
- supplied by;
- covered by contract;
- supported by;
- stores data from;
- replaced by;
- parent of;
- child of;
- duplicate of;
- related enterprise application;
- related application registration; and
- related Defender entity.

Relationships must have:

- source asset;
- target asset;
- relationship type;
- direction;
- criticality;
- evidence source;
- effective date;
- expiry date; and
- review status.

### 5.4 GovernanceRole

Represent role definitions independently of people.

Examples:

- Business Owner
- Application Owner
- Service Owner
- Technical Owner
- Data Owner
- Security Reviewer
- Privacy Reviewer
- Records Reviewer
- Procurement Owner
- Vendor Manager
- Support Team
- Retirement Approver

**Alignment with existing ICT role taxonomy:** These roles align to the [ICT Knowledge Base governance model](https://blank-look.github.io/opencode/knowledgebase/docs/policy-and-governance/data-governance.html) (Data Trustees, Data Stewards Council, Data Custodians, Data Owners). The mapping between application governance roles and KB organisational roles must be documented in `docs/security-model.md`.

### 5.5 RoleAssignment

Connect:

- a governance role;
- an asset or organisational scope;
- an Entra group or organisational role;
- optionally a current user for display and escalation;
- effective dates;
- assignment source;
- delegation;
- vacancy state; and
- review date.

Assignments must support:

- more than one holder;
- temporary delegation;
- future-dated changes;
- role vacancy;
- inherited assignment;
- scoped assignment;
- reassignment without losing history; and
- an escalation role.

### 5.6 DataClassification

Support configurable classifications rather than hard-coded labels.

Initial example levels (per the [ICT Knowledge Base classification model](https://blank-look.github.io/opencode/knowledgebase/docs/policy-and-governance/data-classification.html)):

- Public
- Internal
- Sensitive  *(labelled "Restricted" in earlier drafts — use "Sensitive" to align with the existing KB standard)*
- Confidential

Do not assume these are final.

Allow configuration of:

- name;
- description;
- rank;
- handling requirements;
- review frequency;
- encryption requirement;
- external-sharing rule;
- retention requirement;
- privacy review requirement; and
- mandatory controls.

### 5.7 Control

Represent a governance requirement.

Examples:

- named business owner;
- named technical owner;
- approved data owner;
- SSO enabled;
- MFA enforced;
- least-privilege access;
- periodic access review;
- vendor security assessment;
- privacy assessment;
- records-retention determination;
- support model;
- backup and recovery plan;
- logging enabled;
- incident response process;
- vulnerability remediation;
- exit plan;
- decommissioning plan; and
- contract review.

Controls must be configurable by:

- asset type;
- lifecycle stage;
- criticality;
- data classification;
- personal-data status;
- hosting model; and
- risk level.

### 5.8 ControlAssessment

Store:

- control;
- asset;
- status;
- assessment result;
- evidence;
- evidence source;
- assessed by;
- assessed date;
- expiry date;
- next due date;
- comments;
- exception reference; and
- automated or manual determination.

Assessment statuses should include:

- Not Assessed
- Compliant
- Partially Compliant
- Non-Compliant
- Not Applicable
- Exception Approved
- Evidence Expired

### 5.9 RiskFinding

Store individual explainable findings.

Include:

- title;
- description;
- asset;
- category;
- severity;
- likelihood;
- impact;
- score contribution;
- rule ID;
- evidence;
- evidence source;
- first detected;
- last detected;
- due date;
- owner role;
- status;
- recommended action;
- related Defender alert or incident;
- related exception; and
- resolution evidence.

### 5.10 WorkflowDefinition

A configurable workflow template based on:

- event;
- asset type;
- lifecycle stage;
- criticality;
- classification;
- risk rule;
- review frequency; and
- control status.

### 5.11 WorkflowInstance

A running workflow associated with an asset.

### 5.12 WorkflowTask

A task must be assigned to a role, not permanently to a named person.

Include:

- task type;
- owning role;
- currently resolved assignee or Entra group;
- status;
- due date;
- escalation date;
- completion criteria;
- approval outcome;
- evidence;
- comment;
- completed by;
- completed timestamp; and
- reassignment history.

### 5.13 Exception

Store:

- affected asset;
- affected control or finding;
- control gap;
- risk description;
- business justification;
- compensating controls;
- accountable role;
- approver role;
- requested date;
- effective date;
- expiry date;
- status;
- review schedule; and
- closure outcome.

Exceptions must always expire unless a policy explicitly allows otherwise.

### 5.14 Evidence

Evidence may include:

- API observation;
- uploaded document;
- URL;
- ticket reference;
- approval record;
- assessment result;
- configuration snapshot;
- policy acknowledgement; or
- reviewer comment.

Store uploaded files in Azure Blob Storage only when file upload becomes part of the approved MVP.

Until then, support links and structured evidence records without introducing Blob Storage.

### 5.15 AuditEvent

Create an append-only audit model.

Application code must not update or delete historical audit events.

## 6. Lifecycle model

Support these lifecycle stages:

- Request and Business Justification
- Evaluation and Due Diligence
- Approval and Onboarding
- Implementation and Configuration
- Operational Use and Support
- Change and Enhancement
- Review and Assurance
- Retention, Archival, and Preservation
- Retirement and Disposal
- Retired

Lifecycle transitions must be controlled.

A transition may require:

- mandatory fields;
- completed controls;
- completed workflow tasks;
- approval by nominated roles;
- supporting evidence;
- no unresolved critical finding;
- accepted exception; or
- documented risk acceptance.

Maintain transition history.

Do not allow users to bypass a mandatory gate without an approved exception.

## 7. Initial governance rules

Implement the risk engine as configurable rules, not embedded UI conditions.

### 7.1 Ownership

Flag assets with:

- no business owner;
- no application or service owner;
- no technical owner;
- no data owner when material data is processed;
- inactive person occupying a required role;
- Entra group with no active member;
- unresolved role vacancy;
- ownership review overdue; or
- ownership assignment expiring soon.

### 7.2 Identity and access

Flag:

- sensitive application without supported SSO;
- sensitive application without MFA or equivalent control evidence;
- high-risk application without periodic access review;
- access review overdue;
- enterprise application where user assignment is not required, when policy requires assignment;
- privileged permission without current approval;
- application permission with no recorded business justification;
- credential expired;
- credential expiring within configurable thresholds;
- no valid owner on an Entra application;
- owner account disabled;
- stale service principal;
- orphaned app registration; and
- manual account management where central identity is required.

### 7.3 Security

Flag:

- unresolved critical or high-severity Defender incident linked to an asset;
- unresolved high-severity alert;
- unsupported software;
- end-of-life date passed;
- vulnerability remediation overdue;
- security assessment missing;
- security assessment expired;
- no logging evidence;
- no support model;
- no recovery requirement for a critical service; and
- critical asset without a tested continuity plan.

### 7.4 Data governance

Flag:

- data classification missing;
- sensitive data without a data owner;
- personal data without privacy assessment;
- retention rule missing;
- disposal decision overdue;
- data residency unknown;
- restricted data stored in an unapproved region;
- external sharing without approval;
- legal hold conflict;
- backup retention inconsistent with records obligations; and
- sensitive data without documented encryption controls.

### 7.5 Vendor and commercial

Flag:

- vendor owner missing;
- contract missing;
- contract renewal within configurable thresholds;
- contract expired;
- annual cost missing;
- duplicate product or overlapping capability;
- low-use or unused asset with material cost;
- vendor security assessment overdue;
- exit plan missing;
- data return or deletion terms missing;
- material vendor risk unresolved; and
- vendor compliance evidence missing.

Do not hard-code "GDPR present" as a simple yes/no show-stopper.
Instead model applicable legal and privacy obligations as configurable requirements based on jurisdiction, data type, data subject, processing purpose, and organisational policy.

### 7.6 Lifecycle

Flag:

- production asset still marked as onboarding;
- material change without review;
- annual review overdue;
- retirement target passed;
- retired asset still active in Entra;
- retired asset still present in Freshservice as operational;
- active integration to a retired asset;
- active account or credential for a retired service;
- decommissioning task overdue; and
- residual data treatment not confirmed.

## 8. Risk scoring

Design an initial configurable scoring method.

Do not claim that the score is an objective probability of loss.

Use the score for prioritisation.

Suggested approach:

- Critical finding: 40 points
- High finding: 20 points
- Medium finding: 8 points
- Low finding: 2 points

Apply configurable multipliers for:

- critical service;
- restricted or sensitive data;
- regulated or personal data;
- internet exposure;
- privileged identity;
- high annual cost;
- past end-of-life;
- unresolved role vacancy; and
- stale source evidence.

Cap the displayed score at 100 while retaining the uncapped calculated value internally for ranking.

Initial risk bands:

- 0–19: Low
- 20–39: Moderate
- 40–69: High
- 70–100: Critical

Store rule versions and score calculation history.

A policy administrator must eventually be able to change weights and thresholds without code changes, but a simple seeded configuration is acceptable for the first working slice.

## 9. Required user experience

Design for clarity rather than visual complexity.

### 9.1 Executive dashboard

Display:

- total governed assets;
- assets by type;
- assets by lifecycle stage;
- assets by risk band;
- critical and high-risk assets;
- ownerless assets;
- unsupported and end-of-life assets;
- overdue reviews;
- overdue access reviews;
- expiring credentials;
- expiring contracts;
- unresolved Defender incidents;
- active exceptions;
- vacant governance roles;
- integration-health summary;
- annual-cost totals;
- cost by business unit;
- cost of high-risk assets; and
- recently increased risk.

Every number or chart must link to the filtered underlying records.

Avoid decorative charts.

### 9.2 Asset register

Provide a fast searchable and filterable table.

Filters should include:

- asset type;
- lifecycle stage;
- status;
- risk band;
- criticality;
- data classification;
- business unit;
- owner role;
- role vacancy;
- hosting model;
- source system;
- security status;
- workflow due state;
- contract renewal window;
- end-of-life state; and
- cost range.

Support saved views later, but do not let that delay the core MVP.

### 9.3 Asset detail

Use clear sections or tabs for:

- Overview
- Ownership
- Data and Classification
- Risk Findings
- Controls
- Workflows
- Security
- Entra
- Freshservice
- Relationships
- Cost and Contracts
- Lifecycle
- Exceptions
- Evidence
- Audit History

Show source provenance beside synchronised fields.

Users must be able to distinguish:

- source-controlled fields;
- locally governed fields;
- calculated fields; and
- stale fields.

### 9.4 My Governance Work

Show tasks based on the signed-in user's effective roles and group memberships.

Include:

- tasks due soon;
- overdue tasks;
- approvals required;
- escalations;
- delegated tasks;
- access reviews;
- ownership reviews;
- exceptions awaiting approval; and
- retirement tasks.

### 9.5 Workflow administration

For the MVP, workflow definitions may be seeded in code or database migrations.

Do not build a drag-and-drop workflow designer.

Provide an administrative read-only view of definitions and a controlled configuration approach.

## 10. Workflow requirements

Create a simple state-machine workflow engine inside the modular monolith.

Do not use an external workflow platform for the MVP.

Required workflow triggers include:

- asset created;
- asset enters lifecycle stage;
- review date reached;
- ownership becomes invalid;
- credential approaches expiry;
- contract approaches renewal;
- risk finding created;
- risk severity increases;
- Defender incident linked;
- exception approaches expiry;
- end-of-support approaches;
- asset marked for retirement; and
- integration record disappears.

Required workflow capabilities:

- role-based assignment;
- due date;
- escalation role;
- reminder schedule;
- approve;
- reject;
- request more information;
- complete;
- cancel;
- delegate;
- re-resolve assignee when role membership changes;
- comments;
- evidence;
- immutable history; and
- idempotent trigger handling.

For notifications, use email initially.

Abstract notification delivery behind an interface.

Prefer Microsoft Graph mail delivery or an approved organisational email mechanism.

Do not add Teams bots, SMS, or push notifications to the MVP.

Ensure notification processing is retryable and does not duplicate messages.

## 11. Onboarding pipeline

Create a guided application onboarding process.

The objective is to surface show-stoppers early.

Initial stages:

- Business Idea
- Basic Triage
- Data and Privacy Triage
- Identity and Access Triage
- Vendor and Commercial Triage
- Architecture and Integration Review
- Security Assessment
- Records and Retention Review
- Approval
- Implementation
- Operational Handover
- Go-Live

Early triage questions should include:

- What business problem is being solved?
- Is an existing approved application able to meet the need?
- Who is the business owner?
- Who is the proposed service owner?
- What data will be processed?
- Does it include personal, confidential, restricted, regulated, health, financial, employee, customer, or authentication data?
- Where will the data be hosted?
- Will data leave approved jurisdictions?
- Does the product support organisational SSO?
- Does it support MFA?
- Does it support role-based access control?
- Does it support audit logging?
- Does it expose an API?
- What integrations are required?
- Does it require privileged access?
- Is it internet-facing?
- What is the proposed annual cost in AUD?
- What contract commitment is required?
- What is the vendor exit plan?
- How will data be exported, retained, archived, or deleted?
- What happens if the service is unavailable?
- Who will support it?
- Is a similar vendor or application already in use?

Potential show-stoppers must be configurable.

Examples:

- no accountable business owner;
- no technical support owner;
- restricted data in a prohibited location;
- no acceptable authentication for a high-risk service;
- no audit capability for a critical service;
- no lawful processing basis where required;
- unacceptable vendor contract terms;
- no data export or deletion mechanism;
- unsupported mandatory integration;
- unresolved critical security finding; and
- duplicate capability without approved justification.

A show-stopper should not silently reject a request.

It must:

- identify the failed rule;
- explain why it matters;
- identify the evidence;
- identify the reviewing role;
- allow correction;
- permit a controlled exception path; and
- preserve the decision history.

## 12. Policy-to-system mapping

Create a traceability table under:

```
docs/policy-traceability.md
```

For each policy requirement, identify:

- policy section;
- requirement summary;
- system entity;
- field or control;
- workflow;
- report or view;
- evidence source;
- responsible role;
- accountable role;
- implementation phase; and
- test or acceptance criterion.

At minimum, trace all requirements covering:

- ownership;
- onboarding;
- data classification;
- access approval;
- retention;
- security review;
- support model;
- material change;
- periodic review;
- retirement;
- exceptions;
- required lifecycle artefacts; and
- auditability.

## 13. Reporting

Provide built-in reports and CSV export.

Do not introduce a separate analytics platform for the MVP.

Initial reports:

- Asset Register
- Risk Register
- Ownerless Assets
- Vacant Governance Roles
- Overdue Reviews
- Access Reviews Due
- Credentials Expiring
- Contracts Expiring
- End-of-Life Assets
- Defender-Linked Risks
- Control Compliance
- Active Exceptions
- Retirement Pipeline
- Assets by Data Classification
- Assets by Business Unit
- Annual Cost by Asset Type
- High-Cost Low-Use Assets
- Integration Synchronisation Health

Exports must respect the user's permissions.

Prevent spreadsheet formula injection in CSV exports.

## 14. Security requirements

Align with the [ICT Knowledge Base Security Assessment](https://blank-look.github.io/opencode/knowledgebase/docs/security/security-assessment.html) process (Initiation → Classification → Questionnaire → Review → Verdict → Onboarding). The application itself must meet the same assessment criteria it will enforce for governed assets.

Implement:

- Entra authentication;
- policy-based authorisation;
- anti-forgery protection;
- secure cookies;
- HTTPS only;
- strict security headers;
- input validation;
- output encoding;
- parameterised database access through EF Core;
- secrets in Key Vault;
- managed identity;
- protection against mass assignment;
- safe file handling if uploads are later enabled;
- rate limiting for sensitive endpoints;
- correlation IDs;
- structured logs;
- redaction of sensitive values;
- dependency scanning;
- container image scanning where available;
- audit logging;
- least-privileged database access;
- database backups;
- health endpoints;
- readiness and liveness checks; and
- secure error handling without internal stack traces shown to users.

Do not expose integration raw payloads to ordinary users.

Define sensitive operational fields and their authorised roles.

Do not store unnecessary personal data.

Create a threat model using STRIDE or an equivalent structured method. Save it as:

```
docs/threat-model.md
```

## 15. Privacy and records requirements

Build privacy and records governance into the data model.

Support:

- data categories;
- data subjects;
- processing purposes;
- classification;
- jurisdiction;
- retention rule;
- disposal action;
- legal hold;
- privacy assessment status;
- records category;
- authoritative owner;
- review date; and
- evidence.

Do not automatically delete governance audit records solely because an external asset has been removed.

Define retention requirements for application audit records separately from source operational records.

## 16. Non-functional requirements

Target the following initial qualities:

- responsive on common desktop displays;
- usable on tablets;
- accessible keyboard navigation;
- page response under two seconds for common filtered views under expected organisational load;
- safe handling of at least 100,000 governed asset and source records without architectural replacement;
- idempotent synchronisation;
- recoverable failed jobs;
- database migrations with rollback guidance;
- structured application health reporting;
- support for one Azure region initially;
- documented backup and recovery process;
- documented recovery objectives;
- no single user account required for production operation;
- no permanent developer credentials in production; and
- no dependence on a specific employee remaining in a role.

Do not over-optimise before measuring.

## 17. Testing requirements

Create:

- unit tests;
- integration tests;
- authorisation tests;
- risk-rule tests;
- workflow state-transition tests;
- role-reassignment tests;
- source reconciliation tests;
- connector contract tests;
- database migration tests where practical;
- security-sensitive validation tests; and
- a small number of browser-based end-to-end tests for critical workflows.

Critical scenarios include:

- Owner leaves the organisation and the asset becomes visibly ownerless or transfers to the current role group.
- A new role holder can see outstanding tasks assigned to that role.
- Historical task completion still shows the original actor.
- A Freshservice synchronisation updates source-owned fields without overwriting local governance fields.
- A missing source record is marked missing rather than immediately deleted.
- An Entra app with an expired credential creates a risk finding.
- A Defender incident linked to a critical asset increases prioritisation.
- A failed Defender synchronisation displays stale or unavailable evidence rather than zero risk.
- A lifecycle transition is blocked when mandatory controls are incomplete.
- An approved, unexpired exception permits the specifically authorised transition.
- An expired exception reopens the control gap.
- A user without permission cannot view restricted evidence.
- CSV export cannot execute spreadsheet formulas.
- Duplicate workflow triggers do not create duplicate tasks.
- A retired asset with active Entra objects is flagged.

Use deterministic test data.

Do not make automated tests depend on live Freshservice, Entra, or Defender tenants.

## 18. Seed and demonstration data

Create realistic non-production seed data representing:

- several business applications;
- SaaS products;
- Entra app registrations;
- enterprise applications;
- databases;
- data domains;
- endpoints or servers;
- vendors;
- contracts;
- business units;
- role assignments;
- vacant roles;
- security findings;
- control assessments;
- exceptions;
- overdue reviews;
- access reviews;
- expiring credentials;
- an active Defender incident;
- an application in retirement; and
- a failed integration synchronisation.

Clearly label demonstration data.

Do not place demonstration data in production by default.

## 19. Repository structure

Prefer a structure similar to:

```
/
├── src/
│   ├── AssetGovernance.Web/
│   ├── AssetGovernance.Application/
│   ├── AssetGovernance.Domain/
│   └── AssetGovernance.Infrastructure/
├── tests/
│   ├── AssetGovernance.UnitTests/
│   ├── AssetGovernance.IntegrationTests/
│   └── AssetGovernance.EndToEndTests/
├── infra/
├── docs/
├── scripts/
├── .github/
│   └── workflows/
├── AGENTS.md
├── README.md
├── Directory.Build.props
├── Directory.Packages.props
└── AssetGovernance.sln
```

Keep modules internally separated by domain capability, including:

- Assets
- Ownership
- DataGovernance
- Controls
- Risks
- Workflows
- Integrations
- Lifecycle
- Exceptions
- Reporting
- Administration
- Audit

Do not create a generic "Helpers" dumping ground.

## 20. Delivery phases

Design the implementation in vertical slices.

### Phase 0: Discovery and foundation

Deliver:

- architecture;
- product requirements;
- policy traceability;
- threat model;
- data model;
- integration mappings;
- implementation plan;
- repository foundation;
- local development instructions;
- infrastructure skeleton;
- authentication design; and
- key architectural decision records.

### Phase 1: Core asset governance MVP

Deliver:

- Entra sign-in;
- role-based authorisation;
- asset register;
- asset detail;
- ownership model;
- classifications;
- lifecycle stages;
- controls;
- deterministic risk findings;
- dashboard;
- manual asset entry;
- audit history; and
- demonstration data.

### Phase 2: Freshservice integration

Deliver:

- read-only synchronisation;
- mapping configuration;
- reconciliation;
- integration-health view;
- source-field provenance;
- error handling; and
- synchronisation audit.

### Phase 3: Entra integration

Deliver:

- app registrations;
- enterprise applications;
- ownership;
- permissions;
- credential expiry;
- assignments where authorised;
- governance mappings;
- Entra-specific findings; and
- integration health.

### Phase 4: Defender integration

Deliver:

- incidents and alerts;
- governed-asset mapping;
- security findings;
- source links;
- freshness handling; and
- integration health.

### Phase 5: Workflow automation

Deliver:

- review workflows;
- access-review workflow;
- role-based task assignment;
- escalations;
- notifications;
- ownership-change handling;
- exception workflow; and
- retirement workflow.

### Phase 6: Onboarding pipeline

Deliver:

- guided request;
- triage;
- show-stopper rules;
- approvals;
- evidence;
- operational handover; and
- go-live decision record.

Do not attempt all phases in one change.

## 21. Coding standards

Use:

- nullable reference types;
- asynchronous I/O;
- dependency injection;
- cancellation tokens;
- clear domain types;
- UTC storage for timestamps;
- an explicit display timezone configuration;
- ISO currency codes;
- immutable records where appropriate;
- optimistic concurrency where simultaneous governance editing is possible;
- database constraints as well as application validation;
- pagination for list endpoints;
- centralised exception handling;
- centralised authorisation policies;
- structured logs;
- feature flags only where necessary; and
- XML documentation for public integration contracts.

Avoid:

- unnecessary generic repositories over EF Core;
- static service locators;
- hidden global state;
- business logic in UI components;
- business logic in controllers;
- stringly typed roles and statuses spread throughout the code;
- database cascade deletes that could remove governance history;
- hard-coded tenant IDs;
- hard-coded API URLs;
- hard-coded email addresses;
- hard-coded personal names;
- secrets in configuration;
- silent exception swallowing; and
- unbounded API retrieval.

## 22. Configuration

Use strongly typed configuration.

Support configuration for:

- Entra tenant;
- application client ID;
- integration schedules;
- API base addresses;
- Freshservice domain;
- Key Vault references;
- risk thresholds;
- review frequencies;
- contract-warning windows;
- credential-warning windows;
- notification sender;
- feature toggles;
- display timezone;
- default currency;
- allowed data jurisdictions; and
- support contacts represented as roles or groups.

Provide a safe appsettings.Development.example.json.

Do not commit real tenant identifiers or secrets.

## 23. Observability and operations

Provide:

- application health;
- database health;
- source-integration health;
- job execution history;
- synchronisation metrics;
- workflow metrics;
- risk-calculation metrics;
- structured errors;
- dependency telemetry;
- trace correlation; and
- operational runbooks.

Create runbooks for:

- failed Freshservice synchronisation;
- failed Graph synchronisation;
- failed Defender synchronisation;
- database migration failure;
- expired integration credential;
- role group with no members;
- stuck workflow;
- notification failure;
- restoring the database; and
- rolling back a deployment.

Place these under:

```
docs/runbooks/
```

## 24. CI/CD

Create GitHub Actions workflows for:

### Pull requests

- restore;
- build;
- formatting verification;
- unit tests;
- integration tests;
- dependency vulnerability checks;
- secret scanning;
- Bicep validation; and
- container build validation.

### Main branch

- all pull-request checks;
- build versioned container;
- push to Azure Container Registry;
- deploy infrastructure changes;
- run controlled database migration;
- deploy application;
- execute smoke tests; and
- report deployment result.

Use GitHub OpenID Connect federation to Azure where practical.

Do not store a long-lived Azure service-principal secret in GitHub.

Require protected environments for production deployment.

## 25. Documentation

The final repository must contain:

- clear README;
- Ubuntu development setup;
- local PostgreSQL setup using containers;
- Entra application-registration setup;
- Freshservice integration setup;
- Defender integration setup;
- configuration reference;
- Azure deployment instructions;
- GitHub Actions setup;
- database migration instructions;
- backup and restore instructions;
- operational runbooks;
- security model;
- permission matrix;
- data dictionary;
- API field mappings;
- architecture diagram using Mermaid;
- entity relationship diagram using Mermaid;
- workflow diagrams using Mermaid;
- threat model;
- policy traceability;
- testing instructions; and
- known limitations.

## 26. Architecture decisions to document

Create Architecture Decision Records under:

```
docs/adr/
```

At minimum document:

- Modular monolith instead of microservices.
- Azure Container Apps instead of Kubernetes or virtual machines.
- PostgreSQL as the single operational database.
- Server-rendered ASP.NET Core user interface.
- Source systems remain authoritative.
- Role-based assignment instead of person-based workflow ownership.
- Deterministic rules instead of opaque AI risk scoring.
- Internal workflow engine instead of an external workflow platform.
- Read-only external integrations for the MVP.
- Bicep for infrastructure as code.
- Managed identity and workload federation instead of long-lived secrets.
- Built-in reporting before a separate analytics platform.

Each ADR must include:

- context;
- decision;
- alternatives;
- consequences;
- risks; and
- conditions that would justify revisiting the decision.

## 27. Definition of done

A feature is not complete unless:

- acceptance criteria are met;
- authorisation is enforced;
- validation is implemented;
- audit behaviour is implemented;
- tests pass;
- failure paths are handled;
- logs are safe and useful;
- documentation is updated;
- database migration is included where needed;
- accessibility has been considered;
- source provenance is displayed where relevant;
- no secret is committed;
- no unrelated files are modified; and
- the feature can be demonstrated with safe test data.

## 28. First task

Perform only Phase 0 initially.

Follow this sequence:

1. Inspect the repository and existing files.
2. State any material assumptions.
3. Create the proposed documentation.
4. Produce a Mermaid architecture diagram.
5. Produce a Mermaid entity relationship diagram.
6. Produce a high-level permissions matrix.
7. Produce the policy-to-system traceability table.
8. Produce a prioritised implementation backlog.
9. Identify required Freshservice, Microsoft Graph, and Defender permissions.
10. Separate confirmed requirements from assumptions.
11. Identify licensing or API availability dependencies.
12. Identify security and privacy risks.
13. Propose the first vertical slice.
14. List the files that would be created or changed during that slice.
15. Stop before writing application implementation code.

Do not ask broad questions that can be addressed with sensible, documented assumptions.

Ask only questions that block a secure or materially correct design.

When requirements are uncertain:

- choose the simplest reversible option;
- document the assumption;
- isolate the decision behind an interface or configuration;
- do not add infrastructure merely to accommodate hypothetical future scale; and
- do not silently invent organisational policy.

At the end of Phase 0, provide:

- a concise architecture summary;
- the top ten assumptions;
- the top ten delivery risks;
- the proposed Azure components;
- the proposed external permissions;
- the initial database entities;
- the first implementation slice;
- the commands needed to validate the documentation and repository; and
- a clear statement that implementation has not yet begun.

---

The prompt deliberately asks OpenCode to stop after architecture and planning. That prevents it from generating a large, inconsistent codebase before the Freshservice fields, Entra permissions, Defender licensing, ownership model, and policy mappings have been validated. Freshservice provides REST APIs for service-management records, but exact object and field availability can vary with configuration and subscription, so the field-mapping stage is important.

For the eventual integrations, OpenCode should document every Microsoft Graph permission before requesting tenant consent. Listing application registrations and service principals uses separate Graph resources, and Defender API access also requires an Entra application and specifically assigned permissions.
