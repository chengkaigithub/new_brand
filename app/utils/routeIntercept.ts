import { NavigationActions } from 'react-navigation';
import { hideAllToast } from './toastUtil';

/**
 * Create by chengkai on 2019/9/26.
 * Describe: route intercept
 */

export const rootNavigatorIntercept = (RootNavigator: any) => {
  const defaultGetStateForAction = RootNavigator.router.getStateForAction;
  /**
   * 路由跳转前拦截
   */
  RootNavigator.router.getStateForAction = (action: { params?: any; routeName: string; type: string }) => {
    const newActions = routeIntercept(action);
    return defaultGetStateForAction(newActions);
  };
};

// 底部弹出动画的路由
const forVerticalRoute = ['LoginPage', 'WeChartAuthorization'];

const isForVerticalRoute = (current: string): boolean => forVerticalRoute.some(item => item === current);

const routeIntercept = (action: { params?: any; routeName: string; type: string }) => {
  let params = action.params || {};
  let routeName = action.routeName;
  if (action.type === NavigationActions.NAVIGATE) {
    if (isForVerticalRoute(routeName)) {
      params = { transition: 'forVertical', ...params };
    } else {
      params = { transition: 'forHorizontal', ...params };
    }
  } else if (action.type === NavigationActions.BACK) {
    hideAllToast();
  }
  return { ...action, params };
};
