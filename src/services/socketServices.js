const { io } = require("socket.io-client");

const anomalyService = require("./anomalyService");

const symbolConfigs = require("../config/symbols.json");

const realtimeService = require("./realtimeService");

function startSocket() {
  const socket = io(process.env.TEALVUE_SOCKET_URL, {
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log("Connected");

    const symbols = Object.keys(symbolConfigs);

    socket.emit("subscribe", symbols);
  });

  socket.on("ticker", (tick) => {
    // console.log("TICK:", tick);

    realtimeService.broadcastPrice(tick);

    anomalyService.processTick(tick);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected");
  });

  socket.on("connect_error", (err) => {
    console.log(err.message);
  });
}

module.exports = {
  startSocket,
};
