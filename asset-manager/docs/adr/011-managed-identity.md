# ADR-011: Managed Identity and Workload Federation Instead of Long-Lived Secrets

**Context:** Long-lived Azure service principal secrets are a security risk (leakage, rotation burden).

**Decision:** Use managed identity for Azure resource-to-resource access and GitHub OIDC federation for CI/CD. No permanent developer credentials in production.

**Alternatives:** Service principal with client secret, client certificate.

**Consequences:**
- No secrets to rotate for Azure resource access
- GitHub Actions uses token exchange (no stored GitHub secret for Azure access)
- Container Apps uses system-assigned managed identity for Key Vault, PostgreSQL, and external APIs (where supported)
- Freshservice may require an API key (stored in Key Vault, retrieved via managed identity)

**Risks:** Low. Managed identity is the recommended approach.

**Revisiting:** If an external system does not support managed identity (Freshservice), the API key is stored in Key Vault with automatic rotation monitoring.
