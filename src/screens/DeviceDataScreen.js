import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Header from './header'; // Assuming you have a header component
import batteryIcon from '../assets/battery.png'; // Battery icon image path
import connectedIcon from '../assets/CheckCircle.png'; // Connected icon image path
import teethLogo from '../assets/teechnew.png'; // Tooth logo image

const DeviceDataScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="byteGuard" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.deviceInfoContainer}>
          {/* Tooth logo and Device Info */}
          <View style={styles.deviceBox}>
            <Image source={teethLogo} style={styles.teethlogo} />
            <Text style={styles.deviceName}>byteGuard</Text>
            <Text style={styles.syncText}>Sync</Text>
          </View>

          <View style={styles.statusContainer}>
            <View style={styles.statusBox}>
              <Image source={connectedIcon} style={styles.statusIcon} />
              <Text style={styles.statusText}>Connected</Text>
            </View>
            <View style={styles.statusBox}>
              <Image source={batteryIcon} style={styles.statusIcon} />
              <Text style={styles.batteryText}>96</Text>
            </View>
          </View>
        </View>

        {/* Live Data Section */}
        <View style={styles.liveDataContainer}>
          <Text style={styles.liveDataText}>Live Data</Text>
          {/* Simulated graph */}
          <View style={styles.graphContainer}>
            <Text style={styles.graphText}>Graph goes here</Text>
          </View>

          {/* Heart Rate, HRV, RR */}
          <View style={styles.metricsContainer}>
            <View style={styles.metricBox}>
              <Text style={styles.metricTitle}>Heart Rate</Text>
              <Text style={styles.metricValue}>79</Text>
            </View>
            <View style={styles.metricBox}>
              <Text style={styles.metricTitle}>HRV</Text>
              <Text style={styles.metricValue}>72</Text>
            </View>
            <View style={styles.metricBox}>
              <Text style={styles.metricTitle}>RR</Text>
              <Text style={styles.metricValue}>0</Text>
            </View>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Disconnect</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Calibrate</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232323',
    paddingHorizontal: 16,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  deviceInfoContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#2B2D2E',
    borderRadius: 12,
  },
  deviceBox: {
    alignItems: 'center',
  },
  teethlogo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  deviceName: {
    color: '#FFF',
    fontFamily: 'Ubuntu',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  syncText: {
    color: '#27FFE9',
    fontFamily: 'Ubuntu',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 14,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  statusBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  statusText: {
    color: '#FFF',
    fontFamily: 'Ubuntu',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 12,
  },
  batteryText: {
    color: '#FFF',
    fontFamily: 'Ubuntu',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 12,
  },
  liveDataContainer: {
    marginTop: 20,
  },
  liveDataText: {
    color: '#FFF',
    fontFamily: 'Ubuntu',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
    marginBottom: 10,
  },
  graphContainer: {
    height: 200,
    backgroundColor: '#2B2D2E',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  graphText: {
    color: '#FFF',
    fontFamily: 'Ubuntu',
    fontSize: 14,
    fontWeight: '400',
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricBox: {
    alignItems: 'center',
  },
  metricTitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: 'Ubuntu',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 14,
  },
  metricValue: {
    color: '#FFF',
    fontFamily: 'Ubuntu',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 12,
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  button: {
    width: '45%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2B2D2E',
    borderRadius: 10,
  },
  buttonText: {
    color: '#27FFE9',
    fontFamily: 'Ubuntu',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 12,
  },
});

export default DeviceDataScreen;
