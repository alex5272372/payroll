# Parity Gaps and Migration Unknowns

**Period Close Workflow:** In 1C, period close is a multi-step process with checkpoints (all payroll calculated? all leaves reconciled?). The exact sequence and gate conditions are not yet documented. Assumption: if-then rules are deterministic; need clarification on manual override and exception handling.

**Recalculation Triggers:** 1C allows recalculation of closed periods under certain conditions (tax rate change, employee correction). Rules for when and how are unclear. Current assumption: recalculation requires explicit admin action and produces a new adjustment document, not silent updates.

**Tax and Deduction Rules:** The full tax calculation sequence (federal, state, social, garnishment order) is not yet extracted from 1C. Need to identify all tax jurisdictions and deduction types before implementing PayrollCalculator.

**Register Snapshot Logic:** When exactly are register snapshots taken (at posting? daily?)? How are corrections handled—new entries or versioned updates? Assumption: append-only; need confirmation.

**Approval Chain:** Which roles approve payroll? Can an admin approve their own payroll? Are there segregation-of-duties rules? Current assumption: Moderators approve, Administrators post; need policy clarification.
