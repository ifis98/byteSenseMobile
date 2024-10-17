import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import heartRate from '../assets/heartRate.png';
import cardiogram from '../assets/cardiogram.png';
import HalfCircleSVGs from '../components/CustomSVGComponent';
import Header from './header';
import DateSlider from './DateSlider';
import Line from '../assets/lineVector.png';
import timer from '../assets/timer.png';
import episode from '../assets/episode.png';
import LineActivity from '../assets/Line.png';
import yoga from '../assets/yoga.png';
import moon from '../assets/moon.png';
import PersonSimpleRun from '../assets/PersonSimpleRun.png';
import cardiogram2 from '../assets/cardiogram-03.png';
import hearblack from '../assets/hearblack.png';
import lungs from '../assets/lungs.png';
import dentalTooth from '../assets/dental-tooth.png';
import dentalCare from '../assets/dental-care.png';
import upAroorw from '../assets/upAroorw.png';
import downArrow from '../assets/downArrow.png';
import GraphComponent from '../components/GraphComponent';
import CustomGraph from '../components/CustomGraph';

const {width} = Dimensions.get('window');

const SplashScreen = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#232323', '#232323', '#232323']}
      start={{x: 0, y: 0}}
      end={{x: 2, y: 1}}
      style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
      colors={['#0f3d3e', '#232323']}
      start={{x: 0, y: 0}}
    end={{x: 0.8, y: 1}}>
          <Header showBackArrow={false} title="Sleep Report" />
          <DateSlider />
          <View style={styles.statsSection}>
            <View style={styles.heartImageView}>
              <Image source={heartRate} style={styles.heartImage} />
              <Text style={styles.rhrStyle}>RHR</Text>
              <View style={styles.rhrView}>
                <Text style={styles.rhrValueStyle}>83</Text>
                <Text style={styles.rhrBpmStyle}>bpm</Text>
              </View>
            </View>

            <Image source={Line} style={styles.lineImage} />

            <View style={styles.cardiImageView}>
              <Image source={cardiogram} style={styles.heartImage} />
              <Text style={styles.rhrStyle}>HRV</Text>
              <View style={styles.rhrView}>
                <Text style={styles.rhrValueStyle}>33</Text>
                <Text style={styles.rhrBpmStyle}>ms</Text>
              </View>
            </View>
          </View>
          <View style={styles.container2}>
            <HalfCircleSVGs selectedIndex={80} />
          </View>
      </LinearGradient>
        

          {/* Bruxism Duration */}
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.04)', 'rgba(255, 255, 255, 0.02)']}
            start={{x: 0, y: 0}}
            end={{x: 0.5, y: 0.5}}
            style={styles.bruxismSection}>
            <View style={styles.bruxismDetail}>
              <View style={styles.bruxismView}>
                <Image source={timer} style={styles.timerImage} />
                <View style={styles.bruxismViewContent}>
                  <Text style={styles.bruxismTitle}>Bruxism Duration</Text>
                  <Text style={styles.bruxismValue}>
                    6 <Text style={styles.rhrBpmStyle}>min</Text>
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.border}></View>
            <View style={styles.bruxismDetail}>
              <View style={styles.bruxismView}>
                <Image source={episode} style={styles.timerImage} />
                <View style={styles.bruxismViewContent}>
                  <Text style={styles.bruxismTitle}>Bruxism Duration</Text>
                  <Text style={styles.bruxismValue}>14</Text>
                </View>
              </View>
            </View>
          </LinearGradient>

          {/* Activities Section */}
          <Text style={styles.sectionTitle}>Activities</Text>
          <View style={styles.activitiesSection}>
            {renderActivity('Meditation', '5:11 PM', '0:12', yoga)}
            {renderActivity('Sleep', '12:01 PM', '8:27', moon)}
            {renderActivity('Run', '12:01 PM', '0:27', PersonSimpleRun)}
          </View>

          {/* Key Statistics Section */}
          <View style={styles.sectionTitleView}>
            <Text style={styles.sectionTitleKey}>Key Statistics</Text>
            <Text style={styles.sectionTitlePrev}>vs. Previous 30 days</Text>
          </View>
          <View style={styles.keyStatistics}>
            {renderKeyStatistic('HRV', '33', '46', false, cardiogram2)}
            {renderKeyStatistic('RHR', '83', '85', true, hearblack)}
            {renderKeyStatistic('Respiratory rate', '13.2', '46', true, lungs)}
            {renderKeyStatistic(
              'Bruxism Episodes',
              '14',
              '17',
              false,
              dentalTooth,
            )}
            {renderKeyStatistic(
              'Bruxism Duration',
              '62',
              '52',
              false,
              dentalCare,
            )}
          </View>
          <Text style={styles.sectionTitle}>Daily Byte Score</Text>

          {/* <View style={{backgroundColor:'red'}}> */}
          <GraphComponent />
          <Text style={styles.sectionTitle}>Bruxism</Text>

          {/* <View style={{backgroundColor:'red'}}> */}
          <GraphComponent color="#FF8B02"/>

          <Text style={styles.sectionTitle}>Activities</Text>

          <CustomGraph/>

          {/* </View> */}
        


          {/* Your Trends Section */}
          <Text style={styles.sectionTitle}>Your Trends</Text>
          <View style={styles.trendsSection}>
            <Text style={styles.trendsDate}>01 Jul - 07 Jul</Text>
            <View style={styles.trendTabs}>
              <Text style={styles.trendTab}>Week</Text>
              <Text style={[styles.trendTab, styles.inactiveTab]}>Month</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const renderActivity = (activity, time, duration, icon) => (
  <LinearGradient
    colors={['rgba(255, 255, 255, 0.04)', 'rgba(255, 255, 255, 0.02)']}
    start={{x: 0, y: 0}}
    end={{x: 1, y: 0}}
    style={styles.activityItem}>
    <View>
      <Text style={styles.activityText}>{activity}</Text>
      <View style={styles.activityTimeView}>
        <Text style={styles.activityTextTime}>{time}</Text>
        <Image source={LineActivity} style={styles.LineActivityImage} />

        <Text style={styles.activityTextTime}>{time}</Text>
      </View>
    </View>
    <View>
      <View style={styles.activityIconView}>
        <Image source={icon} style={styles.iconActivityImage} />
        <Text style={styles.activityDuration}>{duration}</Text>
      </View>
    </View>
  </LinearGradient>
);

