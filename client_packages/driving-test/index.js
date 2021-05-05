// Admin - remove
mp.events.add('location', playerPosition => {
  mp.gui.chat.push(playerPosition);
});

// key bindings
mp.keys.bind(0x59, true, () => {
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

mp.events.add("playerEnterVehicle", vehicle => {
  mp.gui.chat.push(vehicle.invincibility)
	vehicle.setInvincible(false);
  mp.gui.chat.push(vehicle.invincibility)
});

// handle checkpoints
mp.events.add("playerEnterCheckpoint", checkpoint => {
  if(checkpoint.onPlayerEnteredCheckPoint) checkpoint.onPlayerEnteredCheckPoint();
  checkpoint.destroy();
});

mp.events.add('create-checkpoint', (checkpoint, destination) => {
  const { vector, onPlayerEnteredCheckPoint } = checkpoint;
  const { x: directionX, y: directionY, z: directionZ } = destination.vector;
  const newCheckpoint = mp.checkpoints.new(1, vector, 5, {
    direction: new mp.Vector3(directionX, directionY, directionZ),
    color: [ 255, 255, 255, 255 ],
    visible: true,
    dimension: 0
  });
  const noop = () => true;

  // newCheckpoint.setVariable('class', 'driversTestCheckpoint');

  newCheckpoint.onPlayerEnteredCheckPoint = onPlayerEnteredCheckPoint || noop;
});
