import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Text,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import bg from '../assets/bg.png'; // Your background image path
import logo from '../assets/logo.png'; // Your logo image path
import ButtonComponent from '../components/Button';
const { width } = Dimensions.get('window'); // Get the width of the screen

const SplashScreen = () => {
  const navigation = useNavigation(); // Initialize navigation using the hook

  const handleCreateAccount = () => {
    navigation.navigate('Registration');
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <ImageBackground source={bg} style={styles.container} resizeMode="cover">
      <SafeAreaView style={styles.safeArea}>
        {/* Flex for pushing the buttonContainer to the bottom */}
        <View style={styles.logoContainer}>
          <Image style={styles.tinyLogo} source={logo} />
        </View>
        {/* Place button at the bottom */}
        <View style={styles.buttonContainer}>
          <ButtonComponent onPress={handleCreateAccount} title="Create Account" />
          <TouchableOpacity onPress={handleLogin} style={styles.loginButtonContainer}>
            <Text style={styles.text}>Already have an account? </Text>
            <Text style={styles.textLogin}>Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between', // Push the content to the top and buttons to the bottom
    alignItems: 'center',
    width: '100%',
  },
  logoContainer: {
    flex: 1, // Takes the space between the top and the button container
    justifyContent: 'center',
    alignItems: 'center',
  },
  tinyLogo: {
    width: 261,
    height: 54,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: width * 0.05, // Use a percentage of the screen width for padding

    paddingBottom: 21, // Add some padding at the bottom to avoid cutting off the button
  },
  loginButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10, // Space between Create Account and Login text
    paddingBottom: 36,
    paddingTop: 16,
  },
  text: {
    color: '#FFFFFF',
  },
  textLogin: {
    color: '#FD0405',
    marginLeft: 5, // Small space between 'Already have an account?' and 'Login'
  },
});

export default SplashScreen;