# AZ-104 question style and authoring guide

Verified: 2026-10-02. Exam baseline: skills effective April 17, 2026.
Read this guide before writing or reviewing practice questions in future
sessions. It guides original authorship; it does not authorize importing the
separate research inventory. This is an unofficial guide, not Microsoft's
internal item-writing specification.

## Evidence and its limits

Microsoft's [AZ-104 study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-104)
defines an administrator's implementation, management, and monitoring skills.
The published domain ranges are identities/governance 20–25%, storage 15–20%,
compute 20–25%, networking 15–20%, and monitoring/recovery 10–15%. Use that
outline to control scope. A learning-path module or an older video is not an
independent statement of current exam coverage.

Microsoft says its [Practice Assessments](https://learn.microsoft.com/en-us/credentials/certifications/practice-assessments-for-microsoft-certifications)
illustrate wording, difficulty, and style and are produced by the team that
develops its exams. They are different from live exam questions and do not
represent the complete exam's complexity. Their explanations and source links
are useful review evidence when accessible. This research did not retrieve
the interactive AZ-104 assessment's question set; do not claim otherwise.

The [research inventory](research/official-question-inventory.md) contains
69 paraphrased public training questions from 23 pages, plus 47 technical oral
prompts/themes from five official preparation videos. Training questions are
evidence of Microsoft's teaching style. They are not a representative sample
of live AZ-104 questions. No confidential exam content was used. Microsoft's
[exam security policy](https://learn.microsoft.com/en-us/credentials/support/exam-and-assessment-lab-security-policies)
requires exam content to remain confidential.

In this guide, **documented** means Microsoft states the behavior or format;
**observed** means a public example demonstrates it; **authoring rule** means
a repository recommendation derived from those sources and our app constraints.
Do not present an authoring rule as Microsoft's published requirement.

## Documented formats and exam behavior

Microsoft's [exam experience guidance](https://learn.microsoft.com/en-us/credentials/support/exam-duration-exam-experience)
lists demonstrations of multiple choice, active screen, hot area, drag and
drop, build list, case studies, and labs. The sandbox demonstrates their
interaction. Microsoft does not disclose a particular exam's exact format mix
in advance. Do not promise that AZ-104 always contains, or excludes, any one
of these types.

That guidance describes most certification exams as roughly 40–60 questions,
with variation. The [AZ-104 certification page](https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/)
currently lists 100 minutes and possible interactive components. Treat these
as published preparation information, not a promised question count or lab
configuration. Follow the duration and section instructions shown for the
booked exam.

Microsoft also documents [problem–solution series](https://learn.microsoft.com/en-us/credentials/certifications/posts/understanding-questions-that-you-cannot-review):
the same problem accompanies separate proposed solutions, each judged yes/no.
Several solutions, or none, may work. These series prohibit returning to
earlier items. Evaluate each proposal independently. This older official
explanation establishes the format's purpose, not its prevalence in AZ-104.

The [exam FAQ](https://learn.microsoft.com/en-us/credentials/certifications/frequently-asked-questions)
explains that sections such as case studies and labs cannot be revisited after
leaving them, although most sections offer review before leaving. Instructions
can identify sections without review. Our app's immediate forward movement in
test mode is a user-selected practice behavior, not an emulation of every
official navigation rule.

## Observed patterns in the public examples

Across the 69 collected training questions, 62 offer three alternatives, six
offer four, and one is true/false. All request a single response; no
multiple-answer training item was observed in this corpus. These counts
describe the inspected pages only. They do not estimate exam frequencies.

| Observed pattern | Public Microsoft evidence | Authoring implication |
| --- | --- | --- |
| Short factual distinction | [Entra foundations](https://learn.microsoft.com/en-us/training/modules/understand-azure-active-directory/7-knowledge-check) contrasts directory capabilities and licensing | Use for foundation questions; do not let definitions dominate applied practice |
| One administrative task and a limiting condition | [RBAC overview](https://learn.microsoft.com/en-us/training/modules/secure-azure-resources-with-rbac/3-knowledge-check-rbac-overview) separates resource management from granting access | Put the permission boundary in the scenario |
| Shared business context followed by several decisions | [Azure Files](https://learn.microsoft.com/en-us/training/modules/configure-azure-files-file-sync/8-knowledge-check) introduces distributed offices before feature questions | Preserve relevant context in every independently selected question |
| Configuration interpretation using numbers | [NSG assessment](https://learn.microsoft.com/en-us/training/modules/configure-network-security-groups/8-knowledge-check) compares rule priorities | Supply enough configuration to calculate the outcome |
| Similar components with different jobs | [Application Gateway](https://learn.microsoft.com/en-us/training/modules/intro-to-azure-application-gateway/5-knowledge-check) distinguishes health checks, draining, and protection | Make distractors plausible adjacent features |
| Portal destination or historical versus current information | [RBAC administration](https://learn.microsoft.com/en-us/training/modules/secure-azure-resources-with-rbac/7-knowledge-check-rbac) contrasts access checks and assignment events | Name the required evidence or outcome, not merely a vague tool |
| Resource capacity versus instance count | [VM scaling](https://learn.microsoft.com/en-us/training/modules/configure-virtual-machine-availability/11-knowledge-check) distinguishes scheduling and scaling directions | State whether the goal changes instance size, count, or timing |
| Missing code/template completion | The [compute prep video](https://learn.microsoft.com/en-us/shows/exam-readiness-zone/preparing-for-az-104-deploy-and-manage-azure-compute-resources-3-of-5), around 01:39, describes selecting a missing template line | Write new configuration-completion scenarios using current syntax |

The videos also emphasize choosing between nearby administrative solutions:
[storage](https://learn.microsoft.com/en-us/shows/exam-readiness-zone/preparing-for-az-104-implement-and-manage-storage-2-of-5)
compares access mechanisms and redundancy;
[networking](https://learn.microsoft.com/en-us/shows/exam-readiness-zone/preparing-for-az-104-implement-and-manage-virtual-networking-4-of-5)
compares endpoint and connectivity choices;
[monitoring/recovery](https://learn.microsoft.com/en-us/shows/exam-readiness-zone/preparing-for-az-104-monitor-and-maintain-azure-resources-5-of-5)
contrasts monitoring signals, backup, and replication. These are older teaching
examples. Their forecast language does not establish the current exam's item
distribution or validate every technical claim in their narration.

## Authoring rule: write a decision with enough context

For applied and troubleshooting questions, build the stem in this order:

1. **Environment.** Identify the Azure service, resource scope, relevant
   region/tenant/subscription boundaries, and any important SKU or protocol.
2. **Existing state.** Describe what is deployed, configured, permitted, or
   observed. Use consistent neutral names such as vm-app and vnet-hub.
3. **Goal.** State the required result in terms the administrator can verify.
4. **Constraints.** Include every restriction that distinguishes the answer:
   least privilege, permitted downtime, cost, network exposure, available
   features, retention, or an existing dependency.
5. **Decision.** Ask for one action, configuration, outcome, diagnostic tool,
   or explicitly counted set of actions.

Keep a direct foundation stem short. Give a longer applied scenario only the
facts needed for its decision. A case with named resources should make their
relationships explicit. Avoid adding a company story that contributes no
constraint. Difficulty should come from reasoning about Azure, not reading
around missing assumptions.

Use an administrative viewpoint and familiar terminology. Distinguish
recommendations from requirements: ask what Microsoft recommends only when
the source actually recommends it. For a least-cost question, define the
required durability/performance first. For least privilege, state the allowed
operations and the smallest relevant scope. For a minimum-SKU question, name
the required feature and verify current limits.

When asking for a first or next step, include the work already completed.
When asking whether a proposed solution meets a goal, evaluate only that
solution. Do not assume another question's alternative must be true or false.
For numeric questions, state the units, threshold comparison, time zone, and
measurement window when they affect the result.

Keep the visible module context above every question, as the project requires.
Its wording should orient the learner without revealing the selected feature.
A question choosing between services may need broader task context than a
label that already names the correct service. Record any required metadata/UI
change separately; this guide does not change the current app.

## Authoring rule: make alternatives comparable

Use alternatives of the same kind: four role-and-scope assignments, four
configuration changes, or four diagnostic tools. Keep their grammar and level
of detail similar. Avoid mixing an umbrella feature with one of its specific
implementations when both can satisfy the question.

Every distractor should represent a related misconception: wrong permission
scope, unsuitable SKU, reversed rule priority, incorrect traffic direction,
missing prerequisite, mistaken synchronization behavior, or the wrong
management/data plane. State the exact fact that disqualifies it in its
explanation. A generally valid Azure action can still be wrong because it
violates the scenario; explain that constraint.

Do not use unrelated joke answers, obviously insecure alternatives as the
default distractor pattern, grammatical clues, an unusually detailed correct
choice, or absolute wording that makes elimination trivial. Do not use
all-of-the-above, letter references, or dependent alternatives. Option order
will be shuffled.

For multiple answers, state the exact selection count. Ensure the question
tests the required set and clarify whether actions are jointly required or
independently sufficient. Verify that no additional offered choice can also
meet the stated goal. Review every scenario variant independently.

## Adaptation to this repository's current app

The app supports single-answer and fixed-count multiple-answer questions with
at least four options. That is a repository format constraint, not an observed
universal Microsoft rule. The public three-option and true/false items must
remain research records until an original adaptation is requested. Do not pad
a binary question with bogus answers to satisfy the schema.

| Public format or pattern | Permitted future multiple-choice adaptation | Current limitation |
| --- | --- | --- |
| Single choice | New scenario with four independently reviewed alternatives | Source three-option items cannot be imported unchanged |
| Select several responses | Explicit select count and a defensible answer set | Exact-match local scoring |
| Active screen or hot area | Text description of controls and offered configurations | No clickable exhibit or dropdown interaction |
| Drag and drop | Choose a complete mapping that satisfies all requirements | No native drag targets |
| Build list | Choose a complete ordered sequence | No native sequence editor |
| Code completion | Show sufficient context and offer alternative completions | Plain-text prompt; no interactive code blanks |
| Case study | Repeat necessary case facts in each self-contained scenario | No shared case viewer or case-level navigation |
| Problem–solution yes/no series | Preserve as a format reference pending explicit feature work | Two-option sets and native series semantics unsupported |
| Lab | Use a documentation-backed administrative scenario | No live Azure execution or lab scoring |

These adaptations are authoring recommendations, not implemented features or
newly authorized app work. Existing family selection also prevents two variants
from appearing together; do not silently reinterpret a family as an exam series.

## Scoring and explanations

Microsoft's [Practice Assessment FAQ](https://learn.microsoft.com/en-us/credentials/certifications/frequently-asked-questions#practice-assessments-frequently-asked-questions)
describes exact-match scoring for select-n practice items and explicitly
distinguishes it from certification-exam scoring. Our app also uses exact
match: all correct options and no wrong options. Do not claim that every live
multi-answer question follows this rule.

Microsoft's [scoring guidance](https://learn.microsoft.com/en-us/credentials/certifications/exam-scoring-reports)
describes component credit for most multipart questions, possible unscored
items, and scaled technical-exam scores. A passing scaled score of 700 does
not mean 70% correct. Keep this app's practice percentages separate from
official scores or exam-readiness predictions.

Write explanations for all options, including the correct ones. Use the
sequence: conclusion, decisive scenario fact, service behavior, supporting
Microsoft source. Clarify what different requirement would make a distractor
appropriate where useful. Explanations belong in preparation feedback and the
answer bank, not in the unanswered test stem. Preserve the current compact
session-result behavior.

## Technical review and independence

Public Microsoft teaching examples can still be dated or underspecified. The
inventory flags region-pair replication generalizations, unnamed inherited
settings, policy scopes, slot-setting stickiness, default NSG rules, and
changing backup terminology. Respect those flags before later reuse.

Current [region-pair documentation](https://learn.microsoft.com/en-us/azure/reliability/regions-paired)
says deploying to a paired region does not itself provide automatic disaster
recovery. Current [Policy documentation](https://learn.microsoft.com/en-us/azure/governance/policy/overview)
also permits assignments at individual-resource scope. These specific examples
show why a public assessment's phrasing cannot substitute for service review.

Author from a technical learning objective and current documentation. Use a
new environment, constraints, decision, and distractor set rather than changing
names in a published stem. Retain a source's style pattern without cloning its
question. Do not import leaked, remembered, or third-party purported live-exam
items. Do not label an original question as official.

Before accepting a new question, verify:

- The scenario fits the current outline; supplementary material is labeled.
- Service, tenant, subscription, region, SKU, protocol, and permission
  assumptions are explicit wherever they alter the answer.
- Exactly the declared answer set satisfies the stated requirements.
- Every wrong choice fails a specific requirement or documented behavior.
- Each source supports the claimed behavior; verification date is recorded.
- Ambiguous or conflicting claims remain unscored until resolved.
- Names, units, code, and resource relationships are internally consistent.
- The question is understandable outside a shared lesson or previous item.
- No option text depends on visible letters or an option's array position.
- The module label provides context without supplying the answer.
- Explanations teach the distinction and cite Microsoft beside the claim.
- Variants preserve stable IDs and receive their own technical review.

## Future-session procedure

Read this guide together with the repository's question format and research
conventions before authoring. Recheck source currency when the official outline,
service capabilities, or terminology changes. Follow the April 17, 2026
baseline until a documented refresh replaces it.

The research inventory remains unmapped and unscored. A later request to review,
update, or add questions is a separate task. Only then create original bank
entries using the established schema, identifiers, rationales, sources, and
verification workflow. This research does not revise existing questions.
