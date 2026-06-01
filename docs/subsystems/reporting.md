# Reporting Subsystem

Reporting provides visibility into payroll data for management, HR, and compliance: payslips (employee-facing), tax summaries (for tax filing), management dashboards (payroll costs, headcount trends), and audit logs (who did what, when).

**Core reports:** (1) Payslip report (per-employee summary for a period). (2) Tax summary (federal/state withholding, social contributions by jurisdiction). (3) Payroll costs (gross, net, benefits by department/company). (4) Audit trail (all payroll changes with approver and timestamp).

**Data source:** All reports query the register tables (PayslipHistory, TaxMovement, EmployeeBalanceSnapshot) and dimension tables (Employee, Department, Company). Registers must be complete and immutable for reports to be trustworthy. Not yet implemented; will be added after core payroll workflows are stable. See `docs/1c-mapping/registers.md` for register structure.
