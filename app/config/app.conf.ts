/**
 * app 配置信息
 */
import { Environment, ENVIRONMENT } from './Environment';

interface URLConfigTypes {
  BASE_URL: string;
  REGISTER_AGREEMENT: string;
}

const getURLConfig = () => {
  const URLConfig: URLConfigTypes = Object();
  switch (ENVIRONMENT) {
    case Environment.RELEASE:
      URLConfig.BASE_URL = '';
      URLConfig.REGISTER_AGREEMENT = '';
      break;
    case Environment.TEST_INTRANET:
      URLConfig.BASE_URL = 'http://172.16.143.213:32661/api/platform/v1';
      URLConfig.REGISTER_AGREEMENT = '';
      break;
    case Environment.DEVELOP:
      URLConfig.BASE_URL = 'http://172.16.143.213:30528/api/platform/v1'; // API 开发服务器
      URLConfig.REGISTER_AGREEMENT = '';
      break;
    default:
      URLConfig.BASE_URL = '';
      URLConfig.REGISTER_AGREEMENT = '';
      break;
  }
  return URLConfig;
};

export const URLConfig: URLConfigTypes = getURLConfig();
