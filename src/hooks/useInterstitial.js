import {useEffect, useState} from 'react';
import {TestIds, useInterstitialAd} from 'react-native-google-mobile-ads';

export function useInterstitial(onAdClosed) {
  const [loadingAd, setLoadingAd] = useState(false);

  const {load, show, isLoaded, isClosed} = useInterstitialAd(
    TestIds.INTERSTITIAL,
  );

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
