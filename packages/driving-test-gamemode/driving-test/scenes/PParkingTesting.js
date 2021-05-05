const Checkpoints = require("./Checkpoints");

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
        this.createCheckpoint(this.state.player);
      }
    },
    pParkingEntrance: {
      vector: new mp.Vector3(-776.4109497070312,-2354.146728515625,14.083645820617676),
      onPlayerEnteredCheckPoint: () => {
        this.makeTest();
        this.createCheckpoint(this.state.player);
      }
    },
    pParkingInstructions: {
      vector: new mp.Vector3(-803.5951538085938,-2387.331787109375,14.076581954956055),
      onPlayerEnteredCheckPoint: () => {
        this.giveInstructions();
      }
    },
    pParkLeavingCheckpoint: {
      vector: new mp.Vector3(-794.2955932617188,-2393.616455078125,14.077728271484375),
      onPlayerEnteredCheckPoint: () => {
        const colshapeSpawn = [-782.499267578125,-2361.3349609375,14.07564640045166];
        const ghostCarSpawn = [-729.42822265625,-2385.628662109375,14.225735664367676];
        this.createCheckpoint(this.state.player);
        this.makeGhostCarSpawn(colshapeSpawn, ghostCarSpawn, 45, 50.0);
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
    this.createCheckpoint(this.state.player);
  }
  end = () => {
    mp.events.call('make-path-to-end', this.state);
  }
  makeTest = () => {
    const carOpts = {
      numberPlate: "DNTSTLME",
      heading: 240,
    };

    const carOneSpawn = new mp.Vector3(-797.1158447265625,-2399.919921875,14.076704025268555);
    this.carOne = mp.vehicles.new(mp.joaat('emperor2'), carOneSpawn, carOpts);
    
    const carTwoSpawn = new mp.Vector3(-786.9547729492188,-2405.78271484375,14.076220512390137);
    this.carTwo = mp.vehicles.new(mp.joaat('emperor2'), carTwoSpawn, carOpts);

    const colShapeLocation = new mp.Vector3(-791.9942626953125,-2402.876708984375,14.076385498046875);
    const colshape = mp.colshapes.newTube(colShapeLocation.x, colShapeLocation.y, colShapeLocation.z, 5.0, 5.0);

    colshape.interaction = () => {
      const { z: rotation } = this.state.car.rotation
      const threshold = rotation < -100 && rotation > -144
      let pass = true;

      if (!threshold) {
        this.state.addStrike();
        pass = false;
      }

      const message = pass ? 'You passed the parallel parking test!' : 'You failed the parallel parking test!'
      this.state.player.call('driving-test-message', [message]);

      this.createExit();
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
  giveInstructions = () => {
    const message = "Parallel park between the two parks. Try to park as straight as possible"
    this.state.player.call('driving-test-message', [message]);
  }
  createExit = () => {
    this.createCheckpoint(this.state.player);
  }
}

module.exports = PParkingTest;