# Docker Node Demo

Based on [Docker Node tutorial](https://docs.docker.com/language/nodejs/build-images/)

This project shows how to use Docker Composer to build and run multiple containers that are dependent on each other. In this case we have a Node API that uses a MongoDB container to store and retrieve notes.

### Important

Before you do any docker builds, make sure you have BuildKit enabled

Windows:  
`C:\ProgramData\Docker\config\daemon.json`

Mac:  
`/etc/docker/daemon.json`

```json
{
  "features": { "buildkit": true }
}
```

#### De-alias Curl on Windows

The curl commands below will not work in Windows PowerShell as the [curl command is aliased](https://stackoverflow.com/questions/28128918/positional-parameter-error-when-posting-data-with-curl) to `Invoke-WebRequest`

Either "de-alias" the curl command or run in a Unix shell such as Git Bash

> Recommend using Git Bash has PowerShell doesn't seem to like the JSON in the curl commands used here.

### The App

To run the API directly via Node use:  
`node server.js`

## Helpful Docker Tips

Remove Dangling images (created by Docker Compose):

```
docker rmi $(docker images -f "dangling=true" -q)
```

List Volumes and Networks

```
docker volume ls
docker network ls
```

## Build and Run w/ Docker Commands

To build the Dockerfile and creat a Docker image:

```
docker build --tag mb/node-docker .
```

### Running Docker Image

```
docker run --name jolly_wilbur --detach --publish 8000:8000 mb/node-docker
```

(name is optional)

```
# Clean up containers
docker ps
docker rm <container-name>
```

### Test The Server API

Make a POST request:

```
curl --request POST --url http://localhost:8000/test --header 'content-type: application/json' --data '{"msg": "testing" }'
```

Make a GET request:

```
curl http://localhost:8000/test
```

## Running With MongoDB

### First: Setup MongoDB in Docker

Setup volumes

```
$ docker volume create mongodb
$ docker volume create mongodb_config
```

Setup network

```
docker network create mongodb
```

Run Mongo DB on network

```
$ docker run -it --rm -d -v mongodb:/data/db -v mongodb_config:/data/configdb -p 27017:27017 --network mongodb --name mongodb mongo
```

### Then: Run App With a Network for MongoDB Connectivity

```
$ docker run -it --rm -d --network mongodb --name jolly_wilbur_server -p 8000:8000 -e CONNECTIONSTRING=mongodb://mongodb:27017/yoda_notes mb/node-docker
```

> See below for test API calls for saving and retrieving notes in the database

## Simplified With Docker Compose

See the [Docker Compose section](https://docs.docker.com/language/nodejs/develop/#use-compose-to-develop-locally) of the tutorial

```
$ docker-compose -f docker-compose.dev.yml up --build
( --build means build images before starting containers )
```

#### Compose To Run Tests

```
$ docker-compose -f docker-compose.dev.yml run notes-test npm run test
```

#### Compose To Run App

```
$ docker-compose -f docker-compose.dev.yml run notes npm run start
```

## Testing The API

### API Commands

Make a POST request:

```
curl --request POST --url http://localhost:8000/test --header 'content-type: application/json' --data '{"msg": "testing" }'
```

Make a GET request:

```
curl http://localhost:8000/test
```

### To Test Server w/ DB

#### Get Notes

```
curl --request GET --url http://localhost:8000/notes
```

Endpoint for debug breakpoint

```
curl --request GET --url http://localhost:8000/foo
```

#### Save A Note

```
curl --request POST --url http://localhost:8000/notes --header 'content-type: application/json' --data '{ "name": "this is a note", "text": "this is a note that I wanted to take while I was working on writing a blog post.", "owner": "peter" }'
```

Expected Response:

```json
{
  "code": "success",
  "payload": {
    "_id": "5efd0a1552cd422b59d4f994",
    "name": "this is a note",
    "text": "this is a note that I wanted to take while I was working on writing a blog post.",
    "owner": "peter",
    "createDate": "2020-07-01T22:11:33.256Z"
  }
}
```

# Test Setup

```
$ docker build -t mb/node-docker --target test .

$ docker run -it --rm -p 8000:8000 mb/node-docker
```
