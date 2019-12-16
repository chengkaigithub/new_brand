/**
 * 纯数字键盘
 * @author chengkai
 */

import React, { Component } from 'react';
import { Animated, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { deviceWidth, isIphoneX, px } from '../../utils/screenUtil';
import * as theme from '../../config/theme.conf';
import PropTypes from 'prop-types';

const iphoneXSafeAreaBottom = 60;

interface NumberKeyboardProps {
  _ref: ({}) => void;
  initValue: string;
  maxLength: number;
  onInputChange: () => {};
  onConfirmClick: Function;
  onKeyboardDismiss: Function;
}

interface NumberKeyboardState {
  inputResult: string;
  grassTransY: Animated.Value;
  isHideKeyboard: boolean;
  currentAnimatedProgress: number;
}

export default class NumberKeyboard extends Component<NumberKeyboardProps, NumberKeyboardState> {
  static propTypes = {
    onInputChange: PropTypes.func, // 当输入的时候回调
    onConfirmClick: PropTypes.func, // 当点击确认的时候回调
    onKeyboardDismiss: PropTypes.func, // 当键盘关闭(动画结束后回调)
    initValue: PropTypes.string, // 初始值
    maxLength: PropTypes.number, // 小数点前输入的最大长度
  };

  static defaultProps = {
    initValue: '0',
    onInputChange: () => {},
    onConfirmClick: () => {},
    onKeyboardDismiss: () => {},
  };

  state: NumberKeyboardState = {
    inputResult: '',
    grassTransY: new Animated.Value(isIphoneX() ? px(434 + iphoneXSafeAreaBottom) : px(434)),
    isHideKeyboard: true,
    currentAnimatedProgress: isIphoneX() ? px(434 + iphoneXSafeAreaBottom) : px(434),
  };

  componentWillMount() {
    const { _ref = () => {} } = this.props;
    _ref({
      showKeyboard: this._showKeyboard,
      hideKeyboard: this._hideKeyboard,
      toggleKeyboard: this._toggleKeyboard,
      isKeyboardShow: this._isKeyboardShow,
      setKeyboardInnerInputResult: this._setKeyboardInnerInputResult,
    });

    this.setState({
      inputResult: this.props.initValue,
    });

    this.state.grassTransY.addListener(callback => {
      this.setState({
        currentAnimatedProgress: callback.value,
      });
    });
    // this.state.grassTransY.resetAnimation()
  }

  componentWillUnmount() {
    this.state.grassTransY.stopAnimation();
    this.state.grassTransY.removeAllListeners();
  }

  /**
   * 设置 键盘内部 输入的数据
   */
  _setKeyboardInnerInputResult = (inputResult = '') => {
    this.setState({ inputResult: '' + inputResult });
  };

  /**
   * 设置输入的结果
   * @param inputItem
   */
  setInputResult = (inputItem: string, onInputChange: Function, onConfirmClick: Function) => {
    let inputTemp = this.state.inputResult;
    if (inputItem === '.') {
      if (inputTemp.indexOf('.') > -1) {
        return;
      }
      if (inputTemp.length === 0) {
        this.setState({ inputResult: '0.' }, () => {
          onInputChange(this.state.inputResult, inputItem);
        });
      } else {
        this.setState({ inputResult: inputTemp += inputItem }, () => {
          onInputChange(this.state.inputResult, inputItem);
        });
      }
    } else if (inputItem === 'clean') {
      this.setState({ inputResult: '' }, () => {
        onInputChange(this.state.inputResult, inputItem);
      });
    } else if (inputItem === 'delete') {
      if (inputTemp.length === 0) {
        return;
      }
      if (inputTemp.length === 1) {
        this.setState({ inputResult: '' }, () => {
          onInputChange(this.state.inputResult, inputItem);
        });
      } else {
        this.setState({ inputResult: inputTemp.substring(0, inputTemp.length - 1) }, () => {
          onInputChange(this.state.inputResult, inputItem);
        });
      }
    } else if (inputItem === '00') {
      let pointIndex = inputTemp.indexOf('.');
      if (pointIndex > -1) {
        let tempLength = inputTemp.substring(pointIndex + 1, inputTemp.length).length;
        if (tempLength === 2) {
          return;
        }
        if (tempLength === 1) {
          this.setState({ inputResult: inputTemp += '0' }, () => {
            onInputChange(this.state.inputResult, inputItem);
          });
        } else {
          this.setState({ inputResult: inputTemp += inputItem }, () => {
            onInputChange(this.state.inputResult, inputItem);
          });
        }
      } else {
        if (inputTemp.replace('0', '') === '') {
          this.setState({ inputResult: '0' }, () => {
            onInputChange(this.state.inputResult, inputItem);
          });
        } else {
          if (!this.checkMaxLength(inputTemp)) {
            return;
          }
          if (this.isMaxLengthMinusOne(inputTemp)) {
            this.setState({ inputResult: inputTemp += '0' }, () => {
              onInputChange(this.state.inputResult, inputItem);
            });
          } else {
            this.setState({ inputResult: inputTemp += inputItem }, () => {
              onInputChange(this.state.inputResult, inputItem);
            });
          }
        }
      }
    } else if (inputItem === 'confirm') {
      onConfirmClick(this.state.inputResult);
    } else if (inputItem === '0') {
      if (inputTemp.replace('0', '') === '') {
        this.setState({ inputResult: '0' }, () => {
          onInputChange(this.state.inputResult, inputItem);
        });
      } else {
        let pointIndex = inputTemp.indexOf('.');
        if (pointIndex > -1) {
          if (inputTemp.substring(pointIndex + 1, inputTemp.length).length === 2) {
            return;
          }
        }
        if (!this.checkMaxLength(inputTemp)) {
          return;
        }
        this.setState({ inputResult: inputTemp += inputItem }, () => {
          onInputChange(this.state.inputResult, inputItem);
        });
      }
    } else {
      let pointIndex = inputTemp.indexOf('.');
      if (pointIndex > -1) {
        if (inputTemp.substring(pointIndex + 1, inputTemp.length).length === 2) {
          return;
        }
      }
      if (inputTemp === '0') {
        this.setState({ inputResult: inputItem }, () => {
          onInputChange(this.state.inputResult, inputItem);
        });
      } else {
        if (!this.checkMaxLength(inputTemp)) {
          return;
        }
        this.setState({ inputResult: inputTemp += inputItem }, () => {
          onInputChange(this.state.inputResult, inputItem);
        });
      }
    }
  };

  /**
   * 校验输入最大长度
   * @param input
   * @returns {boolean} true:满足最大长度限制
   */
  checkMaxLength = (input = '') => {
    let { maxLength = 5 } = this.props;
    let pointIndex = input.indexOf('.');
    if (pointIndex > -1) {
      // 有小数点
      return true;
    } else {
      // 无小数点
      return input.length < maxLength;
    }
  };

  /**
   * 校验是否等于 输入最大长度-1
   * @param input
   * @returns {boolean} true:等于最大长度-1
   */
  isMaxLengthMinusOne = (input = '') => {
    let { maxLength = 5 } = this.props;
    return input.length === maxLength - 1;
  };

  /**
   * 当按下按键输入内容改变时候
   * @param inputNum
   */
  _onInputChange = (inputNum = '') => {
    let {
      onInputChange = () => {}, // 输入值改变
      onConfirmClick = () => {}, // 点击确定按钮
    } = this.props;

    this.setInputResult(inputNum, onInputChange, onConfirmClick);
  };

  /**
   * 键盘是否正在展示
   * @returns {boolean}
   * @private
   */
  _isKeyboardShow = () => !this.state.isHideKeyboard;

  _toggleKeyboard = () => {
    if (this.state.isHideKeyboard) {
      this._showAnimated();
    } else {
      this._dismissAnimated();
    }
  };

  /**
   * 弹出键盘
   * @private
   */
  _showKeyboard = () => {
    if (this.state.isHideKeyboard) {
      this._showAnimated();
    }
  };

  /**
   * 影藏键盘
   */
  _hideKeyboard = () => {
    if (!this.state.isHideKeyboard) {
      this._dismissAnimated();
    }
  };

  /**
   * 弹出键盘
   * @private
   */
  _showAnimated = () => {
    Animated.timing(this.state.grassTransY, {
      toValue: 0,
      duration: Platform.OS === 'ios' ? 200 : 0,
      // easing: Easing.bezier(0.15, 0.73, 0.37, 1.2)
    }).start(() => {
      this.setState({ isHideKeyboard: false });
    });
  };

  /**
   * 隐藏键盘
   * @private
   */
  _dismissAnimated = () => {
    Animated.timing(this.state.grassTransY, {
      toValue: isIphoneX() ? px(434 + iphoneXSafeAreaBottom) : px(434),
      duration: Platform.OS === 'ios' ? 300 : 0,
      // easing: Easing.bezier(0.15, 0.73, 0.37, 1.2)
    }).start(() => {
      this.setState({ isHideKeyboard: true });
      this.props.onKeyboardDismiss();
    });
  };

  render() {
    return (
      <Animated.View
        style={{
          height: (isIphoneX() ? px(434 + iphoneXSafeAreaBottom) : px(434)) - this.state.currentAnimatedProgress,
          transform: [{ translateY: this.state.currentAnimatedProgress }],
        }}>
        <View style={styles.containerStyle}>
          <View style={{ flex: 3 }}>
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => this._onInputChange('1')}
                style={styles.singleKeyStyle}>
                <Text style={styles.keyTextStyle}>1</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => this._onInputChange('2')}
                style={styles.singleKeyStyle}>
                <Text style={styles.keyTextStyle}>2</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => this._onInputChange('3')}
                style={styles.singleKeyStyle}>
                <Text style={styles.keyTextStyle}>3</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', flex: 1 }}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => this._onInputChange('4')}
                style={[styles.singleKeyStyle, { marginTop: 1 }]}>
                <Text style={styles.keyTextStyle}>4</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => this._onInputChange('5')}
                style={[styles.singleKeyStyle, { marginTop: 1 }]}>
                <Text style={styles.keyTextStyle}>5</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => this._onInputChange('6')}
                style={[styles.singleKeyStyle, { marginTop: 1 }]}>
                <Text style={styles.keyTextStyle}>6</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', flex: 1 }}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => this._onInputChange('7')}
                style={[styles.singleKeyStyle, { marginTop: 1 }]}>
                <Text style={styles.keyTextStyle}>7</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => this._onInputChange('8')}
                style={[styles.singleKeyStyle, { marginTop: 1 }]}>
                <Text style={styles.keyTextStyle}>8</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => this._onInputChange('9')}
                style={[styles.singleKeyStyle, { marginTop: 1 }]}>
                <Text style={styles.keyTextStyle}>9</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', flex: 1 }}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => this._onInputChange('0')}
                style={[styles.singleKeyStyle, { marginTop: 1 }]}>
                <Text style={styles.keyTextStyle}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => this._onInputChange('00')}
                style={[styles.singleKeyStyle, { marginTop: 1 }]}>
                <Text style={styles.keyTextStyle}>00</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => this._onInputChange('.')}
                style={[styles.singleKeyStyle, { marginTop: 1 }]}>
                <Text style={styles.keyTextStyle}>.</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => this._onInputChange('delete')}
              style={[styles.singleKeyStyle, { marginRight: 0 }]}>
              <Image style={styles.deleteKeyStyle} source={require('../assets/images/common/keyboard_clear.png')} />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => this._onInputChange('clean')}
              style={[styles.singleKeyStyle, { marginRight: 0, marginTop: 1, flex: 0.98 }]}>
              <Text style={styles.keyTextStyle}>C</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => this._onInputChange('confirm')}
              style={styles.confirmKeyStyle}>
              <Text style={styles.confirmTextStyle}>确认</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    backgroundColor: '#282638',
    width: deviceWidth,
    height: isIphoneX() ? px(434 + iphoneXSafeAreaBottom) : px(434),
    paddingBottom: isIphoneX() ? px(iphoneXSafeAreaBottom) : 0,
    position: 'absolute',
    bottom: 0,
  },
  singleKeyStyle: {
    flex: 1,
    backgroundColor: '#545759',
    marginRight: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyTextStyle: {
    fontSize: px(48),
    color: theme.COLOR_WHITE,
    textAlign: 'center',
  },
  deleteKeyStyle: {
    width: px(50),
    height: px(36),
  },
  confirmKeyStyle: {
    flex: 1.98,
    backgroundColor: '#fb5b5a',
    justifyContent: 'center',
    marginTop: 1,
  },
  confirmTextStyle: {
    color: theme.COLOR_WHITE,
    fontSize: px(40),
    textAlign: 'center',
  },
});
