# Payroll Calculation

Payroll calculations in the source 1C system follow domain-specific rules: gross salary is broken into taxable and non-taxable components; tax deductions, social contributions, and garnishments are applied in a defined sequence; totals feed into payslips and accounting registers. These rules are deterministic and period-dependent; recalculation must be explicit and traceable.

In the migration, calculation logic should remain in the domain layer, not scattered across UI or database triggers. A `PayrollCalculator` service (not yet implemented) will encapsulate the calculation sequence, validate inputs against period state, and return a detailed result object that shows intermediate totals and deductions. All calculations must be versioned so that historical payslips can be regenerated if rules change.

Recalculation is triggered only by explicit user action or system event (e.g., tax rate change, employee adjustment); silent recalculation of closed periods is prohibited. See `docs/business-rules/payroll-period-close.md` for how period status gates these operations.
