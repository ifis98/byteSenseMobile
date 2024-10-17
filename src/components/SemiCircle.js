import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomSVG from './CustomSVG';

const SemiCircleLayout = () => {
  const numberOfSVGs = 50;
  const radius = 300; // Radius of the semi-circle

  // Function to calculate the position of each SVG using polar coordinates
  const getPosition = (index) => {
    const angle = Math.PI * (index / (numberOfSVGs - 1)); // From 0 to π
    const x = radius * Math.cos(angle); // Calculate the x position
    const y = radius * Math.sin(angle); // Calculate the y position
    return {
      left: x + radius, // Offset by radius to ensure all items are visible within the view
      top: radius - y, // Invert y to flip the semi-circle to open upwards
    };
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: numberOfSVGs }).map((_, index) => (
        <View
          key={index}
          style={[styles.svgContainer, getPosition(index)]}
        >
          <CustomSVG />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 600, // Width of the View should be large enough
    height: 350, // Half the diameter plus some padding
    position: 'relative',
    overflow: 'hidden',
  },
  svgContainer: {
    position: 'absolute',
    transform: [{ translateX: -7.269 }, { translateY: -17.5675 }] // Half the width and height of the SVG to center it
  },
});

export default SemiCircleLayout;
