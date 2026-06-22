require("dotenv").config();

const app = require("./src/app");

const http = require("http");

const { Server } = require("socket.io");

const realtimeService = require("./src/services/realtimeService");

const { startSocket } = require("./src/services/socketServices");

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

realtimeService.initialize(io);

startSocket();

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
