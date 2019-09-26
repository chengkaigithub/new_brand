import {NavigationActions} from 'react-navigation';
import {hideAllToast} from './ToastUtil';

/**
 * Create by chengkai on 2019/9/26.
 * Describe: route intercept
 */

export const rootNavigatorIntercept = RootNavigator => {
  const defaultGetStateForAction = RootNavigator.router.getStateForAction;
  /**
   * 路由跳转前拦截
   */
  RootNavigator.router.getStateForAction = (action, state) => {
    const newActions = routeIntercept(action, state);
    return defaultGetStateForAction(newActions, state);
  };
};

// 底部弹出动画的路由
const forVerticalRoute = ['LoginPage', 'WeChartAuthorization'];

const isForVerticalRoute = current =>
  forVerticalRoute.some(item => item === current);

const routeIntercept = (action, state) => {
  let params = action.params || {};
  let routeName = action.routeName;
  if (action.type === NavigationActions.NAVIGATE) {
    if (isForVerticalRoute(routeName)) {
      params = {transition: 'forVertical', ...params};
    } else {
      params = {transition: 'forHorizontal', ...params};
    }
  } else if (action.type === NavigationActions.BACK) {
    hideAllToast();
  }
  return {...action, params};
};
