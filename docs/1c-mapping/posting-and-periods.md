# Posting and Periods

In 1C, posting is the process of writing transaction results into registers (debit/credit entries, balance snapshots, movement logs). A payroll period is an accounting period (e.g., January 2024) to which payroll runs are attached. Posting marks a period as final; no further edits are allowed without an explicit reversal.

In the web app, this translates to: a Period entity (not yet in schema) represents an accounting period and carries a status (open, locked, verified, posted). Posting a period means flushing all approved payroll results into immutable history/register tables and marking the period as closed. Once posted, corrections must go through a reversal workflow or a new adjustment period.

Registers (transaction logs) are append-only or version-controlled snapshots of payroll calculations, deductions, and tax liabilities. They are not yet modeled but will be critical for compliance and audit. See `docs/business-rules/payroll-period-close.md` for period states and `docs/1c-mapping/registers.md` for register concepts.
