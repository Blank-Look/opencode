# ADR-006: Role-Based Assignment Instead of Person-Based Workflow Ownership

**Context:** Person-based workflow ownership breaks when people leave or change roles. Requirements specify that workflows must target roles, not individuals.

**Decision:** All governance workflows, assignments, and escalations target governance roles (e.g., "Business Owner — Finance"), not named individuals. A RoleAssignment entity links roles to people or Entra groups.

**Alternatives:** Person-based assignment with manual reassignment.

**Consequences:**
- When a person leaves, the role retains outstanding work items
- New role holder inherits all obligations immediately
- Historical records preserve who performed each action at that time
- Role changes do not change historical audit records
- Entra groups can be used to represent operational roles
- Extra complexity: role resolution, vacancy detection, escalation when role is empty

**Risks:** Medium. Organisational culture may be accustomed to person-based tracking. Requires user education and possibly organisational role definition.

**Revisiting:** If the organisation has no practical way to define governance roles, fall back to groups with documented limitations.
