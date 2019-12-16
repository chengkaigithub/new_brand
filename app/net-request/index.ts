/**
 * Create by chengkai on 2019/7/29.
 * Describe:
 */

import { asyncRequestBase, METHOD } from './base';
import { ACCOUNT_STATUS } from '../config/url.conf';

/**
 * import { fetchAccountStatus } from "../../net-request";
 * @connect(state => ({
 *   accountStatus: state.promiseReducer.accountStatus,
 * }))
 */
export const fetchAccountStatus = (fetchInstance: any) =>
  asyncRequestBase({
    method: METHOD.POST,
    url: ACCOUNT_STATUS,
    fetchInstance,
  });
