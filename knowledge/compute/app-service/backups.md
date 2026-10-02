# App Service backup configuration and restoration

Topic ID: compute.app-service.backups  
Objectives: co-22  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

## Backup scope

App Service has automatic backups and configurable custom backups on eligible
Basic, Standard, Premium, and Isolated tiers. Their limits differ: current
documentation lists 30 GB for automatic backups and 10 GB for custom backups.
Neither should be treated as a complete recreation of all app dependencies.
[Backup comparison](https://learn.microsoft.com/en-us/azure/app-service/manage-backup).

Keep deployment packages and infrastructure configuration in version control.
Back up databases and externally mounted storage through their own supported
services. Automatic backups exclude linked databases, custom-mounted storage,
and run-from-ZIP package content. Identity, networking, and TLS configuration
have restore exclusions; review the coverage table before designing recovery.

## Implementation and permissions

Open **App → Backups** to inspect automatic recovery points. For custom backups,
configure a storage account/container, schedule, retention, and any deliberate
file exclusions. The operator needs app backup/configuration permissions and
permission to configure the target storage access. The service also needs
network and authorized data access to its backup destination.

For firewall-protected storage, use the documented VNet backup setup, including
VNet integration and storage access from that network. Confirm the backup path
rather than enabling unrestricted storage as a routine troubleshooting step.
[Custom/VNet backup procedure](https://learn.microsoft.com/en-us/azure/app-service/manage-backup).

Microsoft recommends native database backups. New linked-database backup
configuration was removed for MySQL/PostgreSQL in November 2025 and SQL in
April 2026; existing linked configurations have a documented March 31, 2028
end date. Treat older tutorials that add new linked backups as outdated.
[Linked database deprecation](https://learn.microsoft.com/en-us/azure/app-service/manage-backup#deprecation-of-linked-database-backups).

## Restore and verify

Select a recovery point and restore into a separate app or staging slot where
supported. Review whether to restore configuration. Test application content,
external data, settings, identity permissions, networking, and HTTPS before
cutover. Restoring over production replaces affected content and configuration,
so review the impact first.

A successful backup job does not prove the full application can be recovered.
Inspect job errors and size limits, verify destination access, and perform a
restore exercise. Do not manually edit the stored backup ZIP/XML artifacts.
Retain recoverable copies according to the chosen policy; storage can remain
billable after deleting the app. Delete only disposable lab backups after the
retention decision. See [deployment slots](https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots)
for release isolation.

[Question data](../../../questions/compute/compute-app-service-backups.json).
