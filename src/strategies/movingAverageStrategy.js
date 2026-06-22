function detectMovingAverage(state, currentPrice, config) {
  const average = state.rollingSum / state.samples.length;

  const deviation = ((currentPrice - average) / average) * 100;

  if (Math.abs(deviation) >= config.deviationPercent) {
    console.log("MOVING AVERAGE DEVIATION DETECTED");

    return {
      detected: true,
      reason: `Price deviated ${deviation.toFixed(2)}% from moving average`,
    };
  }

  return null;
}

module.exports = detectMovingAverage;
