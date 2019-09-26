import {FETCH_USER_INFO} from '../actions/actionTypes';

const user = {
  name: 'default',
  mobile: '180****0000',
};

export const userInfo = (state = user, action = {}) => {
  switch (action.type) {
    case FETCH_USER_INFO:
      return {...state, ...action.payload};
    default:
      return state;
  }
};
