const Checkpoints = require("./Checkpoints");

class ToEndPath extends Checkpoints {
  constructor(state) {
    super();
    this.state = state;
  }
  checkpoints = {
    drivePathCheckpointOne: {
      vector: new mp.Vector3(-730.7772827148438,-2383.900146484375,14.27053451538086),
      onPlayerEnteredCheckPoint: () => {
        this.createCheckpoint(this.state.player);
      }
    },
    drivePathCheckpointTwo: {
      vector: new mp.Vector3(-579.3468627929688,-2234.44677734375,5.356534004211426),
      onPlayerEnteredCheckPoint: () => {
        const colshapeLocation = [-525.083984375,-2171.685791015625,6.167017459869385];
        const ghostCarLocation = [-549.4779663085938,-2089.080322265625,7.4100341796875];
        this.createCheckpoint(this.state.player);
        this.makeGhostCarSpawn(colshapeLocation, ghostCarLocation, 225, 50.0);
      }
    },
    drivePathCheckpointThree: {
      vector: new mp.Vector3(-503.2786865234375,-2146.174072265625,8.57107162475586),
      onPlayerEnteredCheckPoint: () => {
        this.createCheckpoint(this.state.player);
      }
    },
    drivePathCheckpointFour: {
      vector: new mp.Vector3(-613.5726928710938,-2012.10791015625,5.759599685668945),
      onPlayerEnteredCheckPoint: () => {
        this.createCheckpoint(this.state.player);
      }
    },
    drivePathCheckpointFive: {
      vector: new mp.Vector3(-771.4902954101562,-1963.0179443359375,8.613525390625),
      onPlayerEnteredCheckPoint: () => {
        this.createCheckpoint(this.state.player);
        // set this for the very last checkpoint
        this.connector = new mp.Vector3(-945.752685546875,-2083.864501953125,8.805005073547363);
      }
    },
    drivePathCheckpointEnd: {
      vector: new mp.Vector3(-942.9615478515625,-2121.166259765625,8.822630882263184), 
      onPlayerEnteredCheckPoint: () => {
        this.giveInstruction();
        this.makeEndColshape();
      }
    }
  }
  checkpointsArray = this.makeArray(this.checkpoints);
  make = () => {
    this.createCheckpoint(this.state.player);
  }
  end = () => {
    console.log('end');
    // call test end maybe on checkpoints class? - call a test end event
    mp.events.call('end-drivers-test');
  }
  giveInstruction = () => {
    const message = "Please park the car between those two cars."
    this.state.player.call('driving-test-message', [message]);
  }
  makeEndColshape = () => {
    const colShapeLocation = new mp.Vector3(-945.752685546875,-2083.864501953125,8.805005073547363);
    
    const colshape = mp.colshapes.newTube(colShapeLocation.x, colShapeLocation.y, colShapeLocation.z, 5.0, 5.0);

    colshape.interaction = () => {
      const { z: rotation } = this.state.car.rotation
      const threshold = rotation < 61 && rotation > 30
      let pass = true;

      if (!threshold) {
        this.state.addStrike();
        pass = false;
      }

      const message = pass ? 'You passed the general parking test!' : 'You failed the general parking test!'
      this.state.player.call('driving-test-message', [message]);
      this.end();
      colshape.exit();
      colshape.destroy();
    }

    colshape.execute = () => {
      const text = "Flex your Y muscle when you think you are parked correctly"
      this.state.player.call('driving-test-text-on-screen', [text]);
    }

    colshape.exit = () => {
      this.state.player.call('remove-driving-test-text-on-screen');
    }
  }
}

module.exports = ToEndPath