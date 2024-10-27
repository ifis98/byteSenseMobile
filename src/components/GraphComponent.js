import React from 'react';
import {View, Dimensions, StyleSheet, SafeAreaView, Text} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

const GraphComponent = props => {
  const {data, color} = props;

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <LineChart
          data={{
            labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            datasets: [
              {
                data: data, // Single continuous dataset
                color: (opacity = 1) =>
                  color || `rgba(39, 255, 233, ${opacity})`, // Overall color function with adjustable opacity
                strokeWidth: 0.4, // Line thickness
              },
            ],
          }}
          width={Dimensions.get('window').width - 32}
          height={250}
          yAxisLabel=""
          chartConfig={{
            backgroundColor: '#232323',
            backgroundGradientFrom: '#232323',
            backgroundGradientTo: '#232323',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(39, 255, 233, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '0', // No dots on the line
            },
            propsForBackgroundLines: {
              strokeDasharray: '5',
              strokeWidth: 1,
              stroke: '#333',
            },
          }}
          withDots={false}
          withInnerLines={true}
          withOuterLines={false}
          withShadow={false}
          withVerticalLines={false}
          withHorizontalLines={true}
          style={{
            backgroundColor: 'transparent',
          }}
          bezier={true}
        />
         {color === "#00BE2A" && (<Text style={styles.graphText}>
         
         You mostly had a <Text style={styles.lowText}>low</Text> Byte Score
         this week. Your highest Byte Score was <Text style={styles.lowText}>65</Text>  on  <Text style={styles.lowText}>Friday.</Text>
       </Text>)}
         {color === "#FF8B02" && (<Text style={styles.graphText}>
         
          You had a <Text style={styles.lowText}>High</Text> number of bruxism episodes this week. Your highest number of episodes was <Text style={styles.lowText}>7</Text> on <Text style={styles.lowText}>Friday</Text>
       </Text>)}
        
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    marginHorizontal: 16,
    backgroundColor: 'transparent',
  },
  graphText: {
    color: 'rgba(255, 255, 255, 0.50)',
    fontSize: 12,
    fontWeight: '400',
    marginHorizontal: 18,
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

export default GraphComponent;
