import React, {Component} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {px} from '../utils/ScreenUtil';

const checkboxImg = {
  square: {
    true: require('../assets/images/common/checked.png'),
    false: require('../assets/images/common/no-check.png'),
  },
  circle: {
    true: require('../assets/images/common/arrow-selected.png'),
    false: require('../assets/images/common/arrow-NoSelected.png'),
  },
};

export default class Checkbox extends Component {
  render() {
    const {
      checked = false,
      size = 34,
      onChange = () => {},
      type = 'square',
      ...otherProps
    } = this.props;
    // console.log(checked);
    return (
      <TouchableOpacity onPress={() => onChange(!checked)} {...otherProps}>
        <Image
          source={checkboxImg[type][checked]}
          style={{
            width: px(size),
            height: px(size),
          }}
        />
      </TouchableOpacity>
    );
  }
}
