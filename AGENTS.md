# Repository Guidelines

## Project Structure & Module Organization
- Application source lives in `src/`: author data in `src/data/`, templates in `src/template/`, client assets under `src/public/` (scripts, styles, images), and shared logic in `src/helpers/`.
- Tests reside in `test/` and mirror helper functionality (`test/scoring.spec.js` is the reference layout).
- Build artifacts stay in `dist/`; keep it out of version control except for verifying diffs.
- Capture environment tweaks or workflow notes in `plan.md` so the next agent can reproduce your setup.

## Build, Test, and Development Commands
- `npm install` — sync dependencies exactly with the checked-in `package-lock.json`.
- `npm run watch` — launches `npx codex watch -p 1227 --src src --out dist` for a live preview at `http://localhost:1227`.
- `npm run build` — runs `npx codex build` to create a production-ready bundle in `dist/`.
- `npm test` — executes the Mocha suite; extend it whenever helper logic changes.
- `npm run format` — verifies Markdown, JS, and CSS formatting via Prettier; run after edits touching those files.

## Coding Style & Naming Conventions
- Follow two-space indentation for templates and Stylus, and keep helpers as ES modules exporting camelCase functions.
- Markdown headings stay in sentence case, filenames in kebab-case (`getting-started.md`).
- Use mixins for repeated Stylus patterns and encapsulate side effects inside helper functions.
- Run `npm run format` before committing to catch style drift early.

## Testing Guidelines
- Write new specs in `test/*.spec.js`, naming files after the module under test.
- Use Chai assertions and JSDOM fixtures drawn from `src/data/` to mimic real content.
- Ensure `npm test` passes and rerun `npm run build` to confirm integration before opening a PR.

## Commit & Pull Request Guidelines
- Commits follow Conventional Commits (`feat:`, `fix:`, `docs:`) and stay under 72 characters.
- Pull requests should summarize affected pages or helpers, attach the latest `npm run build` log, include screenshots when UI changes, and reference tracking issues.
- Document intentional build diffs (`npx shx diff -q dist dist_prev`) and list follow-up tasks in numbered bullets for future agents.

## Security & Configuration Tips
- Never commit secrets; rely on environment variables for tokens or API keys.
- Log any CLI overrides or required environment configuration in `plan.md` to keep the table playable.
