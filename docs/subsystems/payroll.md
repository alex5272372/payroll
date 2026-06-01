# Payroll Subsystem

The payroll subsystem handles employee salary calculations, deductions, tax withholding, and payslip generation. It spans multiple domains: employee master data (salaries, tax brackets), periods (accounting periods for payroll runs), calculations (gross → net logic), approval workflows, and register posting.

**Core workflows:** (1) Create a payroll run for a period. (2) Validate employee eligibility and data completeness. (3) Calculate gross salary and deductions. (4) Apply tax and social contributions. (5) Generate payslips. (6) Submit for approval. (7) Post to registers and mark period as closed.

**Not yet implemented:** Period entity, PayrollRun and PayslipDocument models, PayrollCalculator service, approval workflows, register tables (PayslipHistory, EmployeeSalaryMovement, TaxMovement). These are high-priority for MVP. See `docs/business-rules/payroll-calculation.md` and `docs/business-rules/payroll-period-close.md` for detailed rules.
