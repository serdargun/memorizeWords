import {View, StyleSheet} from 'react-native';
import React from 'react';
import {Text} from '../../../components';
import {colors} from '../../../constants';
import {Word} from '../../../constants/types';

export default function WordListItem({
  item,
  level,
}: {
  item: Word;
  level: number;
}) {
  const renderLevel = () => {
    let arr = [];
    for (let index = 0; index < level; index++) {
      arr.push(
        <View
          key={index}
          style={[styles.levelBox, {backgroundColor: colors.primary}]}
        />,
      );
    }
    for (let index = 0; index < 3 - level; index++) {
      arr.push(
        <View
          key={index + 5}
          style={[styles.levelBox, {backgroundColor: colors.quaternary}]}
        />,
      );
    }
    return arr;
  };

  return (
    <View style={styles.container}>
      <View>
        <Text color={colors.black} size={14}>
          {item.name}
        </Text>
        <Text color={colors.gray} size={14}>
          {item.translate}
        </Text>
      </View>
      <View style={styles.rightCol}>{renderLevel()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rightCol: {flexDirection: 'row'},
  levelBox: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 3,
  },
});
