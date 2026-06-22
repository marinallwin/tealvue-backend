const generateAlertRef = require("../utils/generateAlertRef");

const realtimeService = require("./realtimeService");

const alerts = [];

function createAlert(symbol, timestamp, reason) {
  const alert = {
    alertRef: generateAlertRef(),
    symbol,
    timestamp,
    reason,
  };

  alerts.push(alert);

  realtimeService.broadcastAlert(
  alert
);

  if (alerts.length > 100) {
    alerts.shift();
  }

//   console.log("ALERT:", alert);

  return alert;
}

function getLast10Alerts() {
  return alerts.slice(-10).reverse();
}

module.exports = {
  createAlert,
  getLast10Alerts,
};
