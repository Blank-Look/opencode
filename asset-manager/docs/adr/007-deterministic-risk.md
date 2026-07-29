# ADR-007: Deterministic Rules Instead of Opaque AI Risk Scoring

**Context:** Risk scores must be explainable to auditors, business owners, and governance reviewers.

**Decision:** Use configurable deterministic rules. Every risk finding has a rule ID, evidence, score contribution, and recommended action. No AI/ML models.

**Alternatives:** Machine learning model, heuristic scoring, vendor risk platform.

**Consequences:**
- Every point in the score is traceable to a specific rule and evidence
- Users can see and challenge individual findings
- Rules are versioned; score calculation history is stored
- A policy administrator can change weights and thresholds without code (future phase)
- More manual rule configuration than an AI approach

**Risks:** Low. Deterministic rules are the safer choice for governance and audit contexts.

**Revisiting:** If the volume of findings makes manual rule tuning impractical, add statistical analysis on top of (not replacing) deterministic rules.
