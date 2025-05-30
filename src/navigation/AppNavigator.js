import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import SplashScreen from '../screens/SplashScreen';
import Registration from '../screens/Registration';
import ChartBar from '../assets/ChartBar.png'; // Replace with your actual icon paths
import ChartBarGrey from '../assets/Vectorgrey.png'; // Replace with your actual icon paths
import SquaresFourgray from '../assets/squrefourgrey.png'; // Replace with your actual icon paths
import squrefourredsqurefourred from '../assets/squrefourred.png'; // Replace with your actual icon paths
import SquaresFour from '../assets/SquaresFour.png'; // Replace with your actual icon paths
import squrefourred from '../assets/squrefourred.png'; // Replace with your actual icon paths
import chartred from '../assets/chartred.png'; // Replace with your actual icon paths
import ProfileScreen from '../screens/ProfileScreen';
import ObserverScreen from '../screens/ObserverScreen';
import AddObserver from '../screens/AddObserver';
import ScanningForDeviceScreen from '../screens/ObserverScreen';
import AddDeviceScreen from '../screens/AddDeviceScreen';
import DevicesFoundScreen from '../screens/DevicesFound';
import DeviceFoundScreen from '../screens/DeviceFoundScreen';
import DeviceDataScreen from '../screens/DeviceDataScreen';
import AppleHealth from '../screens/AppleHealth'; // Import the AppleHealth screen
import SleepInsightsScreen from '../screens/SleepInsightsScreen';
import ContributorScreen from '../screens/ContributorScreen'
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#2B2D2E',
          height: 70,
          borderTopWidth: 0,
        },
        headerShown: false,
      }}>
      <Tab.Screen
        name="Tab1"
        component={HomeScreen} // Replace with actual screen components
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? chartred : ChartBarGrey}
              style={{ width: 24, height: 24, resizeMode: 'contain' }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Tab2"
        component={ProfileScreen} // Replace with actual screen components
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? squrefourredsqurefourred : SquaresFourgray}
              style={{ width: 24, height: 24, resizeMode: 'contain' }}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="AppleHealth"
        component={AppleHealth}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={focused ? chartred : ChartBarGrey}
              style={{width: 24, height: 24, resizeMode: 'contain'}}
            />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        setIsLoggedIn(true);
      }
      setLoading(false);
    };
    checkLoginStatus();
  }, []);

  if (loading) {
    // Optionally render a splash/loading screen here
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLoggedIn ? 'HomeTabs' : 'SplashScreen'}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs} // This will be the bottom tab navigator
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ScanningForDeviceScreen"
          component={DevicesFoundScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ObserverScreen"
          component={ObserverScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddDeviceScreen"
          component={AddDeviceScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DevicesFoundScreen"
          component={DevicesFoundScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DevicesFoundScreenMain"
          component={DeviceFoundScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DeviceDataScreen"
          component={DeviceDataScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddObserver"
          component={AddObserver}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SleepInsightsScreen"
          component={SleepInsightsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ContributorScreen"
          component={ContributorScreen}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
