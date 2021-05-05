const getRandomCarType = require("../modules/getRandomCarType");

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

  createCheckpoint = player => {
    const checkpoint = this.next();
    const nextDestination = this.getNext() || this.connector || this.getLast();

    player.call('create-checkpoint', [checkpoint, nextDestination]);
  }

  makeGhostCarSpawn = (colShapeCoordinates, carCoordinates, heading, speed = 20.0) => {
    const [x, y, z] = colShapeCoordinates
    const colShapeLocation = new mp.Vector3(x, y, z);
    
    const colshape = mp.colshapes.newTube(colShapeLocation.x, colShapeLocation.y, colShapeLocation.z, 5.0, 5.0);
    colshape.execute = function spawnGhostCar(player) {
      const carOpts = {
        numberPlate: "DNTSTLME",
        heading: heading,
      };
      const [xx, yy, zz] = carCoordinates
      const ghostCarSpawn = new mp.Vector3(xx, yy, zz);
      const ghostCar = mp.vehicles.new(mp.joaat(getRandomCarType()), ghostCarSpawn, carOpts);
      const ghostCarTimeout = setTimeout(() => {
        ghostCar.destroy();
        clearTimeout(ghostCarTimeout);
      }, 5000);
      colshape.destroy();
      player.call('start-ghost-car', [ghostCar, speed]);
    }
  }
}

module.exports = Checkpoints;