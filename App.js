import React, {useEffect} from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider } from 'react-redux';
import store, { persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ActivityIndicator } from 'react-native';
import { ThemeProvider } from './src/context/ThemeContext';
import { LogBox, StatusBar } from 'react-native';
import {downloadLatestFirmware} from './src/utils/firmwareManager';
LogBox.ignoreAllLogs();

const App = () => {
  useEffect(() => {
    downloadLatestFirmware().catch(err =>
      console.error('Failed to download firmware:', err),
    );
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <StatusBar backgroundColor="transparent" barStyle="light-content" translucent={true} />
        <ThemeProvider>
          <AppNavigator />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
