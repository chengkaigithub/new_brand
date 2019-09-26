/**
 * Create by chengkai on 2019/9/26.
 * Describe:
 */

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class HomeTab extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text
          onPress={() => {
            this.props.navigation.navigate('OtherPageOne');
          }}>
          HomeTab
        </Text>

        <Text
          onPress={() => {
            this.props.navigation.navigate('ModalNav');
          }}>
          go to ModalNav
        </Text>
      </View>
    );
  }
}
