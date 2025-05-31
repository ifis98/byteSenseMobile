import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from './header';
import iconSearch from '../assets/search.png';
import iconInfo from "../assets/warning-circle.png"
import arrow from "../assets/arrow.png";
import RecoveryLineChart from '../components/RecoveryLineChart';

const SCORE_DETAILS = {
  'Recovery Depth Score': {
    description:
      'Measures how much time your body spent in deep, high-quality recovery during sleep.',
    tiers: [
      {
        range: [0, 33],
        main: 'You spent very little or no time in a deep recovery state.',
        extra:
          'Your body may have been under too much stress, had fragmented sleep, or lacked the conditions needed to drop into parasympathetic mode.',
      },
      {
        range: [34, 67],
        main:
          'You had some recovery moments, but they were limited in duration or intensity.',
        extra:
          'This means your body partially entered recovery zones, but couldn\u2019t stay there long enough to fully benefit.',
      },
      {
        range: [68, 100],
        main: 'You spent a solid amount of time in deep recovery.',
        extra:
          'Your body was able to settle into restful states that promote healing, repair, and full-system recovery.',
      },
    ],
    improvements: [
      'Extend total sleep duration to give your body more opportunity to reach deep recovery states.',
      'Avoid alcohol, caffeine, and late meals which can prevent parasympathetic activation.',
      'Create a stable sleep environment (cool, dark, quiet) to reduce overnight arousals and movement.',
    ],
  },
  'Stress Relief Score': {
    description:
      'Shows how much your body relaxed and released stress over the course of the night, based on changes in HRV.',
    tiers: [
      {
        range: [0, 33],
        main: 'Your stress levels stayed the same or increased during sleep.',
        extra:
          'Your body may have stayed tense or experienced disruptions, preventing it from shifting into recovery mode.',
      },
      {
        range: [34, 67],
        main: 'There was some progress, but your body didn\u2019t fully unwind.',
        extra:
          'This suggests partial recovery \u2014 you started to let go of stress but didn\u2019t sustain it.',
      },
      {
        range: [68, 100],
        main: 'You released stress steadily throughout the night.',
        extra:
          'Your HRV rose over time, a strong indicator that your nervous system transitioned into deep rest.',
      },
    ],
    improvements: [
      'Build a calming pre-sleep routine (e.g. journaling, stretching, or breathwork).',
      'Reduce pre-bed screen time and mental stimulation to help your nervous system wind down.',
      'Address potential sources of nighttime disruption (e.g. room temperature, noise, or inconsistent sleep timing).',
    ],
  },
  'Relaxation Score': {
    description:
      'Reflects how calm or strained your body remained throughout the night.',
    tiers: [
      {
        range: [0, 33],
        main: 'Your body stayed in a high-alert or stressed state most of the night.',
        extra:
          'This likely interfered with your ability to recover and recharge effectively.',
      },
      {
        range: [34, 67],
        main:
          'Your body was somewhat calm, but with periods of tension or elevated heart rate.',
        extra:
          'Your system may have oscillated between calm and strain, limiting recovery consistency.',
      },
      {
        range: [68, 100],
        main: 'You stayed relaxed and low-stress all night.',
        extra:
          'Your nervous system remained in a parasympathetic state, ideal for high-quality recovery.',
      },
    ],
    improvements: [
      'Prioritize stress management during the day (e.g. movement, breaks, breathwork) to avoid carrying stress into sleep.',
      'Be consistent with your sleep schedule \u2014 irregular timing increases overnight strain.',
      'Use blackout curtains or a white noise machine to reduce unconscious overnight stressors.',
    ],
  },
};

// Info Card
const InfoCard = ({ icon, title, desc }) => (
  <View style={styles.infoCard}>
    {/* Icon Circle (no border) */}
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.iconCircle}>
          <Image
            source={icon}
            style={[
              styles.infoIcon,
              icon === iconSearch && { width: 15, height: 15 } // reduce for search icon
            ]}
          />
        </View>
        <View style={{ justifyContent: 'center', height: 35 }}>
          <Text style={styles.infoCardTitle}>{title}</Text>
        </View>
      </View>
      <View style={styles.infoTextCol}>
        <Text style={styles.infoCardDesc}>{desc}</Text>
      </View>
    </View>
  </View>
);

