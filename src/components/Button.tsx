import {StyleSheet, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';
import React from 'react';
import Text from './Text';
import {colors, fonts} from '../constants';

interface Props {
  label: string;
  onPress: any;
  style?: ViewStyle;
  labelColor?: string;
  labelStyle?: TextStyle;
}

const Button: React.FC<Props> = ({
  label,
  onPress,
  style,
  labelColor,
  labelStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      style={[styles.container, style]}>
      <Text size={20} color={labelColor || colors.white} style={labelStyle}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 10,
  },
  text: {fontFamily: fonts.poppins_medium},
});

export default Button;
