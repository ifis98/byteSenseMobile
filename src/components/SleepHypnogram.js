import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SleepHypnogram = ({ summary }) => (
  <View style={styles.container}>
    {/* Sleep Stage Title & Subtitle */}
    <Text style={styles.stageTitle}>Sleep Stage</Text>
    <Text style={styles.stageSubtitle}>7h55m <Text style={styles.timeInBed}>time in bed</Text></Text>

    <View style={styles.legendGrid}>
      <View style={styles.legendRowGrid}>
        {/* AWAKE */}
        <View style={styles.legendColGrid}>
          <View style={styles.inlineRow}>
            <View style={[styles.legendBox, styles.legendAwake]} />
            <Text style={styles.legendLabel}>AWAKE</Text>
          </View>
          <Text style={styles.legendMeta}>{summary.awake}</Text>
        </View>
        {/* LIGHT SLEEP */}
        <View style={styles.legendColGrid}>
          <View style={styles.inlineRow}>
            <View style={[styles.legendBox, styles.legendLight]} />
            <Text style={styles.legendLabel}>LIGHT SLEEP</Text>
          </View>
          <Text style={styles.legendMeta}>{summary.light}</Text>
        </View>
      </View>
      <View style={styles.legendRowGrid}>
        {/* REM SLEEP */}
        <View style={styles.legendColGrid}>
          <View style={styles.inlineRow}>
            <View style={[styles.legendBox, styles.legendRem]} />
            <Text style={styles.legendLabel}>REM SLEEP</Text>
          </View>
          <Text style={styles.legendMeta}>{summary.rem}</Text>
        </View>
        {/* DEEP SLEEP */}
        <View style={styles.legendColGrid}>
          <View style={styles.inlineRow}>
            <View style={[styles.legendBox, styles.legendDeep]} />
            <Text style={styles.legendLabel}>DEEP SLEEP</Text>
          </View>
          <Text style={styles.legendMeta}>{summary.deep}</Text>
        </View>
      </View>
    </View>
    <View style={{ height: 60 }} />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  // Added styles for the title and subtitle
  stageTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 20,
    marginTop: 10,
    lineHeight:20,
    marginBottom: 0,
    fontFamily: 'Ubuntu',
  },
  stageSubtitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '500',
    marginLeft: 20,
    marginBottom: 4,
    marginTop: 2,
    fontFamily: 'Ubuntu',
  },
  timeInBed: {
    color: '#A8A9AA',
    fontSize: 14,
    fontWeight: '400',
  },
  legendGrid: {
    marginTop: 18,
    width: '100%',
    paddingHorizontal: 50,
  },
  legendRowGrid: {
    flexDirection: 'row',
    justifyContent: "space-between",
    width: '88%',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 12,
  },
  legendColGrid: {
    flexDirection: 'column',
  },
  inlineRow: {
    flexDirection: 'row',
  },
  legendBox: {
    width: 12,
    height: 12,
    borderRadius: 2,
    marginRight: 8,
  },
  legendAwake: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#AAA',
  },
  legendLight: { backgroundColor: '#FF3939' },
  legendRem: { backgroundColor: '#F24E54' },
  legendDeep: { backgroundColor: '#991616' },
  legendLabel: {
    color: '#A8A9AA',
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Ubuntu',
    textAlign: 'center',
    letterSpacing: 0.1,
  },
  legendMeta: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '400',
    paddingLeft: 20,
    fontFamily: 'Ubuntu',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default SleepHypnogram;
