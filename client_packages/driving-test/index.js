const KTurnTestScene = require('./driving-test/scenes/KturnTest.js');
const KTurnToParkingPath = require('./driving-test/scenes/KTurnToParkingPath.js');
const ParkingTest = require('./driving-test/scenes/ParkingTest.js');
const PParkingTest = require('./driving-test/scenes/PParkingTesting.js');
const ToEndPath = require('./driving-test/scenes/ToEndPath.js');
const TestState = require('./driving-test/scenes/TestState.js');

const {
  testInstructions,
  kTurnInstructions,
  speedingMessage,
  testFailedMessage,
  testPassedMessage,
} = require('./driving-test/modules/messages.js');

// Admin - remove
mp.events.add('location', playerPosition => {
  mp.gui.chat.push(playerPosition);
});

mp.events.add('rotation', () => {
  const player = mp.players.local;
  if (player.vehicle) {
    mp.console.logInfo(`stuff : ${player.vehicle.getHeading()}`);
  }
})

// key bindings
mp.keys.bind(0x59, true, () => {
  const player = mp.players.local;

  if (player.interaction) {
    player.interaction.forEach(interaction => interaction(player));
  }

  mp.events.callRemote('keypress:y');
});

// handle colshapes
mp.events.add('playerEnterColshape',  shape => {
  const player = mp.players.local;

  if (shape.interaction) {
    player.interaction = Array.isArray(player.interaction) ? player.interaction : [];
    player.interaction.push(shape.interaction);
  }

  if (shape.execute) shape.execute(player);
});

// exit colshape
mp.events.add('playerExitColshape', shape => {
  const player = mp.players.local;
  
  if (shape.interaction) {
    const interactionIndex = player.interaction.findIndex(interaction => interaction === shape.interaction);
    player.interaction.splice(interactionIndex, 1);
  }

  if (shape.exit) shape.exit();
});

// checkpoints
mp.events.add("playerEnterCheckpoint", checkpoint => {
  checkpoint.onPlayerEnteredCheckPoint(checkpoint);
  checkpoint.destroy();
});

// player car event
mp.events.add("playerEnterVehicle", vehicle => {
  if (vehicle.onEnterCar) vehicle.onEnterCar();
  vehicle.onEnterCar = () => true;
});

// messages
mp.events.add('driving-test-message', message => {
  mp.gui.chat.push(message);
});

// messages
mp.events.add('driving-test-text-on-screen', text => {
  function renderInteractionInstruction() {
    mp.game.graphics.drawText(text, [0.5, 0.8], { 
      font: 2,
      color: [255, 255, 255, 250],
      scale: [0.8, 0.8],
      outline: false,
    });
  }
  mp.events.add('render', renderInteractionInstruction);
  mp.events.add('remove-driving-test-text-on-screen', () => {
    mp.events.remove('render', renderInteractionInstruction);
    return true;
  })
});

// start test
mp.events.add('start-driving-test', dynamicTest => {
  const carOpts = {
    numberPlate: "TESTDRVR",
    heading: -50,
    color: [[255, 207, 32],[255, 207, 32]]
  };
  const testCarSpawn = new mp.Vector3(-889.7205200195312,-2041.5238037109375,8.805951118469238);
  const car = mp.vehicles.new(mp.game.joaat("dilettante"), testCarSpawn, carOpts);

  car.onEnterCar = function kTurnTestMessage() {
    mp.events.call('driving-test-message', kTurnInstructions);
  }

  const State = new TestState(car, dynamicTest);
  mp.events.call('make-kturn-test', State);
  mp.events.call('track-speed', car, State);
});

mp.events.add('track-speed', (car, state) => {
  let canNotify = true;

  function trackSpeed() {
    const speedMPH = car.getSpeed() * 2.236936;

    if (canNotify && speedMPH > 50) {
      canNotify = false;
      mp.gui.chat.push(speedingMessage);
      state.addStrike();

      const notifyTimeout = setTimeout(() => {
        canNotify = true;
        clearTimeout(notifyTimeout);
      }, 10000);
    }
  }

  mp.events.add('render', trackSpeed);
  mp.events.add('end-driving-test', () => {
    mp.events.remove('render', trackSpeed);
    return true;
  })
})

// scene 1
mp.events.add('make-kturn-test', state => {
  mp.events.call('driving-test-message', testInstructions);
});

// scene 2
mp.events.add('make-kturn-test', state => {
  const scene = new KTurnTestScene(state);
  scene.make();
});

// scene 3
mp.events.add('make-kturn-to-parking-path', state => {
  const scene = new KTurnToParkingPath(state);
  scene.make();
});

// scene 4
mp.events.add('make-parking-test', state => {
  const scene = new ParkingTest(state);
  scene.make();
});

// scene 5
mp.events.add('make-pparking-test', state => {
  const scene = new PParkingTest(state);
  scene.make();
})

// scene 6
mp.events.add('make-path-to-end', state => {
  const scene = new ToEndPath(state);
  scene.make();
});

mp.events.add('end-driving-test', state => {
  let message;

  if (state.strikes > 3) {
    message = testFailedMessage;
  } else {
    message = testPassedMessage;
  }

  state.car.destroy();
  mp.events.call('driving-test-message', message);
  mp.events.callRemote('end-driving-test', JSON.stringify(state));
});
