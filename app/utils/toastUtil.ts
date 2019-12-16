/**
 * Created by chengkai on 2017/11/30.
 * toast 提示统一管理类
 */
// import {Portal, Provider, Toast} from '@ant-design/react-native';

// const toastArr: Array<string> = [];

/* 展示loading框 */
export const showLoading = (/*info: string = '请稍后...', duration: number*/) => {
  // hideAllToast();
  // const key = Toast.loading(info, duration || 20);
  // key && toastArr.push(key);
  // return key;
};

/**
 * 隐藏全部
 */
export const hideAllToast = () => {
  // const shiftKey = toastArr.shift();
  // if (shiftKey) {
  //     hideToast(shiftKey);
  // } else {
  //     if (toastArr.length <= 0) {
  //         return undefined;
  //     }
  //     hideAllToast();
  // }
};

/* 隐藏toast */
export const hideToast = (/*key: string*/) => {
  // if (key) {
  //     const currentIndex = toastArr.indexOf(key);
  //     if (currentIndex !== -1) {
  //         const spliceKey = toastArr.splice(currentIndex, 1)[0];
  //         spliceKey && Portal.remove(spliceKey);
  //     } else {
  //         key && Portal.remove(key);
  //     }
  // } else {
  //     const shiftKey = toastArr.splice(-1, 1)[0];
  //     shiftKey && Portal.remove(shiftKey);
  // }
};

/**
 * 展示toast(默认展示的时候可操作)
 * @param info          提示信息
 * @param duration      展示时间
 * @param onClose       消失时回调
 * @param mask          false: 展示时可操作 true: 展示时不可操作
 */
export const showToast = () =>
  /*info: string = '', duration: number = 2, onClose: Function = () => {}, mask: boolean = false*/
  {
    // hideAllToast();
    // const key = Toast.info(info, duration, onClose, mask);
    // key && toastArr.push(key);
    // return key;
  };

// export const AntdProvider = Provider;
