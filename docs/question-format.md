# Question format

Each questions/**/*.json file is an object with schemaVersion: 1 and a
questions array. See questions/storage/blob-storage.json for examples.

## Required question fields

| Field | Meaning |
| --- | --- |
| id | Globally unique stable identifier |
| family | Concept/scenario family; only one member per quiz |
| revision | Positive integer; increase when scoring or meaning changes |
| topic | Topic ID defined in exam/topics.json |
| objectives | Nonempty list of IDs from exam/objectives.json |
| difficulty | foundation, applied, or troubleshooting |
| prompt | Complete self-contained scenario and question |
| select | Exact number of correct options to select |
| options | At least four objects containing id, text, explanation |
| correct | Unique option IDs; exactly select entries |
| knowledge | Repository-relative path to the detailed Markdown topic |
| sources | Nonempty list of supporting Microsoft HTTPS URLs |
| verified | ISO date on which the technical evidence was checked |

Option IDs are stable within a question and independent of display order.
The UI generates letters after shuffling. Never refer to option letters,
"the above", or "all of the above" in question text or explanations.

## Variants and scoring

A scenario variant is another full question sharing a family value and topic.
Its answer and all distractors are reviewed independently. The app chooses
at most one question per family, then shuffles options. This avoids teaching
the answer to another variant in the same test. New scenarios do not need to
share a family merely because they belong to the same topic.

Multiple-answer questions use exact-match scoring: every correct option and
no incorrect option must be selected. The app blocks submission until exactly
the requested number is selected. No partial credit is awarded.

History stores question ID, revision, selected IDs, and timestamp. Imports are
validated and scores are recalculated against the current bank. Unknown or
changed question revisions are omitted, so old answers cannot silently be
graded against a changed question. History is for self-study, not proof of
exam readiness.
