import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Easing
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

import Header from './header'; // Assuming you have a header component
import teethLogo from '../assets/teechnew.png'; // Tooth logo image

const DeviceFoundScreen = () => {
  const navigation = useNavigation(); // Initialize navigation using the hook
  const scaleAnim = useRef(new Animated.Value(0)).current; // Scale animation

  // Start the animation when the component is mounted
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
      ])
    ).start();
  }, [scaleAnim]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Devices" />
      <View style={styles.contentContainer}>
        {/* Tooth Background and Device Information */}
        <View style={styles.waveContainer}>
          {/* Animated white circles */}
          <Animated.View
            style={[
              styles.wave,
              {
                transform: [{ scale: scaleAnim }],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.wave,
              {
                transform: [{ scale: scaleAnim.interpolate({ inputRange: [0, 1], outputRange: [0.7, 1.2] }) }],
              },
            ]}
          />
          <View style={styles.deviceBox}>
            <Image source={teethLogo} style={styles.teethlogo} />
            <Text style={styles.deviceName}>IntelliSplint_v4.10</Text>
          </View>
        </View>

        {/* Connecting Text */}
        <Text onPress={() => navigation.navigate('DeviceDataScreen')} style={styles.connectingText}>Connecting...</Text>
        <Text style={styles.settingUpText}>Setting up Device...</Text>

        {/* Cancel Button */}
        <TouchableOpacity onPress={() => navigation.goBack('')} style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        {/* Help Text */}
        <Text style={styles.helpText}>
          Having trouble? <Text style={styles.helpLink}>Need Help</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232323',
  },
  wave: {
    position: 'absolute',
    width: 300, // Reduce the size of the wave
    height: 300,
    borderRadius: 150, // Half of width/height for a perfect circle
    backgroundColor: 'rgba(255, 255, 255, 0.05)', // Increase transparency (lower opacity)
    zIndex: -1, // Lower zIndex for wave
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  waveContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
  },
  deviceBox: {
    width: 248,
    height: 248,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 48,
    // backgroundColor: '#2B2D2E',
    borderRadius: 20,
    marginBottom: 24,
  },
  teethlogo: {
    width: 177, 
    height: 99,
  },
  deviceName: {
    marginTop: 12,
    color: '#FFF',
    fontFamily: 'Ubuntu',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  connectingText: {
    color: '#FFF',
    fontFamily: 'Ubuntu',
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 30,
    marginTop: 12,
  },
  settingUpText: {
    color: '#A8A9AA',
    fontFamily: 'Ubuntu',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 6,
  },
  cancelButton: {
    width: '80%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2B2D2E',
    borderRadius: 10,
    marginTop: 20,
  },
  cancelButtonText: {
    color: '#FFF',
    fontFamily: 'Ubuntu',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  helpText: {
    color: '#FFF',
    fontFamily: 'Ubuntu',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 20,
    textAlign: 'center',
  },
  helpLink: {
    color: '#FD3637', // Red color for "Need Help"
    fontWeight: '500',
  },
});

export default DeviceFoundScreen;
