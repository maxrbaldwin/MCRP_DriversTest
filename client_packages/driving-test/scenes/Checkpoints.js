// const getRandomCarType = require("../modules/getRandomCarType");

const noop = () => true;

// const driverTestCheckpointId = 'driversTestCheckpoint';

class Checkpoints {
  checkpoints = {}
  makeArray = obj => Object.keys(obj).map(key => obj[key]);
  checkpointsArray = this.makeArray(this.checkpoints);
  current = 0;
  // simple utils
  next = () => {
    const next = this.checkpointsArray[this.current];
    ++this.current
    return next;
  };
  getNext = () => this.checkpointsArray[this.current];
  getLast = () => this.checkpointsArray[this.checkpointsArray.length - 1]
  isLast = () => this.current === (this.checkpointsArray.length + 1);

  createCheckpoint = () => {
    const { vector, onPlayerEnteredCheckPoint } = this.next();
    const nextDestination = this.getNext() || this.connector || this.getLast();
    const { x: directionX, y: directionY, z: directionZ } = nextDestination.vector;
    const checkpoint = mp.checkpoints.new(1, vector, 5, {
      direction: new mp.Vector3(directionX, directionY, directionZ),
      color: [ 255, 255, 255, 255 ],
      visible: true,
      dimension: 0
    });
  
  
    // checkpoint.setVariable('class', driverTestCheckpointId);
  
    checkpoint.onPlayerEnteredCheckPoint = onPlayerEnteredCheckPoint || noop;
  }

  makeGhostCarSpawn = (colShapeCoordinates, carCoordinates, heading, speed = 20.0) => {
    const [x, y, z] = colShapeCoordinates
    const colShapeLocation = new mp.Vector3(x, y, z);
    
    const colshape = mp.colshapes.newTube(colShapeLocation.x, colShapeLocation.y, colShapeLocation.z, 5.0, 5.0);
    colshape.execute = function spawnGhostCar() {
      const carOpts = {
        numberPlate: "DNTSTLME",
        heading: heading,nnn
      };
      const [xx, yy, zz] = carCoordinates
      const ghostCarSpawn = new mp.Vector3(xx, yy, zz);
      const ghostCar = mp.vehicles.new(mp.game.joaat('emperor2'), ghostCarSpawn, carOpts);
      const ghostCarTimeout = setTimeout(() => {
        ghostCar.destroy();
        clearTimeout(ghostCarTimeout);
      }, 5000);
      colshape.destroy();
      mp.events.call('start-ghost-car', ghostCar, speed);
    }
  }
}

exports = Checkpoints;