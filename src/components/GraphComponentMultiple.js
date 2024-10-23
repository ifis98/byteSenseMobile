import React from 'react';
import { View, Dimensions, StyleSheet, SafeAreaView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const GraphComponentMultiple = (props) => {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <LineChart
          data={{
            labels: ['0', '0.5', '1.0', '1.5', '2.0', '2.5', '3.0'], // Time in seconds
            datasets: [
              {
                data: [318, 150, 80, 120, 90, 60, 0], // First dataset (Green line)
                color: (opacity = 1) => `rgba(0, 190, 42, ${opacity})`, // Line color for the first line
                strokeWidth: 2, // Line thickness for the first line
              },
              {
                data: [0, 50, 100, 200, 250, 150, 100], // Second dataset (Orange line)
                color: (opacity = 1) => `rgba(255, 139, 2, ${opacity})`, // Line color for the second line
                strokeWidth: 2, // Line thickness for the second line
              },
            ],
          }}
          width={Dimensions.get('window').width - 32} // Adjust width to consider margins
          height={250}
          yAxisLabel="" // No prefix on Y-axis
          yAxisSuffix="" // No suffix on Y-axis
          chartConfig={{
            backgroundColor: "#232323", // Background color for the chart
            backgroundGradientFrom: "#232323", // Start gradient background
            backgroundGradientTo: "#232323", // End gradient background
            decimalPlaces: 2, // Decimal precision for Y values
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Axis labels color
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Labels color for X and Y axis
            style: {
              borderRadius: 16, // Rounded corners for the chart
            },
            propsForDots: {
              r: '1', // Dots size on the line
              strokeWidth: 1, // Border thickness for dots
              stroke: '#27FFE9', // Border color for dots
            },
            propsForBackgroundLines: {
              strokeDasharray: '8', // Dotted X-axis and Y-axis lines
              strokeWidth: 0.5, // Line thickness for grid lines
              stroke: '#555', // Grid lines color
            },
            propsForHorizontalLabels: {
              strokeDasharray: '0', // Remove the grid lines on the Y-axis
            },
          }}
          withDots={true} // Enable dots
          withInnerLines={true} // Enable inner grid lines
          withOuterLines={false} // Disable outer grid lines
          withShadow={false} // Disable shadow under the line
          withVerticalLines={false} // Disable vertical grid lines
          withHorizontalLines={true} // Enable horizontal grid lines
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

export default GraphComponentMultiple;
