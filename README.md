# Docker Node Demo

Based on [Docker Node tutorial](https://docs.docker.com/language/nodejs/build-images/)  


## Running App
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

