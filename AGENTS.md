# Engineering Rules for Antigravity

This repository establishes rigorous software engineering rules for AI coding assistants and autonomous agents. Follow these guidelines for all tasks.

---

## 1. Understand Before Changing
- Read existing architecture documents, requirements, API specifications, and relevant source code before making modifications.
- Inspect dependencies, call graphs, and trace existing business logic before modifying or refactoring a feature.
- Never assume an undocumented business rule or make silent assumptions. Identify uncertainties and request clarification.

---

## 2. Plan Before Implementation
- Produce an implementation plan for non-trivial changes, structural refactors, or new architectural modules.
- Identify affected services, APIs, database schemas, events, and downstream dependencies.
- Update architecture diagrams (e.g., Mermaid / PlantUML) and sequence diagrams when system behavior or workflows change.
- Preserve established architectural patterns and directory structures unless an explicit design change is justified.

---

## 3. Define Business Logic Explicitly
- Document business rules, decision conditions, state transitions, validation logic, and error handling paths.
- Keep domain/business logic cleanly decoupled from presentation layers, HTTP controllers, persistence layers, and infrastructure.
- Explicitly define behaviors for retries, timeouts, duplicate messages, concurrent modifications, and partial failure recoveries.
- Never silently modify existing business behavior or alter core contracts without explicit documentation and approval.

---

## 4. Test Every Change
- Write unit tests for all business logic, validation rules, and edge cases.
- Write integration tests using real backing dependencies (e.g., Testcontainers for databases, brokers, and cache stores).
- Add contract tests for API specifications (OpenAPI/Spectral) and event payloads.
- Test failure paths, authorization rules, idempotency, and rollback handling.
- **Never claim tests passed unless they were actually executed and their output verified.**

---

## 5. Verify Quality and Security
- Execute project formatters, linters, type checks, and static analysis tools.
- Run security scanning:
  - **Secret Detection**: Scan with `Gitleaks` before committing any code. Never commit API keys, tokens, or credentials.
  - **SAST**: Run `Semgrep` to identify pattern-based security flaws.
  - **Dependency & Container Scanning**: Run `Trivy` to detect vulnerabilities (CVEs) and configuration defects.
  - **Code Quality**: Check against SonarQube rules and maintainability standards.
- Do not ignore failing checks or suppress findings without documented engineering justification.
- Never delete or disable existing tests simply to make a build pass.

---

## 6. Verify Before Completing a Task
- Run all relevant automated checks, linters, and test suites; record and report their actual outputs.
- Review the `git diff` carefully to ensure no unrelated files were touched, no accidental deletions occurred, and no sensitive data was introduced.
- Update documentation, API specifications, and diagrams to reflect the changes.
- Report any remaining risks, skipped test scenarios, and unresolved questions honestly.

---

## 7. Preserve Project Integrity
- Adhere strictly to the existing technology stack and repository conventions.
- Prefer small, atomic, reviewable commits with descriptive conventional commit messages (`feat:`, `fix:`, `refactor:`, `docs:`).
- Do not introduce heavy or redundant dependencies without clear justification.
- Never execute destructive operations or push unverified code to production branches.
