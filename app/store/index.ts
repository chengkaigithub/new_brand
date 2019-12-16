import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducer from './reducers';
// import { navReduxMiddleware } from "../AppNavigator";

const store = createStore(
  reducer,
  applyMiddleware(
    // navReduxMiddleware,
    thunkMiddleware,
  ),
);

export default store;
