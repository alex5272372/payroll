# Catalogs (Reference Entities)

In 1C, catalogs are master data objects: Company, Department, Country, Employee, Person. These map one-to-one to Prisma models in the schema. They are reference or slowly-changing dimensions; they are created, read, and occasionally updated, but not heavily transactional.

Catalog mutations (add/edit department) are straightforward CRUD and are guarded by role-based authorization. No complex state machines; they flow through standard validation and tenant isolation checks. Historical tracking (who changed what, when) is not yet implemented but should be added for audit compliance, especially for salary or employee status changes that affect payroll.

Immutability: once an employee is linked to historical payroll data, their Person record cannot be deleted (use `onDelete: NoAction`). Similarly, a Country or Department that appears in closed periods cannot be removed without explicit handling. See `docs/examples/document-mapping-example.md` for how catalogs relate to transactional documents.
