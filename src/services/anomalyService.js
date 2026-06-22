const symbolConfigs = require("../config/symbols.json");

const detectSpike = require("../strategies/spikeStrategy");
const detectMovingAverage = require("../strategies/movingAverageStrategy");

const alertService = require("./alertService");

const symbolState = {};

function processTick(tick) {
  const symbol = tick.SYMBOL;

  const config = symbolConfigs[symbol];

  if (!config) {
    return;
  }

  if (!symbolState[symbol]) {
    symbolState[symbol] = {
      ticks: [],
      samples: [],
      rollingSum: 0,
    };
  }

  const state = symbolState[symbol];

  const currentPrice = Number(tick.ATP);

  if (Number.isNaN(currentPrice)) {
    console.error(
      "Invalid price received:",
      tick
    );
    return;
  }

  const currentTime = new Date(tick.TS);

  console.log(
    "Processing:",
    symbol,
    currentPrice
  );

  if (config.strategy === "spike") {
    state.ticks.push({
      price: currentPrice,
      ts: currentTime,
    });

    const cutoff =
      currentTime.getTime() -
      config.windowSec * 1000;

    while (
      state.ticks.length &&
      state.ticks[0].ts.getTime() < cutoff
    ) {
      state.ticks.shift();
    }

    const result = detectSpike(
      state.ticks,
      config
    );

    if (result) {
      alertService.createAlert(
        symbol,
        tick.TS,
        result.reason
      );
    }
  }

  if (config.strategy === "movingAverage") {
    state.samples.push(currentPrice);

    state.rollingSum += currentPrice;

    if (
      state.samples.length >
      config.sampleSize
    ) {
      const removed =
        state.samples.shift();

      state.rollingSum -= removed;
    }

    if (
      state.samples.length ===
      config.sampleSize
    ) {
      const result =
        detectMovingAverage(
          state,
          currentPrice,
          config
        );

      if (result) {
        alertService.createAlert(
          symbol,
          tick.TS,
          result.reason
        );
      }
    }
  }
}

module.exports = {
  processTick,
};