const KTurnTestScene = require('./driving-test/scenes/KturnTest.js');
const KTurnToParkingPath = require('./driving-test/scenes/KTurnToParkingPath.js');
const ParkingTest = require('./driving-test/scenes/ParkingTest.js');
const PParkingTest = require('./driving-test/scenes/PParkingTesting.js');
const ToEndPath = require('./driving-test/scenes/ToEndPath.js');
const TestState = require('./driving-test/scenes/TestState.js');

// Admin - remove
mp.events.add('location', playerPosition => {
  mp.gui.chat.push(playerPosition);
});

// key bindings
mp.keys.bind(0x59, true, () => {
  const player = mp.players.local;
  if (player.interaction) player.interaction(player);
  mp.events.callRemote('keypress:y');
});

mp.events.add('driving-test-message', message => {
  mp.gui.chat.push(message);
});

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

mp.events.add('start-ghost-car', (ghostCar, speed) => {
  ghostCar.setForwardSpeed(speed || 20.0);
  mp.gui.chat.push(speed);
});

// handle colshapes
mp.events.add('playerEnterColshape',  shape => {
  const player = mp.players.local;

  if (shape.interaction) {
    player.interaction = shape.interaction;
  }

  if (shape.execute) shape.execute(player);
});

mp.events.add('playerExitColshape', shape => {
  const player = mp.players.local;
  
  if (player.interaction) {
    // set noop
    player.interaction = () => true;
  }

  if (shape.exit) shape.exit();
});

mp.events.add("playerEnterCheckpoint", checkpoint => {
  checkpoint.onPlayerEnteredCheckPoint(checkpoint);
  checkpoint.destroy();
});

mp.events.add('start-driving-test', () => {
  const player = mp.players.local;
  const carOpts = {
    numberPlate: "TESTDRVR",
    heading: -50,
    color: [[255, 207, 32],[255, 207, 32]]
  };
  const testCarSpawn = new mp.Vector3(-889.7205200195312,-2041.5238037109375,8.805951118469238);
  const car = mp.vehicles.new(mp.game.joaat("dilettante"), testCarSpawn, carOpts);
  
  // player.car = car;
  
  car.class = 'player-vehicle';
  
  car.onEnterCar = function kTurnTestMessage(player) {
    const message = 'Perform a proper k-turn. Any damage to the car will result in a strike';
    player.call('driving-test-message', [message]);
  }

  const State = new TestState(car, player);
  mp.events.call('make-kturn-test', State)
});

mp.events.add('make-kturn-test', state => {
  const scene = new KTurnTestScene(state);
  scene.make();
});

mp.events.add('make-kturn-to-parking-path', state => {
  const scene = new KTurnToParkingPath(state);
  scene.make();
});

mp.events.add('make-parking-test', state => {
  const scene = new ParkingTest(state);
  scene.make();
});

mp.events.add('make-pparking-test', state => {
  const scene = new PParkingTest(state);
  scene.make();
})

mp.events.add('make-path-to-end', state => {
  const scene = new ToEndPath(state);
  scene.make();
});