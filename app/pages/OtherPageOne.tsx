/**
 * Create by chengkai on 2019/9/26.
 * Describe:
 */

import React, { ComponentType } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import fetch from 'sx-fetch';
import { MNavigation } from '../../index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type PropsType = {
  $fetch: any;
  navigation: MNavigation.navigationTypes;
};

type StateType = {};

interface OtherPageOne {
  props: PropsType;
  state: StateType;
}

@fetch.inject()
class OtherPageOne extends React.Component {
  static navigationOptions = ({ navigation }: MNavigation.navigationOptionsTypes) => {
    // const params = navigation.state.params || {};
    return {
      headerLeft: <Button onPress={() => navigation.goBack()} title='返回' color='#f00' />,
      /* the rest of this config is unchanged */
    };
  };

  constructor(props: any) {
    super(props);
    this.state = {};
    this.props.$fetch
      .get('https://jsonplaceholder.typicode.com/users')
      .then((res: any) => console.log(res))
      .catch((e: Error) => console.log(e));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>OtherPageOne</Text>
      </View>
    );
  }
}

export default OtherPageOne as ComponentType;
