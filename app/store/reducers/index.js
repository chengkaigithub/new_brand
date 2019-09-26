import {combineReducers} from 'redux';
// import { RootNavigator } from '../../AppNavigator';
import * as userReducer from './userReducer';
import * as asyncReducer from './asyncReducer';
// import { createNavigationReducer } from "react-navigation-redux-helpers";

// const navReducer = createNavigationReducer(RootNavigator);

export default combineReducers({
  // nav: navReducer,
  ...userReducer,
  ...asyncReducer,
});
