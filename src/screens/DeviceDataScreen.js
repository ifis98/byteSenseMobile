import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  DeviceEventEmitter,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Svg, Path, G, ClipPath, Rect, Defs} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation

import {Buffer} from 'buffer';
import Header from './header'; // Assuming you have a header component
import batteryIcon from '../assets/battery.png'; // Battery icon image path
import connectedIcon from '../assets/CheckCircle.png'; // Connected icon image path
import teethLogo from '../assets/night-guard.png'; // Tooth logo image
import BleManager from 'react-native-ble-manager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {findRealTimeHR, findRealTimeResp} from './HRCalc';
import GraphComponentMultiple from '../components/GraphComponentMultiple';
import RNFS from 'react-native-fs';
import Mailer from 'react-native-mail';
import { NordicDFU, DFUEmitter } from 'react-native-nordic-dfu';
import io from 'socket.io-client';
import {backendLink} from '../api/api'
import {firmwareFilePath} from '../utils/firmwareManager';



const socket = io(backendLink, {
  transports: ['websocket'], // ensure stable connection
});

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
const disccountComponent = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="16"
    viewBox="0 0 17 16"
    fill="none">
    <Path
      d="M12.6644 3.58562C12.29 3.21129 11.7824 3.00069 11.253 2.99999C10.7235 2.99928 10.2154 3.20854 9.84 3.58188L9.11187 4.345C9.01875 4.43204 8.8959 4.48022 8.76844 4.47971C8.64097 4.47919 8.51852 4.43002 8.4261 4.34223C8.33368 4.25444 8.27828 4.13467 8.27123 4.0074C8.26417 3.88013 8.30598 3.75497 8.38813 3.6575L9.12062 2.88937C9.12317 2.88651 9.12589 2.8838 9.12875 2.88125C9.69291 2.32621 10.4535 2.01658 11.2449 2.0198C12.0364 2.02302 12.7944 2.33884 13.354 2.89845C13.9137 3.45807 14.2295 4.21615 14.2327 5.00756C14.2359 5.79897 13.9263 6.5596 13.3713 7.12375C13.3687 7.12661 13.366 7.12933 13.3631 7.13188L12.595 7.86438C12.4975 7.94652 12.3724 7.98833 12.2451 7.98127C12.1178 7.97422 11.9981 7.91882 11.9103 7.8264C11.8225 7.73398 11.7733 7.61153 11.7728 7.48406C11.7723 7.3566 11.8205 7.23375 11.9075 7.14062L12.6706 6.4125C13.0444 6.03666 13.2537 5.52782 13.2525 4.99777C13.2513 4.46772 13.0398 3.95981 12.6644 3.58562ZM7.38812 11.655L6.66 12.4181C6.28312 12.7841 5.77735 12.9872 5.25199 12.9833C4.72664 12.9795 4.22389 12.7691 3.85239 12.3976C3.4809 12.0261 3.2705 11.5234 3.26666 10.998C3.26282 10.4727 3.46585 9.96688 3.83188 9.59L4.595 8.86187C4.68204 8.76875 4.73022 8.6459 4.72971 8.51844C4.72919 8.39097 4.68002 8.26852 4.59223 8.1761C4.50444 8.08368 4.38467 8.02828 4.2574 8.02123C4.13013 8.01417 4.00497 8.05598 3.9075 8.13813L3.13687 8.87062C3.13401 8.87317 3.1313 8.87589 3.12875 8.87875C2.57371 9.44291 2.26408 10.2035 2.2673 10.9949C2.27052 11.7864 2.58634 12.5444 3.14596 13.104C3.70557 13.6637 4.46365 13.9795 5.25506 13.9827C6.04647 13.9859 6.80709 13.6763 7.37125 13.1213C7.37411 13.1187 7.37683 13.116 7.37937 13.1131L8.11188 12.345C8.16167 12.2985 8.20143 12.2422 8.2287 12.1798C8.25597 12.1173 8.27018 12.0499 8.27045 11.9817C8.27073 11.9136 8.25707 11.8461 8.2303 11.7834C8.20354 11.7207 8.16424 11.6641 8.11482 11.6172C8.0654 11.5703 8.0069 11.5339 7.94292 11.5104C7.87894 11.4869 7.81083 11.4767 7.74277 11.4805C7.67471 11.4843 7.60814 11.5019 7.54716 11.5323C7.48617 11.5628 7.43205 11.6054 7.38812 11.6575V11.655ZM13.75 9.5H12.25C12.1174 9.5 11.9902 9.55268 11.8964 9.64645C11.8027 9.74021 11.75 9.86739 11.75 10C11.75 10.1326 11.8027 10.2598 11.8964 10.3536C11.9902 10.4473 12.1174 10.5 12.25 10.5H13.75C13.8826 10.5 14.0098 10.4473 14.1036 10.3536C14.1973 10.2598 14.25 10.1326 14.25 10C14.25 9.86739 14.1973 9.74021 14.1036 9.64645C14.0098 9.55268 13.8826 9.5 13.75 9.5ZM2.75 6.5H4.25C4.38261 6.5 4.50979 6.44732 4.60355 6.35355C4.69732 6.25979 4.75 6.13261 4.75 6C4.75 5.86739 4.69732 5.74021 4.60355 5.64645C4.50979 5.55268 4.38261 5.5 4.25 5.5H2.75C2.61739 5.5 2.49021 5.55268 2.39645 5.64645C2.30268 5.74021 2.25 5.86739 2.25 6C2.25 6.13261 2.30268 6.25979 2.39645 6.35355C2.49021 6.44732 2.61739 6.5 2.75 6.5ZM10.25 11.5C10.1174 11.5 9.99021 11.5527 9.89645 11.6464C9.80268 11.7402 9.75 11.8674 9.75 12V13.5C9.75 13.6326 9.80268 13.7598 9.89645 13.8536C9.99021 13.9473 10.1174 14 10.25 14C10.3826 14 10.5098 13.9473 10.6036 13.8536C10.6973 13.7598 10.75 13.6326 10.75 13.5V12C10.75 11.8674 10.6973 11.7402 10.6036 11.6464C10.5098 11.5527 10.3826 11.5 10.25 11.5ZM6.25 4.5C6.38261 4.5 6.50979 4.44732 6.60355 4.35355C6.69732 4.25979 6.75 4.13261 6.75 4V2.5C6.75 2.36739 6.69732 2.24021 6.60355 2.14645C6.50979 2.05268 6.38261 2 6.25 2C6.11739 2 5.99021 2.05268 5.89645 2.14645C5.80268 2.24021 5.75 2.36739 5.75 2.5V4C5.75 4.13261 5.80268 4.25979 5.89645 4.35355C5.99021 4.44732 6.11739 4.5 6.25 4.5Z"
      fill="#27FFE9"
    />
  </Svg>
);

