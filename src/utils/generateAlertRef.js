function generateAlertRef() {
  const random = Math.random()
    .toString(36)
    .substring(2, 7)
    .toUpperCase();

  return `TV-${random}`;
}

module.exports = generateAlertRef;