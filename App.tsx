import React, {useEffect} from 'react';
import Navigation from './src/navigation';
import {requestTrackingPermission} from 'react-native-tracking-transparency';

const App = () => {
  useEffect(() => {
    const init = async () => {
      await requestTrackingPermission();
    };

    init();
  }, []);

  return <Navigation />;
};

export default App;
