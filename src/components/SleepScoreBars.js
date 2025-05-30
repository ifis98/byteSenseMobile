import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Platform,
  TouchableOpacity,
} from 'react-native';

const MAX_SCORE = 100;
const MAX_BAR_HEIGHT = 183;
const BAR_WIDTH = 32;
const GAP = 10;


const SleepScoreBarChart = ({ data = [], selectedIndex = 0, onSelect }) => {
  const listRef = useRef(null);
  const hasInitialScroll = useRef(false);
  const screenWidth = Dimensions.get('window').width;

  const paddingHorizontal = (screenWidth - BAR_WIDTH) / 2;

  const getItemLayout = (_, index) => ({
    length: BAR_WIDTH + GAP,
    offset: (BAR_WIDTH + GAP) * index,
    index,
  });

  useEffect(() => {
    if (listRef.current && data.length > 0) {
      try {
        listRef.current.scrollToIndex({
          index: selectedIndex,
          animated: hasInitialScroll.current,
          viewPosition: 0.5,
        });
      } catch (e) {
        const offset =
          selectedIndex * (BAR_WIDTH + GAP) - (screenWidth - BAR_WIDTH) / 2;
        listRef.current.scrollToOffset({
          offset: Math.max(0, offset),
          animated: hasInitialScroll.current,
        });
      }
      if (!hasInitialScroll.current) {
        hasInitialScroll.current = true;
      }
    }
  }, [selectedIndex, data.length, screenWidth]);

  const renderItem = ({ item, index }) => {
    const barHeight = Math.max(32, (item.score / MAX_SCORE) * MAX_BAR_HEIGHT);
    const isSelected = index === selectedIndex;

    return (
      <TouchableOpacity onPress={() => onSelect && onSelect(index)} style={styles.barColumn}>
        <View
          style={[isSelected ? styles.selectedBarWrapper : styles.barWrapper, { height: barHeight }]}
        >
          <View style={{ height: 28, justifyContent: 'center', alignItems: 'center', zIndex: 2 }}>
            <Text style={isSelected ? styles.selectedScoreText : styles.scoreText}>{item.score}</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'flex-end', zIndex: 2 }}>
            {isSelected ? (
              <View style={[styles.selectedBar, { height: barHeight - 28 }]} />
            ) : (
              <View style={[styles.bar, { height: barHeight - 28 }]} />
            )}
          </View>
        </View>
        <Text
          style={[
            styles.dayText,
            isSelected && styles.selectedDayText,
            !isSelected && (index === selectedIndex - 1 || index === selectedIndex + 1) && { opacity: 0.5 },
            !isSelected && index !== selectedIndex - 1 && index !== selectedIndex + 1 && { opacity: 0.3 },
          ]}
        >
          {item.day}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={data}
        horizontal
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.barGraphContainer, { paddingHorizontal }]}
        getItemLayout={getItemLayout}
        snapToInterval={BAR_WIDTH + GAP}
        decelerationRate="fast"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
  },
  barGraphContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  barColumn: {
    alignItems: 'center',
    marginRight: GAP,
  },
  barWrapper: {
    width: BAR_WIDTH,
    backgroundColor: '#444446',
    borderRadius: 16,
    marginBottom: 6,
    opacity: 0.35,
    alignSelf: 'center',
    overflow: 'hidden',
    flexDirection: 'column',
  },
  selectedBarWrapper: {
    width: BAR_WIDTH,
    backgroundColor: '#FFF',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 6,
    alignSelf: 'center',
    overflow: 'visible', // allow the glow to extend
    flexDirection: 'column',
    // Only iOS shadow
    ...Platform.select({
      ios: {
        shadowColor: '#fff',
        shadowOpacity: 0.65,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 10 },
      },
      android: {
        // No shadow for Android; handled by the <View style={styles.glow} />
      },
    }),
  },
  // Glow for Android & iOS (extra, since Android doesn't show shadow well)
  glow: {
    // position: 'absolute',
    // top: 6,
    // left: -26,
    // right: -26,
    // height: 66,
    // borderRadius: 60,
    // backgroundColor: 'rgba(255,255,255,0.38)',
    // opacity: Platform.OS === 'android' ? 0.45 : 0,
    // zIndex: 0,
    // alignSelf: 'center',
  },
  bar: {
    width: BAR_WIDTH,
    backgroundColor: '#444446',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    opacity: 1,
    alignSelf: 'center',
  },
  selectedBar: {
    width: BAR_WIDTH,
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    alignSelf: 'center',
    zIndex: 1,
  },
  scoreText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '600',
    fontFamily: 'Ubuntu',
    opacity: 0.8,
    textAlign: 'center',
  },
  selectedScoreText: {
    color: '#232323',
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'Ubuntu',
    textAlign: 'center',
    opacity: 1,
  },
  dayText: {
    color: '#A8A9AA',
    fontSize: 12,
    fontFamily: 'Ubuntu',
    marginTop: 0,
    opacity: 0.3,
  },
  selectedDayText: {
    color: '#FFF',
    opacity: 1,
    fontWeight: 'bold',
  },
});

export default SleepScoreBarChart;
