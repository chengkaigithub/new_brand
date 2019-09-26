/**
 * Create by chengkai on 2019/9/26.
 * Describe:
 */

const initialState = {};

export const promiseReducer = (state = initialState, action = {}) => {
  let actionType = (action.payload && action.payload.type) || '';
  switch (action.type) {
    case actionType:
      return {...state, ...action.payload};
    default:
      return state;
  }
};
