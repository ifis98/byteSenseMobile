import React from 'react';
import { View, Dimensions, Text } from 'react-native';
import { LineChart } from 'react-native-svg-charts';
import { Circle, Line, G } from 'react-native-svg';
import * as scale from 'd3-scale';

const CustomLineChart = () => {
  const data = [40, 50, 45, 60, null, null, null]; // Data with Thurs, Fri, Sat as null
  const screenWidth = Dimensions.get('window').width;
  const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat']; // X-axis labels

  // Custom Grid with Dashed Line on Wednesday and Faded Vertical Lines for Monday and Tuesday
  const CustomGrid = ({ x, y }) => (
    <G>
      {/* Dashed line for Wednesday */}
      <Line
        x1={x(3)} // Position for Wednesday
        y1="0"
        x2={x(3)}
        y2={y(0)}
        stroke="white"
        strokeDasharray="4, 4"
        strokeWidth="1"
      />
      {/* Vertical lines with opacity for Monday, Tuesday */}
      <Line
        x1={x(1)} // Position for Monday
        y1="0"
        x2={x(1)}
        y2={y(0)}
        stroke="white"
        strokeOpacity="0.4"
        strokeWidth="1"
      />
      <Line
        x1={x(2)} // Position for Tuesday
        y1="0"
        x2={x(2)}
        y2={y(0)}
        stroke="white"
        strokeOpacity="0.4"
        strokeWidth="1"
      />
    </G>
  );

  // Custom Dot Decorator for Data Points
  const Decorator = ({ x, y, data }) => {
    return data.map((value, index) => (
      value !== null && (
        <Circle
          key={index}
          cx={x(index)}
          cy={y(value)}
          r={5}
          stroke={'black'}
          strokeWidth={2}
          fill={index === 3 ? '#00E5FF' : 'white'} // Turquoise dot for Wednesday, white for others
        />
      )
    ));
  };

  // Custom Labels for X-axis
  const XAxisLabels = ({ x, y, data }) => {
    return labels.map((label, index) => (
      <Text
        key={index}
        x={x(index)} // Align each label under the respective data point
        y={y(0) + 20} // Place below the chart
        fill="white"
        fontSize="12"
        textAnchor="middle"
      >
        {label}
      </Text>
    ));
  };

  return (
    <View style={{ marginLeft: 16, marginRight: 16 }}>
      <LineChart
        style={{ height: 250, width: screenWidth - 32 }}
        data={data}
        svg={{
          stroke: 'white',
          strokeWidth: 2,
        }}
        contentInset={{ top: 20, bottom: 20 }}
        gridMin={0}
        xScale={scale.scaleLinear} // Use linear scaling for consistent X-axis label spacing
        yMin={0}
      >
        <CustomGrid />
        <Decorator />
        <XAxisLabels />
      </LineChart>
    </View>
  );
};

export default CustomLineChart;
