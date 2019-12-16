import React from 'react';
import { ImageBackground, StyleSheet, ViewStyle } from 'react-native';

import { px } from '../utils/screenUtil';

enum IconType {
  payment = 'payment',
  home = '',
  cooperative = 'cooperative',
  personal = 'personal',
}

/* 图标列表：0为选中，1位未选中 */
const iconList = {
  // 收款
  [IconType.payment]: [
    require('../assets/images/common/payment-tab-on.png'),
    require('../assets/images/common/payment-tab-off.png'),
  ],
  // 消息
  [IconType.home]: [
    require('../assets/images/common/home-tab-on.png'),
    require('../assets/images/common/home-tab-off.png'),
  ],
  // 发现
  [IconType.cooperative]: [
    require('../assets/images/common/gas-tab-on.png'),
    require('../assets/images/common/gas-tab-off.png'),
  ],
  // 我的
  [IconType.personal]: [
    require('../assets/images/common/personal-tab-on.png'),
    require('../assets/images/common/personal-tab-off.png'),
  ],
};

/**
 * 根据图标类型和状态获取图标
 * @param  {IconType} type 图标类型
 * @param  {Boolean} state 选中状态
 * @return {String}  图标
 */
export const getIcon = (type: IconType, state: boolean) => {
  return state ? iconList[type][0] : iconList[type][1];
};

/**
 * 获取首页tab图标
 * @param  {String} type        图标标识
 * @param  {Boolean} focused    是否选中
 * @return {ReactComponent}     图标组件
 */
export const getTabIcon = (type: IconType, { focused }: { focused: boolean }) => {
  let tabStyle: ViewStyle = {};
  if (type === IconType.home) {
    tabStyle = styles.home;
  }
  if (type === IconType.payment) {
    tabStyle = styles.payment;
  }
  if (type === IconType.cooperative) {
    tabStyle = styles.cooperative;
  }
  if (type === IconType.personal) {
    tabStyle = styles.personal;
  }
  return <ImageBackground source={getIcon(type, focused)} style={tabStyle} />;
};

const styles = StyleSheet.create({
  home: {
    height: px(38),
    width: px(42),
  },
  payment: {
    width: px(38),
    height: px(38),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    overflow: 'visible',
  },
  cooperative: {
    width: px(42),
    height: px(38),
  },
  personal: {
    width: px(38),
    height: px(44),
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
