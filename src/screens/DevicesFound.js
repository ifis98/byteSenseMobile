import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  PermissionsAndroid,
  Animated,
  Button,
  Easing,
} from 'react-native';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation
import BleManager from 'react-native-ble-manager';
import {NativeEventEmitter, NativeModules} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
import Header from './header';
import teethLogo from '../assets/teechnew.png'; // Tooth logo image path
import rightArrow from '../assets/CaretRight.png'; // Right arrow icon
import MagnifyingGlass from '../assets/MagnifyingGlass.png'; // Magnifying Glass image path

const {width} = Dimensions.get('window');

const DevicesFoundScreen = () => {
  const navigation = useNavigation();
  const scaleAnim = useRef(new Animated.Value(0)).current; // Scale animation

  const [bluetoothDevices, setBluetoothDevices] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [bleInitialized, setBleInitialized] = useState(false); // New state to track BleManager initialization
  const [permissionsGranted, setPermissionsGranted] = useState(false); // New state to track permissions

  // Request permissions for Android devices
  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        ]);
        if (
          granted['android.permission.ACCESS_FINE_LOCATION'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.BLUETOOTH_SCAN'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.BLUETOOTH_CONNECT'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('Permissions granted');
          setPermissionsGranted(true); // Set permissions granted
        } else {
          console.log('Permissions denied');
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      setPermissionsGranted(true); // On iOS, assume permissions are granted
    }
  };

  useEffect(() => {
    // Request permissions on mount
    requestPermissions();

    // Start BleManager after permissions are requested
    BleManager.start({showAlert: false}).then(() => {
      console.log('Bluetooth module initialized');
      setBleInitialized(true); // Mark BleManager as initialized
    });

    // Add listener for discovered peripherals
    const discoverListener = bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      peripheral => {
        console.log('Discovered Peripheral:', peripheral);

        setBluetoothDevices(prevDevices => {
          // Check if the device's name contains "YteG"
          // if (peripheral.name && peripheral.name.includes('YteG')) {
          if (true) {
            // Avoid adding the same device multiple times
            const deviceExists = prevDevices.some(
              device => device.id === peripheral.id,
            );
            if (!deviceExists) {
              return [...prevDevices, peripheral];
            }
          }
          return prevDevices;
        });
      },
    );

    return () => {
      discoverListener.remove(); // Clean up listeners
    };
  }, []);

  // Start scanning for Bluetooth devices when conditions are met
  useEffect(() => {
    // Only start scanning after permissions are granted and BleManager is initialized
    if (permissionsGranted && bleInitialized) {
      startScanning();
    }
  }, [permissionsGranted, bleInitialized]);

  const startScanning = () => {
    if (!isScanning) {
      BleManager.scan([], 30, true) // Scan for 30 seconds
        .then(() => {
          console.log('Scan started...');
          setIsScanning(true);

          // Start animation when scanning starts
          Animated.loop(
            Animated.sequence([
              Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 1500,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
              }),
              Animated.timing(scaleAnim, {
                toValue: 0,
                duration: 1500,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
              }),
            ]),
          ).start();
        })
        .catch(error => {
          console.error('Scan error:', error);
        });

      // Stop scanning after 30 seconds
      setTimeout(() => {
        BleManager.stopScan().then(() => {
          console.log('Scan stopped');
          setIsScanning(false);
          scaleAnim.setValue(0); // Reset the animation
        });
      }, 10000); // Stop scan after 30 seconds
    }
  };

  const renderDeviceItem = (device, index) => (
    <TouchableOpacity
      onPress={async () => {
        // Save device info to AsyncStorage
        try {
          await AsyncStorage.setItem('selectedDevice', JSON.stringify(device));
          console.log('Device saved:', device);

          // Navigate to the next screen
          navigation.navigate('DeviceDataScreen');
        } catch (error) {
          console.error('Error saving device:', error);
        }
      }}
      style={styles.deviceItemContainer}
      key={`${device.id}-${index}`} // Use combination of id and index as the key
    >
      <View style={styles.deviceInfo}>
        <View style={styles.deviceIconContainer}>
          <Image source={teethLogo} style={styles.deviceIcon} />
        </View>
        <View style={styles.deviceTextContainer}>
          <Text style={styles.deviceName}>{device.name || 'Unknown'}</Text>
          <Text style={styles.deviceID} numberOfLines={1} ellipsizeMode="tail">
            {device.id}
          </Text>
        </View>
      </View>
      <Image source={rightArrow} style={styles.arrowIcon} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {isScanning ? (
        <>
          <View style={styles.header}>
            <Header title="Devices" />
          </View>
          <View style={styles.waveContainer}>
            {/* Animated white circles */}
            <Animated.View
              style={[
                styles.wave,
                {
                  transform: [{scale: scaleAnim}],
                },
              ]}
            />
            <Animated.View
              style={[
                styles.wave,
                {
                  transform: [
                    {
                      scale: scaleAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.7, 1.2],
                      }),
                    },
                  ],
                },
              ]}
            />
            <Image source={teethLogo} style={styles.teethlogo} />
          </View>

          <View style={styles.textContainer}>
            <Image source={MagnifyingGlass} style={styles.MagnifyingGlass} />
            <Text style={styles.scanningText}>Scanning for devices...</Text>
          </View>

          <Text style={styles.instructionsText}>
            Make sure your device is on and your phone’s Bluetooth is enabled.
          </Text>
        </>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View>
            <Header title="Devices" />
          </View>
          <View style={styles.headerTextContainer}>
            <View style={styles.scanningButtonView}>
              <Text style={styles.availableDevicesText}>Available Devices</Text>
              <TouchableOpacity
                onPress={startScanning}
                style={styles.MagnifyingGlass2}>
                <Image
                  source={MagnifyingGlass}
                  style={styles.MagnifyingGlass}
                />
                {/* <Text style={styles.selectDeviceText}>Scan Again </Text> */}
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('DeviceDataScreen');
              }}>
              <Text style={styles.selectDeviceText}>
                Select a device for connectivity
              </Text>
            </TouchableOpacity>
          </View>

          {/* Device List */}
          {bluetoothDevices &&
            bluetoothDevices.map((device, index) =>
              renderDeviceItem(device, index),
            )}

          <TouchableOpacity style={styles.helpContainer}>
            <Text style={styles.helpText}>
              Having trouble? <Text style={styles.helpLink}>Need Help</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232323', // Dark background color
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextContainer: {
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
  },
  availableDevicesText: {
    color: '#FFF', // White color
    fontFamily: 'Ubuntu',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 27,
    textAlign: 'left',
  },
  selectDeviceText: {
    color: '#A8A9AA', // Grey text
    fontFamily: 'Ubuntu',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    textAlign: 'left',
  },
  deviceItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2B2D2E', // Dark grey background for the list items
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 16,
    width: '100%',
    marginBottom: 12,
  },
  scanningButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
  },
  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deviceIconContainer: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Transparent white background
    borderRadius: 28,
    marginRight: 12,
  },
  MagnifyingGlass: {
    width: 20,
    height: 20,
  },
  MagnifyingGlass2: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deviceIcon: {
    width: 30,
    height: 30,
  },
  deviceTextContainer: {
    maxWidth: '80%', // Limit width to prevent overflow
  },
  deviceName: {
    color: '#FFF', // White color
    fontFamily: 'Ubuntu',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
  },
  deviceID: {
    color: 'rgba(255, 255, 255, 0.3)', // White color with opacity
    fontFamily: 'Ubuntu',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    overflow: 'hidden',
  },
  header: {
    position: 'absolute',
    top: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    width: 16,
    height: 16,
  },
  scanningText: {
    fontFamily: 'Ubuntu',
    fontSize: 18,
    fontWeight: '500',
    color: '#FFF',
    marginLeft: 8,
  },
  helpContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  helpText: {
    fontFamily: 'Ubuntu',
    fontSize: 14,
    fontWeight: '500',
    color: '#FFF', // White color
    textAlign: 'center',
  },
  helpLink: {
    color: '#FD3637', // Red color
    fontWeight: '500',
  },
  waveContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
  },
  wave: {
    position: 'absolute',
    width: 220, // Reduce the size of the wave
    height: 220,
    borderRadius: 110, // Half of width/height for a perfect circle
    backgroundColor: 'rgba(255, 255, 255, 0.05)', // Increase transparency (lower opacity)
    zIndex: -1, // Lower zIndex for wave
  },
  teethlogo: {
    width: 180, // Adjust the size of the logo if needed
    height: 100,
    zIndex: 1, // Ensure the logo appears above the wave
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  instructionsText: {
    fontFamily: 'Ubuntu',
    fontSize: 12,
    fontWeight: '400',
    color: '#A8A9AA',
    textAlign: 'center',
    marginHorizontal: 26,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DevicesFoundScreen;
