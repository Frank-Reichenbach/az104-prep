# Quiz selection

Verified against the app behavior: October 2, 2026.

## Mixed sessions

Microsoft publishes domain ranges, rather than an exact question count per
domain. The app takes each range's midpoint, normalizes the five values to
100%, and assigns whole questions to the largest remaining gap from those
targets. See the [official study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-104)
and [local objective inventory](../exam/objectives.json).

| Domain | Published range | Approximate app share |
| --- | --- | --- |
| Identity/governance | 20–25% | 24.3% |
| Storage | 15–20% | 18.9% |
| Compute | 20–25% | 24.3% |
| Networking | 15–20% | 18.9% |
| Monitoring/recovery | 10–15% | 13.5% |

This is a local practice design, not Microsoft's exam-selection algorithm.
Short sessions require rounding and cannot reproduce all domain shares exactly.
If a domain has too few available families, the remaining slots are filled from
other available domains. Missed-family review can therefore differ substantially
from the unrestricted mix. Empty review selections remain empty.

## Families and variants

The app first applies the topic/missed filters and chooses one independently
authored variant per family. Domain allocation counts those families, rather
than giving a family extra slots because it has several variants. Questions and
options are then shuffled. The original bank is unchanged.

Reviewed variants can change the scenario and correct answer. For example,
a configuration freeze needs a ReadOnly lock, while deletion-only protection
allows CanNotDelete. The shared family keeps related scenarios out of the same
quiz. No AI rewrites scored questions at runtime.

**All topics · random selection** samples available families without domain
weighting. Selecting one detailed topic limits the session to its families.
All modes use stable option IDs and exact-match multiple-answer scoring.

## Interpretation

Session percentages measure answers to original repository questions. They do
not predict a scaled Microsoft exam score or establish hands-on readiness.
Use [coverage](../exam/coverage.md) and the linked guides to review gaps, and
refresh sources before the planned exam window.
