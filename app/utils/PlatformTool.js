/**
 * Create by chengkai on 2019/6/26.
 * Describe:
 */

import {Platform} from 'react-native';

export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';

export const platformSelect = ({ios, android}) =>
  Platform.select({ios, android});
