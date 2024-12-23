import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Switch,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation
import {Svg, Path, G, ClipPath, Rect, Defs} from 'react-native-svg';

import {useState} from 'react';
import profileicon from '../assets/profileicon.png'; // Your logo image path
import devicesIcon from '../assets/Devices.png'; // Device icon path
import profileIcon from '../assets/UserCircle.png'; // Profile icon path
import observersIcon from '../assets/UserCheck.png'; // Observers icon path
import helpIcon from '../assets/Question.png'; // Help icon path
import trashnew from '../assets/trashnew.png'; // Help icon path
import Header from './header';
import InputComponent from '../components/InputComponent';
import { sendRequest } from '../api/api';

const {width} = Dimensions.get('window');

const ProfileIcon = () => {
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="22"
    viewBox="0 0 21 22"
    fill="none">
    <Path
      d="M10.5 2.25C9.63471 2.25 8.78885 2.50659 8.06938 2.98732C7.34992 3.46805 6.78916 4.15133 6.45803 4.95076C6.12689 5.75019 6.04025 6.62985 6.20906 7.47852C6.37787 8.32719 6.79455 9.10674 7.40641 9.71859C8.01826 10.3304 8.79781 10.7471 9.64648 10.9159C10.4951 11.0847 11.3748 10.9981 12.1742 10.667C12.9737 10.3358 13.6569 9.77508 14.1377 9.05562C14.6184 8.33615 14.875 7.49029 14.875 6.625C14.875 5.46468 14.4141 4.35188 13.5936 3.53141C12.7731 2.71094 11.6603 2.25 10.5 2.25ZM10.5 9.25C9.98082 9.25 9.47331 9.09605 9.04163 8.80761C8.60995 8.51917 8.2735 8.1092 8.07482 7.62954C7.87614 7.14989 7.82415 6.62209 7.92544 6.11289C8.02672 5.60369 8.27673 5.13596 8.64384 4.76884C9.01096 4.40173 9.47869 4.15173 9.98789 4.05044C10.4971 3.94915 11.0249 4.00114 11.5045 4.19982C11.9842 4.3985 12.3942 4.73495 12.6826 5.16663C12.971 5.59831 13.125 6.10582 13.125 6.625C13.125 7.32119 12.8484 7.98887 12.3562 8.48116C11.8639 8.97344 11.1962 9.25 10.5 9.25ZM18.375 18.875V18C18.375 16.3755 17.7297 14.8176 16.581 13.669C15.4324 12.5203 13.8745 11.875 12.25 11.875H8.75C7.12555 11.875 5.56763 12.5203 4.41897 13.669C3.27031 14.8176 2.625 16.3755 2.625 18V18.875H4.375V18C4.375 16.8397 4.83594 15.7269 5.65641 14.9064C6.47688 14.0859 7.58968 13.625 8.75 13.625H12.25C13.4103 13.625 14.5231 14.0859 15.3436 14.9064C16.1641 15.7269 16.625 16.8397 16.625 18V18.875H18.375Z"
      fill="#929395"
    />
  </Svg>;
};

const AddObserver = () => {
  const navigation = useNavigation(); // Initialize navigation using the hook

  const [username, setUsername] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isRequestPageOpen, setIsRequestPageOpen] = useState(false);
  const [observers, setObservers] = useState([
   
  ]);

  const toggleSwitch = () => setIsDarkMode(previousState => !previousState);

  const handleSendRequest = async () => {
    if (!username.trim()) {
      Alert.alert('Error', 'Please enter a valid User ID.');
      return;
    }

    try {
      const response = await sendRequest({ doctor: username });
      console.log("responsehandleSendRequest",response);
      Alert.alert('Success', 'Request sent successfully.');
      setUsername(''); // Clear the input after successful request
    } catch (error) {
      Alert.alert('Error', `Failed to send request: ${error.message}`);
    }
  };
  const renderDeviceItem = (device, index) => (
    <TouchableOpacity
      style={styles.deviceItemContainer}
      key={`${device.id}-${index}`} // Use combination of id and index as the key
    >
      <View style={styles.deviceInfo}>
        <View style={styles.deviceIconContainer}>
          <Image source={profileicon} style={styles.deviceIcon} />
        </View>
        <View style={styles.deviceTextContainer}>
          <Text style={styles.deviceName}>{device.name || 'Unknown'}</Text>
          <Text style={styles.deviceID} numberOfLines={1} ellipsizeMode="tail">
            {device.email}
          </Text>
        </View>
      </View>
      <Image source={trashnew} style={styles.arrowIcon} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer} // Adjust ScrollView to grow properly
          showsVerticalScrollIndicator={false}>
          <Header title="Observer" />
          <View style={styles.headerTextContainer}>
            <View style={styles.scanningButtonView}>
              <Text style={styles.availableDevicesText}>Add Observer!</Text>
              <Text style={styles.selectDeviceText}>
                Please enter your clinician’s User ID, which can be found on
                their Profile page
              </Text>
            </View>
            <View style={styles.userIdView}>
              <InputComponent
                label="User Id"
                placeholder="Enter User Id"
                value={username}
                onChangeText={text => setUsername(text)}
              />
            </View>
            <TouchableOpacity
              onPress={handleSendRequest}
              style={styles.footerView}>
              <Text style={styles.availableDevicesText}>
                Send Request {`>`}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.headerTextContainer}>
            <View style={styles.scanningButtonView}>
              <Text style={styles.availableDevicesText}>Pending Requests</Text>
            </View>
          </View>
          {observers?.map((device, index) => renderDeviceItem(device, index))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#232323',
  },
  container: {
    flex: 1, // Ensure container takes up the full screen
  },
  scrollContainer: {
    flexGrow: 1, // Ensure content container grows to fill the space
    paddingHorizontal: 16,
  },
  footerView: {
    // padding: 20,
    // backgroundColor: '#2B2D2E', // Footer background color
    alignItems: 'center', // Center the text
    // justifyContent: 'center',
  },
  availableDevicesText: {
    color: '#FFF', // White color
    fontFamily: 'Ubuntu',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 27,
    textAlign: 'left',
  },
  headerTextContainer: {
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
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
  deviceIcon: {
    width: 21,
    height: 21,
  },
  arrowIcon: {
    width: 19,
    height: 19,
  },
  selectDeviceText: {
    color: '#A8A9AA', // Grey text
    fontFamily: 'Ubuntu',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    textAlign: 'left',
    marginTop: 30,
  },
  userIdText: {
    color: '#929395',
    fontSize: 12,
  },
  userIdView: {
    marginTop: 32,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 12,
  },
});

export default AddObserver;
