import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop, G } from 'react-native-svg';
import { View, StyleSheet } from 'react-native';

const LineComponent = () => {
  return (
    <View style={styles.container}>
      <Svg
        width="375"
        height="38"
        viewBox="0 0 375 38"
        fill="none"
      >
        <Defs>
          <LinearGradient
            id="paint0_linear"
            x1="187.5"
            y1="1"
            x2="187.5"
            y2="16.6444"
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#27FFE9" />
            <Stop offset="1" stopColor="white" stopOpacity="0.1" />
          </LinearGradient>
        </Defs>
        <G filter="url(#filter0_d)">
          <Path
            d="M0 23C93.2487 23 116.503 1 188.001 1C259.5 1 286.765 23 375 23"
            stroke="url(#paint0_linear)"
            strokeOpacity="0.6"
            strokeWidth="0.5"
            shapeRendering="crispEdges"
          />
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 375,
    height: 22,
    flexShrink: 0,
    marginTop:20,
  },
});

export default LineComponent;
