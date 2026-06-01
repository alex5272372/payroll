# Documents (Transactional Aggregates)

In 1C, documents (EmployeeSalaryChange, PayrollCalculation, PayslipBatch) are transactional workflows that encapsulate multiple related changes. They have status (draft, approved, posted), audit trails, and must be finalized before posting to registers. In the web app, documents map to transactional aggregates: models that group related mutations, enforce approval workflows, and produce immutable records.

Example: a PayrollCalculation document represents one payroll run for a period. It contains a list of calculated payslips, carries approval sign-offs, and, once posted, cannot be edited—only reversed via a separate reversal document. Unlike simple CRUD (create employee), documents are heavy with business logic: validation rules, status gates, and downstream side effects.

Documents are not yet fully modeled in the Prisma schema but are essential for proper 1C migration. Each document type requires a model (e.g., `PayrollDocument`, `PayslipLine`) and explicit Server Actions for each state transition (draft → approved → posted). See `docs/business-rules/payroll-period-close.md` for state transition rules and `docs/examples/document-mapping-example.md` for a concrete example.
