

# then provide a resource resource group
resource "azurerm_resource_group" "nonadminresourcegroup" {

    # create a resource group to identify
    name        = "nonadminresourcegroup"

    # run az account list-locations -o table
    # and find out a list of locations supported
    # in your azure account
    location    = "ukwest"

    # put a tag to identify it later
    # execute az resource list --tag source=terraform
    # to list all tags that have the same source
    tags        = {
        source      = "terraform"
        environment = "prod"
        department  = "finance"

    }
}