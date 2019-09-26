/**
 * Create by chengkai on 2019/9/26.
 * Describe: 全局对象存储
 */

import DeviceInfo from 'react-native-device-info';
import {Platform} from 'react-native';

export default {
  VERSION_CODE: DeviceInfo.getVersion(),
  PHONE_IMEI: DeviceInfo.getUniqueIdSync() /* 当前手机的唯一标识 */,
  PHONE_SYSTEM_VERSION: DeviceInfo.getSystemVersionSync() /* 当前手机系统版本 */,
  packageName: DeviceInfo.getBundleId(),
  platform: Platform.OS,
  isAndroid: Platform.OS.toLowerCase() === 'android',
  isIOS: Platform.OS.toLowerCase() === 'ios',
  locationData: null, // 定位信息
  loginInfo: {
    loginStatus: false,
    GASAPP_TOKEN: undefined,
    userId: undefined,
    userNo: undefined,
    userName: undefined,
    headImageUrl: undefined,
  },
};
