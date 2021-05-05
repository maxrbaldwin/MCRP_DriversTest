const TestState = require("../scenes/TestState");

const driversTestMarkerId = 'drivers-test-marker';
const driversTestMarkerColTubeId = 'drivers-test-col-tube';
const carId = 'player-infernus';

const idVariable = 'class';

function setTestInWorld(player) {
  // Drivers test marker
  const driversTestStartMarkerLocation = new mp.Vector3(-914.9954833984375,-2038.460693359375,9.404977798461914);
  const driverTestStartMarker = mp.markers.new(36, driversTestStartMarkerLocation, 1.0);
  
  driverTestStartMarker.setVariable(idVariable, driversTestMarkerId)

  // Drivers test marker collision cube
  const driverTestColTube = mp.colshapes.newTube(
    driversTestStartMarkerLocation.x,
    driversTestStartMarkerLocation.y,
    driversTestStartMarkerLocation.z, 
    5.0, 5.0,);
  driverTestColTube.setVariable(idVariable, driversTestMarkerColTubeId);
  // interaction function - onInteraction
  driverTestColTube.interaction = function startTest(player) {
    const carOpts = {
      numberPlate: "TESTDRVR",
      heading: -50,
      color: [[255, 207, 32],[255, 207, 32]]
    };
    const testCarSpawn = new mp.Vector3(-889.7205200195312,-2041.5238037109375,8.805951118469238);
    const car = mp.vehicles.new(mp.joaat("dilettante"), testCarSpawn, carOpts);
    player.car = car;
    const State = new TestState(car, player);
    
    car.setVariable(idVariable, carId);
    
    car.onEnterCar = function kTurnTestMessage(player) {
      const message = 'Perform a proper k-turn. Any damage to the car will result in a strike';
      player.call('driving-test-message', [message]);
    }
    
    unsetTestInWorld(player);
  
    mp.events.call('make-kturn-test', State);
  };
}

// set someone else is taking the test
function unsetTestInWorld(player) {
  const marker = mp.markers.toArray().find(marker => marker.getVariable(idVariable) === driversTestMarkerId);
  const colTube =  mp.colshapes.toArray().find(colTube => colTube.getVariable(idVariable) === driversTestMarkerColTubeId);

  player.interaction = () => true;
  marker.destroy();
  colTube.destroy();
}

module.exports = {
  setTestInWorld,
  unsetTestInWorld,
}