const { setTestInWorld } = require('./modules/setInWorld');
const setFixtures = require('./modules/setFixtures');

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

// Remove this - I used this command to get me drive around and get the vector data for checkpoints, etc.
mp.events.addCommand('location', player => {
  const playerPosition = player.position.toArray().toString()
  console.log(playerPosition)
  player.call('location', [player.position.toArray().toString()]);
});

mp.events.addCommand('rotation', player => {
  console.log(player.car.rotation);
})

// Remove this  - I use this to teleport myself to the driving test building
mp.events.addCommand('teleport-me', player => {
  const tpTo = new mp.Vector3(-911.3995361328125,-2041.9677734375,9.404976844787598);
  player.position = tpTo;
});

// key bindings
mp.events.add('keypress:y', player => {
  if (player.interaction) player.interaction(player);
});

mp.events.add('start-driving-test', player => {
  player.call('start-driving-test');
})

