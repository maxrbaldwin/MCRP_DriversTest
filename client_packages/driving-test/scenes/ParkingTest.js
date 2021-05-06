const Checkpoints = require('./driving-test/scenes/Checkpoints.js');

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
      vector: new mp.Vector3(-901.7473754882812,-2258.992431640625,6.202260494232178),
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
    this.carOne.destroy();
    this.carTwo.destroy();
    mp.events.call('make-pparking-test', this.state);
  }
  giveInstruction = () => {
    const message = "Park between the two cars. Try to park as straight as possible"
    mp.events.call('driving-test-message', message);
  }
  makeTest = () => {
    const carOpts = {
      numberPlate: "DNTSTLME",
      heading: 240,
    };
    
    const carOneSpawn = new mp.Vector3(-905.263427734375,-2273.96875,6.214130878448486);
    this.carOne = mp.vehicles.new(mp.game.joaat('emperor2'), carOneSpawn, carOpts);
    
    const carTwoSpawn = new mp.Vector3(-908.4777221679688,-2279.995849609375,6.214382648468018);
    this.carTwo = mp.vehicles.new(mp.game.joaat('emperor2'), carTwoSpawn, carOpts);

    const colShapeLocation = new mp.Vector3(-906.9380493164062,-2277.127197265625,6.214624404907227);
    const colshape = mp.colshapes.newTube(colShapeLocation.x, colShapeLocation.y, colShapeLocation.z, 5.0, 5.0);

    colshape.execute = () => {
      const text = "Flex your Y muscle when you think you are parked correctly"
      
      mp.events.call('driving-test-text-on-screen', text);
    }

    colshape.interaction = () => {
      const rotation = this.state.car.getHeading();
      const threshold = rotation < -101 && rotation > -150
      let pass = true;

      if (!threshold) {
        this.state.addStrike();
        pass = false;
      }

      const message = pass ? 'You passed the general parking test!' : 'You failed the parking test!'
      mp.events.call('driving-test-message', message);

      this.createExit();
      colshape.exit();
      colshape.destroy();
    }

    colshape.exit = () => {
      mp.events.call('remove-driving-test-text-on-screen');
    }
  }
  createExit = () => {
    const colshapeLocation = [-882.7581787109375,-2257.839111328125,6.215065956115723]
    const ghostCarLocation = [-858.5167236328125,-2258.404541015625,6.52133846282959];
    this.createCheckpoint();
    this.makeGhostCarSpawn(colshapeLocation, ghostCarLocation, 45, 30.0);
  }
}

exports = ParkingTest;