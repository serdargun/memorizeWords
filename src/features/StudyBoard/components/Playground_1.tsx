import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Text} from '../../../components';
import Success from './Success';
import Fail from './Fail';
import {colors} from '../../../constants';

export default function Playground_1({
  batch,
  selectedWord,
  setSelectedWord,
  setSelectedPlayground,
}) {
  const shuffledBatch = [...batch].sort(() => 0.5 - Math.random());
  const options = shuffledBatch.slice(0, 3);

  const [selectedOption, setSelectedOption] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (status) {
      setTimeout(() => {
        setStatus(null);
        skipSelectedWord();
      }, 1000);
    }
  }, [status]);

  const onImageOptionPress = option => {
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
      setSelectedPlayground(2);
    }
  };

  const renderContent = () => {
    switch (status) {
      case 'success':
        return <Success selectedOption={selectedOption} />;
      case 'fail':
        return <Fail selectedOption={selectedOption} />;
      default:
        return (
          <>
            <Text color={colors.primary} size={16} center>
              Resimde ne görüyorsun?
            </Text>
            {options.map((item, index) => {
              return (
                <Button
                  key={index}
                  label={item.name}
                  onPress={() => onImageOptionPress(item)}
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
