# Blob containers

- Topic ID: `storage.blobs.containers`
- Objective: `st-12`
- Verified: 2026-10-01
- Status: documented; commands not executed in Azure

## Purpose and prerequisites

A container groups blobs within a storage account. For this exercise, use an
existing general-purpose v2 account and a signed-in Azure CLI session. Create
a dedicated container called `study-records` rather than using application data.
This name satisfies the lowercase, length, and character requirements.
[Container administration](https://learn.microsoft.com/en-us/azure/storage/blobs/blob-containers-portal)

For creation through the Blob service using Entra credentials, Storage Blob
Data Contributor is the least privileged built-in role listed for the operation.
Assign it at the storage account or an appropriate parent scope before creating
a new container. [Create Container permissions](https://learn.microsoft.com/en-us/rest/api/storageservices/create-container#authorization)

After creation, an administrator can scope data roles to that container.
Portal navigation also requires management-plane Reader access. Creating a
storage account does not automatically grant Entra-based blob data access.
[Role assignment guidance](https://learn.microsoft.com/en-us/azure/storage/blobs/assign-azure-role-data-access)

## Microsoft recommendations

Keep containers private and disallow anonymous reads at the account unless
the workload specifically requires anonymous access. Before changing an
existing public workload, inspect its anonymous requests to understand the
impact. [Anonymous-access remediation](https://learn.microsoft.com/en-us/azure/storage/blobs/anonymous-read-access-overview)

Use an explicit Entra authorization mode for CLI data operations. Omitting
`--auth-mode login` can cause the CLI to try account-key authorization.
[CLI authorization](https://learn.microsoft.com/en-us/azure/storage/blobs/authorize-data-operations-cli)

## Implementation

In the Portal, open the storage account, select **Data storage → Containers**,
create `study-records`, and retain **Private** access.
[Portal instructions](https://learn.microsoft.com/en-us/azure/storage/blobs/blob-containers-portal)

CLI equivalent, after replacing the account name:

```sh
az storage container create \
  --account-name <existing-account> \
  --name study-records \
  --public-access off \
  --auth-mode login

az storage container show \
  --account-name <existing-account> \
  --name study-records \
  --auth-mode login
```

The second command should return the container's properties. These are
illustrative commands; angle-bracket placeholders must be replaced before
running them. [Container CLI reference](https://learn.microsoft.com/en-us/cli/azure/storage/container?view=azure-cli-latest)

## Verify and troubleshoot

Check the account's anonymous-access setting as well as the container's
setting. Allowing anonymous access at the account merely permits container
configuration; it does not publish every container. Disallowing it at the
account overrides individual container settings.
[Access-setting interaction](https://learn.microsoft.com/en-us/azure/storage/blobs/anonymous-read-access-configure)

If Entra access fails, check the identity, data role, scope, and recent role
changes. Role assignments can take up to ten minutes to propagate. Reader
alone is insufficient for blob data access.
[Role assignment guidance](https://learn.microsoft.com/en-us/azure/storage/blobs/assign-azure-role-data-access)

Network reachability is a separate check from authorization. Detailed storage
firewall and private endpoint guidance remains in the research backlog.

## Constraints and cleanup

Private access means requests require authorization; it does not mean the
storage endpoint has become a private network endpoint. Conversely, a public
endpoint does not by itself mean anonymous data access is enabled.
[Anonymous-access configuration](https://learn.microsoft.com/en-us/azure/storage/blobs/anonymous-read-access-configure)

For cleanup, delete only the dedicated exercise container after confirming its
contents are disposable. Container deletion removes access to its blobs; any
recovery depends on separately configured protection. Do not use a production
container as this exercise's target.

## Exam distinctions

- Account permission to allow anonymous access versus a container's access level.
- Management-plane visibility versus data-plane authorization.
- Container-scoped access versus account-scoped access.
- A container as the blob namespace versus account-level
  [lifecycle management](lifecycle-management.md).

Practice: [source questions](../../../questions/storage/blob-storage.json) and
[generated answer explanations](../../../generated/answers.md).
