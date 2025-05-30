import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Line, Polyline, Circle } from 'react-native-svg';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const Y_VALUES = [100, 80, 60, 40, 20, 0];

const RecoveryLineChart = ({ data, highlightIdx }) => {
  const windowWidth = Dimensions.get('window').width;
  const chartW = windowWidth - 32; // 16px padding each side
  const chartH = 200;
  const paddingY = 5;
  const yAxisLabelW = 38;
  const minValue = 0, maxValue = 100;
  const innerChartW = chartW - yAxisLabelW - 6;
  const innerChartH = chartH - 2 * paddingY;

  const getX = idx =>
    yAxisLabelW + (idx * (innerChartW - 6)) / (data.length - 1);
  const getY = val =>
    paddingY + innerChartH - ((val - minValue) * innerChartH) / (maxValue - minValue);

  const points = data.map((val, idx) => `${getX(idx) - yAxisLabelW},${getY(val)}`).join(' ');

  return (
    <View style={{ alignItems: 'center', width: '100%', marginTop: 20, marginRight: 27 }}>
      <View style={{ flexDirection: 'row', height: chartH }}>
        {/* Y-axis labels aligned exactly with the grid lines */}
        <View style={{
          width: yAxisLabelW,
          height: chartH,
          position: 'relative',
          justifyContent: 'center',
        }}>
          {Y_VALUES.map((v, idx) => {
            const y = getY(v);
            return (
              <Text
                key={v}
                style={{
                  position: 'absolute',
                  top: y - 8, // -8 centers the label vertically, adjust if needed (fontSize/2)
                  right: 7,
                  color: 'white',
                  fontSize: 10,
                  textAlign: 'right',
                  fontFamily: 'Ubuntu',
                  backgroundColor: 'transparent',
                  width: yAxisLabelW - 5,
                  zIndex: 2,
                }}>
                {v}
              </Text>
            );
          })}
        </View>
        {/* Chart SVG */}
        <Svg width={innerChartW} height={chartH}>
          {/* Horizontal grid lines */}
          {Y_VALUES.map((v, i) => {
            const y = getY(v);
            return (
              <Line
                key={v}
                x1={0}
                y1={y}
                x2={innerChartW - 4}
                y2={y}
                stroke="#444446"
                strokeDasharray="3 7"
                strokeWidth={1}
              />
            );
          })}
          {/* Polyline */}
          <Polyline
            points={points}
            fill="none"
            stroke="#00BE2A"
            strokeWidth={1}
            strokeLinejoin="round"
          />
          {/* Points */}
          {data.map((val, idx) => (
            <Circle
              key={idx}
              cx={getX(idx) - yAxisLabelW}
              cy={getY(val)}
              r={3}
              fill={'#00BE2A'}
              stroke="#00BE2A33"
              strokeWidth={1}
            />
          ))}
        </Svg>
      </View>
      {/* X-axis labels (centered under chart) */}
      <View style={styles.xLabelsRow}>
        {days.map((d, i) => (
          <Text key={d} style={styles.xLabel}>{d}</Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  xLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: "center",
    paddingLeft:30,
    marginTop: 20,
  },
  xLabel: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Ubuntu',
    textAlign: 'center',
    flex: 1,
  },
});

export default RecoveryLineChart;
