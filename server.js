const ronin = require("ronin-server");
const mocks = require("ronin-mocks");

const server = ronin.server();

// Listens on port 8000 by default
server.use("/", mocks.server(server.Router(), false, true));
server.start();


/*
curl --request POST --url http://localhost:8000/test --header 'content-type: application/json' --data '{"msg": "testing" }'
{"code":"success","payload":[{"msg":"testing","id":"31f23305-f5d0-4b4f-a16f-6f4c8ec93cf1","createDate":"2020-08-28T21:53:07.157Z"}]} 
*/