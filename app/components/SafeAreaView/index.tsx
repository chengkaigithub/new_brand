/**
 * Create by chengkai on 2019/6/28.
 * Describe:
 */
import React from 'react';
import { SafeAreaView, StyleSheet, ViewStyle } from 'react-native';
import { PAGE_BG_COLOR } from '../../config/theme.conf';
// import {isAndroid} from "../../utils/platformTool";
// import DeviceInfo from 'react-native-device-info';

interface SXSafeAreaViewProps {
  children: JSX.Element;
  style: ViewStyle;
}

export default class SXSafeAreaView extends React.Component<SXSafeAreaViewProps> {
  componentWillMount() {
    // fixme android adapter
    // if (isAndroid && DeviceInfo.hasNotch()) {
    //     SafeAreaView.setStatusBarHeight(
    //         /* Some value for status bar height + notch height */
    //     );
    // }
  }

  render() {
    const { children, style = {}, ...otherProps } = this.props;
    return (
      <SafeAreaView style={[styles.container, style]} {...otherProps}>
        {children}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PAGE_BG_COLOR,
  },
});
