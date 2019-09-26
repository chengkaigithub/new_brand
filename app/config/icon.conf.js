import React from 'react';
import {ImageBackground, Platform, StyleSheet} from 'react-native';
import DeviceInfo from 'react-native-device-info';

import {px} from '../utils/ScreenUtil';

/**
 * 根据图标类型和状态获取图标
 * @param  {String} field 图标类型
 * @param  {Boolean} state 选中状态
 * @return {String}  图标
 */
export const getIcon = (type, state) => {
  return state ? iconList[type][0] : iconList[type][1];
};

/* 图标列表：0为选中，1位未选中 */
const iconList = {
  payment: [
    require('../assets/images/common/payment-tab-on.png'),
    require('../assets/images/common/payment-tab-off.png'),
  ], // 收款
  home: [
    require('../assets/images/common/home-tab-on.png'),
    require('../assets/images/common/home-tab-off.png'),
  ], // 消息
  cooperative: [
    require('../assets/images/common/gas-tab-on.png'),
    require('../assets/images/common/gas-tab-off.png'),
  ], // 发现
  personal: [
    require('../assets/images/common/personal-tab-on.png'),
    require('../assets/images/common/personal-tab-off.png'),
  ], // 我的
};

/**
 * 获取首页tab图标
 * @param  {String} type        图标标识
 * @param  {Boolean} focused    是否选中
 * @param  {String} tintColor   颜色
 * @return {ReactComponent}     图标组件
 */
export const getTabIcon = (
  type,
  {focused, tintColor},
  num,
  isShowRedPoint = false,
) => {
  let tabStyle = '';
  if (type === 'home') {
    tabStyle = styles.home;
  }
  if (type === 'payment') {
    tabStyle = styles.payment;
  }
  if (type === 'cooperative') {
    tabStyle = styles.cooperative;
  }
  if (type === 'personal') {
    tabStyle = styles.personal;
  }
  return <ImageBackground source={getIcon(type, focused)} style={tabStyle} />;
};

const styles = StyleSheet.create({
  home: {
    height: px(38),
    width: px(42),
    marginTop:
      Platform.OS === 'ios' &&
      DeviceInfo.getSystemVersion().split('.')[0] === '10'
        ? 12
        : 0,
  },
  payment: {
    width: px(38),
    height: px(38),
    marginTop:
      Platform.OS === 'ios' &&
      DeviceInfo.getSystemVersion().split('.')[0] === '10'
        ? 12
        : 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    overflow: 'visible',
  },
  cooperative: {
    width: px(42),
    height: px(38),
    marginTop:
      Platform.OS === 'ios' &&
      DeviceInfo.getSystemVersion().split('.')[0] === '10'
        ? 12
        : 0,
  },
  personal: {
    width: px(38),
    height: px(44),
    marginTop:
      Platform.OS === 'ios' &&
      DeviceInfo.getSystemVersion().split('.')[0] === '10'
        ? 12
        : 0,
  },
  messageCount: {
    position: 'absolute',
    top: px(-8),
    left: px(30),
    minWidth: px(16),
    height: px(16),
    backgroundColor: '#E70103',
    borderRadius: px(8.5),
    overflow: 'hidden',
    paddingTop: px(3),
    paddingBottom: px(3),
    paddingLeft: px(6),
    paddingRight: px(6),
    fontSize: px(20),
    color: '#fff',
    textAlign: 'center',
  },
});