const renderKeyStatistic = (label, value, change, isNegative = false, icon) => (
  <LinearGradient
    colors={['rgba(255, 255, 255, 0.04)', 'rgba(255, 255, 255, 0.02)']}
    start={{x: 0, y: 0}}
    end={{x: 1, y: 0}}
    style={styles.activityItem}>
    <View style={styles.statisItemView}>
      <View style={styles.statisticIconView}>
        <Image source={icon} style={styles.statisticIcon} />
      </View>

      <Text style={styles.statisticLabel}>{label}</Text>
    </View>

    <View style={styles.statisticValues}>
      <Text style={styles.statisticValue}>{value}</Text>
      <View style={isNegative
            ? styles.statisticChangePositiveView
            : styles.statisticChangeNegativeView }>
      <Image source={ isNegative
            ? downArrow
            : upAroorw} style={styles.upAroorwImage}/>
      <Text
        style={
          isNegative
            ? styles.statisticChangeNegative
            : styles.statisticChangePositive
        }>
        {change}
      </Text>
      </View>
      
    </View>
  </LinearGradient>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  border: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.20)',
  },
  safeArea: {
    flex: 1,
    width: '100%',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: 0,
    marginTop: 10,
    // marginLeft:-5,
    // marginRight:-5,
    // width: '100%',
    // backgroundColor:"red"
  },
  container2: {
    // alignItems: 'center',
    marginTop: 10,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    height: 189,
    // backgroundColor:"red"
  },
  activityIconView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    paddingVertical: 8,
    // paddingHorizontal: 10,
    gap: 6,
    width: 75,
    height: 32,
  },
  statisticChangeNegativeView:{
    borderRadius: 25,
    backgroundColor: 'rgba(39, 255, 233, 0.08)',
    width:54,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    gap:8,
    padding:4,
  },
  statisticChangePositiveView:{
    borderRadius: 25,
    backgroundColor: 'rgba(255, 139, 2, 0.08)',
    width:54,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    gap:8,
    padding:4,
  },
  statisItemView: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent:'space-between',
    alignItems:'center',
    gap: 12,
  },
  iconActivityImage: {
    width: 16,
    height: 16,
  },
  heartImage: {
    width: 16,
    height: 16,
  },
  activityTimeView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    // backgroundColor:'pink',
    gap: 10,
  },
  upAroorwImage:{
    width:8,
    height:8,
  },
  sectionTitleView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  heartImageView: {
    alignItems: 'flex-start',
    // width: '40%',
    // backgroundColor:'blue'
  },
  cardiImageView: {
    alignItems: 'flex-start',
    // width: '40%',
  },
  lineWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  lineImage: {
    width: '100%',
    resizeMode: 'contain',
    marginLeft: -70,
    marginRight: -70,
  },
  timerImage: {
    width: 16,
    height: 16,
  },
  rhrStyle: {
    color: 'rgba(241, 241, 241, 0.80)',
    fontSize: 12,
    marginTop: 8,
  },
  bruxismView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bruxismViewContent: {
    marginLeft: 8,
  },
  LineActivityImage: {
    width: 16,
    height: 16,
    marginBottom: 5,
  },
  rhrView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rhrValueStyle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  rhrBpmStyle: {
    color: 'rgba(255, 255, 255, 0.40)',
    fontSize: 11,
    marginLeft: 5,
  },
  bruxismSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 16,
    marginHorizontal: 16,
    height: 66,
  },
  bruxismDetail: {
    alignItems: 'center',
  },
  statisticIcon: {
    width: 20,
    height: 20,
  },
  statisticIconView: {
    width: 36,
    height: 36,
    borderRadius: 18,
    // backgroundColor:'red',
    // flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
  },
  bruxismTitle: {
    color: '#fff',
    fontSize: 12,
  },
  bruxismValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 5,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    // marginVertical: 15,
    marginLeft: 20,
    fontWeight: '600',
    marginTop: 40,
    marginBottom: 16,
  },
  sectionTitleKey: {
    color: '#fff',
    fontSize: 16,
    // marginVertical: 15,
    // marginLeft: 20,
    fontWeight: '600',
    marginTop: 40,
    marginBottom: 16,
  },
  sectionTitlePrev: {
    color: 'rgba(255, 255, 255, 0.70)',
    fontSize: 12,
    // marginVertical: 15,
    marginLeft: 20,
    fontWeight: '300',
    marginTop: 40,
    marginBottom: 16,
  },
  activitiesSection: {
    // backgroundColor: '#2B2D2E',
    // padding: 10,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
    // marginHorizontal:12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    // marginLeft:-10
  },
  activityText: {
    color: '#fff',
    fontSize: 14,
  },
  activityTextTime: {
    color: '#A9A9A9',
    fontSize: 12,
  },
  activityDuration: {
    color: '#fff',
    fontSize: 14,
  },
  keyStatistics: {
    // backgroundColor: '#2B2D2E',
    // padding: 10,
    // borderRadius: 10,
    marginHorizontal: 20,
    // marginVertical: 10,
  },
  statisticItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  statisticLabel: {
    color: '#fff',
    fontSize: 14,
  },
  statisticValues: {
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center'
  },
  statisticValue: {
    color: '#fff',
    fontSize: 14,
    marginRight: 8,
  },
  statisticChangePositive: {
    color: '#0F0',
    fontSize: 14,
  },
  statisticChangeNegative: {
    color: '#FF8B02',
    fontSize: 14,
  },
  trendsSection: {
    backgroundColor: '#2B2D2E',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  trendsDate: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  trendTabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  trendTab: {
    color: '#fff',
    fontSize: 14,
    padding: 5,
    paddingHorizontal: 20,
    backgroundColor: '#FD0405',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  inactiveTab: {
    backgroundColor: '#555',
  },
});

export default SplashScreen;
