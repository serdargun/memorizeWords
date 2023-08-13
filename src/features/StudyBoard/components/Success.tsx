import {View, StyleSheet} from 'react-native';
import React from 'react';
import {Text} from '../../../components';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../../constants';

export default function Success({selectedOption}) {
  return (
    <View style={styles.statusContainer}>
      <Icon name="check-circle" size={100} color={colors.primary} />
      <View style={styles.divider} />
      <Text color={colors.primary} size={18}>
        {selectedOption?.name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  divider: {height: 10},
  optionButton: {
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderWidth: 0.5,
  },
  statusContainer: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
