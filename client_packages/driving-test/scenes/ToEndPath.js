const Checkpoints = require('./driving-test/scenes/Checkpoints.js');
const getCone = require('./driving-test/modules/getCone.js');
const {
  parkingTestInstructions,
  parkingInteractionInstructions,
  parkingPassedMessage,
  parkingFailedMessage,
} = require('./driving-test/modules/messages.js');

class ToEndPath extends Checkpoints {
  constructor(state) {
    super();
    this.state = state;
    this.connector = state.sceneConnections.last;
  }
  checkpoints = {
    drivePathCheckpointOne: {
      vector: new mp.Vector3(-730.7772827148438,-2383.900146484375,14.27053451538086),
      onPlayerEnteredCheckPoint: () => {
        this.createCheckpoint();
      }
    },
    drivePathCheckpointTwo: {
      vector: new mp.Vector3(-579.3468627929688,-2234.44677734375,5.356534004211426),
      onPlayerEnteredCheckPoint: () => {
        this.setSpeedTrap([-550.9947509765625,-2200.981201171875,6.03326416015625], [-501.9932861328125,-2144.17236328125,9.03331470489502])
        this.createCheckpoint();
      }
    },
    drivePathCheckpointThree: {
      vector: new mp.Vector3(-503.2786865234375,-2146.174072265625,8.57107162475586),
      onPlayerEnteredCheckPoint: () => {
        this.createCheckpoint();
      }
    },
    drivePathCheckpointFour: {
      vector: new mp.Vector3(-613.5726928710938,-2012.10791015625,5.759599685668945),
      onPlayerEnteredCheckPoint: () => {
        this.createCheckpoint();
      }
    },
    drivePathCheckpointFive: {
      vector: new mp.Vector3(-771.4902954101562,-1963.0179443359375,8.613525390625),
      onPlayerEnteredCheckPoint: () => {
        this.createCheckpoint();
        // set this for the very last checkpoint
        this.makeCones()
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
    this.createCheckpoint();
  }
  end = () => {
    this.removeSpeedTrap();
    this.cones.forEach(({ cone }) => cone.destroy());
    mp.events.call('end-driving-test', this.state);
  }
  giveInstruction = () => {
    mp.events.call('driving-test-message', parkingTestInstructions);
  }
  makeEndColshape = () => {
    const [x, y, z] = this.state.dynamicTest.endParkingTest.colShapeLocation;
    const colShapeLocation = new mp.Vector3(x, y, z);
    const colshape = mp.colshapes.newTube(colShapeLocation.x, colShapeLocation.y, colShapeLocation.z, 5.0, 5.0);

    colshape.execute = () => {
      mp.events.call('driving-test-text-on-screen', parkingInteractionInstructions);
    }

    colshape.exit = () => {
      mp.events.call('remove-driving-test-text-on-screen');
    }

    colshape.interaction = () => {
      const rotation = this.state.car.getHeading();
      const threshold = rotation < 61 && rotation > 30
      let pass = true;

      if (!threshold) {
        this.state.addStrike();
        pass = false;
      }

      const message = pass ? parkingPassedMessage : parkingFailedMessage;
      colshape.exit();
      colshape.destroy();
      mp.events.call('driving-test-message', message);
      this.end();
    }
  }
  makeCones = () => {
    this.cones = this.state.dynamicTest.endParkingTest.conesLocations.map(coneLocation => getCone(coneLocation));
  }
}

exports = ToEndPath