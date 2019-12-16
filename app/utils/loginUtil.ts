/**
 * 登录相关工具类
 */
import Global from './Global';
import fetch from 'sx-fetch';
import Storage from './storage';

const logoutHandleArray: Array<Function> = [];

export enum LoginResultType {
  SUCCESS = 'SUCCESS',
  CANCEL = 'CANCEL',
  FAILED = 'FAILED',
}

export const logoutHandlePush = (handle: Function) => {
  logoutHandleArray.push(handle);
};

export const isLogin = (): boolean => Global.loginInfo.loginStatus;

export const clearLoginInfo = (): void => {
  Global.loginInfo = {
    loginStatus: false,
    GASAPP_TOKEN: undefined,
    userId: undefined,
    userNo: undefined,
    userName: undefined,
    headImageUrl: undefined,
  };
  fetch.axiosInstance.defaults.headers.GASAPP_TOKEN = '';
  Storage.remove({ key: 'loginData' });
};
logoutHandlePush(clearLoginInfo);

export const loginStatusHelper = (
  navigation: { navigate: (routeName: string, params: { loginListener: (type: LoginResultType) => void }) => void },
  call: Function,
): void => {
  if (isLogin()) {
    // 已登录
    call && call();
  } else {
    // 未登录
    navigation.navigate('LoginPage', {
      loginListener: (type: LoginResultType) => {
        if (type === LoginResultType.SUCCESS) {
          call && call();
        }
      },
    });
  }
};

export const logoutHandle = (): void => {
  if (logoutHandleArray.length > 0) {
    for (let handle of logoutHandleArray) {
      handle();
    }
  }
};

export const handleLoginSuccess = (data: any): void => {
  Storage.save({ key: 'loginData', data });
  Global.loginInfo = data;
  fetch.axiosInstance.defaults.headers['GASAPP_TOKEN'] = data.GASAPP_TOKEN;
};
