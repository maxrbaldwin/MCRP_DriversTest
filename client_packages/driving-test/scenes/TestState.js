class TestState {
  constructor(car, dynamicTest) {
    this.car = car;
    this.dynamicTest = dynamicTest;
  }
  strikes = 0;
  addStrike = () => ++this.strikes;
  // these are the first checkpoints in each next scene
  // to set the destination properly
  sceneConnections = {
    kTurnToPath: { 
      vector : new mp.Vector3(-955.4210815429688,-2144.494384765625,8.34027099609375),
    },
    pathToParking: { 
      vector : new mp.Vector3(-877.8818969726562,-2253.07958984375,5.929435729980469),
    },
    parkingToPparking: { 
      vector : new mp.Vector3(-837.153564453125,-2279.083251953125,7.862337112426758),
    },
    pParkingToEnd: { 
      vector : new mp.Vector3(-730.7772827148438,-2383.900146484375,14.27053451538086),
    },
    last: {
      vector: new mp.Vector3(-945.752685546875,-2083.864501953125,8.805005073547363),
    }
  }
}

exports = TestState;