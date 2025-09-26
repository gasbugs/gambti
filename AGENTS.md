# Repository Guidelines

## Project structure and module organization
Everything runs client-side: load `index.html` directly in a browser or via a lightweight static server. Interaction logic sits inside `scripts/` as ES modules, shared visuals live in `styles/`, and long-form content plus fixtures stay in `data/`. Media goes under `assets/` (the MBTI mascots are in `assets/mascots/`). Keep `plan.md` up to date with any workflow hints you discover so the next agent can reproduce your setup quickly.

## Development workflow
No build tooling or npm scripts are required. For live reload, start a static server such as `python -m http.server 8080` and navigate to `http://localhost:8080`. Modern browsers cache aggressively, so hard refresh when tweaking modules. When verifying mobile layouts, use responsive design mode or plug in a handset over local network tunnelling. Remove any temporary helper servers after you finish debugging.

## Coding style and naming conventions
Stick to vanilla ES modules exporting camelCase helpers. Keep markup and Stylus-derived CSS at two-space indentation. Prefer semantic HTML and aria attributes already in the scenes. Assets and Markdown files follow kebab-case (for example, `result-guide.md`). If you touch shared CSS, consider extracting repeated patterns into utility classes rather than nesting deeply. Reference colors and spacing via the existing CSS custom properties instead of hardcoding values.

## Testing guidelines
Automated tests are suspended, so perform scenario-based checks. Run through the 16-question flow, confirm progress indicators, review the result notebook text, and play the mini game once per difficulty. On mobile, verify that toggles, chips, and deck actions read well inside a single column. Capture any manual steps or caveats in `plan.md` so regressions are easy to spot later.

## Commit and pull request guidelines
Use Conventional Commits (e.g., `feat: add mobile layout refinements`) with subjects under 72 characters. Pull requests should summarise affected scenes or helpers, include before/after screenshots for UI changes, and document manual verification notes. Link tracking issues when available, and call out any intentional limitations or follow-up tasks using numbered lists.

## Security and configuration tips
Do not bundle secrets in the repo; keep external API keys in your environment. Note browser flags, local storage resets, or audio permission quirks in `plan.md`. If you enable additional tooling (linters, formatters), record the exact command and cleanup instructions so later agents can reproduce or undo the setup.
