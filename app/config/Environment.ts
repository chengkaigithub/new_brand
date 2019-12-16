/**
 * 本类为APP环境 配置类
 */
export enum Environment {
  RELEASE,
  TEST_EXTERNAL,
  TEST_INTRANET,
  DEVELOP,
}

/******* ******* 当前配置项 ******* *******/
export const ENVIRONMENT: Environment = Environment.DEVELOP;

// @ts-ignore
export const isRelease: boolean = ENVIRONMENT === Environment.RELEASE;
// @ts-ignore
export const isDevelop: boolean = ENVIRONMENT === Environment.DEVELOP;
// @ts-ignore
export const isTestIntranet: boolean = ENVIRONMENT === Environment.TEST_INTRANET;
// @ts-ignore
export const isTestExternal: boolean = ENVIRONMENT === Environment.TEST_EXTERNAL;
