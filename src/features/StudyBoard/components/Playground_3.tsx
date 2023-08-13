import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Text} from '../../../components';
import Success from './Success';
import Fail from './Fail';
import {colors} from '../../../constants';

export default function Playground_3({
  batch,
  selectedWord,
  setSelectedWord,
  setSelectedPlayground,
}) {
  const [shuffledCharacters, setShuffledCharacters] = useState([]);
  const [selectedCharacterIndexes, setSelectedCharacterIndexes] = useState([]);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (status) {
      setTimeout(() => {
        setStatus(null);
        skipSelectedWord();
      }, 1000);
    }
  }, [status]);

  useEffect(() => {
    if (selectedCharacterIndexes.length === selectedWord.word.name.length) {
      const writtenWordArr = selectedCharacterIndexes.map(index => {
        return shuffledCharacters[index];
      });
      const writtenWord = writtenWordArr.join('');
      if (writtenWord === selectedWord.word.name) {
        setStatus('success');
      } else {
        //fail or nothing
      }
    }
  }, [selectedCharacterIndexes]);

  useEffect(() => {
    setShuffledCharacters(shuffle(selectedWord.word.name));
    setSelectedCharacterIndexes([]);
  }, [selectedWord]);

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
      // Finish tour
      setSelectedPlayground('finish');
    }
  };

  const shuffle = string => {
    var parts = string.split('');
    for (var i = parts.length; i > 0; ) {
      var random = parseInt(Math.random() * i);
      var temp = parts[--i];
      parts[i] = parts[random];
      parts[random] = temp;
    }
    return parts;
  };

  const onCharacterPress = index => {
    const isAlreadySelected = selectedCharacterIndexes.includes(index);
    if (isAlreadySelected) {
      const filteredArr = selectedCharacterIndexes.filter(
        item => item !== index,
      );
      setSelectedCharacterIndexes(filteredArr);
    } else {
      setSelectedCharacterIndexes([...selectedCharacterIndexes, index]);
    }
  };

  const renderSplittedWord = () => {
    return (
      <View style={styles.splittedWordContainer}>
        {selectedWord.word.name.split('').map((item, index) => {
          return (
            <View key={index} style={styles.splittedWord}>
              <Text color={colors.black} size={16} center>
                {shuffledCharacters[selectedCharacterIndexes[index]]}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };

  const renderContent = () => {
    switch (status) {
      case 'success':
        return <Success selectedOption={{name: selectedWord.word.name}} />;
      case 'fail':
        return <Fail selectedOption={selectedOption} />;
      default:
        return (
          <>
            <Text color={colors.primary} size={16} center>
              Kelime oluştur
            </Text>
            {renderSplittedWord()}
            <View style={styles.divider} />
            <View style={styles.charactersContainer}>
              {shuffledCharacters.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.characterButton,
                      {
                        backgroundColor: selectedCharacterIndexes.includes(
                          index,
                        )
                          ? colors.secondary
                          : colors.white,
                      },
                    ]}
                    onPress={() => onCharacterPress(index)}>
                    <Text color={colors.black} size={18} center>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
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
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  charactersContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  characterButton: {
    width: 40,
    height: 40,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: 10,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {height: 15},
  splittedWordContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  splittedWord: {
    width: 20,
    height: 30,
    borderBottomWidth: 1,
    borderColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
});
