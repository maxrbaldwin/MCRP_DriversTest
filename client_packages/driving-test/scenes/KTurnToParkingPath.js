const Checkpoints = require('./driving-test/scenes/Checkpoints.js');

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
        this.createCheckpoint();
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
    this.setSpeedTrap([-939.2273559570312,-2127.76513671875,9.294723510742188], [-958.2398681640625,-2151.51171875,8.921868324279785]);
    this.createCheckpoint();
  }
  end = () => {
    this.removeSpeedTrap();
    mp.events.call('make-parking-test', this.state);
  }
}

exports = KTurnToParkingPath;
