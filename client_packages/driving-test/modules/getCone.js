function getCone(coordinates) {
  const [x, y, z] = coordinates;
  const position = new mp.Vector3(x, y, z);
  const groundZ = mp.game.gameplay.getGroundZFor3dCoord(position.x, position.y, position.z, 0.0, false);
  const rotation = new mp.Vector3(new mp.Vector3(0, 0, 0));
  
  position.z = groundZ;
  
  const cone = mp.objects.new(
    'prop_roadcone02a', position,
    {
      rotation: rotation,
      alpha: 250,
      dimension: 0,
    }
  );

  // @todo worried about this collision here
  // player doesnt need to be in the car
  // const colBox = mp.colshapes.newTube(x, y, z, 1.5, 1.5);
  // colBox.execute = function enterCone() {
  //   mp.gui.chat.push('enter');
  // }
  return { cone };
}

exports = getCone;