// Suggestion Card
const SuggestionCard = ({ text }) => (
  <View style={styles.suggestionCard}>
    <Image source={arrow} style={styles.sectionIcon} />
    <Text style={styles.suggestionText}>{text}</Text>
  </View>
);

const RecoveryDepthScoreScreen = ({ route }) => {
  const {
    title = 'Recovery Depth Score',
    score = 0,
    weekData = [],
    highlightIdx = 0,
  } = route?.params || {};

  const details = SCORE_DETAILS[title] || SCORE_DETAILS['Recovery Depth Score'];

  const tier = details.tiers.find(t => score <= t.range[1]) || details.tiers[details.tiers.length - 1];
  return (
    <LinearGradient
      colors={['#2C1012', '#0f0f0f', '#0f0f0f']}
      locations={[0, 0.5, 1]}
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
        {/* Info cards */}
        <InfoCard
          icon={iconSearch}
          title="What This Score Measures"
          desc={details.description}
        />
        <InfoCard
          icon={iconInfo}
          title="What Your Score Means"
          desc={
            <Text>
              <Text style={{ fontWeight: 'bold', color: '#F1F1F1' }}>{tier.main}</Text>
              {'\n'}
              {tier.extra}
            </Text>
          }
        />

        {/* Chart */}
        <Text style={styles.subsectionTitle}>{title}</Text>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <RecoveryLineChart data={weekData} highlightIdx={highlightIdx} />
        </View>

        {/**
        <Text style={styles.chartDesc}>
          You mostly had a <Text style={{ fontWeight: 'bold', color: '#A8A9AA' }}>low</Text> Recovery Depth Score this week.{"\n"}
          Your highest Recovery Depth Score was <Text style={{ fontWeight: 'bold', color: '#FFF' }}>94 on Friday.</Text>
        </Text>
        */}

        {/* Suggestions */}
        <Text style={styles.subsectionTitle}>Ways to Improve</Text>
        {details.improvements.map((t, idx) => (
          <SuggestionCard key={idx} text={t} />
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  scrollContent: { paddingBottom: 50 },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  dateText: {
    color: '#A8A9AA',
    fontSize: 16,
    fontFamily: 'Ubuntu',
    marginBottom: 7,
    letterSpacing: 0.2,
  },
  subsectionTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Ubuntu',
    marginTop: 30,
    marginLeft: 20,
    marginBottom: 10,
  },
  chartDesc: {
    color: '#FFFFFF80',
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Ubuntu',
    marginTop: 20,
    marginBottom: 12,
    textAlign: 'center',
    marginHorizontal: 12,
    lineHeight: 18,
  },
  // --- Line chart ---
  xLabelsRow: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: -16,
    left: 0,
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  xLabel: {
    color: '#A8A9AA',
    fontSize: 13,
    fontFamily: 'Ubuntu',
    flex: 1,
    textAlign: 'center',
  },
  // --- Info Cards ---
  infoCard: {
    backgroundColor: '#191919',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    marginHorizontal: 12,
    marginTop: 16,
    // marginBottom: 6,
  },
  iconCircle: {
    width: 35,
    height: 35,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    backgroundColor: "#373434"
  },
  infoIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  sectionIcon: {
    width: 14,
    height: 9,
    resizeMode: 'contain',
  },
  infoTextCol: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  infoCardTitle: {
    color: '#F1F1F1',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Ubuntu',
    textAlign: 'left',
  },
  infoCardDesc: {
    color: '#A8A9AA',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Ubuntu',
    lineHeight: 20,
    textAlign: 'left',
    marginTop: 4,
  },
  // --- Suggestion Cards ---
  suggestionCard: {
    backgroundColor: '#191919',
    borderRadius: 4,
    paddingVertical: 15,
    paddingHorizontal: 16,
    marginHorizontal: 12,
    marginTop: 11,
    marginBottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  suggestionText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '400',
    paddingLeft: 10,
    fontFamily: 'Ubuntu',
    flex: 1,
  },

});

export default RecoveryDepthScoreScreen;
