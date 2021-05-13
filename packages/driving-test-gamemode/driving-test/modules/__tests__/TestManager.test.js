const assert = require('assert')
const TestManager = require('../TestManager');

const Manager = new TestManager();

const playerOne = {};
const dynamicTest = Manager.makeNewTest(playerOne);

assert.strictEqual(playerOne.isInDrivingTest, true);
assert.strictEqual(Manager.currentTestees, 1);
assert.strictEqual(Manager.parkingTestLocations.length, 2);

assert.strictEqual(dynamicTest.hasOwnProperty('parkingTest'), true);
assert.strictEqual(dynamicTest.hasOwnProperty('pParkingTest'), true);
assert.strictEqual(dynamicTest.hasOwnProperty('endParkingTest'), true);

const otherPlayer = {}
const otherDynamicTest = Manager.makeNewTest(otherPlayer);

assert.strictEqual(Manager.currentTestees, 2);
assert.strictEqual(Manager.parkingTestLocations.length, 1);

const anotherPlayer = {};
const anotherDynamicTest = Manager.makeNewTest(anotherPlayer);
assert.strictEqual(Manager.parkingTestLocations.length, 0);

assert.strictEqual(Manager.currentTestees, 3);

const cannotJoinPlayer = {};
const cannotJoinTest = Manager.makeNewTest(cannotJoinPlayer);

assert.strictEqual(cannotJoinTest, false);

Manager.endTest(playerOne, dynamicTest);

assert.strictEqual(Manager.currentTestees, 2);
assert.strictEqual(playerOne.isInDrivingTest, undefined);
assert.strictEqual(Manager.parkingTestLocations.length, 1);

Manager.endTest(otherPlayer, otherDynamicTest);

assert.strictEqual(Manager.currentTestees, 1);
assert.strictEqual(otherDynamicTest.isInDrivingTest, undefined);
assert.strictEqual(Manager.parkingTestLocations.length, 2);

console.log('done');