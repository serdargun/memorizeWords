import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Text} from '../../../components';
import Success from './Success';
import Fail from './Fail';
import {colors} from '../../../constants';
import {PlaygroundProps, Status, Word} from '../../../constants/types';

export default function Playground_2({
  batch,
  selectedWord,
  setSelectedWord,
  setSelectedPlayground,
}: PlaygroundProps) {
  const shuffledBatch = [...batch].sort(() => 0.5 - Math.random());
  const options = shuffledBatch.slice(0, 3);

  const [selectedOption, setSelectedOption] = useState<Word | null>(null);
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    if (status) {
      setTimeout(() => {
        setStatus(null);
        skipSelectedWord();
      }, 1000);
    }
  }, [status]);

  const onTtsOptionPress = (option: Word) => {
    setSelectedOption(option);
    if (selectedWord.word.name === option.name) {
      setStatus('success');
    } else {
      setStatus('fail');
    }
  };

  const skipSelectedWord = () => {
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
      setSelectedPlayground(3);
    }
  };

  const renderContent = () => {
    switch (status) {
      case 'success':
        return selectedOption && <Success selectedOption={selectedOption} />;
      case 'fail':
        return selectedOption && <Fail selectedOption={selectedOption} />;
      default:
        return (
          <>
            <Text color={colors.primary} size={16} center>
              Dinle ve doğru cevabı seç
            </Text>
            {options.map((item, index) => {
              return (
                <Button
                  key={index}
                  label={item.name}
                  onPress={() => onTtsOptionPress(item)}
                  style={styles.optionButton}
                  labelColor={colors.black}
                />
              );
            })}
          </>
        );
    }
  };

  return <View style={styles.playground}>{renderContent()}</View>;
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
  optionButton: {
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderWidth: 0.5,
  },
});
