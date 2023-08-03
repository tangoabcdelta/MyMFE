To use the Helm charts and deploy your project in Minikube, Kind, or any other local Kubernetes environment, follow these steps:

### Install Helm:

Make sure you have Helm installed on your system. You can find the installation instructions for your platform at the official Helm website: https://helm.sh/docs/intro/install/

### Set up Kubernetes cluster:

Ensure you have a Kubernetes cluster running locally, such as Minikube or Kind. If you don't have one, follow the respective installation and setup instructions for your chosen Kubernetes solution.

### Initialize Helm:

Once Helm is installed, initialize Helm on your cluster by running the following command:

```bash
helm init
```

### Get Docker Images

To get the latest Docker images, you need to know the Docker image repositories or registries where the microfront-ends and the GraphQL server are hosted. Typically, you can find this information in the Dockerfile for each service.

If you have already built the Docker images locally and want to use them in Minikube or Kind locally, follow these steps:

**Build Docker images:** Make sure you have built the Docker images for each microfront-end and the GraphQL server. If you haven't built them yet, navigate to the respective directories (e.g., mfe1, mfe2, etc.) and build the Docker images using the following command:

```bash
docker build -t <your_image_name>:<tag> .
```

Replace ` <your_image_name>`` with a suitable name for the image and  `<tag>` with a version or tag for the image.

**Tag the images:** To use the images in Minikube or Kind, you need to ensure that they are properly tagged with the Minikube or Kind Docker environment. To do this, run the following commands to re-tag the images:

**For Minikube:**

```bash
eval $(minikube docker-env)
docker tag <your_image_name>:<tag> $(minikube docker-env | grep DOCKER_HOST | cut -d'/' -f3):<your_image_name>-<tag>
```

**For Kind:**

```bash
kind load docker-image <your_image_name>:<tag>
```

Repeat these steps for all the microfront-end and GraphQL server images.

**Locate the Dockerfiles:** For each microfront-end (mfe1, mfe2, mfe3, mfe4) and the GraphQL server, find their respective Dockerfile in the corresponding directory (e.g., ./mfe1/Dockerfile, ./mfe2/Dockerfile, etc.).

**Update Helm charts:** Update the Helm charts for each service (mfe1-chart.yaml, mfe2-chart.yaml, etc.) to use the local images.
In each Helm chart, you should have an image field under the spec.template.spec.containers section. Update the image field to point to the locally tagged image:

```bash
image: <your_image_name>:<tag>
```

**Deploy with Helm:** Once you have updated all the Helm charts to use the local images, deploy the services to Minikube or Kind using the following commands:
For Minikube:

### Install the Helm charts:

For each microfront-end (mfe) and the GraphQL server, navigate to the respective Helm chart directory and run the following command:

```bash
helm install <release_name> . --namespace <namespace_name>
```

Replace <release_name> with a unique name for the release (deployment) of the service, and <namespace_name> with the namespace you created in the previous step for the specific service.

For example, to deploy mfe1 to Minikube:

```bash
cd /path/to/mfe1-chart-directory
helm install mfe1-release . --namespace mfe1-namespace
```

Similarly, repeat this step for mfe2, mfe3, mfe4, and the GraphQL server.

Verify the deployments: Use the following commands to verify that the deployments and services are running:

```bash
kubectl get deployments --namespace <namespace_name>
kubectl get services --namespace <namespace_name>
```

You should see the deployments and services listed with their corresponding information.

**Access the services:** Depending on your Kubernetes environment, you may need to access the services differently. If using Minikube, you can use the minikube service command to open the service in your default web browser:

```bash
minikube service <service_name> --namespace <namespace_name>
```

Replace `<service_name>` with the name of the service you want to access (e.g., mfe1-service, mfe2-service, etc.), and <namespace_name> with the respective namespace.

That's it! You should now have your microfront-ends and the GraphQL server running in your local Kubernetes environment using Helm charts.

### Install in a single Namespace

To install all the microfront-ends and the GraphQL server in a single namespace, follow these steps:

```bash
### Create a namespace: If you haven't created a namespace already, you can create one for your project:
kubectl create namespace my-project
### Install Helm charts:
### Navigate to each Helm chart directory (mfe1, mfe2, mfe3, mfe4, and GraphQLServer) and install the charts using the same namespace:
cd /path/to/mfe1-chart-directory
helm install mfe1-release . --namespace my-project

cd /path/to/mfe2-chart-directory
helm install mfe2-release . --namespace my-project

cd /path/to/mfe3-chart-directory
helm install mfe3-release . --namespace my-project

cd /path/to/mfe4-chart-directory
helm install mfe4-release . --namespace my-project

cd /path/to/graphqlserver-chart-directory
helm install graphqlserver-release . --namespace my-project
```

Replace `<release_name>` with a unique name for each release (deployment) of the service. The services will be deployed in the "my-project" namespace.

You should see all the deployments and services listed with their corresponding information in the "my-project" namespace.

### Specific instructions for Minikube:

```bash
helm install mfe1-release /path/to/mfe1-chart-directory --namespace my-project
helm install mfe2-release /path/to/mfe2-chart-directory --namespace my-project
helm install mfe3-release /path/to/mfe3-chart-directory --namespace my-project
helm install mfe4-release /path/to/mfe4-chart-directory --namespace my-project
helm install graphqlserver-release /path/to/graphqlserver-chart-directory --namespace my-project
```

### Specific instructions or Kind:

```bash
helm install mfe1-release /path/to/mfe1-chart-directory
helm install mfe2-release /path/to/mfe2-chart-directory
helm install mfe3-release /path/to/mfe3-chart-directory
helm install mfe4-release /path/to/mfe4-chart-directory
helm install graphqlserver-release /path/to/graphqlserver-chart-directory
```

### Verify the deployments: You can verify that the deployments and services are running in the "my-project" namespace:

```bash
kubectl get deployments --namespace my-project
kubectl get services --namespace my-project
```

### Access the services: To access the services in Minikube, you can use the minikube service command with the respective service names:

```bash
minikube service mfe1-service --namespace my-project
minikube service mfe2-service --namespace my-project
minikube service mfe3-service --namespace my-project
minikube service mfe4-service --namespace my-project
minikube service graphqlserver-service --namespace my-project
```

This will open each service in your default web browser.

Now, all your microfront-ends and the GraphQL server should be running in a single namespace ("my-project") in your local Kubernetes environment.

### Create separate namespaces (optional):

(Not recommended) You can create separate namespaces for each microfront-end and the GraphQL server to organize your resources. For example:

```bash

kubectl create namespace mfe1-namespace
kubectl create namespace mfe2-namespace
kubectl create namespace mfe3-namespace
kubectl create namespace mfe4-namespace
kubectl create namespace graphql-namespace
```
