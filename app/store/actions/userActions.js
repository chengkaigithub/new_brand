import * as types from './actionTypes';

/**
 * 用户信息相关action;
 */

export const fetchUserInfo = payload => ({
  type: types.FETCH_USER_INFO,
  payload: {
    name: payload.name,
    mobile: payload.mobile,
  },
});
