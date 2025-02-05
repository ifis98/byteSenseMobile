import React from 'react';
import {View, Dimensions, StyleSheet, Text} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

const SleepReadiness = () => {
  // const data = {
  //   labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  //   datasets: [
  //     {
  //       data: [20, 45, 28, 60, 65, 43, 50], // Example data
  //       color: () => `rgba(255, 255, 255, 0.1)`, // Line color with low opacity
  //       strokeWidth: 2, // Line thickness
  //     },
  //   ],
  // };
  const data = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        data: [20, 45, 28, 60, 65, 43, 50], // Example data
        color: () => `rgba(255, 255, 255, 0.1)`, // Line color with low opacity
        strokeWidth: 2, // Line thickness
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#232323',
    backgroundGradientFrom: '#232323',
    backgroundGradientTo: '#232323',
    decimalPlaces: 0,
    color: () => `rgba(255, 255, 255, 0.1)`, // Color for grid lines and line
    labelColor: () => `rgba(255, 255, 255, 1)`, // X-axis label color in white
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: `rgba(255, 255, 255, 0.1)`,
      fill: `rgba(255, 255, 255, 0.5)`,
    },
    // propsForBackgroundLines: {
    //   strokeDasharray: '', // Solid line for Y-axis lines
    //   strokeWidth: 1,
    //   stroke: 'rgba(255, 255, 255, 0.1)', // Low-opacity white for Y-axis lines
    // },
    propsForBackgroundLines: {
      strokeDasharray: '', // Solid line
      strokeWidth: 0.5, // Set vertical line width
      stroke: 'rgba(255, 255, 255, 0.04)', // Set vertical line color to low-opacity white
    },
  };

  return (
    <View style={styles.container}>
      <LineChart
        data={data}
        width={Dimensions.get('window').width}
        height={220}
        chartConfig={chartConfig}
        withDots={true}
        withHorizontalLabels={false} // Hide Y-axis labels
        withVerticalLabels={true} // Show only X-axis labels
        withInnerLines={true} // Enable inner lines
        withHorizontalLines={false}
        withOuterLines={false} // Hide outer border lines
        withShadow={false} // Disable area shadow
        bezier={false} // Disable bezier curve for straight lines
        style={styles.chart}
        decorator={() => {
          return (
            <>
              {/* Vertical lines connecting each dot to the X-axis */}
              {data.datasets[0].data.map((value, index) => (
                <View
                  key={index}
                  style={{
                    position: 'absolute',
                    height: '100%',
                    width: 0.5,
                    left: (Dimensions.get('window').width - 32) * (index / 6),
                    top: 140 - (value / 100) * 220, // Adjust Y position based on data
                    borderLeftWidth: 0.5,
                    borderColor: 'rgba(255, 255, 255, 0.04)',
                  }}
                />
              ))}

              {/* Dashed line at Wednesday */}
              <View
                style={{
                  position: 'absolute',
                  height: '100%',
                  width: 1,
                  left: Dimensions.get('window').width * (3 / 6), // Position at Wednesday (3rd index)
                  borderLeftWidth: 1,
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  borderStyle: 'dashed',
                }}
              />

              {/* Red dot at Wednesday */}
              <View
                style={{
                  position: 'absolute',
                  top: 140 - (data.datasets[0].data[3] / 100) * 220, // Adjust vertical position based on data
                  left: (Dimensions.get('window').width - 32) * (3 / 6) - 6, // Adjust position based on index (Wed)
                  height: 12,
                  width: 12,
                  borderRadius: 6,
                  backgroundColor: 'red',
                  borderColor: 'white',
                  borderWidth: 2,
                }}
              />
            </>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: -30,
  },
  chart: {
    // marginVertical: 8,
    marginHorizontal: 16,

    // borderRadius: 16,
  },
  graphText: {
    color: 'rgba(255, 255, 255, 0.50)',
    fontSize: 12,
    fontWeight: '400',
    marginHorizontal: -100,
    marginTop: 14,
    lineHeight: 18,
  },
  lowText: {
    color: 'rgba(255, 255, 255, 0.50)',
    fontSize: 12,
    fontWeight: '700',
    lineHight: 18,
  },
});

export default SleepReadiness;
