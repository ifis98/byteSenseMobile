import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Svg, { Rect, G } from 'react-native-svg';

const STAGE_COLORS = {
  awake: '#FFF',
  light: '#FF3939',
  rem: '#F24E54',
  deep: '#991616',
};
const STAGE_LABELS = ['Awake', 'REM', 'Light', 'Deep'];
const STAGE_Y = { awake: 2, rem: 1, light: 2, deep: 3 };
const BAR_HEIGHT = 24;
const BAR_GAP = 2;
const LABEL_WIDTH = 54;

const HypnogramChart = ({ data }) => {
  const chartWidth = data.length * 13;
  const chartHeight = (BAR_HEIGHT + BAR_GAP) * STAGE_LABELS.length;
  return (
    <View style={styles.chartContainer}>
      {/* Y Labels */}
      <View style={styles.yLabels}>
        {STAGE_LABELS.map(label => (
          <Text key={label} style={styles.yLabel}>{label}</Text>
        ))}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingRight: 20 }}
      >
        <Svg height={chartHeight} width={chartWidth}>
          <G>
            {data.map((item, idx) => {
              const y = STAGE_Y[item.stage] * (BAR_HEIGHT + BAR_GAP);
              return (
                <Rect
                  key={idx}
                  x={idx * 13}
                  y={y}
                  width={11}
                  height={BAR_HEIGHT}
                  rx={3}
                  fill={STAGE_COLORS[item.stage]}
                />
              );
            })}
          </G>
        </Svg>
      </ScrollView>
    </View>
  );
};