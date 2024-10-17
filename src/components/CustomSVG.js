import React from 'react';
import { View, StyleSheet } from 'react-native';

const CustomSVG = ({ selected = true }) => {
  const containerStyle = {
    width: 5,
    height: 35,
    backgroundColor: selected ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 1)',
    borderRadius: 35,
    marginLeft: 10,
  };

  return (
    <View style={containerStyle} />
  );
};

export default CustomSVG;
