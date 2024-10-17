import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Animated,
  Easing,
  TouchableOpacity,
  Alert,
  FlatList
} from 'react-native';
import { PermissionsAndroid, Platform } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions'; // For iOS permissions
import VectorSearch from '../assets/VectorSearch.png'; // Your search icon image path
import Header from './header';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const { width } = Dimensions.get('window');

const AddDeviceScreen = () => {
  const navigation = useNavigation(); // Initialize navigation using the hook

  const manager = useRef(new BleManager()).current;
  
  const [devices, setDevices] = useState([]);
  const [scanning, setScanning] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      // Android Permission Check
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);

        if (
          granted['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED
        ) {
          startScan();
        } else {
          Alert.alert('Permissions required', 'Bluetooth and Location permissions are required.');
        }
      } catch (err) {
        console.warn(err);
      }
    } else if (Platform.OS === 'ios') {
      // iOS Permission Check
      const bluetoothPermission = await check(PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL);
      const locationPermission = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

      if (bluetoothPermission === RESULTS.GRANTED && locationPermission === RESULTS.GRANTED) {
        startScan();
      } else {
        await request(PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL);
        await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        startScan();
      }
    }
  };

  const startScan = () => {
    setScanning(true);
    setDevices([]); // Clear previously found devices
    manager.startDeviceScan(null, null, async (error, device) => {
      if (error) {
        Alert.alert('Error', error.message);
        setScanning(false);
        return;
      }
      if (device && device.name && !devices.find(d => d.id === device.id)) {
        setDevices(prevDevices => [...prevDevices, device]);
        
        // Check if the device name includes "IntelliBand" and reconnect
        if (device.name.includes('IntelliBand')) {
          await reconnectBio(device);
        }
      }
    });
  };

  const reconnectBio = async (device) => {
    while (!(await device.isConnected())) {
      if (!global.bandConnecting) {
        // await connectWB();
      }
    }
    global.bandDeviceId = device.id;
    global.bandReconnectDevice = device;
    this.setState({ wristBandConnected: true });
    global.bandPageState = 'Connected';

    if (!global.bandDisconnectSub) {
      global.bandDisconnectSub = manager.onDeviceDisconnected(
        device.id,
        async (error, device) => {
          if (global.bandConnecting) return;

          if (error) {
            console.log('Band: onDisc ' + error.message);
            return;
          }

          if (global.bandDiscListening) return;

          global.bandDiscListening = true;
          const result = await device.isConnected();
          if (!result) {
            console.log('Wristband properly disconnected');
          } else {
            console.log('Wristband was still connected after onDisconnect');
          }

          if (global.bandDisconnectSub) {
            global.bandDisconnectSub.remove();
            global.bandDisconnectSub = null;
          }

          this.setWristBandConnected(false);
          global.pause();
          console.log('Wristband Disconnected');

          if (global.bandRandomDisconnect && !global.bandConnecting) {
            let successfulReconnect = false;

            while (!successfulReconnect && global.bandRandomDisconnect) {
              if (!global.bandConnecting) {
                console.log('Attempting to reconnect wristband');

                // await WBdelay(2500);

                try {
                  await manager.cancelDeviceConnection(global.bandDeviceId).catch((error) => console.log(error.message));
                  await manager.cancelDeviceConnection(global.bandReconnectDevice.id).catch((error) => console.log(error.message));
                } catch (error) {
                  console.log(error.message);
                }

                if (global.bandRandomDisconnect) {
                  // await connectWB(global.bandReconnectDevice);
                }

                if (!global.bandConnectFailed) {
                  successfulReconnect = await device.isConnected();
                } else {
                  successfulReconnect = false;
                }
                console.log('Successful reconnect: ' + successfulReconnect);
              }
            }
          }
          global.bandDiscListening = false;
        },
      );
    }
  };

  useEffect(() => {
    if (scanning) {
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 2000, // Duration of one full rotation (2 seconds)
          easing: Easing.linear, // Linear easing for smooth rotation
          useNativeDriver: true,
        })
      ).start();
    }
    return () => {
      // Stop the scan when leaving the screen or component unmount
      manager.stopDeviceScan();
    };
  }, [scanning]);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const animatedStyle = {
    transform: [{ rotate: rotateInterpolate }],
  };

  const renderDevice = ({ item }) => (
    <View style={styles.deviceItem}>
      <Text style={styles.deviceText}>{item.name}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Devices" />
      <View style={styles.contentContainer}>
        {/* Animated Search Icon */}
        <Animated.Image source={VectorSearch} style={[styles.searchIcon, animatedStyle]} />
        {/* Searching Text */}
        <Text style={styles.searchingText}>
          {scanning ? 'Searching for devices...' : 'Search complete'}
        </Text>
        {/* List of Found Devices */}
        {devices && <FlatList
          data={devices}
          keyExtractor={(item) => item.id}
          renderItem={renderDevice}
          ListEmptyComponent={<Text style={styles.noDeviceText}>No devices found</Text>}
        />}
        <Text style={styles.instructionsText}>Make sure your device is on!</Text>
      </View>
      <TouchableOpacity onPress={()=>{navigation.navigate('DevicesFoundScreen');}} style={styles.helpContainer}>
        <Text style={styles.helpText}>
          Having trouble? <Text style={styles.helpLink}>Need Help</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232323',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  searchIcon: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  searchingText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 16,
  },
  noDeviceText: {
    color: '#A8A9AA',
    textAlign: 'center',
    marginTop: 20,
  },
  deviceItem: {
    padding: 10,
    borderBottomColor: '#A8A9AA',
    borderBottomWidth: 1,
  },
  deviceText: {
    color: '#FFF',
  },
  instructionsText: {
    color: '#A8A9AA',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 30,
  },
  helpContainer: {
    marginBottom: 20,
  },
  helpText: {
    fontSize: 14,
    color: '#FFF',
    textAlign: 'center',
  },
  helpLink: {
    color: '#FD3637',
  },
});

export default AddDeviceScreen;
