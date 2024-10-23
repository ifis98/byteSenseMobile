import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { setUser } from '../redux/userSlice';
import ButtonComponent from '../components/Button';
import logo from '../assets/logo.png';
import eclipse from '../assets/eclipse.png';
import InputComponent from '../components/InputComponent';
import { register } from '../api/api';  // Import the register API

const { width, height } = Dimensions.get('window');

const Registration = ({ navigation }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isDoctor, setIsDoctor] = useState(false); // Assuming this is a checkbox or switch state
  const [loading, setLoading] = useState(false);

  const handleCreateAccount = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const response = await register(
        firstName,
        lastName,
        username,
        email,
        password,
        confirmPassword,
        isDoctor
      );
      Alert.alert('Success', 'Account created successfully!');


      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Registration Error', error.message); // Show any errors
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <ScrollView 
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.safeArea}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.logoWithDotContainer}>
            <Image style={styles.tinyLogoMain} source={eclipse} />
            <View style={styles.dot} />
          </View>
          <View style={styles.logoContainerImg}>
            <Image style={styles.tinyLogo} source={logo} />
          </View>

          <View style={styles.inputWrapperRow}>
            <View style={styles.inputWrapperHalf}>
              <InputComponent
                label="First name"
                placeholder="Enter first name"
                value={firstName}
                onChangeText={text => setFirstName(text)}
              />
            </View>
            <View style={styles.inputWrapperHalf}>
              <InputComponent
                label="Last name"
                placeholder="Enter last name"
                value={lastName}
                onChangeText={text => setLastName(text)}
              />
            </View>
          </View>

          <View style={styles.inputWrapper}>
            <InputComponent
              label="Username"
              placeholder="Enter username"
              value={username}
              onChangeText={text => setUsername(text)}
            />
          </View>

          <View style={styles.inputWrapper}>
            <InputComponent
              label="Email"
              placeholder="Enter email"
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>

          <View style={styles.inputWrapper}>
            <InputComponent
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={text => setPassword(text)}
              isPassword
            />
          </View>

          <View style={styles.inputWrapper}>
            <InputComponent
              label="Confirm password"
              placeholder="Enter your password"
              value={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
              isPassword
            />
          </View>


          <View style={styles.loginButton}>
            <ButtonComponent onPress={handleCreateAccount} title={loading ? 'Creating...' : 'Sign up'} buttonStyle={styles.signUpButton} />
          </View>

          <TouchableOpacity onPress={handleLogin} style={styles.loginButtonContainer}>
            <Text style={styles.text}>Already have an account?</Text>
            <Text style={styles.textLogin}>Login</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center', // Centers content when there's extra space
    alignItems: 'center',
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 5,
  },
  inputWrapperRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
    marginTop:-50,
  },
  inputWrapperHalf: {
    width: '48%',
  },
  tinyLogoMain: {
    marginLeft: -200,
    marginTop:-150,
  },
  logoWithDotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height:170,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 89,
    backgroundColor: '#858688', // var(--Grey-grey-600, #858688)
    marginLeft: -170, // Adds spacing between the image and the dot
    marginTop:50,
  },
  logoContainerImg: {
    height: height * 0.2, // Adjust height dynamically based on screen size
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    marginTop:-56,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: width * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tinyLogo: {
    width: 261,
    height: 54,
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#232323',
    paddingHorizontal: 16,
  },
  loginButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    width: '100%',
    paddingBottom: 36,
    paddingTop: 16,
  },
  loginButton: {
    marginTop: 20,
    width: '100%',
  },
  signUpButton: {
    backgroundColor: '#FD0405',
    width: '100%',
    height: 48,
  },
  forgotPasswordText: {
    color: '#858688',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  text: {
    color: '#FFFFFF',
  },
  textLogin: {
    color: '#FD0405',
    marginLeft: 5,
  },
});


export default Registration;
