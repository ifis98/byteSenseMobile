import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';

const {width} = Dimensions.get('window');
const ITEM_WIDTH = width * 0.3; // Width for each item

const DateSlider = props => {
  const currentDate = moment();
  const flatListRef = useRef(null);
  // const [selectedDateIndex, setSelectedDateIndex] = useState(null); // No default selected date

  // Generate a large array of dates to simulate infinite scrolling
  // const dates = Array.from({length: 100}, (_, i) =>
  //   currentDate.clone().add(i - 10, 'days'),
  // ); // 50 past and 50 future dates

  const dates = props?.healthData.map(data => moment(data.Date));

  // Ensure the selected date is always in the center
  const handleScroll = event => {
    const index = Math.round(event.nativeEvent.contentOffset.x / ITEM_WIDTH);
    props.setSelectedDateIndex(index);
  };

  // Provide the item layout so FlatList can efficiently scroll to index
  const getItemLayout = (data, index) => ({
    length: ITEM_WIDTH,
    offset: ITEM_WIDTH * index,
    index,
  });

  // Handle failures when scrolling to index
  const onScrollToIndexFailed = info => {
    const wait = new Promise(resolve => setTimeout(resolve, 500)); // Wait for 500ms
    wait.then(() => {
      flatListRef.current?.scrollToIndex({
        index: info.index,
        animated: true,
      });
    });
  };

  const renderItem = ({item, index}) => {
    const isSelected = index === props.selectedDateIndex;
    return (
      <TouchableOpacity onPress={() => props.setSelectedDateIndex(index)}>
        <View
          style={[
            styles.dateContainer,
            isSelected && styles.selectedDateContainer,
          ]}>
          <Text
            style={[
              styles.dateText,
              isSelected ? styles.selectedDateText : styles.unselectedDateText,
            ]}>
            {index === 0
              ? 'Today'
              : index === 1
              ? 'Yesterday'
              : item.format('ddd, MMM DD')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        horizontal
        data={dates}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        snapToAlignment="center"
        decelerationRate="fast"
        snapToInterval={ITEM_WIDTH}
        getItemLayout={getItemLayout} // Use getItemLayout to define item dimensions
        onScrollToIndexFailed={onScrollToIndexFailed} // Handle index scroll failures
        ListFooterComponent={<View style={{paddingHorizontal: 20}} />}
        inverted
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  flatListContent: {
    justifyContent: 'center',
  },
  dateContainer: {
    width: ITEM_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  selectedDateContainer: {
    borderRadius: 31,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  dateText: {
    fontFamily: 'Ubuntu',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '300',
    lineHeight: 20,
  },
  selectedDateText: {
    color: '#FFF', // Ensure selected date color is white
    fontWeight: 'bold',
  },
  unselectedDateText: {
    color: 'rgba(255,255,255,0.6)', // Color for non-selected dates
  },
});

export default DateSlider;
