
# How to launch this project

## Set up


## How to run your local docker project in minikube?


```bash
# set NO_PROXY to bypass proxy restrictions
export NO_PROXY=localhost,127.0.0.1,10.96.0.0/12,192.168.59.0/24,192.168.49.0/24,192.168.39.0/24,192.168.0.0/16

# set rancher in the path
export PATH=$HOME/.rd/bin:$PATH

# variable overrides
export NODE_TLS_REJECT_UNAUTHORIZED=1
export NODE_EXTRA_CA_CERTS=~/tesco_root_ca.pem
```
### Launch your orchestration:


* Run your local docker orchestration system e.g. docker desktop or Rancher Desktop by SUSE.
* Start Minikube or any other application that you'd use to start a local Kubernetes cluster. For this project, we will consider only Minikube.
* Start Minikube with Docker driver so it leverages your local Docker daemon: `minikube start --driver=docker`
* Check if Minikube is running: `minikube status`
* Alternatively, `kubectl get deployment --all-namespaces` or `kubectl -A get deployment` to get information about all running control planes
 

### Build your Docker image locally:**
To run a local Docker image in Minikube, first build your Docker image locally. Use the standard `docker build` command to create the image on your host machine. 

```
# cd into the right directory
docker build -t my-local-image .

# e.g. if you want to run mfe1 on minikube
cd mfe1
docker build -t mfe1 .
```


### Load the image into Minikube:

Once built, verify if image is available. You can verify that the image is accessible by running `docker images` command. Check the following examples:

```
docker images my-local-image
docker images mfe1
```

```bash
# I don't know what to do or make of this
# export DOCKER_TLS_VERIFY="1"
# export DOCKER_HOST="tcp://127.0.0.1:32771"
# export DOCKER_CERT_PATH="/Users/deveeduttamaharana/.minikube/certs"
# export MINIKUBE_ACTIVE_DOCKERD="minikube"
```

#### Access Minikube Docker environment:

* Use the `minikube docker-env` command to configure your shell to access the Minikube Docker daemon.
* Run `eval $(minikube docker-env)` to configure your shell to interact with the Minikube Docker daemon.
* This will allow you to load the local image into Minikube and deploy it as a Kubernetes pod.
* Build your Docker image as you normally would e.g. using `docker build -t <params> .` command.
* Since the Docker environment is now set to Minikube’s Docker daemon, the image will be available directly within Minikube.
* Verify if the image is available in minikube `docker images`
* Use Minikube’s caching feature to add local images to the Minikube environment: `minikube cache add my-local-image:latest`
  * If in your version of minikube, `minikube cache` is deprecated, then you can use `minikube image load`
  * If you need to use a newer version of an image, you will need to re-load it into the cache using the same command with the updated tag.
  * If your cache becomes too large, you can manage it by deleting unused images using Docker commands within the Minikube environment. 
 
In summary, you're telling Minikube to use your local Docker image by setting up the environment to access its Docker daemon directly.

##### How to use Minikube image caching:
```bash
# Load an image.
minikube image load <image_name>:<tag>

# Example: minikube image load nginx:latest and Check cached images.
# This will list all images within your Minikube's Docker environment,
# including those loaded into the cache. 
minikube docker-env | source -  
docker images$$
```
##### Benefits of using Minikube image cache:
* **Faster deployments:** By loading images locally, you can significantly reduce the time required to launch your pods, especially when working with large images. 
* **Offline development:** If you are working in an environment with limited internet access, you can pre-load images into the cache and use them offline. 

### Deploy using Kubernetes manifest:
* Deploy your application using the local image
* Create a Kubernetes manifest `deployment.yaml` YAML file, specifying the local image name in the image field to deploy your application on Minikube.
* You have to use a deployment manifest that references the local image name.

```
# example
kubectl apply -f manifest.yml

# to run mfe1, you can use the following command
kubectl apply -f deployment.yaml 
```





```bash
minikube start
minikube status
kubectl get pods
kubectl apply -f manifest.yml
kubectl get pods 


minikube delete
minikube stop
```



### What is Minikube

Minikube is a tool that allows developers to create and manage a Kubernetes environment on their local computer.

* Minikube is a lightweight Kubernetes distribution that sets up a **single-node cluster** on your local machine.
* Minikube creates a VM on your local machine and deploys a simple cluster.
* Minikube includes all the components needed to run Kubernetes, such as the API server, controller manager, and scheduler and thus, provides a local Kubernetes environment that closely mirrors the behavior and functionality of a production cluster.
* Minikube is used for developing and testing applications on Kubernetes, experimenting with Kubernetes features and enhancing Kubernetes skills.




# Docker Compose

## How to run the Local Docker
You can use the `proxy.sh` file at the root to run.
Alternatively, you can also use `npm start`. Both do (and must do) the exact same thing.

```bash
./proxy.sh
# OR
npm start

```

## What does the docker-compose file do

- We have a docker-compose file in yaml file format which first specifies a version of the docker compose file format being used.
- Then in the `services` section, it defines the services that will be deployed.
- By services, we mean the different Micro Front Ends.
- We specify container names by looking at the docker images.
- Run `docker ps` command in a terminal to list your containers and get their container names
- If you have docker desktop running locally, then you can get those names from its GUI as well.
- Next, we specify the build context i.e. the directory and the docker file to be used for launching the service
- We also volume mount the local directory from host machine i.e. your local and map it with `/usr/app` of the image
- We distinguish each MFE with a different port while making them part of the same MFE network
- We map the host machines port with that of the container


 


