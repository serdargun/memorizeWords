import {View, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Text} from '../../../components';
import {colors} from '../../../constants';

export default function Fail({selectedOption}) {
  return (
    <View style={styles.statusContainer}>
      <Icon name="cancel" size={100} color={'red'} />
      <View style={styles.divider} />
      <Text color={'red'} size={18}>
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
