/**
 * Create by chengkai on 2019/6/26.
 * Describe:
 */

import { Platform } from 'react-native';

export const isAndroid: boolean = Platform.OS === 'android';
export const isIOS: boolean = Platform.OS === 'ios';

export const platformSelect = <T>(specifics: { ios: T; android: T }): T => {
  return Platform.select(specifics);
};
