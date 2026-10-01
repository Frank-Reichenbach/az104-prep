# Blob Storage

Available administrative tasks:

1. [Containers](containers.md): create a namespace for blobs and control access.
2. [Access tiers](access-tiers.md): choose retrieval behavior and cost tradeoffs.
3. [Lifecycle management](lifecycle-management.md): automate transitions and
   expiration according to explicit rules.
4. [Blob soft deletion](blob-soft-delete.md): recover deleted or overwritten
   blob data during its retention window.
5. [Container soft deletion](container-soft-delete.md): recover a deleted
   container and its contents.
6. [Versioning](versioning.md): retain historical blob states and restore the
   desired version as current.

Lifecycle configuration belongs to the storage account. Filters can restrict
its effect to a container or a blob prefix. It is not a retention setting on
the container object itself. [Microsoft's configuration guide](https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-policy-configure)

For file-share protection, see [Azure Files](../azure-files/index.md).
