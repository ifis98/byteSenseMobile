import React, { useState, useEffect } from 'react';
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

import { useNavigation } from '@react-navigation/native';
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
import fatigueScore from "../assets/FatigueScore.png"
import redLineVector from "../assets/redLineVector.png"
import warningCircle from "../assets/warning-circle.png"
import trendUp from "../assets/trend-up.png"
import prev from "../assets/prev.png"
import redTimer from "../assets/timer1.png";
import lungs from '../assets/lungs.png';
import dentalTooth from '../assets/dental-tooth.png';
import dentalCare from '../assets/dental-care.png';
import upAroorw from '../assets/upAroorw.png';
import downArrow from '../assets/downArrow.png';
import action from "../assets/action.png"
import GraphComponent from '../components/GraphComponent';
import CustomGraph from '../components/CustomGraph';
import SleepReadiness from '../components/SleepReadiness';
import healthData from '../hard_data/DashboardData.json'; // Import your health data JSON

const { width } = Dimensions.get('window');

const MySvgComponent = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="4"
    viewBox="0 0 16 4"
    fill="none">
    <Path
      d="M0.500163 2C0.500163 2.73638 1.09712 3.33333 1.8335 3.33333C2.56988 3.33333 3.16683 2.73638 3.16683 2C3.16683 1.26362 2.56988 0.666667 1.8335 0.666667C1.09712 0.666667 0.500163 1.26362 0.500163 2ZM12.5002 2C12.5002 2.73638 13.0971 3.33333 13.8335 3.33333C14.5699 3.33333 15.1668 2.73638 15.1668 2C15.1668 1.26362 14.5699 0.666667 13.8335 0.666667C13.0971 0.666667 12.5002 1.26362 12.5002 2ZM1.8335 2.25L13.8335 2.25V1.75L1.8335 1.75V2.25Z"
      fill="#27FFE9"
    />
  </Svg>
);
const downIcon = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="7"
      height="8"
      viewBox="0 0 7 8"
      fill="none">
      <Path
        d="M3.26028 6.2073C3.28703 6.24616 3.32284 6.27794 3.3646 6.29989C3.40637 6.32184 3.45284 6.33331 3.50003 6.33331C3.54721 6.33331 3.59369 6.32184 3.63545 6.29989C3.67722 6.27794 3.71302 6.24616 3.73978 6.2073L6.36478 2.41563C6.39516 2.3719 6.41298 2.32068 6.4163 2.26753C6.41961 2.21438 6.4083 2.16134 6.38359 2.11416C6.35887 2.06699 6.32171 2.0275 6.27612 1.99997C6.23054 1.97244 6.17828 1.95792 6.12503 1.95801H0.875027C0.821898 1.95823 0.769834 1.97293 0.724434 2.00052C0.679034 2.02812 0.642016 2.06757 0.61736 2.11463C0.592704 2.16169 0.581344 2.21459 0.584501 2.26762C0.587658 2.32066 0.605213 2.37183 0.635277 2.41563L3.26028 6.2073Z"
        fill="#F1F1F1"
      />
    </Svg>
  );
};
const SplashScreen = () => {
  const navigation = useNavigation();
  // const dailyByteScoreData = [30, 80, 50, 70, 40, 90, 100];
  // const bruxismData = [10, 50, 20, 60, 30, 80, 45];
  // const dailyByteScoreData = [30, 80, 50, 70, 40, 90, 100];
  // const bruxismData = [10, 50, 20, 60, 30, 80, 45];
  const dailyByteScoreData = [0, 0, 0, 0, 0, 0, 0];
  const bruxismData = [0, 0, 0, 0, 0, 0, 0];
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0],
  ); // Default to today's date
  const [hr, setHr] = useState('--');
  const [hrv, setHrv] = useState('--');
  const [score, setScore] = useState('--');
  const [sleepStart, setSleepStart] = useState('--');
  const [sleepStop, setSleepStop] = useState('--');
  const [sleepTime, setSleepTime] = useState('--');
  const [selectedDateIndex, setSelectedDateIndex] = useState(0); // Default to first date

  const calculateAverages = data => {
    if (!data || data.length <= 1) return { avgHR: 0, avgHRV: 0 };

    // Exclude the latest date (last element in the array)
    const filteredData = data.slice(0, data.length - 1);

    const total = filteredData.reduce(
      (acc, curr) => {
        acc.totalHR += curr.HR;
        acc.totalHRV += curr.HRV;
        return acc;
      },
      { totalHR: 0, totalHRV: 0 },
    );

    const count = filteredData.length;
    return {
      avgHR: parseInt(total.totalHR / count, 10),
      avgHRV: parseInt(total.totalHRV / count, 10),
    };
  };

  const { avgHR, avgHRV } = calculateAverages(healthData);

  // Function to handle date changes
  const handleDateChange = index => {
    setSelectedDateIndex(index);
    const selectedDateData = healthData[index]; // Direct access by index
    if (selectedDateData) {
      setHr(selectedDateData.HR || '--');
      setHrv(selectedDateData.HRV || '--');
      setSleepStart(selectedDateData.SleepTimeStart || '--');
      setSleepStop(selectedDateData.SleepTimeFinish || '--');
      setSleepTime(selectedDateData.TotalSleepTime || '--');
      const hr = selectedDateData.HR;
      const hrv = selectedDateData.HRV;
      let calculatedScore = (70 - hr) * 2 + (hrv - 20);
      if (calculatedScore % 2 !== 0) {
        calculatedScore += 1; // Make the score even if it's odd
      }
      setScore(calculatedScore);
    } else {
      setHr('--');
      setHrv('--');
      setSleepStart('--');
      setSleepStop('--');
      setSleepTime('--');
      setScore(0);
    }
  };

  // Effect to calculate score whenever HR or HRV changes
  // useEffect(() => {
  //   if (hr !== '--' && hrv !== '--') {
  //     const calculatedScore = (70 - hr) * 2 + (hrv - 20);
  //     setScore(calculatedScore);
  //   } else {
  //     setScore(0);
  //   }
  // }, [hr, hrv]);
  useEffect(() => {
    // Optionally initialize the data if needed
    handleDateChange(selectedDateIndex);
  }, []);

  const getColorForScore = score => {
    const threshold = 60; // 60% of 100 in this case
    return score > threshold ? ['#0f3d3e', '#232323'] : ['#411E1F', '#232323'];
  };

  return (
    <LinearGradient
      colors={['#232323', '#232323', '#232323']}
      start={{ x: 0, y: 0 }}
      end={{ x: 2, y: 1.4 }}
      style={styles.container}>
      {/* <SafeAreaView style={styles.safeArea}> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={getColorForScore(score)}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 0.9 }}>

          <Header showBackArrow={false} title="Sleep Report" />
          <View style={styles.dataSliderView}>
            <DateSlider
              healthData={healthData}
              handleDateChange={handleDateChange}
              selectedDateIndex={selectedDateIndex}
              setSelectedDateIndex={handleDateChange}
            />
          </View>
          <View style={styles.statsSection}>
            <View style={styles.heartImageView}>
              <Image source={redTimer} style={[styles.heartImage, { alignSelf: "flex-start" }]} />
              <Text style={styles.rhrStyle}>Bruxism Duration</Text>
              <View style={styles.rhrView}>
                <Text style={styles.rhrValueStyle}>6</Text>
                <Text style={styles.rhrBpmStyle}>min</Text>
              </View>
            </View>

            <Image source={redLineVector} style={styles.lineImage} />

            <View style={styles.cardiImageView}>
              <Image source={prev} style={styles.heartImage} />
              <Text style={styles.rhrStyle}>Bruxism Episodes</Text>
              <View style={[styles.rhrView, { alignSelf: "flex-end" }]}>
                <Text style={styles.rhrValueStyle}>14</Text>
              </View>
            </View>
          </View>
          <View style={styles.container2}>
            <HalfCircleSVGs selectedIndex={score} />
          </View>
        </LinearGradient>

        {/* Bruxism Duration */}
        {/* <LinearGradient
          colors={['rgba(255, 255, 255, 0.04)', 'rgba(255, 255, 255, 0.02)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.5, y: 0.5 }}
          style={styles.bruxismSection}>
          <View style={styles.bruxismDetail}>
            <View style={styles.bruxismView}>
              <Image source={timer} style={styles.timerImage} />
              <View style={styles.bruxismViewContent}>
                <Text style={styles.bruxismTitle}>Bruxism Duration</Text>
                <Text style={styles.bruxismValue}>
                  -- <Text style={styles.rhrBpmStyle}>min</Text>
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
                <Text style={styles.bruxismValue}>--</Text>
              </View>
            </View>
          </View>
        </LinearGradient> */}
        <LinearGradient
          colors={['#00BE2A0A', '#00BE2A0A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[{ flex: 1 }, { marginTop: 20, marginHorizontal: 18, maxHeight: 105, borderRadius: 4 }]}
        >
          <View style={styles.statisItemView}>

            <View style={{ flex: 1,marginTop:10 }}>
              <View style={{ flexDirection: "row", alignItems: "center", paddingLeft: 20, paddingTop: 20 }}>
                <View style={styles.statisticIconView}>
                  <Image source={trendUp} style={styles.statisticIcon} />
                </View>
                <Text
                  style={{
                    color: "white",
                    paddingLeft: 10,
                    fontSize: 14,
                    fontFamily: "Ubuntu",
                    fontWeight: 500
                  }}
                >
                  {"You're Improving!"}
                </Text>
              </View>

              <Text
                numberOfLines={2}
                style={{
                  width: "95%",
                  color: "#A8A9AA",
                  fontSize: 14,
                  textAlign: "justify",
                  paddingLeft: 20,
                  fontFamily: "Ubuntu",
                  fontWeight: 400,
                  paddingBottom: 20,
                  marginTop: 5,
                  lineHeight: 24,
                }}
              >
                Last night you grinded 25% less than this time last week!
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* Your Action Focus */}
        <LinearGradient
          colors={['#2D2D2D', '#411E1F', '#411E1F', '#411E1F', '#2D2D2D']}
          locations={[0.0, 0.35, 0.5, 0.65, 1.0]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            flex: 1,
            marginTop: 26,
            marginHorizontal: 18,
            maxHeight: 80,
            borderRadius: 4,
            overflow: 'hidden',
          }}
        >
          <View style={styles.statisItemView}>
            <View style={{ flex: 1, paddingTop: 10 }}>
              <View style={{ flexDirection: "row", alignItems: "center", paddingLeft: 20 }}>
                <Image source={action} style={{ width: 14.5, height: 14.5, paddingTop: 3 }} />
                <Text
                  style={{
                    color: "#858688",
                    paddingLeft: 10,
                    fontSize: 15,
                    fontFamily: "Ubuntu",
                    fontWeight: '400',
                  }}
                >
                  Your Action Focus
                </Text>
              </View>

              <Text
                numberOfLines={2}
                style={{
                  width: "95%",
                  color: "white",
                  fontSize: 14,
                  paddingLeft: 19,
                  paddingTop: 14,
                  fontWeight: 400,
                  fontFamily: "Ubuntu",
                  paddingBottom: 10,
                  lineHeight: 20,
                }}
              >
                Stay under 200 mg of caffeine
              </Text>
            </View>
          </View>
        </LinearGradient>


        {/* Activities Section */}
        <Text style={[styles.sectionTitle, { marginBottom: 5 }]}>Damage Analysis</Text>
        <View style={[styles.activitiesSection, { marginTop: 0 }]}>

          <LinearGradient
            colors={['rgba(255, 255, 255, 0.04)', 'rgba(255, 255, 255, 0.02)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.activityItem]}>
            <View style={styles.statisItemView}>
              <View style={styles.statisticIconView}>
                <Image source={warningCircle} style={styles.statisticIcon} />
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  numberOfLines={2}
                  style={{
                    color: '#fff',
                    fontSize: 14,
                    fontFamily: "Ubuntu",
                    fontWeight: 400,
                    lineHeight: 20, // controls line spacing
                    // flexWrap: 'wrap',
                  }}
                >
                  You protected your teeth from 3 days of wear!
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>


        {/* Activities Section */}
        <Text style={styles.sectionTitle}>Activities</Text>
        <View style={styles.activitiesSection}>
          {/* {renderActivity('Meditation', '5:11 PM', '0:12', yoga)} */}
          {renderActivity('Sleep', sleepStart, sleepStop, sleepTime, moon)}
          {/* {renderActivity('Run', '12:01 PM', '0:27', PersonSimpleRun)} */}
        </View>

        {/* Key Statistics Section */}
        <View style={styles.sectionTitleView}>
          <Text style={styles.sectionTitleKey}>Key Statistics</Text>
          <Text style={styles.sectionTitlePrev}>vs. Previous 30 days</Text>
        </View>
        <View style={styles.keyStatistics}>
          {renderKeyStatistic('Fatigue Score', '40', null, false, fatigueScore)}
          {renderKeyStatistic('HRV', hrv, avgHRV, false, cardiogram2)}
          {renderKeyStatistic('RHR', hr, avgHR, true, hearblack)}
          {renderKeyStatistic('Respiratory rate', '--', '--', true, lungs)}
          {renderKeyStatistic(
            'Bruxism Episodes',
            '--',
            '--',
            false,
            dentalTooth,
          )}
          {renderKeyStatistic(
            'Bruxism Duration',
            '--',
            '--',
            false,
            dentalCare,
          )}
        </View>
        <View style={styles.yourTrendsView}>
          <View style={styles.yourTrendsTextView}>
            <Text style={styles.sectionTitle}>Your Trends</Text>
            <Text style={styles.sectionTitleCalender}>
              01 Jul - 07 Jul {downIcon()}
            </Text>
          </View>
          <LinearGradient
            colors={[
              'rgba(255, 255, 255, 0.04)',
              'rgba(255, 255, 255, 0.02)',
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
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
        <GraphComponent data={dailyByteScoreData} color="#00BE2A" />

        {/* <Text style={styles.sectionTitle}>Bruxism</Text> */}

        {/* <View style={{backgroundColor:'red'}}> */}
        {/* <GraphComponent data={bruxismData} color="#FF8B02" /> */}

        {/* <Text style={styles.sectionTitle}>Sleep Readiness</Text>
          <View style={styles.sleedRadinessView}>
            <Text style={styles.sleepRed}>0</Text>
            <Text style={styles.sleepRedText}>Sleep Readiness Score</Text>
          </View>
          <SleepReadiness /> */}

        {/* <Text style={styles.graphText}>
            You mostly had a <Text style={styles.lowText}>High</Text> Sleep
            Readiness Score this week. Your highest Sleep Readiness Score was{' '}
            <Text style={styles.lowText}>67</Text> on{' '}
            <Text style={styles.lowText}>Friday</Text>
          </Text> */}
      </ScrollView>
      {/* </SafeAreaView> */}
    </LinearGradient>
  );
};

const renderActivity = (activity, timeStart, timeEnd, duration, icon) => (
  <LinearGradient
    colors={['rgba(255, 255, 255, 0.04)', 'rgba(255, 255, 255, 0.02)']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={styles.activityItem}>
    <View>
      <Text style={styles.activityText}>{activity}</Text>
      <View style={styles.activityTimeView}>
        <Text style={styles.activityTextTime}>{timeStart}</Text>
        {MySvgComponent()}

        <Text style={styles.activityTextTime}>{timeEnd}</Text>
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
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={styles.activityItem}>
    <View style={styles.statisItemView}>
      <View style={styles.statisticIconView}>
        <Image source={icon} style={styles.statisticIcon} />
      </View>

      <Text style={styles.statisticLabel}>{label}</Text>
    </View>

    <View style={styles.statisticValues}>
      <Text style={styles.statisticValue}>{value}</Text>
      {change && <View
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
      </View>}
    </View>
  </LinearGradient>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop: 20,
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
    paddingHorizontal: 5,
    marginTop: 15,
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
  weekView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#232323',
    marginRight: 10,
    height: 36,
    // width:'70%',
  },
  textMonth: {
    color: '#FFF',
    fontFamily: "Ubuntu"
  },
  textMonthRed: {
    color: '#FF0405',
    fontFamily: "Ubuntu"
  },
  sleepRedText: {
    color: 'rgba(255, 255, 255, 0.30)',
    fontSize: 14,
    fontFamily: "Ubuntu"
  },
  monthView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    // backgroundColor: '#232323',
    height: 36,
    color: '#FFF',
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
  yourTrendsTextView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
    fontFamily: "Ubuntu"
  },
  heartImage: {
    width: 16,
    height: 16,
    alignSelf: "flex-end"
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
  sleedRadinessView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 18,
    marginBottom: 5,
    marginLeft: 5,
  },
  sleepRed: {
    color: '#FD3637',
    fontSize: 24,
    fontWeight: '500',
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
  calenderFont: {
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
    marginLeft: -110,
    marginRight: -110,
  },
  timerImage: {
    width: 16,
    height: 16,
  },
  rhrStyle: {
    color: 'rgba(241, 241, 241, 0.80)',
    fontSize: 12,
    fontFamily: "Ubuntu",
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
    alignSelf: "flex-end",
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
    // marginVertical: 24,
    marginTop: 24,
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
    fontFamily:"Ubuntu",
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
    borderRadius: 4
    // marginLeft:-10
  },
  yourTrendViewMonth: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginHorizontal: 20,
    borderRadius: 12,
    paddingVertical: 6,
  },
  activityText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: "Ubuntu"
  },
  activityTextTime: {
    color: '#A9A9A9',
    fontSize: 12,
    fontFamily: "Ubuntu"
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
    fontFamily: "Ubuntu"
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
  dataSliderView: {
    marginTop: -20,
  },
  graphText: {
    color: 'rgba(255, 255, 255, 0.50)',
    fontSize: 12,
    fontWeight: '400',
    marginHorizontal: 30,
    marginTop: 14,
    lineHeight: 18,
    marginBottom: 50,
    fontFamily: "Ubuntu"
  },
  lowText: {
    color: 'rgba(255, 255, 255, 0.50)',
    fontSize: 12,
    fontWeight: '700',
    lineHight: 18,

  },
});

export default SplashScreen;
