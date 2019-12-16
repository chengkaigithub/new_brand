/**
 * @format
 */

import { AppRegistry } from 'react-native';
import Root from './app/Root';
import { name as appName } from './app.json';

console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => Root);
