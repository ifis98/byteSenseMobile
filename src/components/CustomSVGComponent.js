import React from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';

const {width} = Dimensions.get('window');
const radius = width * 0.4; // Adjust radius for your layout needs

const CustomSVG = ({angle, selected, index}) => {
  // Calculate position based on angle, adjusting to start from 9 o'clock to 3 o'clock clockwise
  const x = radius * Math.cos(angle) + width / 2 - 2.5; // Offset by half the width of CustomSVG
  const baseHeight = 35;
  const selectedHeight = 55;
  // Adjust y position to center vertically based on height
  const y =
    radius * Math.sin(angle) +
    radius -
    (selected ? selectedHeight : baseHeight) / 2;

  const containerStyle = {
    position: 'absolute',
    left: x,
    top: y,
    width: 5,
    height: selected ? selectedHeight : baseHeight,
    backgroundColor: selected
      ? 'rgba(255, 255, 255, 1)'
      : index <= 5 || index >= 45
      ? 'rgba(255, 255, 255, 0.3)'
      : 'rgba(255, 255, 255, 0.4)',
    borderRadius: 35,
    transform: [{rotate: `${angle - Math.PI / 2}rad`}],
    // Apply shadow effect only to the selected one
    shadowColor: '#FFFFFF', // White shadow color for the glow effect
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: selected ? 1 : 0, // Full opacity for the selected item
    shadowRadius: selected ? 30 : 0, // Larger radius for the glow effect
    elevation: selected ? 10 : 0, // Add elevation for Android (shadow fallback)
  };

  return <View style={containerStyle} />;
};

const HalfCircleSVGs = props => {
  const items = Array.from({length: 50}).map((_, index) => {
    // Clockwise from 9 to 3 o'clock
    const angle = Math.PI - (index / -49) * Math.PI; // Start at π and decrease to 0
    return (
      <CustomSVG
        key={index}
        index={index + 1}
        angle={angle}
        selected={index === props.selectedIndex / 2}
      />
    );
  });

  return (
    <View style={styles.container}>
      {items}
      <Text style={styles.text}>Byte Score</Text>
      <View style={styles.percentage}>
        <Text style={styles.bigText}>{props.selectedIndex}</Text>
        <Text style={styles.smallText}>/100</Text>
      </View>
      <Text style={styles.yesterDay}>+3% from yesterday</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigText: {
    color: '#FFF',
    fontFamily: 'Ubuntu',
    fontSize: 44,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 44 /* 100% */,
  },
  smallText: {
    color: '#929395',
    fontFamily: 'Ubuntu',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20 /* 100% */,
  },
  percentage: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  yesterDay: {
    color: '#27FFE9',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 12,
    marginTop: 12,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.50)',
    textAlign: 'center',
    fontFamily: 'Ubuntu',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 12,
    letterSpacing: 0.24,
    textTransform: 'uppercase',
  },
});

export default HalfCircleSVGs;
