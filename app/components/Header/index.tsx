import React, { Component, isValidElement, ReactNode } from 'react';
import { Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
// import Entypo from 'react-native-vector-icons/Entypo';

import { deviceWidth, getStatusHeight } from '../../utils/screenUtil';
import * as theme from '../../config/theme.conf';
import Global from '../../utils/Global';
import { MNavigation } from '../../../index';

/* header组件的默认高度 */
const HEADER_HEIGHT = 44;

/* 状态栏的高度 */
export const STATUSBAR_HEIGHT = getStatusHeight();

interface HeaderProps {
  headerInit: Function;
  onBack: Function;
  headerStyle: any;
  navigation: MNavigation.navigationTypes;
  backButtonColor: string;

  absolute: boolean;
  opacity: number;
  leftButton: ReactNode;
  rightButton: ReactNode;
  title: string | ReactNode;
  isRenderHeader: boolean;
  headerTintColor: string;
  isBack: boolean;
}

/**
 * 页面header 公用组件类
 */
class Header extends Component<HeaderProps> {
  static defaultProps = {
    headerInit: () => {},
    headerStyle: {
      backgroundColor: theme.NAVBAR_BG_COLOR,
      barStyle: 'dark-content',
      statusBarBackground: 'white',
      backButtonColor: '#fff',
    },
    opacity: 1,
    title: '',
    isRenderHeader: true,
    headerTintColor: '#333',
    isBack: true,
  };

  componentWillMount() {
    const { headerInit } = this.props;

    headerInit(this.props.navigation);
  }

  /**
   * 返回方法
   * @return {void}
   */
  goBack = () => {
    const { onBack } = this.props;
    if (onBack) {
      onBack(this.props.navigation);
    } else {
      // this.props.navigation.goBack();
      this.props.navigation.dispatch(NavigationActions.back());
    }
  };

  /**
   * 返回按钮
   * @return {Node}
   */
  backButton = () => {
    // const { backButtonColor } = this.props;

    return (
      <TouchableOpacity onPress={this.goBack} style={styles.backButton}>
        {/*<Entypo name='chevron-thin-left' color={backButtonColor} size={22}/>*/}
      </TouchableOpacity>
    );
  };

  render() {
    let {
      absolute,
      opacity = 1,
      leftButton,
      rightButton,
      title = '',
      isRenderHeader = true,
      headerTintColor = '#333',
      headerStyle: {
        // @ts-ignore
        backgroundColor = theme.NAVBAR_BG_COLOR,
        barStyle = 'dark-content',
        statusBarBackground = backgroundColor,
        ...otherHeaderStyle
      },
      isBack = true,
    } = this.props;

    if (leftButton === null) {
      leftButton = <View />;
    } else {
      if (!leftButton && isBack) {
        leftButton = this.backButton();
      }
    }

    // backgroundColor & translucent 属性只用于android平台(所以这里未判断 android | ios)
    if (
      backgroundColor === 'white' &&
      statusBarBackground === 'white' &&
      parseFloat(Global.PHONE_SYSTEM_VERSION) < 6.0
    ) {
      statusBarBackground = theme.STATUS_BAR_BG_COLOR;
    }

    const headerStyle = {
      position: 'relative',
      zIndex: 100000,
      width: deviceWidth,
      ...otherHeaderStyle,
    };

    if (absolute) {
      headerStyle.marginBottom = 0 - HEADER_HEIGHT - STATUSBAR_HEIGHT;
    }

    return isRenderHeader ? (
      <View style={headerStyle}>
        <View
          style={[
            styles.headerBackground,
            {
              backgroundColor,
              opacity,
            },
          ]}
        />
        <StatusBar
          animated={Platform.OS === 'ios'}
          backgroundColor={statusBarBackground}
          translucent={parseFloat(Global.PHONE_SYSTEM_VERSION) >= 6.0}
          barStyle={barStyle}
        />
        <View style={styles.headerBody}>
          <View style={styles.headerLeft}>{typeof leftButton === 'function' ? leftButton() : leftButton}</View>
          {isValidElement(title) ? (
            title
          ) : (
            <Text style={[styles.headerTitle, { color: headerTintColor }]}>{title}</Text>
          )}
          <View style={styles.headerRight}>{typeof rightButton === 'function' ? rightButton() : rightButton}</View>
        </View>
      </View>
    ) : (
      <StatusBar
        animated={Platform.OS === 'ios'}
        backgroundColor={statusBarBackground}
        translucent={parseFloat(Global.PHONE_SYSTEM_VERSION) >= 6.0}
        barStyle={barStyle}
      />
    );
  }
}

/**
 * navigationOptions 配置中生成header组件的函数
 * @param  {Object} options header配置参数
 * @return {function}       生成header组件的函数
 */
export default (options: any) => (props: any) => {
  const { navigation } = props;

  return <Header {...options} navigation={navigation} />;
};

const styles = StyleSheet.create({
  headerBody: {
    width: deviceWidth,
    height: HEADER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: STATUSBAR_HEIGHT,
    left: 0,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '500',
    backgroundColor: 'transparent',
  },
  headerLeft: {
    position: 'absolute',
    zIndex: 100,
    top: 0,
    left: 0,
    height: HEADER_HEIGHT,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  headerRight: {
    position: 'absolute',
    zIndex: 100,
    top: 0,
    right: 10,
    height: HEADER_HEIGHT,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  headerBackground: {
    height: HEADER_HEIGHT + STATUSBAR_HEIGHT,
  },
  backButton: {
    width: 42,
    height: HEADER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