const calibrate = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="16"
    viewBox="0 0 17 16"
    fill="none">
    <Defs>
      <ClipPath id="clip0_147_1129">
        <Rect width="16" height="16" fill="white" transform="translate(0.25)" />
      </ClipPath>
    </Defs>
    <G clipPath="url(#clip0_147_1129)">
      <Path
        d="M8.25016 5.50025C7.7557 5.50025 7.27235 5.64687 6.86123 5.92158C6.45011 6.19628 6.12968 6.58673 5.94046 7.04354C5.75124 7.50036 5.70173 8.00303 5.79819 8.48798C5.89466 8.97293 6.13276 9.41839 6.48239 9.76802C6.83202 10.1176 7.27748 10.3558 7.76243 10.4522C8.24738 10.5487 8.75005 10.4992 9.20686 10.31C9.66368 10.1207 10.0541 9.8003 10.3288 9.38918C10.6035 8.97805 10.7502 8.4947 10.7502 8.00025C10.7502 7.33721 10.4868 6.70133 10.0179 6.23248C9.54908 5.76364 8.9132 5.50025 8.25016 5.50025ZM8.25016 9.50025C7.95348 9.50025 7.66347 9.41228 7.4168 9.24746C7.17013 9.08263 6.97787 8.84837 6.86434 8.57428C6.7508 8.30019 6.7211 7.99859 6.77898 7.70762C6.83686 7.41664 6.97972 7.14937 7.1895 6.93959C7.39927 6.72981 7.66655 6.58695 7.95752 6.52907C8.24849 6.4712 8.55009 6.5009 8.82418 6.61443C9.09827 6.72796 9.33254 6.92022 9.49736 7.1669C9.66218 7.41357 9.75016 7.70358 9.75016 8.00025C9.75016 8.39808 9.59212 8.77961 9.31082 9.06091C9.02951 9.34222 8.64798 9.50025 8.25016 9.50025ZM12.857 9.9465C12.6422 10.4544 12.3449 10.9232 11.977 11.334C11.888 11.4304 11.7646 11.4879 11.6335 11.4941C11.5024 11.5003 11.3741 11.4547 11.2764 11.3672C11.1786 11.2797 11.1191 11.1572 11.1108 11.0262C11.1025 10.8953 11.1461 10.7663 11.232 10.6671C11.8886 9.93409 12.2516 8.98462 12.2516 8.00056C12.2516 7.01651 11.8886 6.06704 11.232 5.334C11.187 5.28529 11.1521 5.22811 11.1294 5.16578C11.1067 5.10346 11.0967 5.03724 11.0998 4.97099C11.1029 4.90473 11.1192 4.83976 11.1477 4.77986C11.1762 4.71996 11.2163 4.66633 11.2657 4.62209C11.3152 4.57786 11.3729 4.54389 11.4356 4.52218C11.4983 4.50047 11.5646 4.49145 11.6308 4.49564C11.697 4.49983 11.7617 4.51715 11.8212 4.54659C11.8806 4.57603 11.9336 4.61701 11.977 4.66713C12.6084 5.37359 13.0262 6.24474 13.182 7.1793C13.3378 8.11387 13.2251 9.07345 12.857 9.9465ZM4.56266 6.44338C4.26764 7.14173 4.17716 7.90955 4.30176 8.65735C4.42636 9.40515 4.7609 10.1022 5.26641 10.6671C5.35237 10.7663 5.3959 10.8953 5.3876 11.0262C5.37931 11.1572 5.31986 11.2797 5.22208 11.3672C5.1243 11.4547 4.99603 11.5003 4.86495 11.4941C4.73386 11.4879 4.61047 11.4304 4.52141 11.334C3.70052 10.4177 3.2466 9.23077 3.2466 8.00056C3.2466 6.77036 3.70052 5.5834 4.52141 4.66713C4.60984 4.56808 4.73399 4.50823 4.86656 4.50073C4.99912 4.49323 5.12924 4.53869 5.22828 4.62713C5.32732 4.71556 5.38718 4.83972 5.39468 4.97228C5.40218 5.10484 5.35671 5.23496 5.26828 5.334C4.97328 5.66218 4.73483 6.03707 4.56266 6.44338ZM15.7502 8.00025C15.7532 9.96383 14.9833 11.8497 13.607 13.2503C13.5615 13.2989 13.5067 13.338 13.4458 13.3652C13.385 13.3924 13.3193 13.4072 13.2526 13.4086C13.186 13.41 13.1197 13.3981 13.0578 13.3736C12.9958 13.349 12.9394 13.3124 12.8918 13.2657C12.8442 13.219 12.8064 13.1633 12.7807 13.1018C12.7549 13.0403 12.7417 12.9743 12.7419 12.9076C12.742 12.841 12.7555 12.775 12.7815 12.7137C12.8075 12.6523 12.8455 12.5967 12.8933 12.5503C14.085 11.3361 14.7526 9.70277 14.7526 8.0015C14.7526 6.30023 14.085 4.6669 12.8933 3.45275C12.8001 3.3581 12.7484 3.23032 12.7494 3.09752C12.7505 2.96472 12.8043 2.83778 12.8989 2.74463C12.9936 2.65147 13.1213 2.59973 13.2541 2.60078C13.3869 2.60184 13.5139 2.6556 13.607 2.75025C14.9833 4.15077 15.7532 6.03667 15.7502 8.00025ZM3.60703 12.549C3.65308 12.5959 3.68944 12.6513 3.71404 12.7123C3.73865 12.7732 3.75101 12.8383 3.75043 12.904C3.74985 12.9697 3.73634 13.0347 3.71066 13.0952C3.68498 13.1556 3.64765 13.2105 3.60078 13.2565C3.55392 13.3025 3.49844 13.3389 3.43752 13.3635C3.3766 13.3881 3.31143 13.4005 3.24574 13.3999C3.18004 13.3993 3.1151 13.3858 3.05462 13.3601C2.99415 13.3345 2.93933 13.2971 2.89328 13.2503C1.51715 11.8493 0.746094 9.96403 0.746094 8.00025C0.746094 6.03647 1.51715 4.15121 2.89328 2.75025C2.93881 2.70157 2.99362 2.66248 3.05448 2.63529C3.11534 2.6081 3.18102 2.59335 3.24766 2.59191C3.31431 2.59048 3.38056 2.60238 3.44254 2.62692C3.50451 2.65146 3.56096 2.68815 3.60855 2.73482C3.65614 2.7815 3.69391 2.83721 3.71966 2.8987C3.7454 2.96019 3.75859 3.0262 3.75845 3.09286C3.75831 3.15951 3.74484 3.22547 3.71883 3.28685C3.69283 3.34822 3.65482 3.40378 3.60703 3.45025C2.41532 4.6644 1.74768 6.29773 1.74768 7.999C1.74768 9.70027 2.41532 11.3336 3.60703 12.5478V12.549Z"
        fill="white"
      />
    </G>
  </Svg>
);

