import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { toNumber } from '../utils/numberUtils';
import Header from './header';
import redLineVector from '../assets/redLineVector.png';
import SleepScoreBars from '../components/SleepScoreBars';
import ContributorsSection from '../components/ContributorsSection';
import SleepHypnogram from '../components/SleepHypnogram';

const SCORE_KEYS = {
  'Recovery Depth Score': 'recoveryDepthScore',
  'Stress Relief Score': 'recoveryTrendScore',
  'Relaxation Score': 'stressLoadScore',
};

const ByteSleepScore = ({ score }) => (
  <View style={styles.scoreContainer}>
    <Text style={styles.overallText}>OVERALL BYTE SLEEP SCORE</Text>
    <View style={styles.scoreRow}>
      <Text style={styles.scoreText}>{score ?? '--'}</Text>
      <Text style={styles.outOfText}>/100</Text>
    </View>
  </View>
);

const getStatus = score => {
  if (score == null) {
    return { label: 'Critical', color: '#FD3637' };
  }
  if (score >= 80) return { label: 'Optimal', color: '#13DF74' };
  if (score >= 60) return { label: 'Good', color: '#13DF74' };
  if (score >= 40) return { label: 'Fair', color: '#FDB438' };
  if (score >= 20) return { label: 'Poor', color: '#FD8B02' };
  return { label: 'Critical', color: '#FD3637' };
};

const SleepInsightsPage = ({ route, navigation }) => {
  const { date } = route.params || {};
  const patientData = useSelector(state => state.patientData.data);

  const days = useMemo(() => {
    if (!patientData?.appData) return [];
    return [...patientData.appData]
      .filter(d => d.Date)
      .sort((a, b) => new Date(a.Date) - new Date(b.Date));
  }, [patientData]);

  const initialIndex = useMemo(() => {
    const idx = days.findIndex(d => moment(d.Date).isSame(date, 'day'));
    return idx === -1 ? days.length - 1 : idx;
  }, [days, date]);

  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  useEffect(() => {
    setSelectedIndex(initialIndex);
  }, [initialIndex]);

  const selectedData = days[selectedIndex];

  const getWeekData = field => {
    if (!selectedData) return { data: [], highlightIdx: 0 };
    const selectedMoment = moment(selectedData.Date);
    const startOfWeek = selectedMoment.clone().startOf('week');
    const data = [];
    for (let i = 0; i < 7; i++) {
      const dayMoment = startOfWeek.clone().add(i, 'days');
      const dayData = days.find(d => moment(d.Date).isSame(dayMoment, 'day'));
      data.push(Math.round(toNumber(dayData?.[field]) || 0));
    }
    const highlightIdx = selectedMoment.diff(startOfWeek, 'days');
    return { data, highlightIdx };
  };

  const barData = days.map(d => ({
    day: moment(d.Date).format('dd').charAt(0),
    score: Math.round(toNumber(d.byteScore) || 0),
  }));

  const contributors = useMemo(() => {
    if (!selectedData) return [];
    const depth = Math.round(toNumber(selectedData.recoveryDepthScore) || 0);
    const stress = Math.round(toNumber(selectedData.recoveryTrendScore) || 0);
    const relax = Math.round(toNumber(selectedData.stressLoadScore) || 0);
    const arr = [
      { title: 'Recovery Depth Score', score: depth },
      { title: 'Stress Relief Score', score: stress },
      { title: 'Relaxation Score', score: relax },
    ];
    return arr.map(item => {
      const { label, color } = getStatus(item.score);
      return {
        key: item.title,
        title: item.title,
        score: item.score,
        status: label,
        statusColor: color,
        value: (item.score ?? 0) / 100,
        barColor: color,
      };
    });
  }, [selectedData]);

  useEffect(() => {
    if (selectedData) {
      console.log('Selected day scores', {
        date: selectedData.Date,
        byteScore: Math.round(toNumber(selectedData.byteScore) || 0),
        recoveryDepthScore: Math.round(
          toNumber(selectedData.recoveryDepthScore) || 0,
        ),
        stressReliefScore: Math.round(
          toNumber(selectedData.recoveryTrendScore) || 0,
        ),
        relaxationScore: Math.round(
          toNumber(selectedData.stressLoadScore) || 0,
        ),
      });
    }
  }, [selectedData]);

  const totalSleepMinutes = useMemo(() => {
    if (!selectedData?.activities) return 0;
    return selectedData.activities
      .filter(a => a.type === 'Sleep')
      .reduce((sum, a) => sum + (a.duration || 0), 0);
  }, [selectedData]);

  const roundedSleepMinutes = Math.round(totalSleepMinutes);
  const hours = Math.floor(roundedSleepMinutes / 60);
  const mins = roundedSleepMinutes % 60;
  const timeInBed = roundedSleepMinutes ? `${hours}h${mins}m` : '--';

  const title = moment(selectedData?.Date || date).format('ddd, MMM DD');

  return (
    <LinearGradient
      colors={['#2C1012', '#232323', '#232323']}
      locations={[0, 0.4, 1]}
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
        <ByteSleepScore score={selectedData ? Math.round(toNumber(selectedData.byteScore)) : '--'} />
        <Image source={redLineVector} style={styles.lineImage} />
        <SleepScoreBars data={barData} selectedIndex={selectedIndex} onSelect={setSelectedIndex} />
        <ContributorsSection
          contributors={contributors}
          onPress={item => {
            const field = SCORE_KEYS[item.title];
            const { data, highlightIdx } = getWeekData(field);
            navigation.navigate('ContributorScreen', {
              title: item.title,
              score: item.score,
              weekData: data,
              highlightIdx,
            });
          }}
        />
        <SleepHypnogram timeInBed={timeInBed} />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  scrollContent: { paddingBottom: 50 },
  scoreContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    marginHorizontal: 18,
    width: '90%',
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
