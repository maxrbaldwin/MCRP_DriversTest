// need?
const driversTestMarkerId = 'drivers-test-marker';
const driversTestMarkerColTubeId = 'drivers-test-col-tube';

// need?
const idVariable = 'class';

// setMarkerInWorld
function setTestInWorld() {
  // Drivers test marker
  const driversTestStartMarkerLocation = new mp.Vector3(-914.9954833984375,-2038.460693359375,9.404977798461914);
  const driverTestStartMarker = mp.markers.new(36, driversTestStartMarkerLocation, 1.0);
  
  driverTestStartMarker.setVariable(idVariable, driversTestMarkerId)

  // Drivers test marker collision cube
  const driverTestColTube = mp.colshapes.newTube(
    driversTestStartMarkerLocation.x,
    driversTestStartMarkerLocation.y,
    driversTestStartMarkerLocation.z, 
    5.0, 5.0);
  driverTestColTube.setVariable(idVariable, driversTestMarkerColTubeId);

  driverTestColTube.interaction = function startTest(player) {
    if (player.isInDrivingTest) return

    mp.events.call('start-driving-test', player);
  };
}

module.exports = {
  setTestInWorld
}