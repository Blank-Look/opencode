---
sidebar_position: 3
---

# Deployment

Procedures for deploying new assets into production use.

## Hardware Deployment

### New Workstation

1. Unbox and inspect hardware
2. Asset tag and register (see [Procurement](procurement))
3. Apply base image via MDM
4. Join domain / Identity Provider
5. Install standard software suite
6. Apply security baselines (BitLocker, Defender)
7. Verify with post-deployment checklist
8. Deliver to user with sign-off form

### Server Deployment

- Follow [Server Provisioning Runbook](../runbooks/server-provisioning)
- Register in asset register as "In Use"
- Add to monitoring and backup schedules

## Software / SaaS Deployment

1. Verify licence availability
2. Create service account if needed
3. Configure SSO via identity provider
4. Apply security configuration baseline
5. Test with representative users
6. Communicate rollout to stakeholders
7. Update software catalogue

## Cloud Resource Deployment

- Tag all resources: `Environment`, `CostCentre`, `Owner`, `Project`
- Use Infrastructure-as-Code (Terraform / Bicep) for repeatable deployments
- Apply budget alerts at 80% and 100% of forecast
- Register in asset register with resource ID
