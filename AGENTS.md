# Project instructions

## Purpose and approved scope

Build an English AZ-104 knowledge base and original multiple-choice practice
questions for a learner with some hands-on Azure experience. The target exam
window is December 2026–January 2027. The user approved the plan on October 1,
2026, including a basic local browser app and local Git repository. The scope
now also includes quiz refinements and free GitHub Pages hosting from the
user-provided Frank-Reichenbach/az104-prep repository.

Read PLAN.md, STATUS.md, and exam/coverage.md before continuing work. Resume the
next unfinished task. These documents preserve decisions across sessions.
Do not ask for approval again for work already authorized in PLAN.md.
Continue the approved expansion one topic at a time without stopping after
each batch. After completing a topic, report only "Done: <topic>." and proceed
to the next unfinished topic. Keep the persistent handoff current.

## Content

- Follow the April 17, 2026 exam outline until a documented refresh changes it.
- Research Microsoft primary sources before writing technical claims. Cite
  supporting pages beside the claim and record the verification date.
- Paraphrase explanations; write original questions. Do not copy exam questions.
- Separate Microsoft recommendations, hard service constraints, and examples.
- Every specific topic needs its own Markdown file. Cross-link shared concepts
  rather than duplicating technical explanations across domains.
- Use repository-defined stable objective, topic, question, and option IDs.
- Include implementation, verification, permissions, limitations, and related
  misconceptions. Label examples not executed in Azure.
- Record unresolved or conflicting documentation explicitly. Do not silently
  turn an uncertain claim into a scored question.
- New features in product documentation are not automatically new exam
  objectives. Label supplementary material.

## Questions and app

- Author questions in questions/**/*.json; the format is documented in
  docs/question-format.md. Generated Markdown and app data are not source files.
- Every option needs a rationale, including correct options. A distractor must
  be wrong under the exact scenario, not merely less fashionable.
- Use reviewed variants, never runtime AI rewriting of scored questions.
- Score using stable option IDs, not visible letters or array positions.
- Do not show two variants of the same family in one quiz.
- Use exact-match scoring for multiple-answer questions; explain this in the UI.
- Keep one dependency-free app usable locally and on GitHub Pages, with
  keyboard controls and links that work under the repository's project path.
- In test mode, submit advances immediately, including to results after the
  final answer. In preparation mode, preserve feedback and the Next step.
- Display the topic/module above each question. Session results open incorrect
  responses, collapse correct responses, and show selected answers plus any
  missed correct answers. Preserve full explanations in the bank/preparation.
- Use only free Pages hosting and standard Actions runners for the public
  repository. Do not introduce a paid backend or cross-device account system.
- No Azure deployment, cloud account, model API, or external service is needed
  to use the app. Writing examples is authorized; executing paid Azure labs
  is outside the initial implementation scope.

## Working and verification

- Run npm run build, npm run check, and npm test after relevant changes.
- Automated checks validate structure and behavior; they do not establish
  Azure technical correctness. Review sources separately.
- Update STATUS.md with actual results, remaining work, and the next task.
- Never mark an objective complete based only on a placeholder or empty file.
- Keep study history local to the browser; exported history belongs in the
  ignored progress/ directory if saved in the repository.

## Git

- The user authorized origin to point to
  https://github.com/Frank-Reichenbach/az104-prep.git. Preserve this remote.
- Remote configuration is separate from a push or deployment. Track publishing
  progress in STATUS.md; do not describe a planned Pages address as live.
- Before publication, inspect remote history and repository settings. Preserve
  existing history and use pull requests before merging to the default branch.
- Use chore/, docs/, feature/, or fix/ branch prefixes and Conventional Commits.
- Attribute AI-generated changes with an Assisted-by model trailer. Do not
  invent a human co-author or reviewer.
- main is the default branch and the only Pages deployment branch. Use a
  prefixed work branch and a pull request for future changes; do not push
  directly to main. Merging requires an explicit request or human approval.
- The user authorized Pages publication and the migration to main on
  2026-10-02. Initial publication used feature/github-pages; renaming that
  branch preserved its history without a merge. The local chore/initial-setup
  and docs/github-pages-plan branches are historical setup branches.
- Do not change global Git configuration. Use the existing Git identity; report
  a missing identity rather than inventing one.
