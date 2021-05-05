const Checkpoints = require('./Checkpoints');

class KTurnToParkingPath extends Checkpoints {
  constructor(state) {
    super();
    this.state = state;
    this.connector = state.sceneConnections.pathToParking
  }
  checkpoints = {
    kTurnToParkingPathCpOne: {
      vector: new mp.Vector3(-955.4210815429688,-2144.494384765625,8.34027099609375),
      onPlayerEnteredCheckPoint: () => {
        this.createCheckpoint(this.state.player);
      }
    },
    kTurnToParkingPathCpTwo: {
      vector: new mp.Vector3(-949.2332153320312,-2167.268798828125,8.427837371826172),
      onPlayerEnteredCheckPoint: () => {
        this.end();
      }
    }
  }
  checkpointsArray = this.makeArray(this.checkpoints);
  make = () => {
    const colshapeLocation = [-944.1925659179688,-2132.5068359375,8.71610164642334];
    const ghostCarLocation = [-910.6793212890625,-2198.818115234375,6.123366355895996];
    this.createCheckpoint(this.state.player);
    this.makeGhostCarSpawn(colshapeLocation, ghostCarLocation, 45, 40.0);
  }
  end = () => {
    mp.events.call('make-parking-test', this.state);
  }
}

module.exports = KTurnToParkingPath;
