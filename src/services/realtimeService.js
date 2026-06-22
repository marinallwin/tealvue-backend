let ioInstance = null;

function initialize(io) {
  ioInstance = io;

  io.on("connection", (socket) => {
    console.log(`Frontend connected: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`Frontend disconnected: ${socket.id}`);
    });
  });
}

function broadcastPrice(tick) {
  if (!ioInstance) return;

  ioInstance.emit("price-update", {
    symbol: tick.SYMBOL,
    price: Number(tick.ATP),
    timestamp: tick.TS,
  });
}

function broadcastAlert(alert) {
  if (!ioInstance) return;

  ioInstance.emit("alert", alert);
}

module.exports = {
  initialize,
  broadcastPrice,
  broadcastAlert,
};
