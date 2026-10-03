# Question-authoring acceptance cases

These are original workflow fixtures, not scored bank entries or collected
Microsoft questions. Resource names and configurations are fictional.
Evidence for Azure facts was checked on 2026-10-03 during the functional review.

Use the relevant cases when changing this skill. For a model-driven evaluation,
provide its prompt and necessary repository/source material; retain expected
behavior for the evaluator. Record actual outputs separately. A manual
walkthrough or schema check is not an independent model evaluation.

## C1 — Jointly required actions (F1)

**Prompt:** Draft a select-two question for a web VM with subnet and NIC NSGs.
Each has a matching inbound TCP 443 deny at priority 200; neither has an earlier
matching rule. Both NSGs and denies must remain. No other control blocks new
matching connections. Offer matching allows at priority 100 or 300 in each NSG.
Which two additions together permit those connections?

**Expected:** Key subnet-100 and NIC-100. Neither action alone suffices. Explain
each component's contribution and reject both priority-300 choices. Verify
that no other pair satisfies the goal. Do not reject correct components for
failing to achieve the whole goal individually.
Sources: [traffic processing](https://learn.microsoft.com/en-us/azure/virtual-network/network-security-group-how-it-works),
[rule priorities](https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview).

## C2 — Individual assertions (F1)

**Prompt:** Draft a select-two foundation question about lifecycle prefix filters.
Offer assertions that prefixes include the container, matching is case-sensitive,
wildcards are supported, or container names are omitted.

**Expected:** Key the first two assertions. Verify truth independently rather
than requiring either fact to achieve an end-to-end administrative goal.
Explain each false assertion using the documented filter behavior.
Source: [prefix filters](https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-policy-structure).

## C3 — Batch patterns and difficulty (F2)

**Prompt:** Plan six lifecycle-management questions for an experienced beginner:
one foundation, three applied, and two troubleshooting. Include a numeric
configuration interpretation and avoid six versions of the same decision.

**Expected:** Produce a compact per-item plan with objective, decision, pattern,
difficulty/reasoning, decisive facts, answer structure, and misconceptions.
Use supported patterns suited to the topic. Keep recall as foundation and
distinguish diagnosis from configuration choice. Review batch repetition.
The requested counts are fixture preferences, not official exam proportions.

## C4 — Answer-bearing topic title (F3)

**Prompt:** Review a feature-selection draft whose intended key is Private
Endpoint. It will appear under the existing title "Private endpoints, approval,
and DNS" from exam/topics.json. The draft asks which feature to choose.

**Expected:** Identify the label clue. Propose a within-service decision when
that preserves the requested objective; otherwise flag a need for separate
context work. Review mode proposes rather than edits. Do not invent a display
field or silently rename the shared topic. Inspect the actual title and renderer.

## C5 — Decisive-fact variants (F4)

**Prompt:** Draft two reviewed variants of a current-blob age-condition
interpretation. Both use daysAfterModificationGreaterThan = 45, all other
eligibility conditions are satisfied, and tiering is supported. Last modification
was 60 days ago in one and 20 days ago in the other. Ask whether the configured
age condition is met, with four comparable outcome-and-reason choices.

**Expected:** The first meets the condition; the second does not. Preserve the
assessed principle and decision in one topic/family, but give unique question IDs.
Derive each key and recheck all choices/rationales. Do not guarantee immediate
tiering. Record changed decisive facts; do not rely on shuffled letters.
Source: [time conditions](https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-policy-structure).

## C6 — Structurally valid wrong key

**Prompt:** Review a lifecycle prefixMatch question targeting Exports/ inside
audit-data. Choices are audit-data/Exports/, Exports/, audit-data/exports/, and
audit-data/. Its key incorrectly selects Exports/. Assume schema checks pass.

**Expected:** Reject the key using source evidence: the exact scoped prefix is
audit-data/Exports/. Explain each alternative's defect; do not accept a green
schema check as technical validation.
Source: [prefix filters](https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-policy-structure).

## C7 — Short foundation and complete candidates (F2, F1)

**Prompt:** Draft a foundation question asking which timestamp is evaluated by
daysAfterModificationGreaterThan for a current blob. Offer last modification,
last read, container creation, and storage-account creation.

**Expected:** Keep the stem short and classify it as foundation. Key last
modification, explain each choice, and evaluate each offered timestamp as a
complete candidate answer. Do not add irrelevant business context to relabel
recall as applied.
Source: [time conditions](https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-policy-structure).
