const carTypes = ['ingot', 'stanier', 'emperor2'];

module.exports = function getRandomCarType() {
  return carTypes[Math.floor(Math.random() * carTypes.length)];
}