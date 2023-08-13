import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../constants';

const ScreenContainer = ({children}: {children: React.ReactNode}) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {backgroundColor: colors.tertiary, flex: 1},
});

export default ScreenContainer;
