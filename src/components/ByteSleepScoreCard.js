import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import bedIcon from '../assets/bed.png';
import rightArrow from '../assets/CaretRight.png';
import moment from 'moment';
const ByteSleepScoreCard = ({ navigation, selectedDateIndex, score }) => {
  const date = moment()
    .subtract(selectedDateIndex + 1, "days")
    .format("YYYY-MM-DD");

  const getDescription = value => {
    if (typeof value !== 'number') {
      return '';
    }
    if (value <= 33) {
      return 'Your sleep didn\u2019t provide the recovery your body needed.';
    }
    if (value <= 67) {
      return 'Your sleep offered some recovery, but it wasn\u2019t fully restorative.';
    }
    return 'Your sleep was calm, effective, and deeply restorative.';
  };
  return (
    <LinearGradient
      colors={['#302726', '#771C1D', '#771C1D', '#601F1F', '#302726']}
      locations={[0.0, 0.40, 0.5, 0.70, 1.0]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.card}
    >
      <TouchableOpacity
        activeOpacity={0.85}
        style={{ flex: 1 }}
        onPress={() => navigation.navigate("SleepInsightsScreen", { date: date })}
      >
        <View style={styles.innerRow}>
          <View style={styles.textCol}>
            <View style={styles.row}>
              <Image source={bedIcon} style={styles.icon} />
              <Text style={styles.titleText}>byte Sleep Score</Text>
            </View>
            <Text style={styles.descText}>{getDescription(score)}</Text>
          </View>
          {/* Add score number here */}
          <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
            <Text style={styles.scoreNumber}>{score}</Text>
            <Image source={rightArrow} style={styles.arrow} />
          </View>

        </View>
      </TouchableOpacity>
    </LinearGradient>
  )
};

const styles = StyleSheet.create({
  card: {
    marginTop: 12,
    marginHorizontal: 18,
    height: 92,
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#99161680',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.09,
    shadowRadius: 16,
  },
  innerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',  // <<--- align top
    height: '100%',
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:5
  },
  icon: {
    width: 15,
    height: 11,
    resizeMode: 'contain',
    tintColor: '#fff', // optional
    opacity: 0.82,
    marginRight: 7,
  },
  textCol: {
    flex: 1,
    justifyContent: 'center',
  },
  titleText: {
    color: '#F2F2F2',
    fontSize: 14,
    fontFamily: 'Ubuntu',
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  descText: {
    color: '#EAEAEA',
    fontSize: 12,
    fontFamily: 'Ubuntu',
    fontWeight: '400',
    opacity: 0.60,
    lineHeight: 18,
    marginTop: 10,
  },
  lowText: {
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  arrow: {
    width: 15,
    height: 15,
    marginTop: 5,
    tintColor: '#FFF',
    alignSelf: 'flex-start',
  },
  scoreNumber: {
    color: '#FFF',
    fontSize: 14,
    marginTop: 4,
    fontWeight: 'bold',
    marginRight: 5,
    alignSelf: 'flex-start', // or 'center' for center alignment within the row
  },
});

export default ByteSleepScoreCard;