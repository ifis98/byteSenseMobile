import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const FullPageBackground = () => {
  return (
    <LinearGradient
      colors={['#232323', '#000000']} // You can define your gradient colors here
      style={styles.container}
    >
      <Text style={styles.text}>Hello World</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
});

export default FullPageBackground;
