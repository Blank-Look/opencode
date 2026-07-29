# ADR-001: Modular Monolith Instead of Microservices

**Context:** The application is a single-team internal governance tool. Microservices add operational complexity (service discovery, distributed transactions, multiple deployments) without proportional benefit at this scale.

**Decision:** Use a modular monolith with well-defined domain boundaries within a single process.

**Alternatives:** Microservices, serverless functions.

**Consequences:**
- Single deployment unit simplifies CI/CD
- Strong consistency within the database
- Cannot independently scale individual modules
- If a module has a memory leak, it affects the whole process

**Risks:** Low. Can extract modules into services later if needed.

**Revisiting:** If the team grows to 3+ teams owning separate domains, or if specific modules require independent scaling.
