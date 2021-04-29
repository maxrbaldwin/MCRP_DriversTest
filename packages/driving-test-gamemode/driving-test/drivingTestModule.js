const { checkpoints, carSpawn } = require('./checkpointData');

const driversTestMarkerId = 'drivers-test-marker';
const driversTestMarkerColTubeId = 'drivers-test-col-tube';
const driverTestCheckpointId = 'driversTestCheckpoint';
const endMarkerId = 'driversTestMarker';
const endMarkerColTubeId = 'driversTestEndColTube';
const carId = 'player-infernus';

let checkpointsForTest = []
let badLaps = [];

function setTestInWorld(player) {
  // Drivers test marker
  const driversTestStartMarkerLocation = 
  new mp.Vector3(59.8949089050293,17.051895141601562,69.16899871826172);
  const driverTestStartMarker = 
  mp.markers.new(36, driversTestStartMarkerLocation, 1.0);

  driverTestStartMarker.class = driversTestMarkerId;

  // Drivers test marker collision cube
  const driverTestColTube = mp.colshapes.newTube(
    driversTestStartMarkerLocation.x, 
    driversTestStartMarkerLocation.y, 
    driversTestStartMarkerLocation.z, 
    5.0,
    5.0,
  );

  // interaction function
  driverTestColTube.interaction = () => {
    // start test
    startTest(player);
  };

  driverTestColTube.class = driversTestMarkerColTubeId;
}

function unsetTestInWorld() {
  const marker = 
    mp.markers.toArray().find(marker => marker.class === driversTestMarkerId);
  const colTube = 
    mp.colshapes.toArray().find(colTube => colTube.class === driversTestMarkerColTubeId)
  
  marker.destroy();
  colTube.destroy();
}

function startTest(player) {
  const carOpts = {
    numberPlate: "LAMBO",
    heading: 250,
    color: [[0, 255, 0],[0, 255, 0]]
  };
  const car = mp.vehicles.new(mp.joaat("infernus"), carSpawn, carOpts);

  car.class = carId;

  checkpointsForTest = new checkpoints();
  badLaps = [];

  const firstCheckpoint = checkpointsForTest.next();
  createCheckpoint(firstCheckpoint);
  unsetTestInWorld();

  player.call('driving-test-message', ["Welcome to the driving test. You're being tested on speed. Keep each lap under 10 seconds if you want to pass"]);
};

function createCheckpoint(checkpointData) {
  const { vector } = checkpointData;
  const nextDestination = checkpointsForTest.getNext() || checkpoints[0].vector;
  const { x: directionX, y: directionY, z: directionZ } = nextDestination;
  const checkpoint = 
    mp.checkpoints.new(1, vector, 5, {
      direction: new mp.Vector3(directionX, directionY, directionZ),
      color: [ 255, 255, 255, 255 ],
      visible: true,
      dimension: 0
    });
  
  checkpoint.createdAt  = Date.now();

  checkpoint.class = driverTestCheckpointId;

  checkpoint.nextCheckpoint = () => {
    const nextCheckpointData = checkpointsForTest.next();
    
    if (checkpointsForTest.data.length > 0) {
      createCheckpoint(nextCheckpointData);
    } else {
      createEndMarker(nextCheckpointData);
    }
  }

  checkpoint.onPlayerEnteredCheckPoint = function(player, checkpoint) {
    const now = Date.now();
    const createdAt = checkpoint.createdAt;
    const duration = (now - createdAt);

    // https://stackoverflow.com/questions/19700283/how-to-convert-time-in-milliseconds-to-hours-min-sec-format-in-javascript
    let milliseconds = Math.floor((duration % 1000) / 100);
    let seconds = Math.floor((duration / 1000) % 60);
    let minutes = Math.floor((duration / (1000 * 60)) % 60);
    let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
    hours = (hours < 10) ? 0 + hours : hours;
    minutes = (minutes < 10) ? 0 + minutes : minutes;
    seconds = (seconds < 10) ? 0 + seconds : seconds;

    player.call('driving-test-message', [`lap time: ${minutes} : ${seconds} : ${milliseconds}`]);

    // if lap took less than a minute and less than 10 seconds
    if (minutes == 0 && seconds < 10) {
      player.call('driving-test-message', ['Keep up the pace']);
    } else {
      badLaps.push(true);
      player.call('driving-test-message', ['You can do better than that']);
    }
  };

  return checkpoint;
}

function createEndMarker(lastCheckpoint) {
  const { x, y, z } = lastCheckpoint.vector;
  const endMarkerVector = new mp.Vector3(x, y, z);
  const endMarkerColTube = mp.colshapes.newTube(
    x,
    y,
    z,
    5.0,
    5.0,
  );

  endMarkerColTube.class = endMarkerColTubeId;

  endMarkerColTube.execute = function(player) {
    endDriversTest(player);
  }

  const endMarker = mp.markers.new(4, endMarkerVector, 1.0);
  endMarker.class = endMarkerId;
};

function endDriversTest(player) {
  const car = mp.vehicles.toArray().find(car => car.class === carId);
  const endMarker = mp.markers.toArray().find(marker => marker.class === endMarkerId);
  const endMarkerColTube = mp.colshapes.toArray().find(colshape => colshape.class === endMarkerColTubeId);
  const message = badLaps.length >= 3 ? 'Sorry you failed. Try again' : "Congrats! You passed the driver's test."
  
  player.call('driving-test-message', [message]);

  car.destroy();
  endMarker.destroy();
  endMarkerColTube.destroy();
  
  setTestInWorld(player);
}

module.exports = {
  setTestInWorld,
  unsetTestInWorld,
  startTest,
  createCheckpoint,
}
