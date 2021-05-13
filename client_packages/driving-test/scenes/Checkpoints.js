const { speedTrapInstructions, speedTrapFailMessage } = require('./driving-test/modules/messages.js');

const noop = () => true;

class Checkpoints {
  checkpoints = {}
  makeArray = obj => Object.keys(obj).map(key => obj[key]);
  checkpointsArray = this.makeArray(this.checkpoints);
  current = 0;
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
    const currentVector = this.unWrapVector(vector);
    const nextDestinationVector = this.unWrapVector(nextDestination.vector);
    const { x: directionX, y: directionY, z: directionZ } = nextDestinationVector;
    const checkpoint = mp.checkpoints.new(1, currentVector, 5, {
      direction: new mp.Vector3(directionX, directionY, directionZ),
      color: [ 255, 255, 255, 255 ],
      visible: true,
      dimension: 0
    });
  
    checkpoint.onPlayerEnteredCheckPoint = onPlayerEnteredCheckPoint || noop;
  }
  unWrapVector = vector => typeof vector === 'function' ? vector() : vector;
  setSpeedTrap = (trapStartCoordinates, trapCoordinates) => {
    const [x, y, z] = trapStartCoordinates;
    const [xx, yy, zz] = trapCoordinates;

    const trapStartLocation = new mp.Vector3(x, y, z);
    const trapLocation = new mp.Vector3(xx, yy, zz);

    const trapStart = mp.colshapes.newTube(trapStartLocation.x, trapStartLocation.y, trapStartLocation.z, 10.0, 10.0);
    const trap = mp.colshapes.newTube(trapLocation.x, trapLocation.y, trapLocation.z, 10.0, 10.0);

    trapStart.execute = () => {
      mp.events.call('driving-test-message', speedTrapInstructions);
      this.speed = this.state.car.getSpeed();
    }

    trap.execute = () => {
      if (this.state.car.getSpeed() > this.speed) {
        this.state.addStrike();
        mp.events.call('driving-test-message', speedTrapFailMessage);
      }
    }

    this.trapStart = trapStart;
    this.trap = trap;
  }
  removeSpeedTrap = () => {
    this.trapStart.destroy();
    this.trap.destroy();
  }
}

exports = Checkpoints;