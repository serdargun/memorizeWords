import {SafeAreaView, StyleSheet, ViewStyle} from 'react-native';
import React from 'react';
import {colors} from '../constants';

const ScreenContainer = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) => {
  return (
    <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {backgroundColor: colors.tertiary, flex: 1},
});

export default ScreenContainer;
