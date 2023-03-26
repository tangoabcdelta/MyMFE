# Run Individual Image

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

Run the following `docker ps` command in a terminal to list your containers.

```bash
docker ps
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
docker run -dp \
    9001:9001 \
    -e ENV_VARIABLE_1=app \
    -e ENV_VARIABLE_SECRETS=secret \
    mfe1
```

## Docker Network

- To allow one container to talk to another we use networking.
- We place two or more containers on the same network.
