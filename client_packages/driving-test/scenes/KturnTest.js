const Checkpoints = require('./driving-test/scenes/Checkpoints.js');
const getCone = require('./driving-test/modules/getCone.js');
const { kturnPassedMessage, kturnFailedMessage } = require('./driving-test/modules/messages.js');

class KTurnTestScene extends Checkpoints {
  constructor(state) {
    super();
    this.state = state;
    this.connector = state.sceneConnections.kTurnToPath
  }
  checkpoints = {
    kturnEndCheckpoint: {
      vector: new mp.Vector3(-942.7317504882812,-2122.10400390625,8.830317497253418),
      onPlayerEnteredCheckPoint: () => {
        this.end();
      }
    }
  }
  checkpointsArray = this.makeArray(this.checkpoints);
  make = () => {
    this.createCheckpoint(this.state.player);
  }
  end = () => {
    const car = this.state.car;

    const rotation = car.getHeading();
    const threshold = rotation < 310 && rotation > 130;
    let pass = true;

    if (!threshold) {
      this.state.addStrike();
      pass = false;
    }

    const message = pass ? kturnPassedMessage : kturnFailedMessage;
    mp.events.call('driving-test-message', message);
    mp.events.call('make-kturn-to-parking-path', this.state);
  }
}

exports = KTurnTestScene;
