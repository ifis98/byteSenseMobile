import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from './header';
import iconSearch from '../assets/search.png';
import iconInfo from "../assets/warning-circle.png"
import arrow from "../assets/arrow.png"
import RecoveryLineChart from '../components/RecoveryLineChart';

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
// Score Header
const ByteSleepScore = ({ score = 90 }) => (
  <View style={styles.scoreContainer}>
    <Text style={styles.overallText}>OVERALL BYTE SLEEP SCORE</Text>
    <View style={styles.scoreRow}>
      <Text style={styles.scoreText}>{score}</Text>
      <Text style={styles.outOfText}>/100</Text>
    </View>
  </View>
);

const RecoveryDepthScoreScreen = ({ route }) => {
  const { title = "Recovery Depth Score" } = route?.params || {};
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
        <ByteSleepScore score={90} />

        {/* Info cards */}
        <InfoCard
          icon={iconSearch}
          title="What This Score Measures"
          desc="You mostly had a low Byte Score this week. Your highest Byte Score was 94 on Friday."
        />
        <InfoCard
          icon={iconInfo}
          title="What Your Score Means"
          desc="You mostly had a low Byte Score this week. Your highest Byte Score was 94 on Friday."
        />

        {/* Chart */}
        <Text style={styles.subsectionTitle}>Recovery Depth Score</Text>
        <View style={{ flex: 1, alignItems: "center" }}>
          <RecoveryLineChart data={[40, 30, 55, 50, 35, 75, 55]} highlightIdx={5} />
        </View>

        <Text style={styles.chartDesc}>
          You mostly had a <Text style={{ fontWeight: 'bold', color: '#A8A9AA' }}>low</Text> Recovery Depth Score this week.{"\n"}
          Your highest Recovery Depth Score was <Text style={{ fontWeight: 'bold', color: '#FFF' }}>94 on Friday.</Text>
        </Text>

        {/* Suggestions */}
        <Text style={styles.subsectionTitle}>Ways to Improve</Text>
        <SuggestionCard text="Get 1.5 more hours of exercise per week" />
        <SuggestionCard text="Consider Botox for frequent heavy episodes — consult your dentist." />
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
