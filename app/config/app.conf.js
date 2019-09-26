/**
 * app 配置信息
 */
import {
  ENVIRONMENT,
  ENVIRONMENT_DEVELOP,
  ENVIRONMENT_RELEASE,
  ENVIRONMENT_TEST_INTRANET,
} from './Environment';
import {platformSelect} from '../utils/PlatformTool';

const getURLConfig = () => {
  let URLConfig = {
    // fixme 需要替换为正式环境的网页url
    REGISTER_AGREEMENT: platformSelect({
      ios: require('../../android/app/src/main/assets/html/UserAgreement.html'),
      android: {uri: 'file:///android_asset/html/UserAgreement.html'},
    }),
  };
  switch (ENVIRONMENT) {
    // fixme 生产环境未配置
    case ENVIRONMENT_RELEASE:
      // API地址
      URLConfig.BASE_URL = '';
      // 注册协议
      break;
    case ENVIRONMENT_TEST_INTRANET:
      URLConfig.BASE_URL = 'http://172.16.143.213:32661/api/platform/v1';
      break;
    case ENVIRONMENT_DEVELOP:
      URLConfig.BASE_URL = 'http://172.16.143.213:30528/api/platform/v1'; // API 开发服务器
      break;
    default:
      URLConfig.BASE_URL = '';
      break;
  }
  return URLConfig;
};

export const URLConfig = getURLConfig();
