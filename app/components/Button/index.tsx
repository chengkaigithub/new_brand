import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import { px } from '../../utils/screenUtil';

interface ButtonProps {
  disable?: boolean;
  onClick?: () => void;
  imageUrl?: string;
  style?: ViewStyle;
}

export default class Button extends Component<ButtonProps> {
  render() {
    const {
      children,
      disable,
      onClick = () => {},
      imageUrl = require('../assets/images/common/button-primary.png'),
      style = {},
    } = this.props;

    return (
      <View>
        {disable ? (
          <View style={[styles.buttonDisable, style]}>
            <Text style={styles.buttonText}>{children}</Text>
          </View>
        ) : (
          <TouchableOpacity activeOpacity={0.7} style={[styles.buttonContent, style]} onPress={onClick}>
            {!style.backgroundColor ? (
              <ImageBackground source={imageUrl} style={styles.buttonBg}>
                <Text style={styles.buttonText}>{children}</Text>
              </ImageBackground>
            ) : (
              <View style={styles.buttonBg}>
                <Text style={styles.buttonText}>{children}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContent: {
    height: px(86),
    backgroundColor: 'transparent',
    borderRadius: px(10),
    overflow: 'hidden',
  },
  buttonBg: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: px(86),
  },
  buttonText: {
    fontSize: px(34),
    color: '#fff',
  },
  buttonDisable: {
    justifyContent: 'center',
    alignItems: 'center',
    height: px(86),
    backgroundColor: '#e2e2e2',
    borderRadius: px(10),
    overflow: 'hidden',
  },
});
