const getRandomCarType = require('./getRandomCarType');
// remove

// fixtures - random cars in the world that driving testees might run into
function setFixtures() {
  const kTurnCarOpts = {
    numberPlate: "DNTSTLME",
    heading: 225,
    locked: true,
  };
  const endCarOpts = {
    numberPlate: "DNTSTLME",
    heading: 45,
    locked: true,
  };
  const kTurnRandomCarOne = new mp.Vector3(-886.9999389648438,-2054.1494140625,8.815162658691406);
  const kTurnRandomCarTwo = new mp.Vector3(-889.0728149414062,-2056.93798828125,8.814573287963867);
  const kTurnRandomCarThree = new mp.Vector3(-891.9586181640625,-2058.97412109375,8.810067176818848);
  const endRandomCarOne = new mp.Vector3(-943.2116088867188,-2081.359130859375,8.805419921875);
  const endRandomCarTwo = new mp.Vector3(-947.9483642578125,-2086.322509765625,8.804841041564941);
  // reset these cars position when the user starts the test incase they are moved by damage
  mp.vehicles.new(mp.joaat(getRandomCarType()), kTurnRandomCarOne, kTurnCarOpts).setVariable('class', 'randomCarFixture');
  mp.vehicles.new(mp.joaat(getRandomCarType()), kTurnRandomCarTwo, kTurnCarOpts).setVariable('class', 'randomCarFixture');
  mp.vehicles.new(mp.joaat(getRandomCarType()), kTurnRandomCarThree, kTurnCarOpts).setVariable('class', 'randomCarFixture');
  mp.vehicles.new(mp.joaat(getRandomCarType()), endRandomCarOne, endCarOpts).setVariable('class', 'randomCarFixture');
  mp.vehicles.new(mp.joaat(getRandomCarType()), endRandomCarTwo, endCarOpts).setVariable('class', 'randomCarFixture');
};

module.exports = setFixtures;
