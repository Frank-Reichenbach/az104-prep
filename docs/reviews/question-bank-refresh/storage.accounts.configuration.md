# Storage account creation and configuration review

Topic: `storage.accounts.configuration`; objective: `st-06`.
Verified: 2026-10-03. Source: questions/storage/storage-accounts-configuration.json.
The shared module title does not reveal any account type, name scope, or setting.

| ID | Decision | Pattern / difficulty | Reason and key |
| --- | --- | --- | --- |
| st-account-general-purpose | Keep, revision 1 | Applied service-requirement comparison | All four account types are real alternatives, and only standard GPv2 hosts the requested combination. Key `v2`. |
| st-account-name-scope | Revise, revision 2 | Troubleshooting naming failure | Add the observed error; replace unrelated tags/tiering with subscription/region alternatives. Key `name`. |
| st-account-transfer-tls | Revise, revision 2 | Foundation setting distinction | Replace tier/redundancy distractors with real security controls that affect other layers; expand rationales and add missing TLS evidence. Keys `https`, `tls`. |

## Evidence and option review

The [account-type table](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-overview)
supports every general-purpose option: GPv2 provides all four services, whereas
the premium alternatives specialize in blob, file, or page-blob workloads.
This is a documented service constraint, not a preference for a cheaper SKU.
The [creation guide](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-create)
requires uniqueness across Azure. None of the resource-group, subscription,
or regional changes makes the conflicting name available. The new prompt
excludes invalid characters and uses the naming failure as diagnostic evidence.

For transfer-tls, [secure transfer](https://learn.microsoft.com/en-us/azure/storage/common/storage-require-secure-transfer)
requires HTTPS for REST requests and
[minimum TLS configuration](https://learn.microsoft.com/en-us/azure/storage/common/transport-layer-security-configure-minimum-version)
sets the protocol threshold. [Infrastructure encryption](https://learn.microsoft.com/en-us/azure/storage/common/infrastructure-encryption-enable)
adds an at-rest layer, and [Shared Key configuration](https://learn.microsoft.com/en-us/azure/storage/common/shared-key-authorization-prevent)
controls authorization. These latter controls address relevant security goals
but fail both requested transport-setting distinctions.

The TLS page contains older-version examples/default descriptions. This item
does not score retirement dates, defaults, or the current acceptability of
TLS 1.0/1.1; it tests the documented setting's purpose only. No protocol-default
claim is inferred from those examples.

## Acceptance

The first two items have one qualifying complete choice. The final item asks
for two individual setting assertions, not two independently sufficient
solutions: each keyed setting supplies its stated control, and neither wrong
control does. No other pair qualifies. All option IDs and families are retained;
there are no variants. The batch mixes a constrained comparison, an observed
failure, and foundation distinctions. Build/check, 13 tests, static-site links,
review hashes, and whitespace checks validate the checkpoint. Review is
author-led; no Azure creation or security commands were executed.
