import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import rightArrow from '../assets/CaretRight.png';

const ContributorCard = ({ title, status, statusColor, value, barColor }) => (
  <TouchableOpacity activeOpacity={0.9} style={styles.card}>
    <View style={styles.cardHeader}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={[styles.statusBadge, { backgroundColor: statusColor + '22' }]}>
        <Text style={[styles.statusText, { color: statusColor }]}>{status}</Text>
      </View>
      <Image source={rightArrow} style={styles.arrow} />
    </View>
    <View style={styles.sliderRow}>
      <View style={styles.sliderTrack}>
        {/* Left (red) fill for value < 0.5, extending from circle to left */}
        {value < 0.5 && (
          <View
            style={[
              styles.sliderSideFill,
              styles.leftFill,
              {
                right: '50%',
                width: `${(0.5 - value) * 100}%`,
                backgroundColor: '#FD3637',
              },
            ]}
          />
        )}
        {/* Right (green) fill for value > 0.5 */}
        {value > 0.5 && (
          <View
            style={[
              styles.sliderSideFill,
              styles.rightFill,
              {
                left: '50%',
                width: `${(value - 0.5) * 100}%`,
                backgroundColor: '#13DF74',
              },
            ]}
          />
        )}
        <View style={styles.sliderMiddleCircle} />
      </View>
    </View>
  </TouchableOpacity>
);

const ContributorsSection = ({ contributors = [] }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Contributors</Text>
    <View>
      {contributors.map((c) => (
        <ContributorCard key={c.key} {...c} />
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  section: {
    width: '100%',
    marginTop: 14,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 16,
    fontFamily: 'Ubuntu',
  },
  card: {
    backgroundColor: '#2A2A2A',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingTop: 17,
    paddingBottom: 15,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 2 },
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    color: '#A8A9AA',
    fontSize: 14,
    fontFamily: 'Ubuntu',
    flex: 1,
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 53,
    marginLeft: 6,
    marginRight: 4,
    minWidth: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Ubuntu',
    textTransform: 'capitalize',
  },
  arrow: {
    width: 18,
    height: 18,
    tintColor: '#A8A9AA',
    marginLeft: 2,
    marginTop: 1,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  sliderTrack: {
    flex: 1,
    height: 6,
    borderRadius: 6,
    backgroundColor: '#393B3D',
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
  },
  sliderFill: {
    height: 6,
    borderRadius: 6,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  sliderMiddleCircle: {
    position: 'absolute',
    top: 46, // centers the circle over the 6px line
    left: '50%',
    marginLeft: -8, // half the size of the circle
    width: 9,
    height: 9,
    borderRadius: 8,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#232323',
    zIndex: 2,
  },
  sliderSideFill: {
    position: 'absolute',
    height: 6,
    top: 0,
    borderRadius: 6,
  },
  leftFill: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  rightFill: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  sliderMiddleCircle: {
    position: 'absolute',
    top: -1.5, // Center the 9px circle on the 6px track
    left: '50%',
    marginLeft: -4.5,
    width: 9,
    height: 9,
    borderRadius: 6,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#232323',
    zIndex: 2,
  },

});

export default ContributorsSection;
