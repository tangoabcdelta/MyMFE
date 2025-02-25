# Pre requisites for this

To be able to run `docker-compose -f compose.yml up --build`, 
* First, you need `docker-cli` to be able to do anything
* Second, you need to have the control over `docker build` command
* Third, you need `docker daemon` running on your system, because without the daemon, you can't run that environment.




## Rancher
To run the `Rancher Docker daemon`, you essentially need to start the Rancher server, which automatically manages and runs the Docker daemon on your host machines; you don't directly execute any separate commands to start the Rancher Docker daemon as such, but instead, you will have to configure and manage it through the Rancher UI or CLI by adding hosts and deploying containers within the Rancher environment. 
Key steps:
#### Install Rancher:
Download and install the Rancher server software on a designated host machine. 
Launch Rancher Server:
Start the Rancher server using the appropriate command based on your installation method. 

#### Add Hosts and Deploy Containers:

* **Adding Hosts:**
  * To add hosts and deploy containers within a Rancher environment, you need to first register your physical or virtual machines as hosts within the Rancher UI.
  * Access the Rancher UI or CLI and add your desired host machines to the Rancher cluster.
    * **Access Rancher UI:** Log in to your Rancher web interface.
    * **Select Environment:** Choose the environment where you want to add hosts. 
    * **Navigate to Hosts:** Go to the "Infrastructure" section and select "Hosts". 

  * This will automatically install Docker on them and configure them to be managed by Rancher.
* Then utilize the Rancher interface to define and deploy container services.
* You can specify the desired image, environment variables, and other configuration details.
* This will allow Rancher to manage the container lifecycle across your registered hosts based on your specifications.



Once your hosts are added, you can use the Rancher interface to deploy Docker containers to the cluster, effectively running the Docker daemon on the specified host machines. 




**Add Host Method:**
**Custom Host:** If you have a pre-provisioned machine, select "Custom" and copy the provided Rancher agent command to execute on your host to register it with Rancher. 
**Cloud Provider:** If using a cloud provider, select the appropriate option and follow the steps to provision a new host directly through Rancher. 
**Configure Details:** Provide necessary information like host name, IP address, and authentication details. 
Deploying Containers (Creating Services):
**Create a Stack:** Within your chosen environment, navigate to the "Stacks" section to group related container services together. 
**Add Service:** Click "Add Service" to define a new container deployment. 
**Select Image:** Choose the Docker image you want to use for your container. 

**Configure Details:**
**Service Name:** Give your container a descriptive name. 
**Replicas:** Specify how many container instances you want to run. 
**Environment Variables:** Set any required environment variables for the container. 
**Port Mappings:** Define which host ports should be mapped to container ports. 
**Scheduling:** Optionally, specify labels or other criteria to control where the container should be scheduled on your hosts 
**Launch Service:** Click "Create" to deploy your container service. 


**Key points to remember:**
**Host Registration URL:**
When adding a host, make sure to use the correct Rancher server address and port to register the host properly. 
**Docker Images:**
You need to have the necessary Docker images available in a registry that Rancher can access to deploy containers. 
**Access Control:**
Rancher allows you to manage user permissions and access levels for different environments. 





**Important points to remember:**
No standalone "Rancher Docker daemon" command:
Unlike a standard Docker installation, you don't directly start a separate "Rancher Docker daemon" process; the Rancher server handles the Docker daemon management. 

**Docker CLI usage:**
While Rancher manages the Docker daemon, you can still use the standard Docker CLI commands to interact with containers on your Rancher cluster. 