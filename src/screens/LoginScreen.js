import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
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
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Add AsyncStorage
import {setUser} from '../redux/userSlice';
import ButtonComponent from '../components/Button';
import logo from '../assets/logo.png';
import eclipse from '../assets/eclipse.png';
import InputComponent from '../components/InputComponent';
import {login} from '../api/api';

const {width, height} = Dimensions.get('window');

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  // const [username, setUsername] = useState('joerogan');
  // const [password, setPassword] = useState('joerogan');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        // Navigate to HomeTabs if user is already logged in
        navigation.replace('HomeTabs');
      }
    };

    checkLoginStatus();

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false),
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    if (!username || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      setLoading(false);
      return;
    }
    try {
      const token = await login(username, password);
      if (token) {
        const dummyUser = {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
        };

        // Save user token in AsyncStorage
        await AsyncStorage.setItem('userToken', token);
        dispatch(setUser(dummyUser));

        navigation.replace('HomeTabs');
      } else {
        Alert.alert(
          'Login Failed',
          'Invalid username or password. Please try again.',
        );
      }
    } catch (error) {
      Alert.alert(
        'Invalid Username And Password!',
        error.message || 'Something went wrong. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = () => {
    navigation.navigate('Registration');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: '#232323'}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled">
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.logoWithDotContainer}>
              <Image style={styles.tinyLogoMain} source={eclipse} />
              <View style={styles.dot} />
            </View>

            <View style={styles.buttonContainer}>
              <View style={styles.logoContainerImg}>
                <Image style={styles.tinyLogo} source={logo} />
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
                  label="Password"
                  placeholder="Enter Password"
                  value={password}
                  onChangeText={text => setPassword(text)}
                  isPassword
                />
              </View>
              <View style={styles.loginButton}>
                {loading ? (
                  <ActivityIndicator size="large" color="#FD0405" />
                ) : (
                  <ButtonComponent onPress={handleLogin} title="Login" />
                )}
              </View>
              <TouchableOpacity
                onPress={handleCreateAccount}
                style={styles.loginButtonContainer}>
                <Text style={styles.text}>Don't have an account yet?</Text>
                <Text style={styles.textLogin}>Sign Up?</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    flex: 1,
    backgroundColor: '#232323',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 10,
  },
  tinyLogoMain: {
    marginLeft: -200,
  },
  logoWithDotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 89,
    backgroundColor: '#858688',
    marginLeft: -28,
  },
  logoContainerImg: {
    // height: height * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,
    marginBottom: 200,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: width * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: -50,
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
    marginTop: 40,
    width: '100%',
  },
  text: {
    color: '#FFFFFF',
  },
  textLogin: {
    color: '#FD0405',
    marginLeft: 5,
  },
});

export default LoginScreen;
