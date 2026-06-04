
---
applyTo: "app/**/*manager.ts, app/**/*actions.ts"
---

# Payroll Domain Rules
- Prioritize correctness over convenience.
- Preserve historical accuracy and auditability.
- Do not allow silent changes to finalized or closed payroll periods.
- Recalculation logic must be explicit and reviewable.
- Use append/log patterns when history matters.
- Identify affected entities, invariants, and side effects for non-trivial changes.
- Treat approvals, statuses, and period boundaries as first-class business rules.
- Flag assumptions if source behavior from 1C is unclear.
- For migrated 1C logic, note probable source concept and target implementation approach.
- Avoid reducing payroll workflows to generic CRUD when lifecycle rules exist.
