import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

import Header from './header';
import teethLogo from '../assets/teechnew.png'; // Tooth logo image path
import rightArrow from '../assets/CaretRight.png'; // Right arrow icon

const { width } = Dimensions.get('window');

const DevicesFoundScreen = () => {
    const navigation = useNavigation();
  const renderDeviceItem = (deviceName, deviceID) => (
    <TouchableOpacity onPress={()=>{navigation.navigate('DevicesFoundScreenMain');}} style={styles.deviceItemContainer} key={deviceID}>
      <View style={styles.deviceInfo}>
        <View style={styles.deviceIconContainer}>
          <Image source={teethLogo} style={styles.deviceIcon} />
        </View>
        <View style={styles.deviceTextContainer}>
          <Text style={styles.deviceName}>{deviceName}</Text>
          <Text style={styles.deviceID} numberOfLines={1} ellipsizeMode="tail">
            {deviceID}
          </Text>
        </View>
      </View>
      <Image source={rightArrow} style={styles.arrowIcon} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Devices" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.availableDevicesText}>Available Devices</Text>
          <Text style={styles.selectDeviceText}>Select device for connectivity</Text>
        </View>

        {/* Device List */}
        {renderDeviceItem('byteGuard_v4.10', '12749438RHAK9304HEMS9372MROF0387')}
        {renderDeviceItem('byteGuard_v2.10', '12749438RHAK9304HEMS9372MROF0388')}
        {renderDeviceItem('byteGuard_v3.10', '12749438RHAK9304HEMS9372MROF0389')}

        <Text style={styles.scanningText}>Scanning for devices...</Text>

        <TouchableOpacity style={styles.helpContainer}>
          <Text style={styles.helpText}>
            Having trouble? <Text style={styles.helpLink}>Need Help</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232323', // Dark background color
  },
  scrollContainer: {
    paddingHorizontal: 16,
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
  deviceIcon: {
    width: 40,
    height: 40,
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
  arrowIcon: {
    width: 16,
    height: 16,
  },
  scanningText: {
    color: '#A8A9AA', // Grey text
    fontFamily: 'Ubuntu',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    marginTop: 20,
    marginBottom: 40,
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
});

export default DevicesFoundScreen;
