import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import AppleHealthKit from 'react-native-health';
import Header from './header'; // Import your header component

const AppleHealth = () => {
  const [healthData, setHealthData] = useState({});
  const [error, setError] = useState(null);

  const options = {
    permissions: {
      read: [
        AppleHealthKit.Constants.Permissions.StepCount,
        AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
        AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
        AppleHealthKit.Constants.Permissions.HeartRate,
        AppleHealthKit.Constants.Permissions.SleepAnalysis,
      ],
    },
  };

  useEffect(() => {
    if (Platform.OS === 'ios') {
      AppleHealthKit.initHealthKit(options, (err) => {
        if (err) {
          setError('Error initializing HealthKit');
          console.error('Error initializing HealthKit: ', err);
          return;
        }
        fetchHealthData();
      });
    } else {
      Alert.alert('Apple Health is only available on iOS devices.');
      setError('Apple Health is only available on iOS devices.');
    }
  }, []);

  const fetchHealthData = () => {
    
    const startDate = new Date(2023, 11, 1).toISOString(); // Example: Dec 1, 2023
    const endDate = new Date().toISOString();

    const fetchers = [
      { key: 'stepCount', method: 'getStepCount' },
      { key: 'distanceWalkingRunning', method: 'getDistanceWalkingRunning' },
      { key: 'activeEnergyBurned', method: 'getActiveEnergyBurned' },
      { key: 'heartRate', method: 'getHeartRateSamples' },
      { key: 'sleepAnalysis', method: 'getSleepSamples' },
    ];

    fetchers.forEach(({ key, method }) => {
      AppleHealthKit[method](
        { startDate, endDate },
        (err, results) => {
          if (err) {
            console.error(`Error fetching ${key}: `, err);
            return;
          }
          setHealthData((prev) => ({ ...prev, [key]: results }));
        }
      );
    });
  };

  const renderHealthData = () => {
    return Object.entries(healthData).map(([key, value]) => (
      <View key={key} style={styles.dataItem}>
        <Text style={styles.label}>{key.replace(/([A-Z])/g, ' $1')}:</Text>
        <Text style={styles.value}>
          {typeof value === 'object' ? JSON.stringify(value, null, 2) : value}
        </Text>
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <Header title="Apple Health" />
        <View style={styles.section}>
          <Text style={styles.title}>Health Data Overview</Text>
          {Platform.OS !== 'ios' ? (
            <Text style={styles.error}>{error}</Text>
          ) : (
            <>
              {renderHealthData()}
              <TouchableOpacity style={styles.refreshButton} onPress={fetchHealthData}>
                <Text style={styles.refreshButtonText}>Refresh Data</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#232323',
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#2B2D2E',
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  dataItem: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  value: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 4,
  },
  error: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
  refreshButton: {
    marginTop: 20,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#FD0405',
    borderRadius: 8,
  },
  refreshButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default AppleHealth;
