# Arcane Desk

Next.js app with a **feature-oriented layout** (`features/`, `lib/`, `shared/`, plus `app/`). Tooling is chosen to keep structure clear, style uniform, and changes safe to ship.

## Architecture

Code is split by **domain features** and **shared** utilities rather than a single flat `src/`. That makes boundaries explicit and keeps the app layer (`app/`) thin. **Dependency-cruiser** is scoped to `./features`, `./lib`, and `./shared` so dependency rules apply where application logic lives, without noise from the framework-heavy `app/` tree.

## Tooling

### dependency-cruiser (`npm run analyze`)

Static analysis of import graphs. It helps **maintainability** by flagging problems before they become runtime bugs:

- **Circular dependencies** — surfaces coupling that makes refactors risky.
- **Orphan modules** — finds dead or forgotten files (with sensible exceptions for Next.js route files and dotfiles).
- **Production vs development dependencies** — `app`, `lib`, `shared`, and `features` must not pull **runtime** code from packages only listed in `devDependencies` (type-only imports are allowed).
- **Package integrity** — missing npm entries, unresolvable imports, duplicate dep types, and deprecated packages are caught early.

Together, these rules encode **how modules are allowed to depend on each other** so the codebase stays navigable as it grows.

### Prettier (`npm run format`)

Prettier uses **default options** (empty `.prettierrc`). The goal is **code conformity**: one automatic formatter, no bike-shedding on style. It works with ESLint via `eslint-config-prettier` / `eslint-plugin-prettier` so lint and format do not fight each other.

### Testing
> ⚠️ Tests are not yet implemented. This is a known gap and a planned priority for the next development phase.

---

| Command              | Purpose                                          |
| -------------------- | ------------------------------------------------ |
| `npm run analyze`    | Validate dependency rules on features/lib/shared |
| `npm run format`     | Format the repo with Prettier                    |
