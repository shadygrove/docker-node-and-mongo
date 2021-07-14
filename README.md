# Docker Node Demo

Based on [Docker Node tutorial](https://docs.docker.com/language/nodejs/build-images/)  


## Building Docker Image
To build the Dockerfile and creat a Docker image:  
```
docker build --tag mb/node-docker .
```

## Running Docker Image
```
docker run --detach --publish 8000:8000 mb/node-docker --name jolly_wilbur
```
(name is optional)

```
# Clean up containers
docker ps
docker rm <container-name>
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

