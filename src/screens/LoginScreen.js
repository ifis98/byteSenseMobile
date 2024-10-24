import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
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
} from 'react-native';
import {setUser} from '../redux/userSlice';
import ButtonComponent from '../components/Button';
import logo from '../assets/logo.png';
import eclipse from '../assets/eclipse.png';
import InputComponent from '../components/InputComponent';
import { login } from '../api/api'; 

const {width, height} = Dimensions.get('window');

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('joerogan');
  const [password, setPassword] = useState('joerogan');

  const handleLogin = async () => {
    const token = await login(username, password);
    if(token)
    {
      const dummyUser = {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
      };
      dispatch(setUser(dummyUser));
      navigation.replace('HomeTabs');
    }

   
  };

  const handleCreateAccount = () => {
    navigation.navigate('Registration');
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
          <View style={styles.buttonContainer}>
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
              <ButtonComponent onPress={handleLogin} title="Login" />
            </View>

            <TouchableOpacity onPress={handleCreateAccount} style={styles.loginButtonContainer}>
              <Text style={styles.text}>Don't have an account yet?</Text>
              <Text style={styles.textLogin}>Sign Up?</Text>
            </TouchableOpacity>
          </View>
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
    marginBottom: 10,
  },
  tinyLogoMain: {
    marginLeft: -200,
  },
  logoWithDotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 89,
    backgroundColor: '#858688', // var(--Grey-grey-600, #858688)
    marginLeft: -28, // Adds spacing between the image and the dot
  },
  logoContainerImg: {
    height: height * 0.2, // Adjust height dynamically based on screen size
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: width * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:-50,
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
