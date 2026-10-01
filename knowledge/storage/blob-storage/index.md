# Blob Storage

The initial sample follows three related administrative tasks:

1. [Containers](containers.md): create a namespace for blobs and control access.
2. [Access tiers](access-tiers.md): choose retrieval behavior and cost tradeoffs.
3. [Lifecycle management](lifecycle-management.md): automate transitions and
   expiration according to explicit rules.

Lifecycle configuration belongs to the storage account. Filters can restrict
its effect to a container or a blob prefix. It is not a retention setting on
the container object itself. [Microsoft's configuration guide](https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-policy-configure)

Soft deletion and versioning are separate objectives with dedicated files
still to be researched. Their interactions with lifecycle rules appear in the
lifecycle topic, but that does not establish full coverage of those objectives.
