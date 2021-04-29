mp.events.add('location', playerPosition => {
  mp.console.logInfo(playerPosition);
  mp.gui.chat.push(playerPosition);
});

mp.events.add('driving-test-message', message => {
  mp.gui.chat.push(message);
})

const yKey = 0x59
mp.keys.bind(yKey, true, () => {
  mp.events.callRemote('keypress:y');
});
