# Local and GitHub Pages hosting

The same HTML, CSS, JavaScript, and JSON run locally and at
<https://frank-reichenbach.github.io/az104-prep/>. All app URLs resolve relative
to the deployment directory; no domain-specific settings are needed.

## Build and validate

```sh
pnpm run build
pnpm run check
pnpm test
pnpm run build:site
pnpm run test:browser
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
pnpm run test:browser -- --url https://frank-reichenbach.github.io/az104-prep/
```

## Deployment

The repository's default branch is main. Initial publication used
feature/github-pages because the remote was empty. The user authorized renaming
that branch to main on October 2, 2026, preserving all commits without a merge.

The Pages workflow runs validation, tests, a static build, and Chrome checks
on a standard ubuntu-latest runner. Pushes to main and manual dispatches from
main can deploy. Pull requests targeting main validate without deployment.
The github-pages environment permits only the main branch, with no tag policy.
The github-pages environment receives the artifact using Pages and OIDC
permissions; no separate deployment secret is needed. In repository Settings
→ Pages, the build source must be GitHub Actions.

Pages publication does not require a release or Git tag: the configured Actions
workflow deploys on a push to an allowed branch. The repository's About website
field points to the live Pages URL. Repository topics help discovery and are
separate from version tags. See [publishing sources](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
and [repository topics](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/classifying-your-repository-with-topics).

Create a prefixed work branch for future changes, push it, and open a pull
request to main. Merge only after an explicit request or approval. Do not push
directly to main. A manual deployment can be started with:

```sh
gh workflow run pages.yml --repo Frank-Reichenbach/az104-prep --ref main
```

## Update an older clone

For a clone still checked out on the former publication branch, update its
local name and upstream:

```sh
git branch -m feature/github-pages main
git fetch origin --prune
git branch --set-upstream-to=origin/main main
git remote set-head origin -a
```

GitHub redirects normal branch file links after a rename; old raw-file URLs
and Git pull references require updates. Workflow filters and explicit
environment branch policies must also be checked. This repository's workflow,
project instructions, plan, and handoff now use main for current operations.
[GitHub branch-renaming guidance](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-branches-in-your-repository/renaming-a-branch).

GitHub provides [Pages for public repositories on its free plan](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
and [free standard Actions runners for public repositories](https://docs.github.com/en/billing/concepts/product-billing/github-actions).
The setup uses the included github.io address and no paid service.

## Installation and offline use

The app is a progressive web app. After the first visit over HTTPS (or on
localhost) a service worker caches every file of the site, including all
Markdown documents, so quiz, bank, and document viewer work without a network.
Use the browser's "Install" action to add it as an app.

- The cache name contains a hash of all shipped files. A new deployment is
  fetched in the background and activated only after you click "Reload to
  update", so a running session is not interrupted.
- GitHub Pages cannot set custom headers and serves `sw.js` with a short cache
  lifetime (about 10 minutes), so a new version may appear with that delay.
- Clearing site data removes the offline cache and local progress. Export
  progress first; the app asks the browser for persistent storage to reduce the
  risk of automatic eviction.
- Theme preference is system (default), light, or dark.

## Data and limitations

Progress stays in the browser's local storage, not on GitHub. The localhost
origin and github.io origin have separate history; export/import transfers it.
Export before switching browsers or clearing storage. Questions and answer
keys are public, as expected for a self-study app.

The site has 322 questions across 99 detailed topics, with documented coverage
of all 82 objectives. Coverage does not establish mastery or exhaustive scenario
coverage. Knowledge links expose the original Markdown files; formatted
document browsing can be added separately.
