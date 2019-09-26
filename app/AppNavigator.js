/**
 * Create by chengkai on 2019/9/26.
 * Describe:
 */
import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import HomeTab from './pages/tabsPage/HomeTab';
import MyTab from './pages/tabsPage/MyTab';
import ModalNav from './pages/ModalNav';
import OtherPageOne from './pages/OtherPageOne';
import OtherPageTwo from './pages/OtherPageTwo';
import {useScreens} from 'react-native-screens';

useScreens();

const TabNavigator = createBottomTabNavigator(
  {
    HomeTab: {screen: HomeTab},
    MyTab: {screen: MyTab},
  },
  {
    initialRouteName: 'HomeTab',
    headerMode: 'none',
    backBehavior: 'none',
    lazy: true,
  },
);

const MainNavigator = createStackNavigator(
  {
    TabNavigator: {
      screen: TabNavigator,
      navigationOptions: ({navigation}) => ({header: null}),
    },
    OtherPageOne: {screen: OtherPageOne},
    OtherPageTwo: {screen: OtherPageTwo},
  },
  {
    headerMode: 'screen',
  },
);

const RootStack = createStackNavigator(
  {
    OtherNavigator: {screen: MainNavigator},
    ModalNav: {screen: ModalNav},
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

export default createAppContainer(RootStack);
