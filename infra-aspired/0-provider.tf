# declare required providers
terraform {
    required_providers {
        azurerm = {
            source = "hashicorp/azurerm"
            version = "=3.0.0"
        }
    }
}


# define providers
# then perform a `terraform init`
provider "azurerm" {
    # to disable automatic registration of Azure resource provider
    skip_provider_registration = "true"
    features {}
}
