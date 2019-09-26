import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
// import * as WeChat from 'react-native-wechat';
import {showToast} from '../utils/ToastUtil';

import {isIphoneX, px} from '../utils/ScreenUtil';
import Button from './Button';
import {APP_NAME} from '../config/string.conf';

// https://biyaopay.suixingpay.com/api/image/logo/logo.png
// const LOGO_PATH = 'http://www.sxpmpos.com/cardless/img/logo/logo.png';
const LOGO_PATH =
  'http://www.sxpmpos.com/plusImages/cardless/admin/playstore-icon.png';

export default class ShareToWechat extends Component {
  componentDidMount() {
    // 微信分享 测试appkey:wx2e0849680848752c 生产环境appkey:wx1f05ce47c19fc2fa  App Store的appkey:wx8d6c8f4aa19f50b1 马甲包的appkey:wx7e35a2f2d9f2e8ff
    // WeChat.registerApp('wx1f05ce47c19fc2fa');
    /*
        console.log('注册分享监听组件');
        WeChat.addListener('SendMessageToWX.Resp', (data) => {
            if (parseInt(data.errCode) === 0) {
                console.log('分享成功');
            } else {
                console.log('分享失败');
            }
        })
        */
  }

  /*
    componentWillUnmount() {
        console.log('移除分享监听组件');
        WeChat.removeAllListeners()
    }
    */

  /**
   ** 分享到朋友圈
   **/
  shareToTimeLine = () => {
    // thumbImage: 'https://biyaopay.suixingpay.com/api/image/logo/logo.png'
    const {shareParams, closeSharePop = () => {}} = this.props;
    closeSharePop();
    // WeChat.isWXAppInstalled().then(isInstalled => {
    //   if (isInstalled) {
    //     WeChat.shareToTimeline({
    //       thumbImage: LOGO_PATH,
    //       ...shareParams,
    //       mediaTagName: APP_NAME,
    //       messageAction: undefined,
    //       messageExt: undefined,
    //     });
    //   } else {
    //     showToast('没有安装微信软件，请您安装微信之后再试');
    //   }
    // });
  };

  /**
   ** 分享给好友
   **/
  shareToFriends = () => {
    // thumbImage: 'https://biyaopay.suixingpay.com/api/image/logo/logo.png'
    const {shareParams, closeSharePop = () => {}} = this.props;
    closeSharePop();
    // WeChat.isWXAppInstalled().then(isInstalled => {
    //   if (isInstalled) {
    //     WeChat.shareToSession({
    //       thumbImage: LOGO_PATH,
    //       ...shareParams,
    //       mediaTagName: APP_NAME,
    //       messageAction: undefined,
    //       messageExt: undefined,
    //     });
    //   } else {
    //     showToast('没有安装微信软件，请您安装微信之后再试');
    //   }
    // });
  };

  render() {
    const {visible, closeSharePop = () => {}} = this.props;
    return (
      <Modal
        popup
        visible={visible}
        maskClosable={true}
        onClose={closeSharePop}
        animationType="slide-up"
        onRequestClose={() => {
          /* android强制调用,必须重写 */
        }}
        style={styles.modalStyle}>
        <View style={styles.wechartButtons}>
          <TouchableOpacity
            style={styles.itemButton}
            onPress={this.shareToFriends}>
            <Image
              source={require('../assets/images/inviting-friends/wechart-friend.png')}
              style={styles.itemImage}
            />
            <Text style={styles.buttonText}>微信好友</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.itemButton}
            onPress={this.shareToTimeLine}>
            <Image
              source={require('../assets/images/inviting-friends/wechart-circal.png')}
              style={styles.itemImage}
            />
            <Text style={styles.buttonText}>朋友圈</Text>
          </TouchableOpacity>
        </View>
        <Button
          style={{
            backgroundColor: '#fff',
            borderRadius: 0,
          }}
          onClick={closeSharePop}>
          <Text style={{color: '#0f0f0f'}}>取消</Text>
        </Button>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  wechartButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: px(45),
  },
  itemButton: {
    marginTop: px(45),
    marginLeft: px(45),
  },
  itemImage: {
    width: px(94),
    height: px(94),
  },
  buttonText: {
    paddingTop: px(12),
    fontSize: px(24),
    color: '#333',
    textAlign: 'center',
  },
  modalStyle: {
    backgroundColor: '#f8f8f8',
    paddingBottom: isIphoneX() ? px(60) : 0,
  },
});
