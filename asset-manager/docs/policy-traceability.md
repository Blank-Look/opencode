# Policy-to-System Traceability — ICT Asset Governance Manager

## Traceability Matrix

| Policy Section | Requirement | Entity | Field / Control | Workflow | Report / View | Evidence Source | Role | Phase |
|---|---|---|---|---|---|---|---|---|
| Ownership | Named business owner required | Asset | GovernanceRole="Business Owner" | Owner assignment review | Ownerless Assets | Asset register | AssetManager | 1 |
| Ownership | Named service owner required | Asset | GovernanceRole="Service Owner" | Owner assignment review | Ownerless Assets | Asset register | AssetManager | 1 |
| Ownership | Named technical owner required | Asset | GovernanceRole="Technical Owner" | Owner assignment review | Ownerless Assets | Asset register | AssetManager | 1 |
| Ownership | Owner review overdue | RoleAssignment | LastReviewDate > 365d | Review workflow | Overdue Reviews | RoleAssignment | WorkflowApprover | 5 |
| Onboarding | New asset must complete triage | Asset | LifecycleStage="Triage" | Onboarding workflow | Assets in Onboarding | WorkflowInstance | Contributor | 6 |
| Data Classification | All assets must have classification | Asset | DataClassificationId | Classification assignment | Missing Classification | Asset register | DataGovernanceReviewer | 1 |
| Data Classification | Sensitive data requires owner | Asset | DataClassification > Internal + GovernanceRole="Data Owner" | Data owner review | Ownerless Assets (filtered) | Asset register | DataGovernanceReviewer | 1 |
| Access Approval | Enterprise app requires user assignment | Control | "Assignment Required" | Access review | Access Reviews Due | Entra API | SecurityReviewer | 3 |
| Retention | Retention rule must be assigned | Asset | RecordsCategory, RetentionRule | Records review | Assets without Retention | Asset register | DataGovernanceReviewer | 1 |
| Security Review | Annual security assessment | ControlAssessment | Control="Security Assessment" | Assessment due | Overdue Assessments | ControlAssessment | SecurityReviewer | 1 |
| Support Model | Critical asset must have defined support | Asset | SupportTier, SupportModel | Support review | Missing Support Model | Asset register | AssetManager | 1 |
| Material Change | Change must trigger stage transition | Asset | LifecycleStage transition | Change review workflow | Assets in Change | WorkflowInstance | WorkflowApprover | 5 |
| Periodic Review | Annual asset review | Asset | NextReviewDate | Review workflow | Overdue Reviews | WorkflowInstance | WorkflowApprover | 5 |
| Retirement | Asset requires decommission plan | Asset | LifecycleStage="Retirement" | Retirement workflow | Retirement Pipeline | WorkflowInstance | AssetManager | 5 |
| Exceptions | Exceptions must expire | Exception | ExpiryDate | Exception review | Active Exceptions | Exception record | WorkflowApprover | 5 |
| Lifecycle | Required artefacts before transition | Asset | ControlAssessment per stage gate | Transition validation | Lifecycle validation | ControlAssessment | SystemAdministrator | 1 |
| Auditability | All governance actions logged | AuditEvent | Append-only log | — | Audit History | AuditEvent | Auditor | 1 |
