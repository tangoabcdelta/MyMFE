resource "azurerm_resource_group" "mygroup" {
    name = "mygroup"
    location = "West Europe"
}

resource "azurerm_network_security_group" "mygroup" {
    name                        = "mygroup-security-group"
    location                    = azurerm_resource_group.mygroup.location
    resource_group_name         = azurerm_resource_group.mygroup.name
}

