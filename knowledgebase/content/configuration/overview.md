---
sidebar_position: 1
---

# Configuration Overview

This section documents the configuration baselines, standards, and reference configurations for all ICT systems.

## Purpose

- Ensure consistent, repeatable system builds
- Reduce configuration drift
- Simplify troubleshooting with known-good references
- Support disaster recovery by enabling rapid rebuilds

## Configuration Management Approach

We follow a **configuration-as-code** philosophy where possible:

| System | Tool | Location |
|---|---|---|
| Servers | Ansible | `ansible/` in monorepo |
| Network | Unifi / Cisco config | `network/` in monorepo |
| Security | Policy-as-code | `security/` in monorepo |
| Endpoints | MDM (Intune / Jamf) | MDM console |

## Baseline Standards

All configurations must adhere to:
- **CIS Benchmarks** for OS hardening
- **OWASP** guidelines for web applications
- **Vendor security best practices**
- **Least privilege** principle

## Version Control

All configuration files are stored in the Git repository. Changes go through the [Change Management](../processes/change-management) process.
