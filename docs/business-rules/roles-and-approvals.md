# Roles and Approvals

The application enforces role-based access control via the `roleMatrix` in `data/roleMatrix.ts`, which maps roles to CRUD operations on each domain entity. Roles (Administrator, Moderator, User) are assigned to users at the company level; fine-grained permissions (e.g., "approve payroll") are controlled by role + context (e.g., only Moderators in a specific company can approve).

Critical payroll workflows require multi-step approvals: an employee's salary change must be reviewed before taking effect; payroll calculations must be signed off by a Moderator before posting; period close requires an Administrator's sign-off. Approvals are not yet implemented in the schema but are crucial for audit and compliance.

Authorization is always enforced server-side in Server Actions via `authorize(...)` or direct `roleMatrix` checks. Client-side UI may be hidden, but the server must never trust a client claim of permissions. See `data/roleMatrix.ts` for the current permission matrix and `.github/instructions/server-actions.instructions.md` for enforcement patterns.
