/**
 * Create by chengkai on 2019/7/29.
 * Describe: 请求基础
 */

import { showLoading } from '../utils/toastUtil';
import fetch from 'sx-fetch';

export const METHOD = {
  POST: 'post',
  GET: 'get',
};
// const createActions = (type, payload) => ({ type, payload });

interface AsyncRequestBaseProps {
  fetchInstance: any;
  method: string;
  url: string;
  onSucc?: Function;
  onFail?: Function;
}

export const asyncRequestBase = ({ fetchInstance = fetch, method, url, onSucc, onFail }: AsyncRequestBaseProps) => (
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dispatch: Function,
) => {
  showLoading();
  fetchInstance[method](url)
    .then((res: any) => onSucc && onSucc(res))
    .catch((err: any) => onFail && onFail(err))
    .done();
};
