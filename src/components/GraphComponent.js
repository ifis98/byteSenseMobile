import React from 'react';
import { View, Dimensions, StyleSheet, SafeAreaView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const GraphComponent = (props) => {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <LineChart
          data={{
            labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'],
            datasets: [
              {
                data: [30, 80, 50, 70, 40, 90, 100], // Your actual data
                color: (opacity = 1) => props.color || `rgba(39, 255, 233, ${opacity})`, // Line color
                strokeWidth: 1, // Line thickness
              },
            ],
          }}
          width={Dimensions.get('window').width - 32} // Adjust width to consider margins
          height={250}
          yAxisLabel=""
          chartConfig={{
            backgroundColor: "#232323", // Set to transparent
            backgroundGradientFrom: "#232323", // Set to transparent
            backgroundGradientTo: "#232323", // Set to transparent
            decimalPlaces: 2, // Keep decimal places or change as necessary
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Line color
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Axis label color
            style: {
              borderRadius: 16, // Rounded corners
            },
            propsForDots: {
              r: '0', // No dots on the line
            },
            propsForBackgroundLines: {
              strokeDasharray: '5', // Dotted X-axis lines
              strokeWidth: 1, // X-axis lines
              stroke: '#333', // Grid line color
            },
            propsForHorizontalLabels: {
              strokeDasharray: '0', // Hide Y-axis grid lines
            },
          }}
          withDots={false} // No dots on the line
          withInnerLines={true} // Enable inner grid lines
          withOuterLines={false} // Disable outer grid lines
          withShadow={false} // Disable shadow
          withVerticalLines={false} // Disable Y-axis inner lines
          withHorizontalLines={true} // Enable X-axis inner lines
          style={{
            backgroundColor: 'transparent', // Ensure the chart itself has no background
          }}
          bezier={true} // Smooth curve
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'transparent', // Ensure the screen background is transparent
  },
  container: {
    marginHorizontal: 16, // Margins for the entire container (left and right)
    backgroundColor: 'transparent', // Ensure the container is also transparent
  },
});

export default GraphComponent;
