# Docker Node Demo

Based on [Docker Node tutorial](https://docs.docker.com/language/nodejs/build-images/)  

## Tips
Remove Dangling images:
```
docker rmi $(docker images -f "dangling=true" -q)
```

## Building Docker Image
To build the Dockerfile and creat a Docker image:  
```
docker build --tag mb/node-docker .
```

## Running Docker Image
```
docker run --name jolly_wilbur --detach --publish 8000:8000 mb/node-docker 
```
(name is optional)

```
# Clean up containers
docker ps
docker rm <container-name>
```

### To Run With DB Connection
```
$ docker run -it --rm -d --network mongodb --name jolly_wilbur_server -p 8000:8000 -e CONNECTIONSTRING=mongodb://mongodb:27017/yoda_notes mb/node-docker
```

## Docker Mongo DB
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

## Docker Compose
```
$ docker-compose -f docker-compose.dev.yml up --build
( --build means build images before starting containers )
```

#### Compose To Run Tests
```
$ docker-compose -f docker-compose.dev.yml run notes npm run test
```

#### Compose To Run App
```
$ docker-compose -f docker-compose.dev.yml run notes npm run test
```

## Running App Locally
To run the server:  
`node server.js`

### To Test The Server
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
