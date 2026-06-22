const express = require("express");

const router = express.Router();

const alertService = require(
  "../services/alertService"
);

router.get("/", (req, res) => {
  const alerts =
    alertService.getLast10Alerts();

  res.json(alerts);
});

module.exports = router;