mp.events.add('playerEnterColshape', (player, shape) => {
  if (shape.interaction) {
    player.interaction = shape.interaction;
  }

  if (shape.execute) shape.execute(player);
});

mp.events.add("playerEnterCheckpoint", (player, checkpoint) => {
  checkpoint.onPlayerEnteredCheckPoint(player, checkpoint);
  checkpoint.nextCheckpoint();
  checkpoint.destroy();
});

mp.events.add('playerExitColshape', (player, shape) => {
  if (shape.interaction) {
    // set noop
    player.interaction = () => true;
  }
});

mp.events.add('keypress:y', player => {
  if (player.interaction) player.interaction();
})