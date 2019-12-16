import { NavigationRoute, NavigationScreenProp } from 'react-navigation';
import { ComponentLifecycle } from 'react';

export declare namespace MNavigation {
  interface navigationTypes extends NavigationScreenProp<NavigationRoute<any>> {}
  interface navigationOptionsTypes {
    navigation: NavigationScreenProp<NavigationRoute<any>>;
  }
}

interface MComponent<P = { props: { $fetch: any } }, S = {}, SS = any> extends ComponentLifecycle<P, S, SS> {}

declare namespace MComponent {
  type DefPropsType = {
    $fetch: any;
    navigation: MNavigation.navigationTypes;
  };

  type DefStateType = {};
  export interface DefComponent {
    props: DefPropsType;
    state: DefStateType;
  }
}
