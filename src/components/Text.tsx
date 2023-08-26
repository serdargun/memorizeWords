import {Text as RNText, StyleSheet, TextStyle} from 'react-native';
import React from 'react';
import {fonts} from '../constants';

interface Props {
  children: string;
  size: number;
  color: string;
  center?: boolean;
  style?: TextStyle;
}

const Text: React.FC<Props> = ({children, size, color, center, style}) => {
  const textAlign = center ? 'center' : 'auto';

  return (
    <RNText style={[styles.text, style, {fontSize: size, color, textAlign}]}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  text: {fontFamily: fonts.poppins_medium},
});

export default Text;
