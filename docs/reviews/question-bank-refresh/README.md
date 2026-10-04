# Live question-bank refresh

Started: 2026-10-03. User authorized reviewing and updating the existing live
bank with the question-authoring skill, with persistent checkpoints across
sessions. Baseline: main `b6c2f67`, 322 questions, 311 families, 99 topics.
Work branch: `fix/question-bank-style-refresh`.

[progress.json](progress.json) records every topic and question ID, its source
file, baseline revision/content hash, review decision, and reviewed hash.
Topic reports record the decision/pattern/difficulty, defects and repairs,
source verification, option rationale evidence, variants, and acceptance.
The baseline captures the live source bank; no collected research questions
are imported or mapped during this task.

## Resume without repeating completed reviews

1. Read root AGENTS.md, PLAN.md, STATUS.md, the question-authoring skill, and
   [the style guide](../../az-104-question-style.md). Check the current branch
   and Git status before editing. Preserve any unfinished changes.
2. Run `npm run review:status`. It checks that reviewed questions still match
   their recorded hashes and prints the first unfinished topic. A stale hash
   requires rechecking that question; unchanged completed topics stay complete.
3. Read only that topic's knowledge, questions, family variants, and source
   pages. Use the ledger's recorded file paths. Record in-progress work before
   making changes; finish or recover it before starting a second topic.
4. Review the rendered topic label and every answer option against the exact
   scenario. Keep sound items. For necessary changes preserve IDs and families,
   increase revision, and record a specific reason. Recheck Microsoft primary
   sources, including claims in wrong-option explanations.
5. Write the topic report, record each result and final hash, rebuild, and run
   build/check/tests plus `npm run review:status`. Mark the topic complete only
   after technical review and these checks. Commit the topic, generated output,
   ledger, and STATUS.md together. Push the checkpoint branch when available.
6. Report `Done: <topic>.` and continue to the next unfinished topic. An
   interrupted topic stays in-progress; its report must say what remains.

The hash check validates checkpoint consistency, not Azure correctness. Source
claims still need human/agent review. Retained questions may receive a new
verification date without a revision change; substantive edits require one.
Use author-led review evidence; do not describe it as independent evaluation.

## Publication

Source edits and generated files are available locally on the work branch.
GitHub Pages deploys main only. Open/update a pull request with completed
topic counts and outstanding work; merging requires explicit approval for
that PR. User approval of the earlier skill PR does not authorize merging
this refresh. Record merged/deployed checkpoints separately from review status.

Default order starts with the two topics flagged by the sample review,
then follows exam/topics.json for the remaining topics. Do not restart from
question one when changing sessions or when publishing a partial checkpoint.
