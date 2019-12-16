/**
 * Create by chengkai on 2019/9/26.
 * Describe:
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 0, 255, 0.3)',
  },
});

interface PropTypes {
  navigation: {
    goBack: Function;
  };
}

export default class ModalNav extends React.Component<PropTypes> {
  render() {
    return (
      <View style={styles.container}>
        <Text onPress={() => this.props.navigation.goBack()}>ModalNav</Text>
      </View>
    );
  }
}
