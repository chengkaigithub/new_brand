/**
 * Create by chengkai on 2019/7/1.
 * Describe:
 */

import React from 'react';
import {TouchableOpacity} from 'react-native';

export default class SXTouchableOpacity extends React.Component {
  render() {
    const {children, ...otherProps} = this.props;
    return (
      <TouchableOpacity activeOpacity={0.5} {...otherProps}>
        {children}
      </TouchableOpacity>
    );
  }
}
