# Example: EmployeeSalaryChange Document (1C → Web App)

In 1C, an EmployeeSalaryChange document captures a change to an employee's salary. It has fields (employee, new salary, effective date, reason), a status (draft, approved, posted), and posting writes the change to the EmployeeSalaryMovement register and updates the employee balance.

In the web app, we model this as:

- **Model:** `EmployeeSalaryChange` with fields (employeeId, oldSalary, newSalary, effectiveDate, reason, status, approvedBy, approvedAt, postedAt).
- **Server Actions:** `createEmployeeSalaryChange` (draft), `approveEmployeeSalaryChange` (Moderator only), `postEmployeeSalaryChange` (only if approved + period is open/locked).
- **Side effects:** Posting writes an immutable record to `EmployeeSalaryMovement` register and locks the change from further editing.

This example demonstrates the full 1C → web app mapping: a document type becomes a Prisma model + Server Actions, with explicit status transitions and append-only register updates. See `docs/1c-mapping/documents.md` for more on document patterns.
