import React from 'react';
import { View, Dimensions, StyleSheet, SafeAreaView } from 'react-native';
import { LineChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import * as scale from 'd3-scale';

const GraphComponent = ({ data, labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], color = '#00BE2A' }) => {
  const sanitizedData = (data || []).map(d => (typeof d === 'number' && !isNaN(d) ? d : 0));
  const finalData = sanitizedData.length > 0 ? sanitizedData : [0];
  const contentInset = { top: 20, bottom: 20 };
  const screenWidth = Dimensions.get('window').width - 32;

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.row}>
        <YAxis
          data={finalData}
          contentInset={contentInset}
          svg={{ fill: 'rgba(255,255,255,0.7)', fontSize: 10 }}
          numberOfTicks={5}
          min={0}
          max={100}
          style={{ marginRight: 10 }}
        />
        <LineChart
          style={{ height: 250, width: screenWidth - 20 }}
          data={finalData}
          svg={{ stroke: color, strokeWidth: 2 }}
          contentInset={contentInset}
          yMin={0}
          yMax={100}
        >
          <Grid svg={{ stroke: '#333', strokeDasharray: '5', strokeWidth: 1 }} />
        </LineChart>
      </View>
      <XAxis
        style={{ marginHorizontal: 16, height: 20 }}
        data={finalData}
        formatLabel={(value, index) => labels[index]}
        contentInset={{ left: 20, right: 20 }}
        svg={{ fontSize: 10, fill: 'white' }}
        scale={scale.scaleBand}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: 16,
  },
});

export default GraphComponent;
