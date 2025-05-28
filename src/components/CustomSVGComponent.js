import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

const { width } = Dimensions.get('window');
const radius = width * 0.34;

const CustomSVG = ({ angle, selected, index }) => {
  const x = radius * Math.cos(angle) + width / 2 - 1.5;
  const baseHeight = 20;
  const selectedHeight = 25;

  const y =
    radius * Math.sin(angle) +
    radius * 0.9 -
    (selected ? selectedHeight : baseHeight) / 2;

  const fade = index < 3 || index > 56 ? 0.2 : 0.4;

  return (
    <View
      style={[
        styles.tick,
        {
          left: x,
          top: y,
          height: selected ? selectedHeight : baseHeight,
          opacity: selected ? 1 : 0.5,
          backgroundColor: selected ? '#FFF' : `rgba(255,255,255,${fade})`,
          transform: [{ rotate: `${angle - Math.PI / 2}rad` }],
          shadowOpacity: selected ? 0.9 : 0,
          shadowRadius: selected ? 10 : 0,
          elevation: selected ? 5 : 0,
        },
      ]}
    />
  );
};

const HalfCircleSVGs = ({ selectedIndex = 26, bruxismPercent = '--' }) => {
  const TOTAL_TICKS = 60;
  const START_ANGLE = (11 * Math.PI) / 12; // 165°
  const END_ANGLE = Math.PI / 12;          // 15°
  const sweepAngle = (2 * Math.PI + END_ANGLE - START_ANGLE) % (2 * Math.PI);

  const items = Array.from({ length: TOTAL_TICKS }).map((_, index) => {
    const angle = START_ANGLE + (sweepAngle * index) / (TOTAL_TICKS - 1);
    return (
      <CustomSVG
        key={index}
        index={index + 1}
        angle={angle}
        selected={
          index === Math.round((selectedIndex / 100) * (TOTAL_TICKS - 1))
        }
      />
    );
  });

  return (
    <View style={styles.container}>
      {items}

      {/* Score content inside the arc */}
      <View style={styles.content}>
        <Text style={styles.text}>MORNING READINESS</Text>
        <View style={styles.percentage}>
          <Text style={styles.bigText}>{selectedIndex}</Text>
          <Text style={styles.smallText}> /100</Text>
        </View>
      </View>

      {/* Badge and subtitle in one row */}
      <View style={styles.badgeRow}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{bruxismPercent}</Text>
        </View>
        <Text style={styles.subtitle}>
          of your sleep was{'\n'}compromised by bruxism
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  content: {
    position: 'absolute',
    top: 40,
    alignItems: 'center',
  },
  bigText: {
    color: '#FFF',
    fontFamily: 'Ubuntu',
    fontSize: 44,
    fontWeight: '500',
    lineHeight: 44,
  },
  smallText: {
    color: '#929395',
    fontFamily: 'Ubuntu',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  percentage: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'center',
    fontFamily: 'Ubuntu',
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  subtitle: {
    color: '#929395',
    fontSize: 13,
    paddingLeft: 10,
    lineHeight: 20,
    fontFamily: 'Ubuntu',
    opacity: 0.85,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  badge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FF040533',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 17,
    fontFamily: 'Ubuntu',
  },
  tick: {
    position: 'absolute',
    width: 4,
    borderRadius: 20,
    shadowColor: '#FFF',
    shadowOffset: { width: 0, height: 0 },
  },
});

export default HalfCircleSVGs;
