import React from 'react';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import {admob} from '../constants';
import {Platform} from 'react-native';

export default function Banner() {
  const {banner_android, banner_ios} = admob;
  const adUnitId = __DEV__
    ? TestIds.BANNER
    : Platform.select({ios: banner_ios, android: banner_android, default: ''});

  return (
    <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
  );
}
