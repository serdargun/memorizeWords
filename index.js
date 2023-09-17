/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {MobileAds} from 'react-native-google-mobile-ads';

MobileAds()
  .initialize()
  .then(adapterStatuses => {
    // Initialization complete!
  });

AppRegistry.registerComponent(appName, () => App);
