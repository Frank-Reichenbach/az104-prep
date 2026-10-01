# Local and GitHub Pages hosting

The same HTML, CSS, JavaScript, and JSON run locally and at
<https://frank-reichenbach.github.io/az104-prep/>. All app URLs resolve relative
to the deployment directory; no domain-specific settings are needed.

## Build and validate

```sh
npm run build
npm run check
npm test
npm run build:site
npm run test:browser
```

The static build creates ignored _site/ from an explicit allowlist. It includes
study content and source references, but not Git internals, personal progress,
or the local server. No npm dependencies or cloud credentials are required.

Browser tests launch Google Chrome with a temporary isolated profile. On
macOS, the default executable is in /Applications/Google Chrome.app. Linux
uses google-chrome from PATH. Override BROWSER_BIN for another Chromium binary.
Tests exercise the local root and the /az104-prep/ deployment path.

To check the deployed site in an isolated browser:

```sh
npm run test:browser -- --url https://frank-reichenbach.github.io/az104-prep/
```

## Deployment

The repository was empty before this first publication. The initial published
branch is feature/github-pages. This lets the user test the feature without
merging it into main. Future merges still follow project approval conventions.

The Pages workflow runs validation, tests, a static build, and Chrome checks
on a standard ubuntu-latest runner. Pushes to feature/github-pages or main can
deploy. Pull requests targeting either branch validate without deployment.
The github-pages environment receives the artifact using Pages and OIDC
permissions; no separate deployment secret is needed. In repository Settings
→ Pages, the build source must be GitHub Actions.

After a later approved transition to main, remove feature/github-pages from
the workflow's deployment branch list and update the environment's allowed
branches. Do not merge automatically just because checks succeed.

GitHub provides [Pages for public repositories on its free plan](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
and [free standard Actions runners for public repositories](https://docs.github.com/en/billing/concepts/product-billing/github-actions).
The setup uses the included github.io address and no paid service.

## Data and limitations

Progress stays in the browser's local storage, not on GitHub. The localhost
origin and github.io origin have separate history; export/import transfers it.
Export before switching browsers or clearing storage. Questions and answer
keys are public, as expected for a self-study app.

The site has only the current storage sample. Deployment does not imply full
exam coverage. Knowledge links expose the original Markdown files; formatted
document browsing can be added separately.
