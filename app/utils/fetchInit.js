/**
 * Create by chengkai on 2019/9/26.
 * Describe: 初始化fetch
 */

import fetch from 'sx-fetch';
import {URLConfig} from '../config/app.conf';
import {isIOS} from './PlatformTool';
import Global from './Global';
import {logoutHandle} from './LoginUtil';
import {showToast} from './ToastUtil';
import store from '../store';
import {NavigationActions} from 'react-navigation';

fetch.init({
  setOptions: instance => {
    instance.defaults.baseURL = URLConfig.BASE_URL;
    instance.defaults.timeout = 10 * 1000; // 请求超时时间，默认为10秒
    instance.defaults.headers = {
      app_version: Global.VERSION_CODE,
      platform: isIOS ? 'ios' : 'android',
      'Content-Type': 'application/json;charset=UTF-8',
    };
    // 拦截请求返回数据
    instance.interceptors.response.use(
      response => response,
      error => {
        const {status, data = {}} = error.response || {};
        if (status === 401) {
          logoutHandle();
          const msg =
            data && data.header ? data.header.msg : '登录失效，请重新登录！';
          showToast(msg, 2, () => {
            store.dispatch(
              NavigationActions.navigate({routeName: 'CooperativeGasPage'}),
            );
          });
        }
        // 连接超时: error.code === 'ECONNABORTED'
        return Promise.reject(error);
      },
    );
  },
  onShowErrorTip: (err, errorTip) => {},
  onShowSuccessTip: (response, successTip) => {},
  isMock: url => url.startsWith('/mock'),
});
