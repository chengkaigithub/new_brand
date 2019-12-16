/**
 * 屏幕适配工具类
 */

import { Dimensions, PixelRatio, Platform, StatusBar, StyleSheet } from 'react-native';

import * as theme from '../config/theme.conf';
import Global from './Global';

/* 设备宽度 */
export const deviceWidth: number = Dimensions.get('window').width;

/* 设备高度 */
export const deviceHeight: number = Dimensions.get('window').height;

/* dpr */
export const dpr = PixelRatio.get();

/**
 * 根据基准宽度计算实际像素
 * @param  {Number} width 设计像素
 * @return {Number}       实际像素
 */
export const px = (width: number): number => {
  if (width === 1) {
    return StyleSheet.hairlineWidth;
  }
  return Math.floor((deviceWidth / theme.BASE_WIDTH) * width);
};

export const isMinScreen = (): boolean => deviceWidth === 320;

/* iPhoneX 屏幕大小 */
const X_WIDTH = 375;
const X_HEIGHT = 812;

// iPhoneXR XsMax
const XR_WIDTH = 414;
const XR_HEIGHT = 896;

/**
 * 判断是否为iphoneX
 * @return {boolean}
 */
export const isIphoneX = (): boolean => {
  return (
    (Platform.OS === 'ios' &&
      ((deviceWidth === X_WIDTH && deviceHeight === X_HEIGHT) ||
        (deviceWidth === X_HEIGHT && deviceHeight === X_WIDTH))) ||
    ((deviceHeight === XR_HEIGHT && deviceWidth === XR_WIDTH) ||
      (deviceHeight === XR_WIDTH && deviceWidth === XR_HEIGHT))
  );
};

/**
 * 获取状态栏高度
 * @return {Number} 状态栏高度
 */
export const getStatusHeight = (): number => {
  const STATUS_HEIGHT = isIphoneX() ? theme.X_STATUS_BAR_HEIGHT : theme.STATUS_BAR_HEIGHT;

  /* 状态栏的高度 */
  let STATUSBAR_HEIGHT = (Platform.OS === 'android' ? StatusBar.currentHeight : STATUS_HEIGHT) || 0;

  if (Platform.OS === 'android' && parseInt(Global.PHONE_SYSTEM_VERSION.split('.')[0], 10) < 5) {
    STATUSBAR_HEIGHT = 0;
  }

  return STATUSBAR_HEIGHT;
};
