# Guidelines for Codex Changes

## Tests and Linting
- Install dependencies if needed: `pnpm install`
- Compile TypeScript code: `pnpm run build`
- Run tests: `pnpm test`  
  - The `posttest` hook will automatically run `pnpm run lint` afterwards.

## Style Guidelines
- Source code is formatted with Prettier. Settings can be found in [`.prettierrc.json`](https://github.com/dmoove/dmpak/blob/main/.prettierrc.json#L1-L10)
- Linting rules are defined in `eslint.config.mjs`.
- Apply automatic fixes if needed: `pnpm run lint --fix`.

## Commit Messages
- Keep messages short and clear, following the format `fix: …`, `feat: …`, etc.

## Additional Notes
- Do not manually edit generated files (such as those in `dist/` or `oclif.manifest.json`).
- New tests should go in the `test/` directory and end with `.test.ts`.
- Files like `*.tsbuildinfo` should not be versioned.
