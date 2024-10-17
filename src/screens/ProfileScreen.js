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
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { useState } from 'react';
import logo from '../assets/logo.png'; // Your logo image path
import devicesIcon from '../assets/Devices.png'; // Device icon path
import profileIcon from '../assets/UserCircle.png'; // Profile icon path
import observersIcon from '../assets/UserCheck.png'; // Observers icon path
import helpIcon from '../assets/Question.png'; // Help icon path
import teethlogo from '../assets/teethlogo.png'; // Help icon path
import Header from './header';


const { width } = Dimensions.get('window');

const ProfileScreen = () => {
    const navigation = useNavigation(); // Initialize navigation using the hook

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSwitch = () => setIsDarkMode((previousState) => !previousState);

  const renderOption = (icon, title, subtitle, onPress, isSwitch) => (
    <TouchableOpacity onPress={onPress} style={styles.optionContainer}>
      <View style={styles.optionLeft}>
        <Image source={icon} style={styles.optionIcon} />
        <View>
          <Text style={styles.optionTitle}>{title}</Text>
          {subtitle ? <Text style={styles.optionSubtitle}>{subtitle}</Text> : null}
        </View>
      </View>
      {isSwitch ? (
        <Switch
          trackColor={{ false: '#767577', true: '#FD0405' }}
          thumbColor={isDarkMode ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isDarkMode}
        />
      ) : (
        <Text style={styles.arrow}>{'>'}</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Header title="Home" />
        <View style={styles.logoContainer}>
          <Image source={teethlogo} style={styles.teethlogo} />
        </View>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
        </View>

        {renderOption(devicesIcon, 'Devices', '1 Device Connected', () => {navigation.navigate('ScanningForDeviceScreen')}, false)}
        {renderOption(profileIcon, 'Profile', 'Check your profile details', () => {}, false)}
        {renderOption(observersIcon, 'Observers', '0 No Observer Yet!', () => {}, false)}
        {renderOption(helpIcon, 'Help', 'Need Help?', () => {}, false)}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#232323',
  },
  teethlogo:{
    marginBottom:-350
  },
  container: {
    paddingHorizontal: 16,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  logo: {
    width: 261,
    height: 54,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2B2D2E',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  optionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  optionSubtitle: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14,
    marginTop: 4,
  },
  arrow: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default ProfileScreen;
