import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import bedIcon from '../assets/bed.png';        
import rightArrow from '../assets/CaretRight.png'; 
import moment from 'moment';
const ByteSleepScoreCard = ({ navigation, selectedDateIndex }) => {
  const date = moment()
    .subtract(selectedDateIndex + 1, "days")
    .format("YYYY-MM-DD");
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
            <Text style={styles.descText}>
              Your byte score was <Text style={styles.lowText}>low</Text>, which means your sleep wasn’t as recovery-focused.
            </Text>
          </View>
          <Image source={rightArrow} style={styles.arrow} />
        </View>
      </TouchableOpacity>
    </LinearGradient >
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
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
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
    marginTop: 4,
    tintColor: '#FFF',
    alignSelf: 'flex-start',
  },
});

export default ByteSleepScoreCard;