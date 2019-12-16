// @ts-no
import React, { Component } from 'react';
import { Image, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { px } from '../../utils/screenUtil';

interface CheckboxImgType {
  square: { true: ImageSourcePropType; false: ImageSourcePropType };
  circle: { true: ImageSourcePropType; false: ImageSourcePropType };
}

enum CheckboxImgTypeEnum {
  square = 'square',
  circle = 'circle',
}

const checkboxImg: CheckboxImgType = {
  [CheckboxImgTypeEnum.square]: {
    true: require('../assets/images/common/checked.png'),
    false: require('../assets/images/common/no-check.png'),
  },
  [CheckboxImgTypeEnum.circle]: {
    true: require('../assets/images/common/arrow-selected.png'),
    false: require('../assets/images/common/arrow-NoSelected.png'),
  },
};

interface CheckboxProps {
  checked: boolean;
  size: number;
  onChange: Function;
  type: CheckboxImgTypeEnum;
}

export default class Checkbox extends Component<CheckboxProps> {
  render() {
    const { checked = false, size = 34, onChange = () => {}, type = 'square', ...otherProps } = this.props;
    // console.log(checked);
    return (
      <TouchableOpacity onPress={() => onChange(!checked)} {...otherProps}>
        <Image
          source={checkboxImg[type][checked ? 'true' : 'false']}
          style={{
            width: px(size),
            height: px(size),
          }}
        />
      </TouchableOpacity>
    );
  }
}
