# ADR-008: Internal Workflow Engine Instead of External Workflow Platform

**Context:** The application needs state-machine workflows for reviews, approvals, escalations, and lifecycle transitions.

**Decision:** Build a simple state-machine workflow engine inside the modular monolith.

**Alternatives:** Azure Logic Apps, Temporal, Elsa Workflows, Workflow Core.

**Consequences:**
- No external dependency for workflow execution
- Workflow definitions are code-first (seeded via migrations for MVP)
- No drag-and-drop designer (acceptable for MVP)
- Workflow state is in the same database as governed data (consistent transactions)
- Need to build escalation, reminder, and notification logic manually
- Not suitable for complex, long-running workflows with human-in-the-loop at scale

**Risks:** Low. Internal state machines are well-understood. Can migrate to a workflow engine later if needed.

**Revisiting:** If workflow definition count exceeds 50, or if business users need to modify workflow definitions without developer involvement.
