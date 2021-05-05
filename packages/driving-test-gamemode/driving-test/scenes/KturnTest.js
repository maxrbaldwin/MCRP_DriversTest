const Checkpoints = require('./Checkpoints');

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
    const { z: rotation } = this.state.car.rotation
    const threshold = rotation < -40 || rotation > 130;
    let pass = true;

    if (!threshold) {
      this.state.addStrike();
      pass = false;
    }

    const message = pass ? 'You passed the K-turn test!' : 'You failed the K-Turn test!'
    this.state.player.call('driving-test-message', [message]);
    mp.events.call('make-kturn-to-parking-path', this.state);
  }
}

module.exports = KTurnTestScene;
