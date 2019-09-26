import React, {Component} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';

import NavBar from 'react-native-navbar';

import {px} from '../utils/ScreenUtil';
import * as theme from '../config/theme.conf';
// import StatusBar from './StatusBar';
import SearchBar from './SearchBar';

/**
 * 搜索栏作为header
 */
export default class SearchHeader extends Component {
  componentDidMount() {
    StatusBar.setBarStyle('dark-content');
  }

  render() {
    const {
      left,
      placeholder = '搜索',
      children,
      autoFocus = true,
      inputRef,
      ...otherProps
    } = this.props;

    return (
      <View>
        <NavBar
          title={
            <SearchBar
              showCancel={true}
              cancelTextColor="#fff"
              style={{padding: 0, paddingLeft: 10, paddingRight: 10}}
              backgroundColor={theme.NAVBAR_BG_COLOR}
              autoFocus={true}
              {...otherProps}
            />
          }
          statusBar={{style: 'light-content'}}
          containerStyle={{backgroundColor: theme.NAVBAR_BG_COLOR}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.SEARCHBAR_BG_COLOR,
  },
});
