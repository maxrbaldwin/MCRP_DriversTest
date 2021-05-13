const Checkpoints = require('./driving-test/scenes/Checkpoints.js');
const getCone = require('./driving-test/modules/getCone.js');
const {
  parkingTestInstructions,
  parkingInteractionInstructions,
  parkingPassedMessage,
  parkingFailedMessage,
} = require('./driving-test/modules/messages.js');

class ParkingTest extends Checkpoints {
  constructor(state) {
    super();
    this.state = state;
    this.connector = state.sceneConnections.parkingToPparking
  }
  checkpoints = {
    entranceCheckpoint: {
      vector: new mp.Vector3(-877.8818969726562,-2253.07958984375,5.929435729980469),
      onPlayerEnteredCheckPoint: () => {
        this.createCheckpoint();
        this.makeTest();
      }
    },
    instructionsCheckpoint: {
      vector: () => {
        const [x, y, z] = this.state.dynamicTest.parkingTest.instructionsCheckpoint;
        return new mp.Vector3(x, y, z);
      },
      onPlayerEnteredCheckPoint: () => {
        this.giveInstruction();
      }
    },
    exitCheckpoint: {
      vector: new mp.Vector3(-873.9203491210938,-2251.524169921875,5.868188381195068),
      onPlayerEnteredCheckPoint: () => {
        this.end();
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
    mp.events.call('make-pparking-test', this.state);
  }
  giveInstruction = () => {
    mp.events.call('driving-test-message', parkingTestInstructions);
  }
  makeTest = () => {
    const [x, y, z] = this.state.dynamicTest.parkingTest.colShapeLocation;
    const colShapeLocation = new mp.Vector3(x, y, z);
    const colshape = mp.colshapes.newTube(colShapeLocation.x, colShapeLocation.y, colShapeLocation.z, 5.0, 5.0);

    this.makeCones();

    colshape.execute = () => {
      mp.events.call('driving-test-text-on-screen', parkingInteractionInstructions);
    }

    colshape.interaction = () => {
      const rotation = this.state.car.getHeading();
      const threshold = rotation < 255 && rotation > 225
      let pass = true;

      if (!threshold) {
        this.state.addStrike();
        pass = false;
      }

      const message = pass ? parkingPassedMessage : parkingFailedMessage;
      mp.events.call('driving-test-message', message);

      this.createExit();
      colshape.exit();
      colshape.destroy();
    }

    colshape.exit = () => {
      mp.events.call('remove-driving-test-text-on-screen');
    }
  }
  makeCones = () => {
    this.cones = this.state.dynamicTest.parkingTest.conesLocations.map(coneLocation => getCone(coneLocation));
  }
  createExit = () => {
    this.setSpeedTrap([-891.4762573242188,-2257.77783203125,6.709035396575928], [-875.7462768554688,-2251.3798828125,6.330464839935303]);
    this.createCheckpoint();
  }
}

exports = ParkingTest;