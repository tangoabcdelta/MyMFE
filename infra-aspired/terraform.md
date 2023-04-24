# Declare required Providers

- Each Terraform module must declare which providers it requires
- Terraform will use this to install and use the providers
- Provider requirements are declared in a `required_providers` block.
- A provider requirement consists of
  - a local name
  - a source location and
  - a version constraint:

```tf
terraform {
    required_providers {
        azurerm = {
            source = "hashicorp/azurerm"
            version = "=3.0.0"
        }
    }
}
```

```
provider "azurerm" {
features {}

    client_id = var.client_id
    client_secret = var.client_secret

}

resource "azurerm_resource_group" "nonadminrg" {
name = "nonadminresourcegroup"
location = "ukwest"
tags = "foo"
}
```

# Init. Validate. Plan. Execute.

`terraform validate`

- Validates the configuration files in a directory
- Refers only to the configuration
- Does not access any remote services such as remote state, provider APIs, etc.
- Safe to automatically e.g. as a post-save check in a text editor or as a test step for a re-usable module in a CI system
- Requires an initialization `terraform init -backend=false`
- `terraform plan` includes an implied validation check
  - You can use it to verify configuration in the context of a particular run (a particular target workspace, input variable values, etc).

# Variables

```
client_id =
client_secret =

cloudName = AzureCloud
homeTenantId = "380ca054-f0a0-402e-ab85-8f493664fd5e"
id = "b9b6f668-1c82-4355-ad48-7fc8085704b5"
isDefault = true
managedByTenants = []
state = "Disabled"
tenantId = "380ca054-f0a0-402e-ab85-8f493664fd5e"
userName = "deveedutta@gmail.com"
userType = "user"
```

# Create Service Principal

Service principal is a resource.

```
resource "azurerm_service_principal" "cicdrunner" {
application_id = ""
display_name = "cicdrunner"
}
```

output "client_id" {
value = zuerm_service_principal.example.application_id
}

# Pull tags

Below is a couple examples of referencing the local.tags variable and using the merge() method to add some more to this individual resource:

```tf
resource "azurerm_resource_group" "main_rg" {
  name     = "E1-PROD-DataLake-rg"
  location = "East US"

  tags = merge(local.tags, {
    workload = "data lake"
  })
}

resource "azurerm_synapse_workspace" "datalake_syn" {
  name = "E1-PROD-DataLake-syn"
  resource_group_name = azurerm_resource_group.main_rg.name
  location = azurerm_resource_group.main_rg.location

  tags = merge(local.tags, {
    workload = "data lake"
  })
}
```

# Junk

```

asdsdas
```
