# Data Modeling

Domain entities are modeled explicitly in `prisma/schema.prisma` using Prisma's type system (models, enums, relations) to enforce invariants at the database level. Key patterns: **reference catalogs** (Company, Country, Department) are immutable or softly versioned; **transactional aggregates** (future: PayrollDocument, PayslipBatch) encapsulate multi-step workflows and their status transitions; **append-only or versioned history tables** capture audit events, recalculations, and period snapshots.

Tenant isolation is achieved via explicit company/department relationships; no customer ID columns needed where hierarchical ownership exists. Relations use `onDelete: NoAction` for critical data to prevent cascading destruction of closed periods. Enums (Role, Gender) enforce domain constraints; strings are avoided for roles and permissions—always use TypeScript enums.

Indexes and unique constraints are planned but not yet implemented; they should target common query patterns (employee-by-department, payroll-by-period) and immutability rules. See `docs/1c-mapping/` for how 1C concepts (Catalogs → reference tables, Documents → aggregates, Registers → history/balance tables) map to this schema.
