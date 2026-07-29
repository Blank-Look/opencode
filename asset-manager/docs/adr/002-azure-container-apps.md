# ADR-002: Azure Container Apps Instead of Kubernetes or VMs

**Context:** Need serverless container hosting with managed identity, scheduled jobs, and minimal operational overhead.

**Decision:** Use Azure Container Apps (Consumption plan) for the web application and Container Apps Jobs for scheduled sync and workflow processing.

**Alternatives:** AKS (Kubernetes), Azure App Service, Azure VMs, Azure Functions.

**Consequences:**
- No cluster management
- Managed identity supported natively
- Cold start on scale-to-zero (acceptable for internal tool)
- Consumption plan is cost-effective for intermittent usage
- Container Apps Jobs provide cron-like scheduling without separate infrastructure

**Risks:** Low. Container Apps supports standard containers; migration to AKS or App Service is possible if needed.

**Revisiting:** If the application requires gRPC, Istio, or other Kubernetes-native features not supported by Container Apps.
