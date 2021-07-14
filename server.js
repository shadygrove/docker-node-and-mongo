const ronin = require("ronin-server");
const mocks = require("ronin-mocks");

const server = ronin.server();

// Listens on port 8000 by default
server.use("/", mocks.server(server.Router(), false, true));
server.start();
