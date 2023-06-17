# Run

You can use the `proxy.sh` file at the root to run.
Alternatively, you can also use `npm start`. Both do (and must do) the exact same thing.

```bash
./proxy.sh
# OR
npm start

```

## What does the compose file do

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

### Data Persistence

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

- To allow one container to talk to another we use networking.
- We place two or more containers on the same network.
