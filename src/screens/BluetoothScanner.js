import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, PermissionsAndroid, Platform } from 'react-native';
import BleManager from 'react-native-ble-manager';
import { NativeEventEmitter, NativeModules } from 'react-native';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const BluetoothScanner = () => {
  const [bluetoothDevices, setBluetoothDevices] = useState([]);
  const [isScanning, setIsScanning] = useState(false);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        ]);
        if (
          granted['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('Permissions granted');
        } else {
          console.log('Permissions denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  useEffect(() => {
    // Request permissions
    requestPermissions();

    // Start BleManager
    BleManager.start({ showAlert: false }).then(() => {
      console.log('Bluetooth module initialized');
    });

    // Add listener for discovered peripherals
    const discoverListener = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', (peripheral) => {
      console.log('Discovered Peripheral:', peripheral);

      // Directly add every discovered peripheral to the list without filtering
      setBluetoothDevices(prevDevices => [...prevDevices, peripheral]);
    });

    return () => {
      // Clean up listeners
      discoverListener.remove();
    };
  }, []);

  const startScanning = () => {
    if (!isScanning) {
      BleManager.scan([], 30, true)  // Scan for 30 seconds
        .then(() => {
          console.log('Scan started...');
          setIsScanning(true);
        })
        .catch(error => {
          console.error('Scan error:', error);
        });

      // Stop scanning after 30 seconds
      setTimeout(() => {
        BleManager.stopScan().then(() => {
          console.log('Scan stopped');
          setIsScanning(false);
        });
      }, 30000);  // Stop scan after 30 seconds
    }
  };

  return (
    // <View style={{ flex: 1, padding: 20 }}>
    //   <Button title={isScanning ? 'Scanning...' : 'Start Scan'} onPress={startScanning} disabled={isScanning} />
    //   <Text style={{ marginTop: 20 }}>Nearby Bluetooth Devices:</Text>
    //   <FlatList
    //     data={bluetoothDevices}
    //     keyExtractor={(item) => item.id || item.uuid || Math.random().toString()}
    //     renderItem={({ item }) => (
    //       <View style={{ padding: 10, borderBottomWidth: 1 }}>
    //         <Text>ID: {item.id}</Text>
    //         <Text>Name: {item.name || 'Unknown'}</Text>
    //         <Text>RSSI: {item.rssi}</Text>
    //       </View>
    //     )}
    //   />
    // </View>
    <></>
  );
};

export default BluetoothScanner;
