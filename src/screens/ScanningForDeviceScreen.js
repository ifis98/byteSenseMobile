import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation

import MagnifyingGlass from '../assets/MagnifyingGlass.png'; // Magnifying Glass image path
import Header from './header';
import teethLogo from '../assets/teechnew.png'; // Teeth logo image path
import BluetoothScanner from './BluetoothScanner';

const {width} = Dimensions.get('window');

const ScanningForDeviceScreen = () => {
  const navigation = useNavigation(); // Initialize navigation using the hook

  const scaleAnim = useRef(new Animated.Value(0)).current; // Scale animation

  useEffect(() => {
    // Infinite pulsing animation
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
  }, [scaleAnim]);

  return (
    <SafeAreaView style={styles.container}>
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
        <Text
          style={styles.scanningText}
          // onPress={()=>{navigation.navigate('AddDeviceScreen');}}
        >
          Scanning for device...
        </Text>
      </View>

      <Text style={styles.instructionsText}>
        Make sure your device is on and your phone’s bluetooth is enabled.
      </Text>
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
  MagnifyingGlass: {
    width: 20,
    height: 20,
  },
  header: {
    position: 'absolute',
    top: 50,
    alignItems: 'center',
    justifyContent: 'center',
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
  scanningText: {
    fontFamily: 'Ubuntu',
    fontSize: 18,
    fontWeight: '500',
    color: '#FFF',
    marginLeft: 8,
  },
  instructionsText: {
    fontFamily: 'Ubuntu',
    fontSize: 12,
    fontWeight: '400',
    color: '#A8A9AA',
    textAlign: 'center',
    marginHorizontal: 26,
  },
});

export default ScanningForDeviceScreen;
