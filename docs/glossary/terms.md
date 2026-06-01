# Glossary

**1C:Enterprise** — Legacy Russian business software platform; source system for payroll logic.

**Aggregate** — A domain-driven design term for a group of related entities that act as a single unit (e.g., a PayrollDocument and its PayslipLines).

**Catalog** — 1C term for reference data (Company, Country, Employee). Maps to Prisma models.

**Document** — 1C term for transactional workflows (e.g., PayrollCalculation, EmployeeSalaryChange). Maps to aggregates in the web app.

**Period** — An accounting period (e.g., January 2024) to which payroll runs are attached.

**Posting** — The process of writing transaction results into registers; marks a period as final.

**Register** — 1C term for transaction logs and balance snapshots (e.g., PayslipHistory, EmployeeBalance). Maps to append-only or versioned history tables.

**Role Matrix** — Permission lookup table in `data/roleMatrix.ts` mapping roles (Administrator, Moderator, User) to CRUD operations.

**Server Action** — Next.js function that runs on the server; used for all mutations and sensitive operations.

**Tenant Isolation** — Ensuring users only see/modify their own company's data. Enforced via explicit company filtering in all queries.

**User** — A person with login credentials and assigned roles. Links to a Person and has UserRole relationships.
