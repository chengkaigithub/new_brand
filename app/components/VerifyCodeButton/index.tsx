/**
 * Created by chengkai on 2017/11/29.
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import * as theme from '../../config/theme.conf';
import fetch from 'sx-fetch';
import { hideToast, showLoading, showToast } from '../../utils/toastUtil';
import { checkPhoneNo } from '../../utils/LegitimacyDetectionTool';

/* 验证码倒计时秒数（秒） */
const VERIFY_TIME = 60;

interface VerifyCodeButtonProps {
  isSendOnRender: boolean;
  phoneNo: string;
  smsType: string;
  verifyCodeUrl: string;
  $fetch?: any;
}

@fetch.inject()
export default class VerifyCodeButton extends Component<VerifyCodeButtonProps> {
  static propTypes = {
    phoneNo: PropTypes.string.isRequired /* 获取验证码的手机号码 */,
    smsType: PropTypes.string.isRequired /* 获取验证码 功能类型 */,
    verifyCodeUrl: PropTypes.string /* 获取验证码的接口地址(传入此字段需要自己拼接参数) */,
    isSendOnRender: PropTypes.bool /* 是否在渲染之后立即获取验证码 */,
  };

  state = {
    verifyTimer: 0 /* 获取验证码倒计时 */,
    verifyBtnDisabled: false /* 获取验证码按钮是否禁用 */,
    verifyMsg: '获取验证码' /* 验证码按钮文字 */,
  };

  componentDidMount() {
    if (this.props.isSendOnRender) {
      this.handleGetVerifyCodeClick();
    }
  }

  componentWillUnmount() {
    //重写组件的setState方法，直接返回空
    this.setState = () => {
      return;
    };
  }

  /**
   * 获取验证码
   * @return {void}
   */
  handleGetVerifyCodeClick = () => {
    const { phoneNo } = this.props;

    if (!checkPhoneNo(phoneNo)) {
      // showToast('请输入正确手机号!');
      showToast();
    } else {
      this.sendVerifyCode();
    }
  };

  /**
   * 发送验证码
   */
  sendVerifyCode = () => {
    const { verifyBtnDisabled } = this.state;

    if (verifyBtnDisabled) return;

    this.setState({ verifyBtnDisabled: true });

    let { phoneNo, smsType, verifyCodeUrl } = this.props;

    showLoading();
    this.props.$fetch
      .post(verifyCodeUrl, { smsType, phoneNo })
      .then((data: any) => {
        hideToast();
        this.processVerifyData(data);
      })
      .catch(() => {
        hideToast();
        // showToast('验证码发送失败，请重新获取！', 1);
        this.setState({
          verifyBtnDisabled: false,
          verifyMsg: '重新获取',
        });
      });
  };

  /**
   * 解析发送验证码成功数据
   * @param data
   */
  processVerifyData = (data: any) => {
    if (data.success) {
      // showToast('验证码发送成功！', 1);
      this.verifyTimeout(VERIFY_TIME);
    } else {
      // showToast(data.message, 1);
      this.setState({
        verifyBtnDisabled: false,
        verifyMsg: '重新获取',
      });
    }
  };

  /**
   * 验证码倒计时
   * @param  {Number} time 时间
   * @return {void}
   */
  verifyTimeout = (time: number) => {
    this.setState({ verifyTimer: time });

    if (time <= 0) {
      this.setState({
        verifyBtnDisabled: false,
        verifyMsg: '重新获取',
      });
      return;
    }

    setTimeout(() => {
      this.verifyTimeout(time - 1);
    }, 1000);
  };

  render() {
    let { verifyBtnDisabled, verifyTimer, verifyMsg } = this.state;
    return (
      <View style={styles.verifyExtra}>
        <TouchableOpacity onPress={this.handleGetVerifyCodeClick} disabled={verifyBtnDisabled}>
          <Text style={{ color: theme.BASE_COLOR }}>{verifyTimer > 0 ? `重新获取(${verifyTimer})` : verifyMsg}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  verifyExtra: {
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 8,
    paddingRight: 8,
    borderWidth: 1,
    borderColor: theme.BASE_COLOR,
    borderRadius: 4,
    backgroundColor: 'white',
  },
});
