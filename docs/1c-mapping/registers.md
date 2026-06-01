# Registers (History and Balance Tables)

In 1C, registers store the results of posting: movement registers (who earned what), balance registers (cumulative totals), and accumulation registers (running balances). They are derived from transactional documents but are immutable snapshots; they feed reporting, tax compliance, and audit trails.

In the web app, registers map to explicit history and balance tables in the Prisma schema. Example: a `PayrollMovement` table logs each payroll entry (employee, salary, deductions, period); a `PayslipHistory` table stores finalized payslips; a `EmployeeBalanceSnapshot` captures cumulative earnings and contributions. These tables are append-only or soft-versioned, never updated in-place.

Registers are not yet in the schema but are essential for compliance. They will be populated at period-close or posting time and will serve as the source of truth for payslips, tax reports, and audit queries. Design principle: if it appeared in a 1C register, it must be queryable and immutable in the web app. See `docs/business-rules/payroll-period-close.md` for when registers are updated.
