# AZ-104 study workspace

English study notes and original multiple-choice practice for the Microsoft
Azure Administrator certification. Designed for a learner with some Azure
experience preparing for an exam around December 2026–January 2027.

**All 82 exam objectives now have documented coverage across five domains.**
See [STATUS.md](STATUS.md) for progress and [the coverage matrix](exam/coverage.md)
for topic mappings. The bank currently contains 322 questions across 311
families and 99 topics, including reviewed variants in all five domains.

## Start studying

The GitHub Pages address is
<https://frank-reichenbach.github.io/az104-prep/>. Deployment status is tracked
in [STATUS.md](STATUS.md). Browser progress is separate from localhost; use
export/import to move your history between them.

To run locally:

Use Node.js 22 or newer. There are no third-party packages to install.

```sh
npm start
```

Open <http://127.0.0.1:8080>. Stop the server with Ctrl+C. The server binds only
to the local machine. The app uses local files and makes no external requests
unless you choose to open a Microsoft source link. Answer keys are available
locally: this is a personal study tool, not a secure assessment platform.

Choose a topic and either practice (feedback after each question) or test
(feedback at the end). Test submissions advance immediately. Preparation keeps
the Next question step. Every question shows its topic. Incorrect results open
automatically and show your selections plus the correct options; correct
results remain collapsed. Multiple-answer questions require the exact answer set.
Progress stays in this browser. Export it before clearing browser storage or
moving to a different browser. Imported progress replaces current progress.

Choose **Mixed · exam domain weights** for practice across all five domains.
The app normalizes the published ranges' midpoints and rounds to whole
questions; restricted missed-question sessions use available families.
**All topics · random selection** samples the bank without domain weighting.
These practice percentages do not predict Microsoft's scaled exam score.

You can also study without the app:

- [Certification overview](exam/az-104.md)
- [Knowledge index](knowledge/index.md)
- [Printable questions](generated/questions.md)
- [Answer explanations](generated/answers.md)

## Project map

| Path | Purpose |
| --- | --- |
| PLAN.md | Approved scope and implementation phases |
| STATUS.md | Session handoff and next tasks |
| AGENTS.md | Instructions for future work |
| exam/ | Certification overview, objective inventory, coverage |
| knowledge/ | Researched Markdown topics and indexes |
| questions/ | Authoritative JSON question files |
| examples/ | Illustrative Azure configuration; not executed automatically |
| docs/ | Research and question authoring conventions |
| templates/ | Starting point for a specific knowledge topic |
| app/ | Local browser quiz and generated question bundle |
| scripts/ | Build, validation, and local server |
| tests/ | Quiz logic, content validation, and server tests |
| generated/ | Reproducible Markdown questionnaires and answer keys |

## Maintain the content

```sh
npm run build
npm run check
npm test
npm run build:site
npm run test:browser
```

Edit questions in questions/, then rebuild. Do not hand-edit generated/
or app/data.json. Read [the question format](docs/question-format.md) and
[research conventions](docs/research.md) before adding material.

Azure examples are documentation-checked, not lab-tested. This workspace does
not require an Azure subscription. The study material is independent of
Microsoft and does not contain official exam questions.

The GitHub repository is
[Frank-Reichenbach/az104-prep](https://github.com/Frank-Reichenbach/az104-prep).
See [hosting instructions](docs/hosting.md) for the static build and deployment
workflow, [PLAN.md](PLAN.md) for the scope, and [STATUS.md](STATUS.md) for the
next task. Browser tests require Google Chrome (or BROWSER_BIN pointing to a
Chromium executable) and use a disposable profile.

Personal progress exports can be stored under the ignored progress/ directory.
