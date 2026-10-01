# Research and maintenance

Research each objective using Microsoft primary sources. The exam guide sets
scope; service documentation establishes behavior. A training module or lab
can provide context, but check implementation details against current service
and command references.

## Topic workflow

1. Select a planned objective from exam/objectives.json.
2. Identify concrete tasks and concepts; split broad objectives where needed.
3. Read the relevant Microsoft pages, including limitations and prerequisites.
4. Write original explanations using templates/topic.md.
5. Put source links beside the claims they support; set the verification date.
6. Write 3–5 questions per detailed topic, citing the applicable sources.
7. Review each incorrect option against the exact scenario. It must have a
   reason to be wrong under those requirements.
8. Build, validate, and update coverage and STATUS.md.

Use only verified facts in scored questions. If sources conflict, record the
conflict in the topic file and exclude the disputed point until resolved.
Distinguish recommendations from requirements, and examples from universal
rules. Avoid absolute claims when availability depends on account type,
region, service tier, redundancy, licensing, or feature state.

## Dates and maintenance

Record the date a source was actually checked, not merely the date a file was
edited. Use the user's timezone (Europe/Berlin) for session dates. A technical
change requires reviewing the associated questions and increasing their
revision if the answer or explanation changes. Recheck the exam outline at
the start of a new content phase and before final exam review.

Sources can add features outside the current outline. Mark those as
supplementary; do not quietly expand the claimed official scope.

## Verification levels

- **Planned:** objective inventoried; detailed research is outstanding.
- **Documented:** knowledge file and question bank exist, sources checked,
  and automated validation is satisfied. This is not a claim of lab execution.
- **Lab-verified:** specific documented steps were executed successfully in
  Azure; record date, environment assumptions, result, and cleanup.

The initial sample uses the documented level. No live Azure changes are
required to build or run this repository.
