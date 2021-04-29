const { setTestInWorld } = require('./driving-test/drivingTestModule');

mp.events.add("playerReady", player => {
  console.log('player ready');
  setTestInWorld(player);
});

mp.events.add("playerSpawn", player => {
  console.log('player spawned');
});

// I used this command to get me drive around and get the vector data for checkpoints, etc.
mp.events.addCommand('location', player => {
  const playerPosition = player.position.toArray().toString()
  console.log(playerPosition)
  player.call('location', [player.position.toArray().toString()]);
});

require('./driving-test');