import { NavigationActions, StackActions } from 'react-navigation';
import store from '../store';
import { MNavigation } from '../../index';
/*
 * navigation 工具类
 */

const NavigationUtil = {
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  reset: (navigation: MNavigation.navigationTypes, actionsArgs: []): void => {},
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  back: (navigation: MNavigation.navigationTypes, routeName: string, routeCallback: Function): void => {},
  backToPrePage: (
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    navigation: MNavigation.navigationTypes,
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    routeName: string,
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    backupRouteName: string,
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    routeCallback: Function,
  ): void => {},
};
export default NavigationUtil;

/**
 * reset action
 * @type {function}
 */
export const resetAction = (actionsArgs: string | []) => {
  let actions;

  if (typeof actionsArgs === 'string') {
    actions = [
      NavigationActions.navigate({
        routeName: actionsArgs,
      }),
    ];
  } else if (actionsArgs instanceof Array) {
    actions = actionsArgs.map(action => {
      let routeItem;
      if (typeof action === 'object') {
        routeItem = action;
      } else if (typeof action === 'string') {
        routeItem = { routeName: action };
      } else {
        throw new Error('actions item type fail !');
      }
      return NavigationActions.navigate(routeItem);
    });
  } else {
    throw new Error('actions type fail !');
  }

  return StackActions.reset({
    key: null,
    actions,
    index: actions.length - 1,
  });
};

/**
 * 重置navigation
 * @param  {Object} navigation navigation对象
 * @param  {Object} options    navigation跳转参数
 * @return {void}
 */
NavigationUtil.reset = (navigation: MNavigation.navigationTypes, actionsArgs: []) => {
  navigation.dispatch(resetAction(actionsArgs));
};

/**
 * 根据routeName 返回到指定页面
 * @param  {Object} navigation navigation 对象
 * @param  {String} routeName  页面路由名
 * @return {void}
 */
NavigationUtil.back = (navigation: MNavigation.navigationTypes, routeName: string, routeCallback: Function) => {
  // @ts-ignore
  const { routes } = store.getState().nav;
  const stackRoutes = routes[1].routes;

  let goRouteIndex = -1;

  stackRoutes.map((route: any, index: number) => {
    if (route.routeName === routeName) {
      goRouteIndex = index;
    }
  });

  if (goRouteIndex !== -1) {
    routeCallback && routeCallback(stackRoutes[goRouteIndex]);
    let goRoute = stackRoutes[goRouteIndex + 1];
    goRoute && navigation.goBack(goRoute.key);
  }
};

/**
 * 根据routeName 返回到指定页面的前一个界面(不需要管前一个界面到底是哪个界面)
 * @param  {Object} navigation navigation 对象
 * @param  {String} routeName  页面路由名
 * @param  {String} backupRouteName  本流程页面第一个路由名
 *                  (将返回到本界面的上一个界面,此参数为了防止从流程中返回到中间界面错误,一般不使用 eq: PayPasswordConfirm.js)
 * @return {void}
 */
NavigationUtil.backToPrePage = (navigation, routeName, backupRouteName = '', routeCallback) => {
  // @ts-ignore
  const { routes } = store.getState().nav;
  const stackRoutes = routes[1].routes;

  let goRouteIndex = -1;
  let goRouteBackupIndex = -1;

  stackRoutes.map((route: any, index: number) => {
    if (route.routeName === routeName) {
      goRouteIndex = index;
    } else if (route.routeName === backupRouteName) {
      goRouteBackupIndex = index;
    }
  });

  if (goRouteIndex === -1 && goRouteBackupIndex !== -1) {
    goRouteIndex = goRouteBackupIndex;
  }
  if (goRouteIndex !== -1) {
    routeCallback && routeCallback(stackRoutes[goRouteIndex]);
    navigation.goBack(stackRoutes[goRouteIndex].key);
  }
};