// const colabriate = () => ()
const DeviceDataScreen = () => {
  const [syncInProgress, setSyncInProgress] = useState(false);
  const syncTimeoutRef = useRef(null);
  const syncData = useRef([])

  const [device, setDevice] = useState(null);
  const deviceRef = useRef(null);
  const fileName = useRef('');
  const navigation = useNavigation();

  const [batteryPercentage, setBatteryPercentage] = useState(null);
  const pollFirstBatteryRef = useRef(true)

  const [userId, setUserId] = useState(null);

  const [realTimeData, setRealTimeData] = useState(null);
  const [dfuStatus, setDfuStatus] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [services, setServices] = useState([]);
  const [characteristics, setCharacteristics] = useState([]);
  const [HR, setHR] = useState(79);
  const [HRV, setHRV] = useState(72);
  const [testHR, setTestHR] = useState(0);
  const [testHRV, setTestHRV] = useState(0);
  const [graphData, setGraphData] = useState([
    {data: [], color: 'rgba(0, 190, 42, 1)'},
  ]);
  const [xAxisData, setXAxisData] = useState(['0', '0.5', '1.0', '1.5', '2.0', '2.5', '3.0']);
  // const [graphData, setGraphData] = useState([
  //   { data: [318, 150, 80, 120, 90, 60, 0], color: 'rgba(0, 190, 42, 1)' },
  //   { data: [0, 50, 100, 200, 250, 150, 100], color: 'rgba(255, 139, 2, 1)' },
  // ]);
  const dataStartTime = useRef(0);

  const butterbandCoeffs = {
    b: [0.24777184, 0, -0.74331552, 0, 0.74331552, 0, -0.24777184],
    a: [
      1, -1.98424849, 0.98953008, -0.23795914, 0.49392954, -0.20417171,
      -0.05060652,
    ],
  };
  const butterbandLen = 6;
  const butterbandX = new Array(butterbandLen + 1).fill(0);
  const butterbandY = new Array(butterbandLen + 1).fill(0);
  const butterbandGain = 1;
  const respFiltCoeffs = {
    b: [
      1.51064223e-5, 0.0, -4.5319267e-5, 0.0, 4.5319267e-5, 0.0, -1.51064223e-5,
    ],
    a: [
      1, -5.89388965, 14.48040893, -18.98221654, 14.00311279, -5.51176305,
      0.90434753,
    ],
  };
  const respFiltLen = 6;
  const respFiltX = new Array(respFiltLen + 1).fill(0);
  const respFiltY = new Array(butterbandLen + 1).fill(0);
  const respFiltGain = 1;
  const ppgPeakBuffer = [];
  const respPeakBuffer = [];
  let ppgGraphBuffer = [];
  let respGraphBuffer = [];
  let updateCounter = 0;
  //let dataStartTime = 0;
  let deviceSolid = null

  useEffect(() => {

    const getUserId = async () => {
      try {
        const storedId = await AsyncStorage.getItem('userID');
        if (storedId) {
          setUserId(storedId);
          console.log('Loaded user ID:', storedId);
        }
      } catch (e) {
        console.error('Failed to load user ID:', e);
      }
    };
    getUserId();
    
    // Retrieve the selected device info
    const getDeviceInfo = async () => {
      try {
        console.log("device set")
        const savedDevice = await AsyncStorage.getItem('selectedDevice');
        if (savedDevice) {
          const parsedDevice = JSON.parse(savedDevice);
          setDevice(parsedDevice);
          deviceRef.current = parsedDevice;
          console.log('Retrieved device:', parsedDevice);

          // Connect to the device before starting notifications
          connectToDevice(parsedDevice.id);

        }
      } catch (error) {
        console.error('Error retrieving device:', error);
      }
    };

    getDeviceInfo();

    socket.on('connect', () => console.log('Socket connected:', socket.id));
    socket.on('disconnect', () => console.log('Socket disconnected'));
  
    return () => {
      socket.disconnect();
    };
  }, []);



  const writeJsonToFile = async (jsonData) => {
    fileName.current = 'Sample_'+new Date().getTime()+'.json';
    const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
    const jsonString = JSON.stringify(jsonData, null, 2);

    try {
      await RNFS.writeFile(filePath, jsonString, 'utf8');
      console.log('File written successfully:', filePath);
      return filePath;
    } catch (error) {
      console.error('Error writing file:', error);
      throw error;
    }
  };

  const sendEmail = async (filePath) => {
    Mailer.mail(
      {
        subject: 'JSON File Attachment', // Email subject
        recipients: ['sarnab@bytesense.ai'], // Replace with your email
        ccRecipients: ['jjarrenjacob@gmail.com'],
        body: 'Please find the JSON file attached.', // Email body
        isHTML: false,
        attachments: [
          {
            path: filePath, // Path to the file
            type: 'json', // MIME type for JSON
            name: fileName.current, // Name of the attachment
          },
        ],
      },
      (error, event) => {
        if (error) {
          console.error('Error sending email:', error);
          Alert.alert('Error', 'Failed to send email.');
        } else {
          console.log('Email sent successfully:', event);
          Alert.alert('Success', 'Email sent with JSON file!');
          syncData.current = []
        }
      }
    );
  };

  const handleSendEmail = async (data) => {
    try {
      const filePath = await writeJsonToFile(data);

      await sendEmail(filePath);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const sendSyncedData = async (data) => {
    await handleSendEmail(data);

    if (userId) {
      socket.emit('biometricData', {
        user: userId,
        data,
      });
      console.log('Sent biometricData for user:', userId);
    } else {
      console.warn('No userId found, cannot send biometricData');
    }
  };

  const connectToDevice = deviceId => {
    BleManager.connect(deviceId)
      .then(() => {
        console.log(`Connected to ${deviceId}`);
        setIsConnected(true);

        // Discover services and characteristics
        discoverServicesAndCharacteristics(deviceId)
      })
      .catch(error => {
        console.error('Error connecting to device:', error);
      });
  };

  const discoverServicesAndCharacteristics = deviceId => {
    BleManager.retrieveServices(deviceId)
      .then(peripheralInfo => {
        //console.log('Peripheral info:', peripheralInfo);

        // Store services and characteristics
        setServices(peripheralInfo.services || []);
        setCharacteristics(peripheralInfo.characteristics || []);

        // After discovering, start monitoring a specific characteristic
        if (peripheralInfo.characteristics.length > 0) {
          const characteristic = peripheralInfo.characteristics[0]; // Example: Use the first characteristic
          monitorDevice(deviceId, SERVICEUUID, characteristicNUUID);
        }
      })
      .catch(error => {
        console.error('Error retrieving services:', error);
      });
  };

  const monitorDevice = (deviceId, serviceUUID, characteristicUUID) => {
    BleManager.startNotification(deviceId, serviceUUID, characteristicUUID)
      .then(() => {
        console.log(`Started notification on ${characteristicUUID}`);

        // Add listener for characteristic notifications
        // Add listener for characteristic notifications
        const subscription = DeviceEventEmitter.addListener(
          'BleManagerDidUpdateValueForCharacteristic',
          ({value, peripheral, characteristic, service}) => {
            const bufferValue = Buffer.from(value);
            const hexValue = bufferValue.toString('hex');
            const asciiValue = bufferValue.toString('ascii');
            // const payllad = [
            //   { data: [318, 150, 80, 120, 90, 60, 0], color: 'rgba(0, 190, 42, 1)' },
            //   { data: [0, 50, 100, 200, 250, 150, 100], color: 'rgba(255, 139, 2, 1)' },
            // ];

            //console.log('Received hex data:', hexValue);
            //console.log('Received ASCII data:', asciiValue);
            if(pollFirstBatteryRef.current){
              sendMessage('battery')
              pollFirstBatteryRef.current = false
            }
            decipherNotification(bufferValue); // Pass the value to the decipherNotification function

            setRealTimeData(asciiValue);
          },
        );
        // Clean up the listener on unmount
        return () => subscription.remove();
      })
      .catch(error => {
        console.error('Error starting notification:', error);
      });
  };

  // Function to decipher the received notification data
  const parseReading = value => {
    // value is expected to be 4 hex digits representing HR and HRV
    let bytes = value.match(/.{1,2}/g);
    if (!bytes || bytes.length < 2) {
      return {hr: 0, hrv: 0};
    }

    let hr = parseInt(bytes[0], 16);
    let hrv = parseInt(bytes[1], 16);

    return {hr, hrv};
  };

  parseTime = time => {
    // time is expected to be 4 hex digits (little endian)
    const bytes = time.match(/.{1,2}/g);
    if (!bytes || bytes.length < 2) {
      return new Date(dataStartTime.current.getTime());
    }

    const raw = parseInt(bytes[1] + bytes[0], 16);

    const hour = (raw >> 8) & 0xff;
    const minute = (raw >> 2) & 0x3f;
    const second = (raw & 0x03) * 20;

    const startms = dataStartTime.current.getTime();
    const addms = (hour * 3600 + minute * 60 + second) * 1000;

    return new Date(startms + addms);
  };
  
  const processSync = syncSamples => {
    const sampleLength = 8;
    let data = [];

    for (let sample of syncSamples) {
      if (sample !== '00000000' && sample.length === sampleLength) {
        const timeHex = sample.slice(0, 4);
        const readingHex = sample.slice(4, 8);

        const {hr, hrv} = parseReading(readingHex);
        const time = parseTime(timeHex);

        const dataPoint = {
          HR: hr,
          HRV: hrv,
          ts: time,
          hrhex: readingHex.slice(0, 2),
          hrvhex: readingHex.slice(2, 4),
          timehex: timeHex,
        };

        data.push(dataPoint);
      }
    }

    console.log(JSON.stringify(data, null, 2));
    syncData.current.push(...data);
  };

  const sendMessage = message => {
    if(!syncTimeoutRef.current){
      console.log(deviceRef.current)
      if (deviceRef.current) {
        let processedMessage = Buffer.from(message+'\n');
        BleManager.write(
          deviceRef.current.id,
          SERVICEUUID,
          characteristicWUUID,
          processedMessage.toJSON().data,
        )
          .then(() => {
            console.log(`Message sent: ${message}`);
          })
          .catch(error => {
            console.error(`Error sending message: ${error}`);
          });
      } else {
        console.error('Device not connected');
      }
    }
  };

  const decipherNotification = async value => {
    //console.log('Processing notification data...');

    // Convert the base64 value to a hex string
    let hexValue = Buffer.from(value, 'base64').toString('hex');
    let stringValue = Buffer.from(value, 'base64').toString();
    //console.log('Hex Value length '+hexValue.length)

    let identifier;
    let splitIdentifier = [];

    if(hexValue.length >= 120){
      console.log('Sync Hex: ' + hexValue + ' '+ hexValue.length)
      let syncSamples = hexValue.match(/.{1,8}/g)
      processSync(syncSamples)

      if (!syncInProgress) {
        setSyncInProgress(true);
        // If you need to clear any old data, do so here:
        // setSyncData([]);
        console.log('Sync Started')
      }

      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
      }
      syncTimeoutRef.current = setTimeout(() => {
        // If we get here, no new large packet arrived for 5s
        setSyncInProgress(false);
        clearTimeout(syncTimeoutRef.current);
        syncTimeoutRef.current = null

        console.log('Sync Ended')

        // Sync ended, send data via email and socket
        sendSyncedData(syncData.current);
        
      }, 5000);
    }
    else if (hexValue.length >= 100) {
      hexValue = hexValue.slice(4);
      let samples = hexValue.match(/.{1,8}/g); // Split into chunks
      processSamples(samples); // Process these samples (implement processSamples)
      console.log('Long Hex value:' + hexValue + ' '+ hexValue.length);
      let hexHR = hexValue.slice(-4)
      //console.log(hexHR)
      let nibbles = hexHR.match(/.{1,2}/g);
      let bigEndian =  nibbles[1] + nibbles[0];
      let HRvalue = (parseInt(bigEndian, 16))/256
      HRvalue = Math.round(HRvalue)
      console.log("HR stream: "+HRvalue)
      setHR(HRvalue)
      setTestHR(HRvalue)
      //console.log('Hex value:', hexValue);
    } 
    else if (stringValue.includes(',')) {
      // Handle data with commas (e.g., CSV-like data)
      splitIdentifier = stringValue.split(',');
      handleIdentify(splitIdentifier); // Implement handleIdentify function to manage the parsed data
      
      console.log('String value:', stringValue);
    } else if (stringValue.includes(':')) {
      // Handle data with a time-based format
      console.log('Clock:', stringValue);
    } else {
      console.log('Unknown format:', stringValue);
    }
  };

  // Placeholder function to process samples

  const pushValue = (array, length, value) => {
    if (array.length >= length) {
      array.shift();
    }
    array.push(value);
  };

  const NoiseReducedRunningAvg = (oldValue, newValue) => {
    let exclusionThresh = 0.4;
    let newWeight = 0.2;

    let exclusionDiff = oldValue * exclusionThresh;
    let diff = oldValue - newValue;
    let absDiff = Math.abs(diff);

    if (absDiff > exclusionDiff) {
      return oldValue;
    }

    let weightedOld = (1 - newWeight) * oldValue;
    let weightedNew = newWeight * newValue;

    return Math.round(weightedNew + weightedOld);
  };

  const advanceHRTime = () => {
    for (let i = 0; i < butterbandLen; i++) {
      butterbandX[i] = butterbandX[i + 1];
      butterbandY[i] = butterbandY[i + 1];
    }
  };

  const advanceRespTime = () => {
    for (let i = 0; i < respFiltLen; i++) {
      respFiltX[i] = respFiltX[i + 1];
      respFiltY[i] = respFiltY[i + 1];
    }
  };

  const HRNextY = newX => {
    advanceHRTime();

    // Set the current input
    butterbandX[butterbandLen] = newX * butterbandGain;

    // Start calculating the new output
    butterbandY[butterbandLen] =
      butterbandCoeffs.b[0] * butterbandX[butterbandLen];
    //console.log(y[len])

    if (butterbandLen === 0) {
      return butterbandY[butterbandLen];
    }

    // Calculate the new output based on previous inputs and outputs
    for (let i = 1; i < butterbandLen + 1; i++) {
      butterbandY[butterbandLen] +=
        butterbandCoeffs.b[i] * butterbandX[butterbandLen - i] -
        butterbandCoeffs.a[i] * butterbandY[butterbandLen - i];
      //console.log( this.butterbandY[this.butterbandLen])
    }

    // Adjust by initial coefficient
    butterbandY[butterbandLen] =
      butterbandY[butterbandLen] / butterbandCoeffs.a[0];

    // Return the current filtered output
    return butterbandY[butterbandLen];
  };

  const RespNextY = newX => {
    advanceRespTime();

    // Set the current input
    respFiltX[respFiltLen] = newX * respFiltGain;

    // Start calculating the new output
    respFiltY[respFiltLen] = respFiltCoeffs.b[0] * respFiltX[respFiltLen];
    //console.log(y[len])

    if (respFiltLen === 0) {
      return respFiltY[respFiltLen];
    }

    // Calculate the new output based on previous inputs and outputs
    for (let i = 1; i < respFiltLen + 1; i++) {
      respFiltY[respFiltLen] +=
        respFiltCoeffs.b[i] * respFiltX[respFiltLen - i] -
        respFiltCoeffs.a[i] * respFiltY[respFiltLen - i];
    }

    // Adjust by initial coefficient
    respFiltY[respFiltLen] = respFiltY[respFiltLen] / respFiltCoeffs.a[0];

    // Return the current filtered output
    return respFiltY[respFiltLen];
  };

  const doUpdate = () => {
    if (updateCounter >= 26) {
      updateCounter = 0;
      return true;
    }
    updateCounter = updateCounter + 1;
    return false;
  };

  const processSamples = samples => {
    let sampleLength = 8;
    let data = [];
    let debugObj = {
      values: '',
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    };
    let filteredArray = [];
    //console.log("Unfiltered: "+samples)
    //console.log('packet: ' + samples);
    let samplesCopy = samples.slice();
    //this.sampleQueue = [];
    //console.log("Filtered: "+samplesCopy)
    // console.log("in function sample length: "+samplesCopy.length)

    for (let i = 0; i < samplesCopy.length; i++) {
      //console.log(sample)
      let sample = samplesCopy[i];

      if (sample != '00000000' && sample.length == sampleLength) {
        let nibbles = sample.match(/.{1,2}/g);
        let bigEndian = nibbles[3] + nibbles[2] + nibbles[1] + nibbles[0];
        let PPGValue = HRNextY(parseInt(bigEndian, 16));
        let respValue = RespNextY(parseInt(bigEndian, 16));
        //console.log("Translation: "+sample+" "+PPGValue)
        let invPPGValue = PPGValue * -1;
        let invRespValue = respValue * -1;
        //console.log("PPG: "+PPGValue)
        //console.log("resp: "+respValue)
        pushValue(ppgPeakBuffer, 100, invPPGValue);
        pushValue(respPeakBuffer, 300, invRespValue);

        pushValue(ppgGraphBuffer, 100, PPGValue);
        pushValue(respGraphBuffer, 100, respValue);

        //console.log("Buffer Length:" + ppgGraphBuffer.length)

        let graphPayload = [
          {data: ppgGraphBuffer, color: 'rgba(0, 190, 42, 1)'},
          //{ data: respGraphBuffer, color: 'rgba(255, 139, 2, 1)' },
        ];
        if (doUpdate()) {
          setGraphData(graphPayload);
        }
        //this.props.thresholdCheck(PPGValue, respValue, 0, 0);
        //console.log('Sample number: ' + i + ' Sample: ' + sample);
        /*
          setTimeout( () => {
            this.props.thresholdCheck(PPGValue, 0, 0, 0);
            console.log("Timeout number: "+i+" Sample: "+sample)
            //this.sampleQueue.shift()
            //console.log("Queue: "+this.sampleQueue)
            //console.log(this.sampleQueue.length)
          }, i*15)
          */
      }
    }
    //console.log(ppgPeakBuffer)
    let realTimeHR = findRealTimeHR(ppgPeakBuffer).HR;
    let realTimeHRV = findRealTimeHR(ppgPeakBuffer).HRV;
    let realTimeResp = findRealTimeResp(respPeakBuffer);

    let smoothedHR = NoiseReducedRunningAvg(HR, realTimeHR);
    let smoothedHRV = NoiseReducedRunningAvg(HRV, realTimeHRV);
    //console.log(realTimeHR);

    //setHR(smoothedHR);
    setHRV(smoothedHRV);
    //setTestHR(realTimeHR);
    setTestHRV(realTimeHRV);

    //console.log("HR: "+realTimeHR)
    /*
    this.setState({
      HR: smoothedHR,
      HRV: smoothedHRV,
      testHR: realTimeHR,
      testHRV: realTimeHRV,
      resp: realTimeResp,
    });
    */
  };

  // Placeholder function to handle identify logic

  





  const handleIdentify = splitIdentifier => {
    console.log('Handling identify:', splitIdentifier);
    let identifier = splitIdentifier[0];
    if (identifier == 0) {
      let batteryValue = (splitIdentifier[1] / 4095.0) * 3.6 * 2;
      setBatteryPercentage(Math.round(batteryValue * 100) / 100);
    }
    if (identifier == 2) {
      let framIdentifier = splitIdentifier[1]
      if(framIdentifier == 8){
        console.log("Time Received: "+splitIdentifier[2])
        dataStartTime.current = new Date(splitIdentifier[2]*1000)
        let currentTime = Math.floor(new Date().getTime()/1000)
        console.log("Time Sent: "+currentTime)
        sendMessage("data_sync,"+currentTime)
    }
  }
    // Add logic here to handle the identified data
  };

  const startSync = () => {
    let currentTime = Math.floor(new Date().getTime()/1000)
    console.log("Time Sent: "+currentTime)
    sendMessage('fram,1,8')
    console.log('Sync Pressed')
  }

  const batteryPoll = () => {
    if (syncTimeoutRef.current) {
      console.log('Sync in progress, skipping battery poll');
      return;
    }

    console.log('Polling battery status...');
    sendMessage('battery');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      batteryPoll();
    }, 300000); // Poll battery every 5 mins

    return () => clearInterval(interval);
  }, []);

  const handleDFUUpdate = async () => {
    setDfuStatus('Sending DFU command...');
    
    // Use the existing sendMessage function to write the "enter_dfu" command.
    if (deviceRef.current) {
      try {
        // sendMessage appends a newline automatically
        await sendMessage('enter_dfu');
        console.log('DFU command sent');
        setDfuStatus('DFU command sent. Disconnecting...');
      } catch (error) {
        console.error('Error sending DFU command:', error);
        setDfuStatus('Error sending DFU command');
        return;
      }
      try {
        await BleManager.disconnect(deviceRef.current.id);
        console.log('Disconnected after DFU command');
      } catch (error) {
        console.error('Error disconnecting:', error);
      }
    } else {
      console.error('No device connected');
      setDfuStatus('No device connected');
      return;
    }
  
    // Wait for the device to reboot into DFU mode.
    setDfuStatus('Waiting for DFU mode...');
    await new Promise(resolve => setTimeout(resolve, 5000));
  
    // Scan for DFU target (a device advertising "DFUTarg")
    setDfuStatus('Scanning for DFU target...');
    let dfuTargetDevice = null;
    const scanListener = DeviceEventEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      (peripheral) => {
        const deviceName = peripheral.name || peripheral.localName;
        if (deviceName && deviceName.includes('DfuTarg')) {
          dfuTargetDevice = peripheral;
          console.log('Found DFU target device:', peripheral);
          BleManager.stopScan();
          scanListener.remove();
          proceedDFU(dfuTargetDevice.id);
        }
      }
    );
  
    BleManager.scan([], 10, true)
      .then(() => {
        console.log('Started scanning for DFU target');
      })
      .catch(error => {
        console.error('Error starting scan for DFU target:', error);
        setDfuStatus('Error scanning for DFU target');
      });
  
    // In case the DFU target is not found, stop scanning after 10 seconds.
    setTimeout(() => {
      BleManager.stopScan();
      if (!dfuTargetDevice) {
        console.error('DFU target not found');
        setDfuStatus('DFU target not found');
        scanListener.remove();
      }
    }, 20000);
  };
  
  const proceedDFU = async (dfuTargetId) => {
    setDfuStatus('Starting DFU update...');
    const dfuPath = `file://${firmwareFilePath}`;
    try {
      const result = await NordicDFU.startDFU({
        deviceAddress: dfuTargetId,
        filePath: dfuPath,
        // Optionally add a device name or other options if required:
        // name: "Your Device Name"
      });
      console.log('DFU update successful:', result);
      setDfuStatus('DFU update successful!');
    } catch (error) {
      console.error('DFU update failed:', error);
      setDfuStatus('DFU update failed!');
    }
  };
  // --- End of DFU Update Flow ---

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <LinearGradient
          colors={['#0f3d3e', '#232323']}
          start={{x: 0, y: 0}}
          end={{x: 0.8, y: 1}}
          style={styles.LinearView}>
          <Header title="byteGuard" />
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.04)', 'rgba(255, 255, 255, 0.02)']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.deviceInfoContainer}>
            <View style={styles.deviceInfoContainerImage}>
              <View style={styles.imageBackground}>
                <Image source={teethLogo} style={styles.teethlogo} />
              </View>
              <View>
                <Text style={styles.deviceName}>byteGuard</Text>
                <View style={styles.syncTextView}>
                  <Text style={styles.syncText} onPress={startSync}>{syncInProgress ? 'Syncing...':'Sync'}</Text>
                </View>
              </View>
            </View>
            <View style={styles.hr} />
            <View style={styles.statusContainer}>
              <View style={styles.statusBox}>
                <Text style={styles.statusText}>Status</Text>
                <View style={styles.statusIconView}>
                  <Image source={connectedIcon} style={styles.statusIcon} />
                  <Text style={styles.statusTextBold}>
                    {isConnected ? 'Connected' : 'Disconnected'}
                  </Text>
                </View>
              </View>
              <View style={styles.vr} />
              <View style={styles.statusBox}>
                <Text style={styles.statusText}>Battery</Text>
                <View style={styles.statusIconView}>
                  <Image source={batteryIcon} style={styles.statusIcon} />
                  <Text style={styles.statusTextBold}>{batteryPercentage}</Text>
                </View>
              </View>
            </View>
          </LinearGradient>

          {/* Live Data Section */}
        </LinearGradient>
        <View style={styles.liveDataContainer}>
          <Text style={styles.liveDataText}>Live Data</Text>
          {/* Simulated graph */}
          <View style={styles.graphContainer}>
            <GraphComponentMultiple datasets={graphData} xAxisData={xAxisData} />
          </View>

          {/* Heart Rate, HRV, RR */}
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.04)', 'rgba(255, 255, 255, 0.02)']}
            start={{x: 0, y: 0}}
            end={{x: 0.8, y: 1}}
            style={styles.metricsContainer}>
            <View style={styles.metricBox}>
              <Text style={styles.metricTitle}>Heart Rate</Text>
              <View style={styles.metricInnerBox}>
                <Text style={styles.metricValue}>{HR}</Text>

                {MySvgComponent()}
                <Text style={styles.metricValue}>{testHR}</Text>
              </View>
            </View>
            <View style={styles.vrNew} />

            <View style={styles.metricBox}>
              <Text style={styles.metricTitle}>HRV</Text>
              <View style={styles.metricInnerBox}>
                <Text style={styles.metricValue}>{HRV}</Text>

                {MySvgComponent()}
                <Text style={styles.metricValue}>{testHRV}</Text>
              </View>
            </View>
            <View style={styles.vrNew} />
            <View style={styles.metricBox}>
              <Text style={styles.metricTitle}>RR</Text>
              <Text style={styles.metricValue}>0</Text>
            </View>
          </LinearGradient>
          <View style={styles.buttonContainer}>
            <LinearGradient
              colors={[
                'rgba(255, 255, 255, 0.04)',
                'rgba(255, 255, 255, 0.02)',
              ]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.button}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ProfileScreen');
                }}>
                {disccountComponent()}
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ProfileScreen');
                }}>
                <Text style={styles.buttonText}>Disconnect</Text>
              </TouchableOpacity>
            </LinearGradient>
            <TouchableOpacity style={styles.button}>
              {calibrate()}
              <Text style={styles.buttonTextCalibrate}>Calibrate</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleDFUUpdate}>
              <Text style={styles.buttonText}>Update Firmware</Text>
            </TouchableOpacity>
            {dfuStatus ? (
              <View style={styles.dfuStatusContainer}>
                <Text style={styles.dfuStatusText}>{dfuStatus}</Text>
              </View>
              ) : null}
          </View>
        </View>

        {/* Buttons */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  LinearView: {
    padding: 0,
    margin: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#232323',
    // paddingHorizontal: 16,
  },
  scrollContent: {
    flexGrow: 1,
    // paddingBottom: 20,
    // paddingHorizontal: 20,
  },
  deviceInfoContainer: {
    // marginTop: 20,
    paddingTop: 16,
    paddingBottom: 16,
    margin: 16,
    borderRadius: 20,
  },
  deviceInfoContainerImage: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 16,
    // backgroundColor:'red',
    padding: 16,
  },
  statusContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 16,
    // backgroundColor:'red',
    padding: 16,
    marginTop: 16,
  },
  deviceBox: {
    alignItems: 'center',
  },
  teethlogo: {
    width: 102,
    height: 57,
  },
  deviceName: {
    color: '#FFF',
    fontFamily: 'Ubuntu',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  syncText: {
    color: '#27FFE9',
    fontFamily: 'Ubuntu',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 14,
  },
  hr: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    height: 0.5,
  },
  syncTextView: {
    marginTop: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.10)',
    textAlign: 'center',
    borderRadius: 53,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -5,
  },
  imageBackground: {
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.10)',
    paddingHorizontal: 5,
    maxWidth: 110,
    maxHeight: 69,
  },
  statusBox: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginRight: 20,
    // backgroundColor:'red'
  },
  statusIconView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  statusText: {
    color: 'rgba(255, 255, 255, 0.70)',
    fontSize: 14,
    fontWeight: '400',
  },
  vr: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    height: 24,
    marginRight: 40,
  },
  vrNew: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    height: 24,
    // marginRight: 40,
  },
  statusTextBold: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '400',
  },
  statusIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  batteryText: {
    color: '#FFF',
    fontFamily: 'Ubuntu',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 12,
  },
  liveDataContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  liveDataText: {
    color: '#FFF',
    fontFamily: 'Ubuntu',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
    marginBottom: 10,
  },
  graphContainer: {
    // height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  metricInnerBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  graphText: {
    color: '#FFF',
    fontFamily: 'Ubuntu',
    fontSize: 14,
    fontWeight: '400',
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 5,
    paddingVertical: 20,
    paddingHorizontal: 20,
    gap: 10,
    borderRadius: 12,
  },
  metricBox: {
    alignItems: 'center',
  },
  metricTitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: 'Ubuntu',
    fontSize: 14,
    fontWeight: '400',
    // lineHeight: 14,
  },
  metricValue: {
    color: '#FFF',
    fontFamily: 'Ubuntu',
    fontSize: 14,
    fontWeight: '400',

    // lineHeight: 12,
    // marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    height: 48,
    backgroundColor: '#2B2D2E',
    borderRadius: 10,
    gap: 8,
  },
  buttonText: {
    color: '#27FFE9',
    fontFamily: 'Ubuntu',
    fontSize: 14,
    fontWeight: '400',
    // lineHeight: 12,
  },
  buttonTextCalibrate: {
    color: '#FFF',
    fontFamily: 'Ubuntu',
    fontSize: 14,
    fontWeight: '400',
    // lineHeight: 12,
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
  dfuStatusContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  dfuStatusText: {
    color: '#27FFE9',
    fontFamily: 'Ubuntu',
    fontSize: 14,
  },
});

const SERVICEUUID = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
const characteristicWUUID = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';
const characteristicNUUID = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';

export default DeviceDataScreen;
