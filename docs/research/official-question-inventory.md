# Microsoft AZ-104 public question research inventory

Research date: 2026-10-02. Status: preserved for later review only.

This file records public Microsoft learning questions in paraphrase, with
source locations and the alternatives needed to revisit them. They are
training examples, not questions obtained from a live certification exam.
It contains no mappings to this repository's question, family, topic, or
objective IDs. Nothing here is included in the quiz or generated question bank.

## Scope and method

Followed the five current Microsoft AZ-104 learning paths, inspected their
26 module pages, and followed their publicly readable knowledge checks.
Also inspected a relevant Log Analytics module. The inventory contains all
69 questions observed on 23 readable question pages. This is a bounded source
survey, not a claim to have collected every Microsoft practice question.

| Learning path or additional source | Question pages | Questions |
| --- | ---: | ---: |
| [Identities and governance](https://learn.microsoft.com/en-us/training/paths/az-104-manage-identities-governance/) | 6 | 20 |
| [Storage](https://learn.microsoft.com/en-us/training/paths/az-104-manage-storage/) | 4 | 12 |
| [Compute](https://learn.microsoft.com/en-us/training/paths/az-104-manage-compute-resources/) | 5 | 14 |
| [Networking](https://learn.microsoft.com/en-us/training/paths/az-104-manage-virtual-networks/) | 6 | 17 |
| [Monitoring and backup](https://learn.microsoft.com/en-us/training/paths/az-104-monitor-backup-resources/) | 1 | 3 |
| Additional Log Analytics module | 1 | 3 |
| Total | 23 | 69 |

Each OBS identifier belongs only to this research inventory. The source item
number locates the published question; it is not a stable Microsoft question
ID. Every entry below needs technical review. Answer feedback was not extracted,
so alternatives are deliberately not marked correct or incorrect. Their order
does not encode a proposed answer. Short paraphrases preserve the decision,
not Microsoft's complete wording. Open the cited page for the original.

Microsoft's [Practice Assessment documentation](https://learn.microsoft.com/en-us/credentials/certifications/practice-assessments-for-microsoft-certifications)
describes a closer exam-style resource, authored by its exam-development team.
Microsoft says those samples differ from live exam items and do not represent
the full exam's complexity. The [AZ-104 Practice Assessment](https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/practice/assessment?assessment-type=practice&assessmentId=21&practice-assessment-type=certification)
returned no readable questions in the research browser tool. Microsoft's
[FAQ](https://learn.microsoft.com/en-us/credentials/certifications/frequently-asked-questions#practice-assessments-frequently-asked-questions)
documents Learn-profile sign-in. An additional disposable-browser check was
blocked by the local shell wrapper's path matcher because the URL contains
credentials. No bypass or account sign-in was attempted. No assessment items
are claimed as collected from that resource.

The [official exam sandbox](https://mscertdemo.starttest.com/) opened its
candidate-agreement screen in a disposable browser. No technical question
content was captured from that screen. Its generic interface examples are not
an AZ-104 question bank. Exam-format evidence is recorded in the separate
[question-style guide](../az-104-question-style.md).

## Identities and governance

### O01: Entra ID foundations — 2 questions

Source: [Module assessment](https://learn.microsoft.com/en-us/training/modules/understand-azure-active-directory/7-knowledge-check).
Observed: 2026-10-02. Each item requests one answer from three alternatives.

| Research ID | Item | Paraphrased question | Alternative concepts |
| --- | ---: | --- | --- |
| OBS-001 | 1 | Which characteristic distinguishes Entra ID from traditional AD? | Kerberos-based application access; cloud identity service; LDAP querying |
| OBS-002 | 2 | Which minimum premium license supports risk-based sign-in decisions? | Office productivity subscription; Entra P2; Entra P1 |

### O02: Identity management — 3 questions

Source: [Module assessment](https://learn.microsoft.com/en-us/training/modules/create-configure-manage-identities/13-knowledge-check).
Observed: 2026-10-02. One answer from three alternatives per item.

| Research ID | Item | Paraphrased question | Alternative concepts |
| --- | ---: | --- | --- |
| OBS-003 | 1 | Besides cloud and guest accounts, what identity category does Entra ID support? | Disconnected accounts; transitional accounts; directory-synchronized accounts |
| OBS-004 | 2 | What typical delay follows a membership change affecting group-assigned licenses? | Domain-controller refresh interval; several minutes; one day |
| OBS-005 | 3 | What group category complements security groups? | Distribution-only groups; license-specific groups; Microsoft 365 collaboration groups |

Review OBS-004 as a typical processing expectation, not a guaranteed deadline.

### O03: Azure architecture foundations — 3 questions

Source: [Module assessment](https://learn.microsoft.com/en-us/training/modules/describe-core-architectural-components-of-azure/8-knowledge-check).
Observed: 2026-10-02. One answer from three alternatives per item. Found in
the AZ-104 path, but these are foundation-level examples.

| Research ID | Item | Paraphrased question | Alternative concepts |
| --- | ---: | --- | --- |
| OBS-006 | 1 | How many resource groups can contain one Azure resource simultaneously? | One; two; three |
| OBS-007 | 2 | Does a resource-group setting affect existing resources, later resources, or both? | Existing only; later only; both generations |
| OBS-008 | 3 | Which regional concept is associated with replication and a minimum 300-mile separation? | Paired regions; availability zones; sovereign regions |

Hold OBS-007: the setting must be named; not every property inherits identically.
Hold OBS-008: current [region-pair guidance](https://learn.microsoft.com/en-us/azure/reliability/regions-paired)
explicitly rejects automatic resiliency from placement in a paired region.
Do not convert the source's broad replication wording into a universal rule.

### O04: Azure Policy initiatives — 5 questions

Source: [Check your knowledge](https://learn.microsoft.com/en-us/training/modules/sovereignty-policy-initiatives/check).
Observed: 2026-10-02. One answer per item; alternatives: 4, 4, 3, 3, 4.

| Research ID | Item | Paraphrased question | Alternative concepts |
| --- | ---: | --- | --- |
| OBS-009 | 1 | What governance purpose does Azure Policy serve? | Manual per-resource configuration; compliance and standards; network routing; encryption alone |
| OBS-010 | 2 | Which rollout sequence reduces policy deployment risk? | Disabled enforcement then rings; enabled then rings; disabled then parallel; enabled then parallel |
| OBS-011 | 3 | What does policy enforcement mode control? | Whether evaluation happens; Activity Log entries; testing outcomes without applying effects |
| OBS-012 | 4 | What management responsibility belongs to Azure Resource Manager? | Resource deployment and changes; billing/scale unit; scope above subscriptions |
| OBS-013 | 5 | Which combinations of management-group, subscription, and resource-group scopes support assignments? | Management group only; management group plus subscription; all three; subscription plus resource group |

Hold OBS-013: its alternatives omit individual resources, which current
[Policy documentation](https://learn.microsoft.com/en-us/azure/governance/policy/overview)
also lists as assignment scopes. Rewrite the question's scope before reuse.

### O05: RBAC concepts — 3 questions

Source: [RBAC overview knowledge check](https://learn.microsoft.com/en-us/training/modules/secure-azure-resources-with-rbac/3-knowledge-check-rbac-overview).
Observed: 2026-10-02. One answer per item; alternatives: 3, 4, 4.

| Research ID | Item | Paraphrased question | Alternative concepts |
| --- | ---: | --- | --- |
| OBS-014 | 1 | What does an Azure role definition represent? | Named permissions; principal collection; principal-role binding at a scope |
| OBS-015 | 2 | Which built-in role permits resource management while withholding access delegation? | Ownership; contribution; read-only access; access administration |
| OBS-016 | 3 | What hierarchy governs inherited Azure permissions? | Four proposed orders of management group, subscription, resource group, and resource |

### O06: RBAC administration — 4 questions

Source: [Module assessment](https://learn.microsoft.com/en-us/training/modules/secure-azure-resources-with-rbac/7-knowledge-check-rbac).
Observed: 2026-10-02. One answer from three alternatives per item.

| Research ID | Item | Paraphrased question | Alternative concepts |
| --- | ---: | --- | --- |
| OBS-017 | 1 | Where should an administrator diagnose a colleague's missing resource-group access? | Colleague's profile permissions; group-level IAM access check; one resource's assignments |
| OBS-018 | 2 | How should another department receive access restricted to one VM? | Create a resource-scoped role; assign at resource-group scope; assign at VM scope |
| OBS-019 | 3 | Which scope satisfies least privilege when a developer needs an entire resource group? | Individual resource; resource group; subscription |
| OBS-020 | 4 | Where can an administrator investigate role assignments created during the preceding week? | Activity Log filtered by assignment creation; assignment download; current assignment list |

Review OBS-018's distinction between defining a role and assigning it.
Review OBS-020's distinction between historical events and current state.

## Storage

### O07: Storage accounts — 3 questions

Source: [Module assessment](https://learn.microsoft.com/en-us/training/modules/configure-storage-accounts/8-knowledge-check).
Observed: 2026-10-02. One answer from three alternatives per item.
Shared context: diverse organizational data; sensor readings lose usefulness
quickly; the manufacturing requirement prioritizes low cost.

| Research ID | Item | Paraphrased question | Alternative concepts |
| --- | ---: | --- | --- |
| OBS-021 | 1 | Which offered redundancy option keeps six copies spanning two regions? | Local redundancy; readable geo-redundancy; zone redundancy |
| OBS-022 | 2 | At what scope must a storage-account name be unique? | Resource group; subscription; global namespace |
| OBS-023 | 3 | Which offered redundancy choice minimizes storage cost for short-lived sensor data? | Local; geographic; zonal redundancy |

Review OBS-021 against its offered alternatives: do not imply that only one
Azure redundancy design can span regions with six copies.

### O08: Blob Storage — 3 questions

Source: [Module assessment](https://learn.microsoft.com/en-us/training/modules/configure-blob-storage/10-knowledge-check).
Observed: 2026-10-02. One answer from three alternatives per item.
Shared context: a heavily accessed video library and cost/performance choices.

| Research ID | Item | Paraphrased question | Alternative concepts |
| --- | ---: | --- | --- |
| OBS-024 | 1 | Which description of hot and cool blob tiers is accurate? | Cool for frequent reads; hot for infrequent reads; switching between online tiers |
| OBS-025 | 2 | Which proposed tier transition avoids archive rehydration? | Hot to cool; archive to cool; archive to hot |
| OBS-026 | 3 | Which statement captures a blob object-replication limitation? | Versioning unnecessary; snapshots unsupported; archived objects supported |

Review the source's use of performance-tier terminology and the distinction
between an immediate tier change and asynchronous lifecycle-policy execution.

### O09: Storage security — 3 questions

Source: [Module assessment](https://learn.microsoft.com/en-us/training/modules/configure-storage-security/9-knowledge-check).
Observed: 2026-10-02. One answer from three alternatives per item.

| Research ID | Item | Paraphrased question | Alternative concepts |
| --- | ---: | --- | --- |
| OBS-027 | 1 | How should storage account keys be managed and rotated? | Vault-managed keys; shared plaintext; embedded application secrets |
| OBS-028 | 2 | Which offered data-access approach follows the module's security recommendation? | Entra identity or delegated signature; Shared Key; production connection strings everywhere |
| OBS-029 | 3 | How can image access be read-only and expire after a short interval? | Account-wide keys; transport encryption; constrained access signature |

Review authorization recommendations by service and SAS type before reuse.
Do not mistake transport protection for permission delegation.

### O10: Azure Files and File Sync — 3 questions

Source: [Knowledge check](https://learn.microsoft.com/en-us/training/modules/configure-azure-files-file-sync/8-knowledge-check).
Observed: 2026-10-02. One answer from three alternatives per item.
Shared context: geographically distributed offices, warehouse stock data,
limited bandwidth, and a proposed File Sync deployment.

| Research ID | Item | Paraphrased question | Alternative concepts |
| --- | ---: | --- | --- |
| OBS-030 | 1 | What does File Sync cloud tiering do? | Prioritize sync order; schedule sync frequency; reduce local footprint of cold files |
| OBS-031 | 2 | Which Azure Files soft-delete statement is accurate? | Fixed fourteen-day retention; applicability to new/existing shares; NFS-only protection |
| OBS-032 | 3 | Which description of a file-share snapshot is accurate? | Read-only time-specific copy; individual-file recovery unavailable; account-level snapshot scope |

Review the soft-delete configuration scope, protocol support, and retention.
Do not infer that cloud tiering eliminates WAN usage for uncached reads.

## Compute

### O11: Virtual machine foundations — 2 questions

Source: [Module assessment](https://learn.microsoft.com/en-us/training/modules/intro-to-azure-virtual-machines/7-knowledge-check).
Observed: 2026-10-02. Item 1 has four alternatives; item 2 is true/false.

| Research ID | Item | Paraphrased question | Alternative concepts |
| --- | ---: | --- | --- |
| OBS-033 | 1 | Which VM workload category is suggested for a network appliance? | Balanced; compute-heavy; memory-heavy; storage-heavy |
| OBS-034 | 2 | Is JSON the representation used for ARM templates? | Affirmative; negative |

Review appliance workload assumptions. OBS-034 concerns ARM JSON templates;
do not broaden it to exclude Bicep authoring.

### O12: VM availability and scaling — 3 questions

Source: [Module assessment](https://learn.microsoft.com/en-us/training/modules/configure-virtual-machine-availability/11-knowledge-check).
Observed: 2026-10-02. One answer from three alternatives per item.

| Research ID | Item | Paraphrased question | Alternative concepts |
| --- | ---: | --- | --- |
| OBS-035 | 1 | A five-instance scale set stays saturated. What enables automatic expansion at a CPU threshold? | Manual instance addition; lower threshold; enable autoscaling |
| OBS-036 | 2 | How should extra scale-set capacity precede a predictable Thursday-evening workload? | Scheduled rules; general autoscaling feature; reactive metric rules |
| OBS-037 | 3 | Which scaling direction increases CPU capacity per existing instance? | Horizontal; vertical; distribute traffic |

Review OBS-035: specify whether a valid rule already exists, the instance
ceiling, and the evaluation interval. OBS-036 mixes a feature with rule types;
rebuild alternatives at the same level before authoring a scored version.

### O13: App Service plans — 3 questions

Source: [Module assessment](https://learn.microsoft.com/en-us/training/modules/configure-app-service-plans/6-knowledge-check).
Observed: 2026-10-02. One answer from three alternatives per item.

| Research ID | Item | Paraphrased question | Alternative concepts |
| --- | ---: | --- | --- |
| OBS-038 | 1 | How can an App Service deployment gain resources per worker without adding workers? | Upgrade worker capacity; add workers; scale back |
| OBS-039 | 2 | Which offered plan tier supports ten staging slots? | Basic B1; Standard S1; Premium v3 P1v3 |
| OBS-040 | 3 | What rule category matches an action every Saturday at 08:00? | Metric trigger; scheduled trigger; application-insight trigger |

Recheck SKU limits, production-slot counting, time zone, and clock behavior.

### O14: App Service operations — 3 questions

Source: [Module assessment](https://learn.microsoft.com/en-us/training/modules/configure-azure-app-services/12-knowledge-check).
Observed: 2026-10-02. One answer from three alternatives per item.

| Research ID | Item | Paraphrased question | Alternative concepts |
| --- | ---: | --- | --- |
| OBS-041 | 1 | Which offered slot configuration can move with content during a swap? | Domain binding; database connection setting; scale configuration |
| OBS-042 | 2 | Which service answers website-popularity, usage-time, and visitor-location questions? | Deployment automation; application logs; application telemetry service |
| OBS-043 | 3 | Which offered platform can supply automated web-app deployments? | GitHub repository; JavaScript language; SharePoint site |

Hold OBS-041 until slot-sticky settings and defaults are explicit. A connection
setting's swap behavior depends on configuration, not merely its name.

### O15: Container Instances and Container Apps — 3 questions

Source: [Module assessment](https://learn.microsoft.com/en-us/training/modules/configure-azure-container-instances/7-knowledge-check).
Observed: 2026-10-02. One answer from three alternatives per item.

| Research ID | Item | Paraphrased question | Alternative concepts |
| --- | ---: | --- | --- |
| OBS-044 | 1 | Which offered isolation property motivates VMs rather than containers? | Minimal user-mode OS; host/guest VM isolation; single-node Azure Disk use |
| OBS-045 | 2 | Which offered statement describes an ACI characteristic? | Slow startup required; Blob-backed state mechanism; billing during container use |
| OBS-046 | 3 | Which offered solution simplifies container deployment and orchestration? | Container Apps; container grouping; Container Instances |

Review the source's deployment-context wording, isolation modes, billing
lifecycle, and persistence choices. Avoid an unconditional VM/container claim.

## Networking

### O16: Virtual networks — 2 questions

Source: [Module assessment](https://learn.microsoft.com/en-us/training/modules/configure-virtual-networks/10-knowledge-check).
Observed: 2026-10-02. One answer from three alternatives per item.

| Research ID | Item | Paraphrased question | Alternative concepts |
| --- | ---: | --- | --- |
| OBS-047 | 1 | Which proposed VNet capability is accurate? | Exactly one subnet; no hybrid connectivity; communication between Azure resources |
| OBS-048 | 2 | Which offered VM access scenario calls for public addressing? | Direct internet access; internal load-balancer use; production status alone |

Hold OBS-048 until direct internet access and the intended public-facing
resource are explicit. Production status alone does not determine IP exposure.

### O17: Network security groups — 3 questions

Source: [Module assessment](https://learn.microsoft.com/en-us/training/modules/configure-network-security-groups/8-knowledge-check).
Observed: 2026-10-02. One answer from three alternatives per item.

| Research ID | Item | Paraphrased question | Alternative concepts |
| --- | ---: | --- | --- |
| OBS-049 | 1 | Matching inbound rules allow at priority 200 and deny at 150. Which wins? | Allow action; smaller priority number; creation order |
| OBS-050 | 2 | How do application security groups help structure network rules? | Encrypt traffic; install antivirus; group VMs by application function |
| OBS-051 | 3 | What happens when traffic reaches an NSG without matching a rule? | Permit; deny; ask another server |

Hold OBS-051: include direction and default rules. Do not equate no matching
custom rule with denial; system defaults can still permit traffic.

### O18: VNet peering — 3 questions

Source: [Module assessment](https://learn.microsoft.com/en-us/training/modules/configure-vnet-peering/7-knowledge-check).
Observed: 2026-10-02. One answer from three alternatives per item.

| Research ID | Item | Paraphrased question | Alternative concepts |
| --- | ---: | --- | --- |
| OBS-052 | 1 | What status should both successfully established peering links show? | Initiated; connected; peered |
| OBS-053 | 2 | Which feature lets a peered VNet use a shared gateway? | Individual-client VPN; implicit transitivity; gateway transit |
| OBS-054 | 3 | Which offered description of peering is accurate? | Microsoft-backbone traffic; disruptive setup; same-region requirement |

### O19: Load Balancer — 3 questions

Source: [Module assessment](https://learn.microsoft.com/en-us/training/modules/intro-to-azure-load-balancer/5-knowledge-check).
Observed: 2026-10-02. One answer from three alternatives per item.

| Research ID | Item | Paraphrased question | Alternative concepts |
| --- | ---: | --- | --- |
| OBS-055 | 1 | At which OSI layer does Azure Load Balancer operate? | Transport; application; session |
| OBS-056 | 2 | Which component keeps a client's traffic on the same backend under the intended configuration? | Availability check; broad-port balancing; client persistence |
| OBS-057 | 3 | Which component excludes backends that stop responding on TCP 443? | Broad-port balancing; outbound rule; endpoint health check |

Review persistence conditions when the backend set or health changes.

### O20: Application Gateway — 3 questions

Source: [Module assessment](https://learn.microsoft.com/en-us/training/modules/intro-to-azure-application-gateway/5-knowledge-check).
Observed: 2026-10-02. One answer from three alternatives per item.

| Research ID | Item | Paraphrased question | Alternative concepts |
| --- | ---: | --- | --- |
| OBS-058 | 1 | Which gateway feature targets SQL-injection attacks against a web app? | Health checks; TLS termination; web application firewall |
| OBS-059 | 2 | Which feature detects unresponsive backends and prevents forwarding to them? | Health checks; web firewall; connection draining |
| OBS-060 | 3 | During backend maintenance, what stops new connections while allowing existing ones to finish? | Session affinity; connection draining; health checks |

For OBS-060, preserve the gateway/backend context and specify the drain timeout.

### O21: Network Watcher — 3 questions

Source: [Module assessment](https://learn.microsoft.com/en-us/training/modules/intro-to-azure-network-watcher/5-knowledge-check).
Observed: 2026-10-02. One answer from three alternatives per item.

| Research ID | Item | Paraphrased question | Alternative concepts |
| --- | ---: | --- | --- |
| OBS-061 | 1 | Which tool displays resources connected to a development VNet? | Topology map; ongoing connection monitor; VPN diagnostics |
| OBS-062 | 2 | Which offered tool can detect connectivity changes after NSG edits between VMs? | Topology map; ongoing connection monitor; VPN diagnostics |
| OBS-063 | 3 | Which offered tool investigates on-premises connectivity through a newly created VPN? | Topology map; ongoing connection monitor; VPN diagnostics |

Review OBS-063's intended diagnostic goal: ongoing reachability monitoring and
VPN gateway/tunnel troubleshooting are distinct tasks. Name the required output.

## Monitoring and backup

### O22: Azure Backup foundations — 3 questions

Source: [Module assessment](https://learn.microsoft.com/en-us/training/modules/intro-to-azure-backup/5-knowledge-check).
Observed: 2026-10-02. One answer from three alternatives per item.

| Research ID | Item | Paraphrased question | Alternative concepts |
| --- | ---: | --- | --- |
| OBS-064 | 1 | Which backup storage tier supports a rapid restore? | Snapshot; standard; archive |
| OBS-065 | 2 | Which offered management surface spans backup workloads, vaults, regions, and subscriptions? | Monitoring service; on-premises DPM; Backup center |
| OBS-066 | 3 | Which proposed component is needed for VM-level backup? | VM backup extension; MABS server; vault recovery-objective policies |

Hold OBS-065 for terminology review: current
[Backup center documentation](https://learn.microsoft.com/en-us/azure/backup/backup-center-overview)
describes its transition to Resiliency. Review OBS-066's workload, deployment
location, agent/extension provisioning, and vault prerequisites.

### O23: Log Analytics workspace — 3 questions

Source: [Module assessment](https://learn.microsoft.com/en-us/training/modules/create-configure-log-analytics-workspace/6-knowledge-check).
Observed: 2026-10-02. One answer from three alternatives per item. This is an
additional relevant module, not a module in the inspected AZ-104 backup path.

| Research ID | Item | Paraphrased question | Alternative concepts |
| --- | ---: | --- | --- |
| OBS-067 | 1 | Which query context bases log visibility on workspace permissions across resource types? | Workspace context; resource context; access-control mode |
| OBS-068 | 2 | Which offered role permits restoration of archived workspace logs? | Backup Operator; Log Analytics Reader; Log Analytics Contributor |
| OBS-069 | 3 | Which offered maximum applies to default workspace retention? | 550 days; 730 days; 900 days |

Hold OBS-068 for archive/restore terminology and required-operation review.
For OBS-069, distinguish workspace default analytics retention from table total
retention and table plans; current
[retention guidance](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/data-retention-configure)
documents separate settings and limits. Do not generalize one limit to all logs.

## Inspected modules without a linked readable question unit

These module pages were inspected but did not expose a linked technical
question unit in their rendered unit list. Generic profile assessment notices
are not evidence that specific questions were collected.

- [Self-service password reset](https://learn.microsoft.com/en-us/training/modules/allow-users-reset-their-password/).
- [Host a domain on Azure DNS](https://learn.microsoft.com/en-us/training/modules/host-domain-azure-dns/).
- [Traffic routing](https://learn.microsoft.com/en-us/training/modules/control-network-traffic-flow-with-routes/).
- [Protect VMs with Azure Backup](https://learn.microsoft.com/en-us/training/modules/protect-virtual-machines-with-azure-backup/).
- [Monitor Azure VMs](https://learn.microsoft.com/en-us/training/modules/monitor-azure-vm-using-diagnostic-data/).

The former configure-azure-monitor and configure-azure-alerts module URLs
could not be retrieved. They contribute no questions to the count above.

## Official preparation videos: oral prompts and scenario themes

Inspected the five Microsoft Exam Readiness Zone AZ-104 episodes, published
December 1, 2023, and their public English captions on 2026-10-02. These are
47 distinct technical study prompts or example themes, not 47 complete
multiple-choice questions. Repeated prompts are consolidated. Introductory,
navigation, and conversational questions are excluded. None has a complete
option set extracted from the captions; no options or answer keys are invented.
They are additional to the 69 complete training questions above.

### V01: Identities and governance

Source: [Microsoft episode](https://learn.microsoft.com/en-us/shows/exam-readiness-zone/preparing-for-az-104-manage-azure-identities-and-governance-1-of-5),
[English captions](https://videoencodingpublic-hgeaeyeba8gycee3.b01.azurefd.net/public-4f390f6a-03ab-448f-ad16-3b18fe71abfa/caption-en-us.vtt).

| Research ID | Time | Paraphrased prompt |
| --- | --- | --- |
| VID-001 | 03:58 | Distinguish cloud, synchronized, and guest identities. |
| VID-002 | 04:54 | What follows a guest invitation? |
| VID-003 | 04:59 | How is a guest invited? |
| VID-004 | 05:00 | What makes an account a guest? |
| VID-005 | 05:24 | How should an external customer receive access? |
| VID-006 | 05:34 | How are guest and other accounts administered? |
| VID-007 | 06:02 | Which role permits creating resources? |
| VID-008 | 06:10 | Which role permits deleting resources? |
| VID-009 | 06:12 | Which role permits delegating access? |
| VID-010 | 08:25 | How do directory and resource roles differ? |
| VID-011 | 09:40 | How do deletion and read-only locks differ? |
| VID-012 | 10:36 | Can resources be created without a subscription? |
| VID-013 | 10:57 | How is a cost budget created? |
| VID-014 | 11:03 | How can multiple subscriptions be governed together? |
| VID-015 | 11:19 | Would a management group be used for one subscription? |

Hold VID-015: the trainer's categorical dismissal needs review, not adoption.

### V02: Storage

Source: [Microsoft episode](https://learn.microsoft.com/en-us/shows/exam-readiness-zone/preparing-for-az-104-implement-and-manage-storage-2-of-5),
[English captions](https://videoencodingpublic-hgeaeyeba8gycee3.b01.azurefd.net/public-ed0ad47f-c90c-463a-b0b1-b396a80a81e6/caption-en-us.vtt).

| Research ID | Time | Paraphrased prompt or example theme |
| --- | --- | --- |
| VID-016 | 00:51 | What changes when storage network restrictions are enabled? |
| VID-017 | 01:52 | How should account access keys be managed? |
| VID-018 | 03:35 | How does cross-region replication synchronize data? |
| VID-019 | 04:30 | What tool views accounts across subscriptions? |
| VID-020 | 04:37 | How is data copied into another account? |
| VID-021 | 06:03 | Which storage-tier decision reduces scenario costs? |
| VID-022 | 07:08 | How can rules move data after 30 and 90 days? |

Hold VID-018: the caption's synchronization wording is unclear. Verify the
specific redundancy mode rather than treating the transcript as an answer key.

### V03: Compute

Source: [Microsoft episode](https://learn.microsoft.com/en-us/shows/exam-readiness-zone/preparing-for-az-104-deploy-and-manage-azure-compute-resources-3-of-5),
[English captions](https://videoencodingpublic-hgeaeyeba8gycee3.b01.azurefd.net/public-9f1db049-cab6-49ad-bdf1-636b97fb77f0/caption-en-us.vtt).

| Research ID | Time | Paraphrased prompt or example theme |
| --- | --- | --- |
| VID-023 | 01:39 | Select a missing template line from offered completions. |
| VID-024 | 01:47 | Which resources are required to create a VM? |
| VID-025 | 02:09 | Which VM family fits high-throughput compute? |
| VID-026 | 04:39 | Which dependent resources must accompany a VM move? |
| VID-027 | 05:27 | Which container service fits a test/development deployment? |
| VID-028 | 08:45 | Which disk types fit the required VM workload? |

The template-completion discussion supports a format observation, not a
retrieved template question. Preserve this distinction when reviewing VID-023.

### V04: Networking

Source: [Microsoft episode](https://learn.microsoft.com/en-us/shows/exam-readiness-zone/preparing-for-az-104-implement-and-manage-virtual-networking-4-of-5),
[English captions](https://videoencodingpublic-hgeaeyeba8gycee3.b01.azurefd.net/public-ce85e7a4-e0c8-4e7e-8969-81beb94a2d0a/caption-en-us.vtt).

| Research ID | Time | Paraphrased prompt |
| --- | --- | --- |
| VID-029 | 01:06 | How do Basic and Standard public IP SKUs differ? |
| VID-030 | 01:44 | What establishes the two directions of peering? |
| VID-031 | 02:08 | How can traffic follow a custom inter-VNet route? |
| VID-032 | 02:45 | Which tool diagnoses failed connectivity and its cause? |
| VID-033 | 04:08 | How can same-subnet workloads have different traffic rules? |
| VID-034 | 04:19 | How can administrators securely use RDP or SSH? |
| VID-035 | 05:03 | When should service versus private endpoints be used? |
| VID-036 | 05:06 | Which services support service endpoints? |
| VID-037 | 05:15 | What purpose does a public DNS zone serve? |
| VID-038 | 05:32 | When is private DNS appropriate instead? |
| VID-039 | 06:04 | When is internal versus public load balancing appropriate? |
| VID-040 | 06:17 | How should load-balancer failures be investigated? |

Hold VID-029 for SKU availability and retirement review. VID-031 needs an
explicit topology; routing does not create missing peering connectivity.

### V05: Monitoring and recovery

Source: [Microsoft episode](https://learn.microsoft.com/en-us/shows/exam-readiness-zone/preparing-for-az-104-monitor-and-maintain-azure-resources-5-of-5),
[English captions](https://videoencodingpublic-hgeaeyeba8gycee3.b01.azurefd.net/public-6dcefc27-0ef4-45b4-963f-1a55bfcf83b3/caption-en-us.vtt).

| Research ID | Time | Paraphrased prompt |
| --- | --- | --- |
| VID-041 | 00:44 | When are metrics, log queries, or alerts appropriate? |
| VID-042 | 01:29 | What does an action group do? |
| VID-043 | 02:43 | How is Connection Monitor configured? |
| VID-044 | 04:03 | How do backup scheduling and retention differ? |
| VID-045 | 04:19 | Which permissions separate backup and restore duties? |
| VID-046 | 04:38 | How is the required recovery vault created? |
| VID-047 | 05:02 | When is backup versus regional replication appropriate? |

Hold the surrounding narration's vault naming and mandatory-action-group
claims. Distinguish Backup vaults from Recovery Services vaults, and configured
notifications from an alert's detection rule. No scored answers were inferred.

## Later review procedure

Keep this inventory outside questions/. Do not attach existing question IDs,
topic IDs, objective mappings, or family relationships at this stage.

When later work is requested, revisit the source item, check current service
documentation, record ambiguities, and write a new original scenario. Changing
only names or option order is not sufficient independent authorship. Resolve
the review flags before scoring. Document every option's rationale and retain
the technical source and verification date. Collection is not technical approval.
