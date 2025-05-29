import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, StatusBar, Image, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from './header';
import redLineVector from "../assets/redLineVector.png"
import SleepScoreBars from '../components/SleepScoreBars'
import ContributorsSection from '../components/ContributorsSection';
import SleepHypnogram from '../components/SleepHypnogram';
import HypnogramChart from '../components/HypnogramChart'
//mock data
const contributors = [
  { key: 'recovery', title: 'Recovery Depth Score', status: 'Optimal', statusColor: '#13DF74', value: 0.95, barColor: '#13DF74' },
  { key: 'stress', title: 'Stress Relief Score', status: 'Good', statusColor: '#49D365', value: 0.72, barColor: '#13DF74' },
  { key: 'relaxation', title: 'Relaxation Score', status: 'Fair', statusColor: '#FDB438', value: 0.22, barColor: '#FDB438' },
];

const sleepStagesData = [
  // This should be more granular for real data (per 5min/10min/epoch)
  // Use 40-50 items for a real night.
  { stage: 'awake' }, { stage: 'awake' }, { stage: 'light' }, { stage: 'light' }, { stage: 'deep' },
  { stage: 'rem' }, { stage: 'light' }, { stage: 'light' }, { stage: 'deep' }, { stage: 'rem' },
  // ...etc (repeat/mix as real data)
];
const sleepSummary = {
  awake: '29m · 6%',
  light: '3h10m · 40%',
  rem: '2h18m · 29%',
  deep: '1h59m · 25%',
};

const ByteSleepScore = ({ score = 90 }) => (
  <View style={styles.scoreContainer}>
    <Text style={styles.overallText}>OVERALL BYTE SLEEP SCORE</Text>
    <View style={styles.scoreRow}>
      <Text style={styles.scoreText}>{score}</Text>
      <Text style={styles.outOfText}>/100</Text>
    </View>
  </View>
);

const SleepInsightsPage = ({ route }) => {
  const { title = "Sleep Insights" } = route.params || {};
  return (
    <LinearGradient
      colors={['#2C1012', '#2C1012', '#232323']}
      locations={[0, 0.2, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <Header showBackArrow={true} title={title} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >

        <View style={{ marginTop: 10 }} />
        <ByteSleepScore score={90} date="Wed, May 28" />
        <Image source={redLineVector} style={styles.lineImage} />
        <SleepScoreBars data={[
          { day: 'S', score: 72 },
          { day: 'M', score: 89 },
          { day: 'T', score: 89 },
          { day: 'W', score: 90, isCurrent: true },
          { day: 'T', score: 89 },
          { day: 'F', score: 73 },
          { day: 'S', score: 77 },
          { day: 'S', score: 74 },
          { day: 'M', score: 92 },
          { day: 'T', score: 87 },
        ]} />
        <ContributorsSection contributors={contributors} />
        <SleepHypnogram
          data={sleepStagesData}
          summary={sleepSummary}
          timeline={['11PM', '3AM', '8AM']}
        />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    marginHorizontal: 18,
    width: '90%',
  },
  dateText: {
    color: '#A8A9AA',
    fontSize: 16,
    fontFamily: 'Ubuntu',
    marginBottom: 7,
    letterSpacing: 0.2,
  },
  overallText: {
    color: '#FFF',
    fontSize: 12,
    fontFamily: 'Ubuntu',
    opacity: 0.6,
    marginBottom: 8,
    fontWeight: '500',
    letterSpacing: 1,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  scoreText: {
    color: '#FFF',
    fontSize: 44,
    fontWeight: '500',
    fontFamily: 'Ubuntu',
    lineHeight: 44,
    marginRight: 4,
  },
  outOfText: {
    color: '#A8A9AA',
    fontSize: 14,
    fontFamily: 'Ubuntu',
    fontWeight: '500',
    marginBottom: 6,
  },
  lineImage: {
    marginTop: 4,
    width: '100%',
    resizeMode: 'contain',
  },
});

export default SleepInsightsPage;
