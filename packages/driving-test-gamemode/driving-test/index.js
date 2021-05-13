const { setTestInWorld } = require('./modules/setInWorld');
const Manager = require('./modules/TestManager');
const { testFullMessage } = require('./modules/messages');

const TestManager = new Manager();

mp.events.add('packagesLoaded', () => {
  setTestInWorld();
});

// handle colshapes
mp.events.add('playerEnterColshape',  (player, shape) => {
  if (shape.interaction) {
    player.interaction = Array.isArray(player.interaction) ? player.interaction : [];
    player.interaction.push(shape.interaction);
  }

  if (shape.execute) shape.execute(player);
});

// exit colshape
mp.events.add('playerExitColshape', (player, shape) => {
  if (shape.interaction) {
    const interactionIndex = player.interaction.findIndex(interaction => interaction === shape.interaction);
    player.interaction.splice(interactionIndex, 1);
  }

  if (shape.exit) shape.exit();
});

// Remove this - I used this command to get me drive around and get the vector data for checkpoints, etc.
mp.events.addCommand('location', player => {
  const playerPosition = player.position.toArray().toString()
  console.log(playerPosition)
  player.call('location', [player.position.toArray().toString()]);
});

mp.events.addCommand('rotation', player => {
  player.call('rotation');
})

// Remove this  - I use this to teleport myself to the driving test building
mp.events.addCommand('teleport-me', player => {
  const tpTo = new mp.Vector3(-911.3995361328125,-2041.9677734375,9.404976844787598);
  player.position = tpTo;
});

// key bindings
mp.events.add('keypress:y', player => {
  if (player.interaction) {
    player.interaction.forEach(interaction => interaction(player));
  }
});

mp.events.add('start-driving-test', player => {
  const dynamicTest = TestManager.makeNewTest(player);
  // if this is null, it means the test manager hit its limit.
  if (dynamicTest) {
    player.call('start-driving-test', [dynamicTest]);
  } else {
    delete player.isInDrivingTest;
    player.call('driving-test-message', [testFullMessage]);
  }
})

mp.events.add('end-driving-test', (player, state) => {
  const parsedState = JSON.parse(state);
  TestManager.endTest(player, parsedState.dynamicTest);
})