### Run Individual Image

Instructions at: https://docs.docker.com/get-started/02_our_app/

Here, we will learn how to run individual images.
For example, let's run the MFE1:

- Build the container image.
- The `-t` flag tags your image with a human-readable name for the final image

```bash
cd mfe1
docker build -t mfe1 .
docker run -dp 9001:9001 mfe1


cd mfe2
docker build -t mfe2 .
docker run -dp 9002:9002 mfe2
```

### Update the container and run

If you modify any content in the directories, then you'll have to rebuild to see an updated version. Use the same `docker build` to update the version of the image and start a new container using the updated code.

```bash
 docker build -t mfe1 .
 docker run -dp 9001:9001 mfe1
```

### Remove a container using the CLI

The old container could be already using the host’s port 9001.
Hence, you'll have to remove the old container in order to spin a new one.

- Get the ID of the container by using the `docker ps` command.
- Use the `docker stop` command to stop the container.
- Replace <the-container-id> with the ID from `docker ps`.
- Once the container has stopped, you can remove it by using the `docker rm` command.

```bash
docker ps
docker stop <the-container-id>
docker rm <the-container-id>
```

### Docker Volume for Data Persistence

- To persist data between container updates and restarts and rebuilds, create a volume using the `docker volume create` command and attach a.k.a. "mount" it to the directory the data is stored in.
- The Volume can be a static file or a database file e.g. `<some-db>.db`
- Add the `--mount` option to specify a volume mount.
- We will give the volume a name, and mount it to `/etc/todos` in the container
- This will capture all files created at the path.

```bash
docker volume create <name of the volume>
docker run -dp 9001:9001 --mount type=volume,src=<some-db>.db,target=/etc/todos getting-started
```

#### Where is Docker storing my data when I use a volume?

Use the `docker volume inspect` command to know:

```bash
$ docker volume inspect todo-db
[
    {
        "CreatedAt": "2019-09-26T02:18:36Z",
        "Driver": "local",
        "Labels": {},
        "Mountpoint": "/var/lib/docker/volumes/todo-db/_data",
        "Name": "todo-db",
        "Options": {},
        "Scope": "local"
    }
]
```

### Define Environment Variables

```bash
docker build -t mfe1 .
docker run -dp \
    9001:9001 \
    -e PORT=9001 \
    -e ENV_VARIABLE_1=app \
    -e ENV_VARIABLE_SECRETS=secret \
    mfe1
```

## Docker Network

In Docker Compose, a network is a way to enable communication between containers defined in your docker-compose.yml file. It provides a virtual network that allows containers to communicate with each other using their service names as hostnames, regardless of whether they are running on the same host or not.


#### Why use Docker Network?
- To allow one container to talk to another we use networking.
- We place two or more containers on the same network.

#### How Docker Network works?
- By default, Docker Compose creates a single network for your application.
- Each container in the Compose file automatically joins this network, allowing them to discover and communicate with each other using their service names.
- You can create custom networks to isolate different parts of your application or to connect containers across multiple Compose files.

#### Support for different network types
Docker supports different network drivers, including:
- **bridge:** The default driver, creating an isolated network on the host machine.
- **overlay:** Used for multi-host networking, allowing containers on different hosts to communicate.
- **host:** Uses the host machine's network stack, removing network isolation.

# Rancher

### Rancher throws errors
* `Command Not Found`
  * Meaning: An executable application e.g. Yarn, was not discovered. Install it and retry.
* `Gracefully stopping... (press Ctrl+C again to force)`
  * Solution: Read the error message carefully and take action appropriately
* `Error response from daemon: error while creating mount source path '<dir-name>/mfe4/node_modules': chown <dir-name>/node_modules: permission denied`
  * Solution: You need to provide permission to Rancher and allow access to folders, directories and files. It can be done with a `chmod` or `chown` command.
* `failed to solve: process "/bin/sh -c yarn install --frozen-lockfile" did not complete successfully: exit code: 1`
* `exit code: 1`
  * Meaning: This means that the process exited with an error. A successful run with zero errors would have exited with a exit code of zero.
* `ENOSPC`
  * Meaning: `ENOSPC` means that there is no space on the drive. If `/tmp` is full, then you can configure `npm` to use a different temp folder by changing the `npm config` command.
* `ENOSPC: System limit for number of file watchers reached`
  * Meaning: `ENOSPC` means that there is no space on the drive.
    * `echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`
    * Read more: https://stackoverflow.com/a/32600959/2458438 




# Kubectl Cheatsheet
```bash
# show merged kubeconfig settings.
kubectl config view

# display the first user
kubectl config view -o jsonpath='{.users[].name}'

# get a list of users
kubectl config view -o jsonpath='{.users[*].name}'

# set a cluster entry in the kubeconfig
kubectl config set-cluster my-cluster-name

# use multiple kubeconfig files at the same time and view merged config
KUBECONFIG=~/.kube/config:~/.kube/kubconfig2
```