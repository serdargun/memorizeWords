import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {TestIds, useInterstitialAd} from 'react-native-google-mobile-ads';
import {admob} from '../constants';

export function useInterstitial(onAdClosed) {
  const [loadingAd, setLoadingAd] = useState(false);

  const {interstitial_android, interstitial_ios} = admob;
  const unitId = __DEV__
    ? TestIds.INTERSTITIAL
    : Platform.select({ios: interstitial_ios, android: interstitial_android});

  const {load, show, isLoaded, isClosed} = useInterstitialAd(unitId);

  useEffect(() => {
    if (isClosed) {
      onAdClosed();
    }
  }, [isClosed]);

  useEffect(() => {
    if (loadingAd) {
      load();
    }
  }, [loadingAd]);

  useEffect(() => {
    if (isLoaded) {
      setLoadingAd(false);
      show();
    }
  }, [isLoaded, show]);

  return {loadingAd, setLoadingAd};
}
