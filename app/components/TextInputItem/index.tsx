/**
 * Created by chengkai on 2017/11/28.
 */
import React, { Component } from 'react';
import {
  ImageStyle,
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import PropTypes from 'prop-types';
import { px } from '../../utils/screenUtil';
import * as theme from '../../config/theme.conf';
import VerifyCodeButton from '../VerifyCodeButton';
import Image from '../Image';

interface TextInputItemProps {
  isShowVerifiyCode: boolean;
  phoneNo: string;
  verifyCodeUrl: string;
  smsType: string;
  isSendOnRender: boolean;
  isShowPicVerifiyCode: boolean;
  picVerifyCodeUrl: string;
  picVerifyCodeClick: () => {};
  picVerifyCodeStyle: ImageStyle;
  hintTitle: string;
  placeholder: string;
  type?: KeyboardTypeOptions;
  onChangeText: (text: string) => {};
  containerStyle: ViewStyle;
  inputStyle: ViewStyle;
  titleStyle: ViewStyle;
  isShowExpress: symbol;
}

export default class Index extends Component<TextInputItemProps> {
  static propTypes = {
    hintTitle: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    onChangeText: PropTypes.func,
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]) /* 整体样式 */,
    inputStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]) /* 输入框样式 */,
    titleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]) /* 输入框前 提示文本样式 */,
    isShowExpress: PropTypes.bool /* 是否显示 明文/密文 显隐控制器 */,
    isShowVerifiyCode: PropTypes.bool /* 是否显示 验证码 控制器 */,
    isShowPicVerifiyCode: PropTypes.bool /* 是否显示 图形验证码 控制器 */,
    picVerifyCodeUrl: PropTypes.string /* 图形验证码地址 */,
    picVerifyCodeStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]) /* 图形验证码样式(可选) */,
    picVerifyCodeClick: PropTypes.func /* 图形验证码点击事件 */,
    verifyCodeUrl: PropTypes.string /* 获取验证码的接口地址(后续传值使用,如果isShowVerifiyCode==true, 此项需填写) */,
    smsType: PropTypes.string /* 验证码类型(后续传值使用,如果isShowVerifiyCode==true, 此项需填写) */,
    isSendOnRender: PropTypes.bool /* 是否在渲染之后立即获取验证码 */,
  };

  state = {
    isExpress: true /* 密码是否显示明文 */,
  };

  /**
   * 设置输入框内容显影
   */
  setInputVisible = () =>
    this.setState({
      isExpress: !this.state.isExpress,
    });

  /**
   * 渲染明文显示控件
   */
  renderExpress = () => {
    /* 密码显影控制图片 */
    let secureIcon = this.state.isExpress
      ? require('../../assets/images/common/eye_close.png')
      : require('../../assets/images/common/eye_show.png');
    return (
      <TouchableOpacity style={{ padding: px(20) }} onPress={this.setInputVisible}>
        <Image style={styles.expressStyle} resizeMode="contain" source={secureIcon} />
      </TouchableOpacity>
    );
  };

  /**
   *  渲染 验证码组件
   */
  renderVerifiyCode = () => {
    let { isShowVerifiyCode, phoneNo, verifyCodeUrl, smsType, isSendOnRender } = this.props;

    if (!isShowVerifiyCode) return null;

    return (
      <VerifyCodeButton
        isSendOnRender={isSendOnRender}
        verifyCodeUrl={verifyCodeUrl}
        phoneNo={phoneNo}
        smsType={smsType}
      />
    );
  };

  /**
   *  渲染 图形验证码组件
   */
  renderPicVerifiyCode = () => {
    let {
      isShowPicVerifiyCode = false,
      picVerifyCodeUrl = '',
      picVerifyCodeClick = () => {},
      picVerifyCodeStyle = styles.picVerifiyCodeStyle,
    } = this.props;

    if (!isShowPicVerifiyCode) return null;

    return (
      <TouchableOpacity onPress={picVerifyCodeClick}>
        <Image
          resizeMode="contain"
          style={picVerifyCodeStyle}
          source={{ uri: picVerifyCodeUrl, cache: 'force-cache' }}
          defaultSource={require('../../assets/images/common/refresh.png')}
        />
      </TouchableOpacity>
    );
  };

  render() {
    const {
      hintTitle = '',
      placeholder = '',
      type = 'default',
      onChangeText = () => {},
      containerStyle = {},
      inputStyle = {},
      titleStyle = {},
      isShowExpress = false,
      isShowVerifiyCode = false,
      isShowPicVerifiyCode = false,
      ...otherProps
    } = this.props;

    let isExproess = this.state.isExpress;
    let ExpressComponent = isShowExpress ? this.renderExpress() : null;
    let VerifiyCodeComponent = isShowVerifiyCode ? this.renderVerifiyCode() : null;
    let picVerifiyCodeComponent = isShowPicVerifiyCode ? this.renderPicVerifiyCode() : null;

    return (
      <View style={[styles.inputItemStyle, containerStyle]}>
        <Text style={[styles.hintTitleStyle, titleStyle]}>{hintTitle}</Text>
        <TextInput
          style={[styles.textInputStyle, { marginLeft: hintTitle === '' ? 0 : px(30) }, inputStyle]}
          onChangeText={text => onChangeText(text)}
          clearButtonMode="while-editing"
          underlineColorAndroid="transparent"
          placeholderTextColor={theme.GRAY_FONT_COLOR}
          placeholder={placeholder}
          keyboardType={type}
          secureTextEntry={isShowExpress && isExproess}
          {...otherProps}
        />
        {ExpressComponent}
        {VerifiyCodeComponent}
        {picVerifiyCodeComponent}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputItemStyle: {
    flexDirection: 'row',
    height: px(90),
    borderBottomWidth: px(1),
    borderBottomColor: '#dddddd',
    marginLeft: px(33),
    marginRight: px(33),
    marginTop: 0,
    marginBottom: 0,
    alignItems: 'center',
  },
  hintTitleStyle: {
    fontSize: px(26),
  },
  textInputStyle: {
    flex: 1,
    borderWidth: 0,
    borderColor: 'transparent',
    fontSize: px(26),
  },
  picVerifiyCodeStyle: {
    width: px(110),
    height: px(46),
    borderWidth: px(1),
    borderColor: theme.GRAY_FONT_COLOR,
  },
  expressStyle: {
    width: px(35),
    height: px(35),
  },
});
