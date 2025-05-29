import BleManager from 'react-native-ble-manager';

// `react-native-ble-manager` already exports a singleton instance. Re-export that
// instance so the rest of the app can import it from one place.
export default BleManager;
