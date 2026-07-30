# Invoice Intake

Automated accounts payable — from supplier email to finance-ready queue. Powered by Power Automate, AI Builder extraction, and SharePoint.

> **Links:** [Product Page](https://blank-look.github.io/opencode/products/invoice-intake/) · [App Mockup](https://blank-look.github.io/opencode/products/invoice-intake/app-mockup.html)

## Architecture

```
Supplier Email → Shared Mailbox → Power Automate → AI Builder → SharePoint Queue → Approval → Finance
```

## Detection Methods

- **Simple** — Outlook rule detects PDF + keywords, moves to folder
- **Recommended** — Power Automate + AI Builder extracts all fields
- **Enterprise** — Full AP automation with Dataverse, ERP, PO matching

## Queue Fields

Invoice Number, Supplier, Amount, GST, Due Date, PO Number, Received Date, Status (New → Review → Approved → Paid), Owner

## Security Controls

Supplier allow list, malware scan, duplicate detection, SPF/DKIM verification, bank account change alerts, large amount alerts.

## Status

**Phase 0: Discovery** — in progress. Architecture and requirements being defined.
