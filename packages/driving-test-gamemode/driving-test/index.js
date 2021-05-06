const { setTestInWorld } = require('./modules/setInWorld');
const setFixtures = require('./modules/setFixtures');
// const KTurnTestScene = require('./scenes/KturnTest');
// const KTurnToParkingPath = require('./scenes/KTurnToParkingPath');
// const ParkingTest = require('./scenes/ParkingTest');
// const PParkingTest = require('./scenes/PParkingTesting');
// const ToEndPath = require('./scenes/ToEndPath');
// const TestState = require('./scenes/TestState');

// world things
mp.events.add("playerReady", player => {
  // these need move an event not associated with the player
  setTestInWorld(player);
  setFixtures();
});

mp.events.add('packagesLoaded', () => {
  console.log('Loaded all resources successfully');
});

mp.events.add("playerSpawn", () => {
  console.log('player spawned');
});

// // handle colshapes
mp.events.add('playerEnterColshape', (player, shape) => {
  if (shape.interaction) {
    player.interaction = shape.interaction;
  }

  if (shape.execute) shape.execute(player);
});

// mp.events.add('playerExitColshape', (player, shape) => {
//   if (player.interaction) {
//     // set noop
//     player.interaction = () => true;
//   }

//   if (shape.exit) shape.exit();
// });

mp.events.add("playerEnterVehicle", (player, vehicle) => {
  if (vehicle.onEnterCar) vehicle.onEnterCar(player);
  vehicle.onEnterCar = () => true;
});

// Remove this - I used this command to get me drive around and get the vector data for checkpoints, etc.
mp.events.addCommand('location', player => {
  const playerPosition = player.position.toArray().toString()
  console.log(playerPosition)
  player.call('location', [player.position.toArray().toString()]);
});

// mp.events.addCommand('rotation', player => {
//   console.log(player.car.rotation);
// })

// Remove this  - I use this to teleport myself to the driving test building
mp.events.addCommand('teleport-me', player => {
  const tpTo = new mp.Vector3(-911.3995361328125,-2041.9677734375,9.404976844787598);
  player.position = tpTo;
});

// key bindings
mp.events.add('keypress:y', player => {
  if (player.interaction) player.interaction(player);
});

mp.events.add('vehicleDamage', () => {
  console.log('doh')
});

mp.events.add('start-driving-test', player => {
  // const State = new TestState(car, player);
  player.call('start-driving-test');
})

// test has started
mp.events.add('make-kturn-test', state => {
  function handleVehicleDamage () {
    state.addStrike();
    mp.events.call('driving-test-message', 'strike for damage');
  }
  
  mp.events.add('vehicleDamage', handleVehicleDamage);
  
  mp.events.add('end-drivers-test', () => {
    mp.events.remove('vehicleDamage', handleVehicleDamage);
    // kill this listener
    return true;
  });
});

// mp.events.add('make-kturn-test', state => {
//   const message = "Welcome to the driver's test. Please follow the instructions. Failing any of the tests will result in a strike toward your final grade. Three strikes and you fail the test. Any damage to the car will also result in a strike."
//   state.player.call('driving-test-message', [message]);
// });

// mp.events.add('make-kturn-test', state => {
//   const scene = new KTurnTestScene(state);
//   console.log(scene)
//   state.player.call('make-kturn-test', [JSON.stringify(scene)])
// });

// mp.events.add('make-kturn-to-parking-path', state => {
//   const scene = new KTurnToParkingPath(state);
//   scene.make();
// });

// mp.events.add('make-parking-test', state => {
//   const scene = new ParkingTest(state);
//   scene.make();
// });

// mp.events.add('make-pparking-test', state => {
//   const scene = new PParkingTest(state);
//   scene.make();
// })

// mp.events.add('make-path-to-end', state => {
//   const scene = new ToEndPath(state);
//   scene.make();
// });
