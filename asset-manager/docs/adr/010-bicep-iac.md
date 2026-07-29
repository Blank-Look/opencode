# ADR-010: Bicep for Infrastructure as Code

**Context:** Need idempotent, environment-parameterised Azure infrastructure deployment.

**Decision:** Use Bicep for all Azure resource definitions.

**Alternatives:** ARM templates, Terraform, Pulumi, manual deployment.

**Consequences:**
- Bicep is Azure-native, no state management needed
- Transpiles to ARM; familiar to Azure administrators
- Parameterised by environment via parameter files
- No third-party tooling required
- Less mature ecosystem than Terraform

**Risks:** Low. Bicep is the recommended Microsoft IaC approach.

**Revisiting:** If the organisation standardises on Terraform for multi-cloud or has existing Terraform expertise.
