# Payroll Period Close

A payroll period transitions through discrete states: Open (data entry), Locked (no employee changes without review), Verified (payroll calculated and approved), Posted (final accounting entries recorded). Once Posted, a period is immutable; corrections require a new adjustment period or reversal document.

The close workflow enforces invariants: you cannot post payroll with incomplete data; you cannot modify an employee's salary in a locked period; corrections to posted periods are traceable (new entries, not edits). Each state transition is an explicit business event that may trigger notifications, audit logging, and downstream processes (e.g., export to accounting).

Implementation requires a Period entity (not yet in schema) with a status field, and all payroll mutations must check this status. See `docs/1c-mapping/posting-and-periods.md` for 1C register concepts and how they map to period state and history tables.
