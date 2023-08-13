import {View, StyleSheet, Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {colors} from '../../../constants';

export default function AnimatedProgress({widthPct}: {widthPct: number}) {
  const barWidth = useRef(new Animated.Value(0)).current;
  const finalWidth = (50 * widthPct) / 100;

  useEffect(() => {
    Animated.spring(barWidth, {
      toValue: finalWidth,
      bounciness: 10,
      speed: 2,
      useNativeDriver: false,
    }).start();
  }, [barWidth, finalWidth]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.progressBar, {width: barWidth}]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    borderWidth: 0.2,
    borderRadius: 15,
    borderColor: colors.tertiary,
    width: 50,
    overflow: 'hidden',
  },
  progressBar: {
    height: 10,
    backgroundColor: colors.tertiary,
    borderRadius: 15,
  },
});
