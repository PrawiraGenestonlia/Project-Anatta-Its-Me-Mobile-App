import React, { useState, useEffect } from 'react';
import { View, Text, DeviceEventEmitter } from 'react-native';
import styles from './its-me.stylesheet';
import globalstyles from './globalstylesheet.stylesheet';
import Beacons from 'react-native-beacons-manager';
import CONSTANTS from '../constants';

//TODO: test on expoKit
const region = {
  identifier: CONSTANTS.BEACON_IDENTIFIER,
  uuid: CONSTANTS.BEACON_UUID
};
//
export default function ItsMeScreen(props) {
  const { navigation } = props;
  const [beaconsInfo, setBeaconsInfo] = useState([]);
  // Listen for beacon changes
  const subscription = () => {
    DeviceEventEmitter.addListener(
      'beaconsDidRange',
      (data) => {
        console.log(data.beacons);
        if (data.beacons.length) {
          setBeaconsInfo([...data.beacons]);
        }
      }
    )
  };
  const enterRegion = () => {
    DeviceEventEmitter.addListener(
      'regionDidEnter',
      (data) => {
        // good place for background tasks
        const time = moment().format(TIME_FORMAT);
        console.log('monitoring - regionDidEnter data: ', time, data);
      }
    );
  }
  const exitRegion = () => {
    DeviceEventEmitter.addListener(
      'regionDidExit',
      (data) => {
        // good place for background tasks
        const time = moment().format(TIME_FORMAT);
        console.log('monitoring - regionDidExit data: ', time, data);
      }
    );
  }
  //TODO: try to run in  the background
  useEffect(() => {
    Beacons.requestWhenInUseAuthorization();
    Beacons.requestAlwaysAuthorization();
    Beacons.startMonitoringForRegion(region);
    Beacons.startRangingBeaconsInRegion(region);
    Beacons.startUpdatingLocation();
    subscription();
    enterRegion();
    exitRegion();
    return () => {
      Beacons.stopMonitoringForRegion(region);
      Beacons.stopRangingBeaconsInRegion(region);
    };
  }, [])
  return (
    <View>
      <Text>Its Me Screen</Text>
      <View>
        {beaconsInfo.length ? beaconsInfo.map((beacons, index) => {
          return (
            <View key={index}>
              <Text></Text>
              <Text>Beacon index: <Text>{index}</Text></Text>
              <Text>Accuracy: <Text>{beacons.accuracy}</Text></Text>
              <Text>Proximity: <Text>{beacons.proximity}</Text></Text>
              <Text>Major: <Text>{beacons.major}</Text></Text>
              <Text>Minor: <Text>{beacons.minor} </Text></Text>
            </View>
          )
        })
          : null
        }
      </View>

    </View>
  )
}