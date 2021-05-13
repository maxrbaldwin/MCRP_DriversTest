class TestManager {
  // limit needs to be equal to the length of the values of each array
  limit = 3;
  currentTestees = 0;
  parkingTestLocations = [
    {
      conesLocations: [
        [-907.9971923828125,-2274.50732421875,6.709029674530029], 
        [-907.4732666015625,-2274.851806640625,6.709029674530029], 
        [-906.662109375,-2275.347900390625,6.709029674530029],
        [-905.7083740234375,-2275.913818359375,6.709029674530029],
        [-904.6744995117188,-2276.49462890625,6.709029674530029],
        [-909.94775390625,-2277.42626953125,6.709036827087402],
        [-909.0125122070312,-2278.0439453125,6.709036827087402],
        [-908.0386352539062,-2278.615478515625,6.709036827087402],
        [-907.2909545898438,-2278.976806640625,6.709036827087402],
        [-906.3181762695312,-2279.477294921875,6.709036827087402],
      ],
      instructionsCheckpoint: [-901.7473754882812,-2258.992431640625,6.202260494232178],
      colShapeLocation: [-906.9380493164062,-2277.127197265625,6.214624404907227]
    },
    {
      conesLocations: [
        [-888.3616943359375,-2281.89501953125,6.7090229988098145],
        [-887.7973022460938,-2282.219482421875,6.709024906158447],
        [-886.8239135742188,-2282.746826171875,6.709026336669922],
        [-885.7498168945312,-2283.37158203125,6.709013938903809],
        [-884.7064208984375,-2284.052001953125,6.709034442901611],
        [-890.1553955078125,-2284.822265625,6.709036827087402],
        [-889.0511474609375,-2285.48681640625,6.709036350250244],
        [-888.1382446289062,-2285.971435546875,6.7090349197387695],
        [-887.257080078125,-2286.484375,6.7090301513671875],
        [-886.435546875,-2286.9853515625,6.709031581878662]
      ],
      instructionsCheckpoint: [-885.8834838867188,-2269.513427734375,6.70902681350708],
      colShapeLocation: [-887.073486328125,-2284.5400390625,6.709071636199951]
    },
    {
      conesLocations: [
        [-878.1322631835938,-2299.728271484375,6.709034442901611],
        [-877.299560546875,-2300.250732421875,6.709034442901611],
        [-876.209228515625,-2300.763427734375,6.709034442901611],
        [-875.1867065429688,-2301.423583984375,6.709035396575928],
        [-874.1217041015625,-2302.0048828125,6.709035396575928],
        [-879.97509765625,-2302.748291015625,6.7090349197387695],
        [-879.063232421875,-2303.2470703125,6.7090349197387695],
        [-878.0045776367188,-2303.790283203125,6.7090349197387695],
        [-877.059814453125,-2304.38232421875,6.7090349197387695],
        [-875.9913330078125,-2304.9541015625,6.7090349197387695],
      ],
      instructionsCheckpoint: [-867.803955078125,-2279.5849609375,6.709035873413086],
      colShapeLocation: [-876.7667236328125,-2302.356201171875,6.709034442901611]
    }
  ]
  pParkingTestLocations = [
    {
      conesLocations: [
        [-787.7909545898438,-2402.42724609375,14.57071304321289],
        [-788.3917236328125,-2403.390869140625,14.57071304321289],
        [-788.9988403320312,-2404.3017578125,14.57071304321289],
        [-789.6337890625,-2405.262451171875,14.57071304321289],
        [-790.2222900390625,-2406.361572265625,14.57071304321289],
        [-793.7808227539062,-2398.9951171875,14.570709228515625],
        [-794.1561889648438,-2399.52001953125,14.570709228515625],
        [-794.7144775390625,-2400.47119140625,14.570710182189941],
        [-795.2354125976562,-2401.422119140625,14.570710182189941],
        [-795.8539428710938,-2402.439208984375,14.570710182189941],
      ],
      instructionsCheckpoint: [-803.5951538085938,-2387.331787109375,14.076581954956055],
      colShapeLocation: [-791.9942626953125,-2402.876708984375,14.076385498046875]
    },
    {
      conesLocations: [
        [-776.2515258789062,-2384.433837890625,14.57071590423584], 
        [-776.9501342773438,-2385.356201171875,14.57071590423584], 
        [-777.4776611328125,-2386.241455078125,14.57071590423584],
        [-778.0977172851562,-2387.25048828125,14.57071590423584],
        [-778.583740234375,-2388.109619140625,14.57071590423584],
        [-782.1973876953125,-2380.73876953125,14.570719718933105],
        [-782.8436279296875,-2381.792724609375,14.570719718933105],
        [-783.32177734375,-2382.65087890625,14.570719718933105],
        [-783.851806640625,-2383.599853515625,14.570719718933105],
        [-784.549560546875,-2384.691650390625,14.570719718933105]
      ],
      instructionsCheckpoint: [-784.0531616210938,-2370.39697265625,14.570719718933105],
      colShapeLocation: [-780.8097534179688,-2385.207275390625,14.570719718933105]
    },
    {
      conesLocations: [
        [-796.0613403320312,-2422.88720703125,14.570728302001953],
        [-796.5861206054688,-2423.81005859375,14.570728302001953],
        [-797.2305297851562,-2424.808837890625,14.570728302001953],
        [-797.7296142578125,-2425.837646484375,14.570728302001953],
        [-798.2528686523438,-2426.8251953125,14.570728302001953],
        [-801.9138793945312,-2419.498046875,14.570728302001953],
        [-802.3818359375,-2420.306396484375,14.570728302001953],
        [-802.8294067382812,-2421.013671875,14.570728302001953],
        [-803.5081787109375,-2422.162109375,14.570728302001953],
        [-804.239990234375,-2423.38720703125,14.570728302001953],
      ],
      instructionsCheckpoint: [-809.3286743164062,-2410.53515625,14.570728302001953],
      colShapeLocation: [-800.7556762695312,-2424.30029296875,14.570731163024902]
    }
  ]
  endParkingTestLocation = [
    {
      conesLocations: [
        [-944.9174194335938,-2087.012939453125,9.299250602722168],
        [-945.6475830078125,-2086.15087890625,9.299250602722168],
        [-946.5723266601562,-2085.462646484375,9.299253463745117],
        [-947.3214111328125,-2084.513671875,9.299253463745117],
        [-948.1184692382812,-2083.66357421875,9.299253463745117],
        [-942.6119384765625,-2084.42529296875,9.299253463745117],
        [-943.3934326171875,-2083.59375,9.299253463745117],
        [-944.0291137695312,-2082.962158203125,9.299254417419434],
        [-944.7858276367188,-2082.09521484375,9.299254417419434],
        [-945.8660278320312,-2081.190185546875,9.299254417419434],
      ],
      colShapeLocation: [-945.752685546875,-2083.864501953125,8.805005073547363]
    },
    {
      conesLocations: [
        [-949.9251098632812,-2091.69921875,9.2992525100708],
        [-950.4208374023438,-2091.1669921875,9.2992525100708],
        [-951.254638671875,-2090.316162109375,9.2992525100708],
        [-952.28662109375,-2089.427490234375,9.2992525100708],
        [-953.1844482421875,-2088.404052734375,9.2992525100708],
        [-952.427490234375,-2094.040283203125,9.299264907836914],
        [-953.064208984375,-2093.36865234375,9.299264907836914],
        [-953.908203125,-2092.474853515625,9.299264907836914],
        [-954.7091674804688,-2091.7861328125,9.299264907836914],
        [-955.6134643554688,-2090.897705078125,9.299264907836914],
      ],
      colShapeLocation: [-953.0238037109375,-2091.065185546875,9.2992525100708]
    },
    {
      conesLocations: [
        [-954.7739868164062,-2096.778076171875,9.299254417419434],
        [-955.3841552734375,-2096.10888671875,9.299254417419434],
        [-956.2811279296875,-2095.16357421875,9.299254417419434],
        [-957.31396484375,-2094.33837890625,9.299254417419434],
        [-958.0712890625,-2093.461669921875,9.299254417419434],
        [-957.5313110351562,-2098.9580078125,9.299259185791016],
        [-958.1353149414062,-2098.326416015625,9.299259185791016],
        [-958.8528442382812,-2097.6396484375,9.299259185791016],
        [-959.5505981445312,-2096.943603515625,9.299259185791016],
        [-960.8816528320312,-2095.60400390625,9.299259185791016],
      ],
      colShapeLocation: [-958.0826416015625,-2095.903076171875,9.299254417419434]
    }
  ]
  makeNewTest = player => {
    if (this.currentTestees < this.limit && !player.isInDrivingTest) {
      const randomIndex = Math.floor(Math.random() * this.parkingTestLocations.length);
      ++this.currentTestees;

      player.isInDrivingTest = true;
      
      return {
        parkingTest: this.parkingTestLocations.splice(randomIndex, 1)[0],
        pParkingTest: this.pParkingTestLocations.splice(randomIndex, 1)[0],
        endParkingTest: this.endParkingTestLocation.splice(randomIndex, 1)[0],
      }
    } else {
      return null;
    }
  }
  endTest = (player, oldTest) => {
    const { parkingTest, pParkingTest, endParkingTest } = oldTest;

    if (parkingTest) {
      this.parkingTestLocations.push(parkingTest);
    }

    if (pParkingTest) {
      this.pParkingTestLocations.push(pParkingTest);
    }

    if (endParkingTest) {
      this.endParkingTestLocation.push(endParkingTest);
    }

    delete player.isInDrivingTest;

    if (this.currentTestees > 0) {
      --this.currentTestees;
    }
  }
}

module.exports = TestManager;
