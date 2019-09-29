/**
 * Create by chengkai on 2019/9/26.
 * Describe:
 */
import React from 'react';
import AppNavigator from './AppNavigator';
import SplashScreen from 'react-native-splash-screen';

export default class Root extends React.Component {
  componentDidMount(): void {
    SplashScreen.hide();
  }

  render() {
    return <AppNavigator />;
  }
}
