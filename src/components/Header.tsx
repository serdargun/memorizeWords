import {View, StyleSheet, Touchable, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../constants';
import Text from './Text';
import {useNavigation} from '@react-navigation/native';

interface Props {
  title: string;
  backButton?: boolean;
}

export default function Header({title, backButton}: Props) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {backButton && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="chevron-back"
            size={30}
            color={colors.black}
            style={styles.backIcon}
          />
        </TouchableOpacity>
      )}
      <Text size={36} color={colors.primary}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {paddingHorizontal: 20},
  backIcon: {marginBottom: 10},
});
