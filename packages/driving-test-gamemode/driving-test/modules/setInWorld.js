// need?
const driversTestMarkerId = 'drivers-test-marker';
const driversTestMarkerColTubeId = 'drivers-test-col-tube';
const carId = 'player-vehicle';

// need?
const idVariable = 'class';

// setMarkerInWorld
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
    unsetTestInWorld(player);

    player.call('start-driving-test');
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