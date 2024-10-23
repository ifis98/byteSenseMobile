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
import { Svg, Path, G, ClipPath, Rect, Defs } from 'react-native-svg';

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

const downIcon = () =>{
  return(<Svg xmlns="http://www.w3.org/2000/svg" width="7" height="8" viewBox="0 0 7 8" fill="none">
    <Path d="M3.26028 6.2073C3.28703 6.24616 3.32284 6.27794 3.3646 6.29989C3.40637 6.32184 3.45284 6.33331 3.50003 6.33331C3.54721 6.33331 3.59369 6.32184 3.63545 6.29989C3.67722 6.27794 3.71302 6.24616 3.73978 6.2073L6.36478 2.41563C6.39516 2.3719 6.41298 2.32068 6.4163 2.26753C6.41961 2.21438 6.4083 2.16134 6.38359 2.11416C6.35887 2.06699 6.32171 2.0275 6.27612 1.99997C6.23054 1.97244 6.17828 1.95792 6.12503 1.95801H0.875027C0.821898 1.95823 0.769834 1.97293 0.724434 2.00052C0.679034 2.02812 0.642016 2.06757 0.61736 2.11463C0.592704 2.16169 0.581344 2.21459 0.584501 2.26762C0.587658 2.32066 0.605213 2.37183 0.635277 2.41563L3.26028 6.2073Z" fill="#F1F1F1"/>
  </Svg>)
}
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
          <View style={styles.yourTrendsView}>
            <View style={styles.yourTrendsTextView}>
              <Text style={styles.sectionTitle}>Your Trends</Text>
              <Text style={styles.sectionTitleCalender}>01 Jul - 07 Jul {downIcon()}</Text>
            </View>
            <LinearGradient
    colors={['rgba(255, 255, 255, 0.04)', 'rgba(255, 255, 255, 0.02)']}
    start={{x: 0, y: 0}}
    end={{x: 1, y: 0}}
    style={styles.yourTrendViewMonth}>
              {/* <View style={styles.trendTabs}> */}
              <View style={styles.weekView}>
                <Text style={styles.textMonthRed}>Week</Text> 
              </View>
              <View style={styles.monthView}>
              <Text style={styles.textMonth}>Month</Text> 
              </View>
              
              {/* </View> */}
            </LinearGradient>
          </View>

          <Text style={styles.sectionTitle}>Daily Byte Score</Text>

          {/* <View style={{backgroundColor:'red'}}> */}
          <GraphComponent />
          <Text style={styles.sectionTitle}>Bruxism</Text>

          {/* <View style={{backgroundColor:'red'}}> */}
          <GraphComponent color="#FF8B02" />

          <Text style={styles.sectionTitle}>Activities</Text>

          {/* <CustomGraph/> */}

          {/* </View> */}

          {/* Your Trends Section */}
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
      <View
        style={
          isNegative
            ? styles.statisticChangePositiveView
            : styles.statisticChangeNegativeView
        }>
        <Image
          source={isNegative ? downArrow : upAroorw}
          style={styles.upAroorwImage}
        />
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
  weekView:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 4,
backgroundColor: '#232323',
marginRight:10,
height:36,
// width:'70%',

  },
  textMonth:{
    color:"#FFF"
  },
  textMonthRed:{
    color:"#FF0405"
  },
  monthView:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 4,
// backgroundColor: '#232323',
height:36,
color:"#FFF"
// width:'100%',

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
  statisticChangeNegativeView: {
    borderRadius: 25,
    backgroundColor: 'rgba(39, 255, 233, 0.08)',
    width: 54,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    padding: 4,
  },
  statisticChangePositiveView: {
    borderRadius: 25,
    backgroundColor: 'rgba(255, 139, 2, 0.08)',
    width: 54,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    padding: 4,
  },
  statisItemView: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent:'space-between',
    alignItems: 'center',
    gap: 12,
  },
  iconActivityImage: {
    width: 16,
    height: 16,
  },
  yourTrendsTextView:{
    flexDirection:'row'
    ,justifyContent:'space-between',
    alignItems:'center',
    paddingRight:20,
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
  upAroorwImage: {
    width: 8,
    height: 8,
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
  calenderFont:{
    color: '#F1F1F1',
fontSize: 14,
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
  sectionTitleCalender: {
    color: '#fff',
    fontSize: 14,
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
  yourTrendViewMonth: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginHorizontal:20,
    borderRadius:12,
    paddingVertical: 6,

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
    justifyContent: 'center',
    alignItems: 'center',
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
