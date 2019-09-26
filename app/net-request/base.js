/**
 * Create by chengkai on 2019/7/29.
 * Describe: 请求基础
 */

import {hideToast, showLoading, showToast} from '../utils/ToastUtil';
import {handleError, handleSimpleData} from '../utils/ResponseDataProcessUtils';
import fetch from 'sx-fetch';

export const METHOD = {
  POST: 'post',
  GET: 'get',
};
const createActions = (type, payload) => ({type, payload});

export const asyncRequestBase = ({
  fetchInstance = fetch,
  method,
  url,
  isShowLoading = true,
  isShowToast = true,
  key,
  onSucc,
  onFail,
}) => dispatch => {
  isShowLoading && showLoading();
  fetchInstance[method](url)
    .then(res =>
      handleSimpleData(
        res,
        successData => {
          isShowLoading && hideToast();
          dispatch(createActions(url, {[key]: successData, type: url}));
          onSucc && onSucc(res);
        },
        errMsg => {
          isShowToast && showToast(errMsg);
          onFail && onFail(res);
        },
      ),
    )
    .catch(err => {
      isShowToast && showToast(handleError(err));
      onFail && onFail(err);
    })
    .done();
};
