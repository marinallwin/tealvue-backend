function detectSpike(ticks, config) {
  if (ticks.length < 2) {
    return null;
  }

  const oldest = ticks[0];
  const latest = ticks[ticks.length - 1];

  const changePercent =
    ((latest.price - oldest.price) / oldest.price) * 100;

  if (
    Math.abs(changePercent) >= config.thresholdPercent
  ) {

    console.log("SPIKE DETECTED");
    return {
      detected: true,
      reason: `Price moved ${changePercent.toFixed(
        2
      )}% within ${config.windowSec} seconds`
    };
  }

  return null;
}

module.exports = detectSpike;