/**
 * Created by chengkai on 2018/2/1.
 */

import React, { Component } from 'react';
import { ImageStyle, Keyboard, TouchableWithoutFeedback } from 'react-native';

interface DismissKeyboardTouchableProps {
  style?: ImageStyle;
}

export default class DismissKeyboardTouchable extends Component<DismissKeyboardTouchableProps> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  /**
   * 收起键盘
   */
  keyboardHide = () => {
    Keyboard.dismiss();
  };

  render() {
    let { children = null, style = null } = this.props;
    return (
      <TouchableWithoutFeedback onPress={this.keyboardHide} style={style}>
        {children}
      </TouchableWithoutFeedback>
    );
  }
}
