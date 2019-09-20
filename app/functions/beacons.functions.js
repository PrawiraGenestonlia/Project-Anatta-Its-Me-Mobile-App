import { DeviceEventEmitter } from 'react-native'
import Beacons from 'react-native-beacons-manager'
import CONSTANTS from '../constants';

// Define a region which can be identifier + uuid,
// identifier + uuid + major or identifier + uuid + major + minor
// (minor and major properties are numbers)
const region = {
  identifier: CONSTANTS.BEACON_IDENTIFIER,
  uuid: CONSTANTS.BEACON_UUID
};
const BeaconsWhenInUseAuth = () => {
  // Request for authorization while the app is open
  Beacons.requestWhenInUseAuthorization();
}

const BeaconsAlwaysAuth = () => {
  Beacons.requestAlwaysAuthorization();
}

Beacons.startMonitoringForRegion(region);
Beacons.startRangingBeaconsInRegion(region);

Beacons.startUpdatingLocation();

// Listen for beacon changes
const subscription = DeviceEventEmitter.addListener(
  'beaconsDidRange',
  (data) => {
    // data.region - The current region
    // data.region.identifier
    // data.region.uuid

    // data.beacons - Array of all beacons inside a region
    //  in the following structure:
    //    .uuid
    //    .major - The major version of a beacon
    //    .minor - The minor version of a beacon
    //    .rssi - Signal strength: RSSI value (between -100 and 0)
    //    .proximity - Proximity value, can either be "unknown", "far", "near" or "immediate"
    //    .accuracy - The accuracy of a beacon
  }
);