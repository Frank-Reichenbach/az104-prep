# App Service application deployment and configuration

Topic ID: compute.app-service.apps  
Objectives: co-19  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

## Prepare the application

An App Service app is the application resource; its plan supplies compute.
Choose a supported runtime/OS combination and deployment model: source/build
workflow, published package, or container. List current stacks using
`az webapp list-runtimes --os linux` or inspect the portal.
[Application quickstart](https://learn.microsoft.com/en-us/azure/app-service/quickstart-dotnetcore).

## Implementation

Create the app on a compatible existing plan through **Create → Web App**.
Choose a unique name and runtime, then configure HTTPS, authentication,
networking, and application settings as required. The deployment identity needs
site write/deployment permissions and permission to use the plan.

Build and test the application locally. For a ZIP deployment, put the application's
deployable files at the archive root rather than nesting everything under a
parent directory. Use the supported deployment flow:

```sh
az webapp deploy --resource-group rg-study --name '<app-name>' \
  --src-path app.zip --type zip
az webapp config appsettings set --resource-group rg-study --name '<app-name>' \
  --settings StudyMode=true
```

Package deployment assumes ready-to-run files unless build automation is
explicitly configured. Follow the runtime-specific deployment guidance rather
than assuming every ZIP receives an automatic source build.
[ZIP deployment](https://learn.microsoft.com/en-us/azure/app-service/deploy-zip).

App settings become environment variables; changing them restarts the app.
Use managed identity and Key Vault references for supported secret access
instead of committing credentials. The identity must also receive permission
on the target service; merely enabling it does not grant data access.
[Settings](https://learn.microsoft.com/en-us/azure/app-service/configure-common);
[managed identity](https://learn.microsoft.com/en-us/azure/app-service/overview-managed-identity).

## Verify and troubleshoot

Read deployment logs, then request the actual endpoint and test an application
health path. Confirm runtime version, startup command, configuration values,
and dependencies. A successful package upload can coexist with startup failure.
For a 500 response, investigate application logs; for deployment denial, inspect
identity permissions and deployment endpoint access. Use staging slots for
higher-risk releases on eligible tiers.

Stopping the app does not release paid plan capacity. Remove test apps and
unneeded deployment artifacts after checking retained configuration and data.
Review [plan costs](plans.md), [scaling](scaling.md), and application dependencies.

[Question data](../../../questions/compute/compute-app-service-apps.json).
