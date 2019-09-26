import {Platform} from 'react-native';
// import {ActionSheet} from '@ant-design/react-native';
import ImagePicker from 'react-native-image-crop-picker';

/**
 * 图片选择器组件类
 * @param  {...[Function|Object]} args 回调函数或者配置信息
 * @return {void}
 */
const open = (...args) => {
  let options = {
    mediaType: 'photo',
    multiple: false,
    showCropGuidelines: false,
    compressImageMaxWidth: 1024,
    compressImageMaxHeight: 1024,
    compressImageQuality: 0.8,
  };

  let callback = args[0];

  if (args.length === 2) {
    callback = args[1];
    if (typeof args[0] === 'object') {
      options = {
        ...options,
        ...args[0],
      };
    }
  }

  let cancelCallback = () => {};
  if (args.length === 3) {
    callback = args[1];
    if (typeof args[0] === 'object') {
      options = {
        ...options,
        ...args[0],
      };
    }
    cancelCallback = args[2];
  }

  // fixme 需要替换
  // ActionSheet.showActionSheetWithOptions(
  //   {
  //     options: ['拍照', '相册', '取消'],
  //     cancelButtonIndex: 2,
  //     title: '选择图片',
  //   },
  //   index => {
  //     if (index === 0) {
  //       ImagePicker.openCamera(options).then(image => {
  //         responseImage(image, callback);
  //       });
  //     } else if (index === 1) {
  //       ImagePicker.openPicker(options).then(image => {
  //         responseImage(image, callback);
  //       });
  //     } else {
  //       // 关闭图层的回调
  //       cancelCallback(index);
  //     }
  //   },
  // );
};

/**
 * 返回选中图片对象
 * @param  {Object|Array}   images   图片对象或数组
 * @param  {Function} callback 选中图片的回调函数
 * @return {void}
 */
const responseImage = (images, callback) => {
  let resultImages = images;

  if (images instanceof Array) {
    resultImages = images.map(setFileName);
  } else {
    resultImages = setFileName(images);
  }

  callback(resultImages);
};

/**
 * android 获取文件名
 * @param  {Object} imageInfo 图片对象
 * @return {Object} 带文件名的图片对象
 */
const setFileName = imageInfo => {
  if (Platform.OS === 'android') {
    const {path} = imageInfo;
    const pathArray = path.split('/');
    imageInfo.filename = pathArray[pathArray.length - 1];
    imageInfo.uri = imageInfo.path;
  } else if (Platform.OS === 'ios') {
    imageInfo.uri = imageInfo.sourceURL;
  }

  return imageInfo;
};

export default {
  open,
};
