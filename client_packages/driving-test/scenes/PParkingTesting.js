const Checkpoints = require('./driving-test/scenes/Checkpoints.js');
const getCone = require('./driving-test/modules/getCone.js');
const {
  pParkingInstructions,
  parkingInteractionInstructions,
  pParkingPassedMessage,
  pParkingFailedMessage,
} = require('./driving-test/modules/messages.js');

class PParkingTest extends Checkpoints {
  constructor(state) {
    super();
    this.state = state;
    this.connector = state.sceneConnections.kParkingToEnd
  }
  checkpoints = {
    pParkingPath: {
      vector: new mp.Vector3(-837.153564453125,-2279.083251953125,7.862337112426758),
      onPlayerEnteredCheckPoint: () => {
        this.createCheckpoint();
      }
    },
    pParkingEntrance: {
      vector: new mp.Vector3(-776.4109497070312,-2354.146728515625,14.083645820617676),
      onPlayerEnteredCheckPoint: () => {
        this.makeTest();
        this.createCheckpoint();
      }
    },
    pParkingInstructions: {
      vector: () => {
        const [x, y, z] = this.state.dynamicTest.pParkingTest.instructionsCheckpoint;
        return new mp.Vector3(x, y, z);
      },
      onPlayerEnteredCheckPoint: () => {
        this.giveInstructions();
      }
    },
    pParkingExit: {
      vector: new mp.Vector3(-773.6486206054688,-2352.66650390625,14.199882507324219),
      onPlayerEnteredCheckPoint: () => {
        this.end()
      }
    }
  }
  checkpointsArray = this.makeArray(this.checkpoints);
  make = () => {
    this.createCheckpoint();
  }
  end = () => {
    this.cones.forEach(({ cone }) => cone.destroy());
    mp.events.call('make-path-to-end', this.state);
  }
  makeTest = () => {
    const [x, y, z] = this.state.dynamicTest.pParkingTest.colShapeLocation;
    const colShapeLocation = new mp.Vector3(x, y, z);
    const colshape = mp.colshapes.newTube(colShapeLocation.x, colShapeLocation.y, colShapeLocation.z, 3.0, 3.0);

    this.makeCones();

    colshape.interaction = () => {
      const rotation = this.state.car.getHeading();
      const threshold = rotation < 260 && rotation > 220
      let pass = true;

      if (!threshold) {
        this.state.addStrike();
        pass = false;
      }

      const message = pass ? pParkingPassedMessage : pParkingFailedMessage;
      mp.events.call('driving-test-message', message);

      this.createExit();
      colshape.exit();
      colshape.destroy();
    }

    colshape.execute = () => {
      mp.events.call('driving-test-text-on-screen', parkingInteractionInstructions);
    }

    colshape.exit = () => {
      mp.events.call('remove-driving-test-text-on-screen');
    }
  }
  makeCones = () => {
    this.cones = this.state.dynamicTest.pParkingTest.conesLocations.map(coneLocation => getCone(coneLocation));
  }
  giveInstructions = () => {
    mp.events.call('driving-test-message', pParkingInstructions);
  }
  createExit = () => {
    this.createCheckpoint();
  }
}

exports = PParkingTest;