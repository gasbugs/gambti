# Repository Guidelines

## Project Structure & Module Organization
Application assets now sit at the repository root: the entry point is `index.html`, client code in `scripts/`, shared styles in `styles/`, and art/audio under `assets/` (see `assets/mascots/`). Author datasets and fixtures stay inside `data/`. Generated bundles land in `dist/`; keep that directory clean between builds unless you are comparing diffs. Record workflow tweaks or environment notes in `plan.md` so the next agent can replicate your setup.

## Build, Test, and Development Commands
- `npm run watch` launches `npx codex watch -p 1227 --src . --out dist` for a live preview at `http://localhost:1227`.
- `npm run build` executes `npx codex build --src . --out dist` to produce the production bundle in `dist/`.
- `npm test` simply echoes that automated tests are paused for this iteration.
- `npm run format` checks JS, CSS, and Markdown formatting across `scripts/`, `styles/`, and `data/` via Prettier.

## Coding Style & Naming Conventions
Use two-space indentation for templates and Stylus files under `styles/`. Client helpers remain ES modules exporting camelCase functions. Keep Markdown headings in sentence case and filenames in kebab-case (e.g., `getting-started.md`). Prefer Stylus mixins for repeated patterns, and run `npm run format` before committing to catch drift early.

## Testing Guidelines
The automated Mocha suite has been retired for now. When you touch scoring logic or state management, verify outcomes manually by completing a questionnaire and confirming the result graph reflects the expected axis balance. Capture any ad-hoc verification steps in `plan.md` so others can replay them quickly.

## Commit & Pull Request Guidelines
Commits follow Conventional Commits (e.g., `feat: add scoring helper`) with subjects under 72 characters. Pull requests should summarize affected pages or helpers, attach the latest `npm run build` log, include screenshots for UI updates, and reference tracking issues. Document intentional build diffs using `npx shx diff -q dist dist_prev` and list follow-up tasks in numbered bullets for future agents.

## Security & Configuration Tips
Do not commit secrets; rely on environment variables for tokens and API keys. Note any CLI overrides or environment requirements in `plan.md` to keep the project reproducible.
