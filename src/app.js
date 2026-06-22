const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const alertsRoute =
  require("./routes/alerts");

const apiKey =
  require("./middleware/apiKey");

const app = express();

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use(
  "/api/alerts",
  apiKey,
  alertsRoute
);

module.exports = app;