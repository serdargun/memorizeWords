import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Button, Text} from '../../../components';
import {colors} from '../../../constants';

export default function Playground_0({
  batch,
  selectedWord,
  setSelectedWord,
  setSelectedPlayground,
}) {
  const onUnderstoodPress = () => {
    const nextWordIndex = selectedWord.index + 1;
    if (nextWordIndex < 3) {
      setSelectedWord({
        word: batch[nextWordIndex],
        index: nextWordIndex,
      });
    } else {
      setSelectedWord({
        word: batch[0],
        index: 0,
      });
      //Go to the other playground
      setSelectedPlayground(1);
    }
  };

  return (
    selectedWord && (
      <View style={styles.playground}>
        <View>
          <Text color={colors.black} size={20} center>
            {selectedWord.word.name}
          </Text>
          <View style={styles.divider} />
          <Text color={colors.gray} size={18} center>
            {selectedWord.word.translate}
          </Text>
        </View>
        <Button label="Anladım" onPress={onUnderstoodPress} />
      </View>
    )
  );
}

const styles = StyleSheet.create({
  playground: {
    backgroundColor: colors.white,
    height: '40%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingTop: 30,
    paddingBottom: 50,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  divider: {height: 10},
});
