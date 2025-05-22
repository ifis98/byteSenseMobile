import RNFS from 'react-native-fs';
import {backendLink} from '../api/api';

export const firmwareFileName = 'latest_firmware.zip';
export const firmwareFilePath = `${RNFS.DocumentDirectoryPath}/${firmwareFileName}`;

export const downloadLatestFirmware = async () => {
  try {
    const result = await RNFS.downloadFile({
      fromUrl: `${backendLink}currentfirmware`,
      toFile: firmwareFilePath,
    }).promise;
    console.log('Firmware download result:', result);
    return firmwareFilePath;
  } catch (error) {
    console.error('Error downloading firmware:', error);
    throw error;
  }
};
