import * as types from './actionTypes';

/**
 * 用户信息相关action;
 */

interface PayloadProps {
  name: string;
  mobile: string;
}

export const fetchUserInfo = (payload: PayloadProps) => ({
  type: types.FETCH_USER_INFO,
  payload: {
    name: payload.name,
    mobile: payload.mobile,
  },
});
