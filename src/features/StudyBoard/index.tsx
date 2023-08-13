import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Tts from 'react-native-tts';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ScreenContainer} from '../../wrappers';
import {storage} from '../../helpers';
import {colors} from '../../constants';
import {
  Playground_0,
  Playground_1,
  Playground_2,
  Playground_3,
} from './components';

const StudyBoard = ({navigation, route}) => {
  const {data} = route.params;
  const jsonDb = storage.getString('data');
  const db = JSON.parse(jsonDb);
  const category_id = data.id;
  const isCategoryExistsOnDb = db.some(item => item.id === category_id);
  const categoryOnDb = db.find(item => item.id === category_id);
  const wordsOnDb = categoryOnDb.words;

  const [batch, setBatch] = useState(null);
  const [selectedWord, setSelectedWord] = useState(null);
  const [selectedPlayground, setSelectedPlayground] = useState(0);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (batch) {
      setSelectedWord({word: batch[0], index: 0});
    }
  }, [batch]);

  useEffect(() => {
    if (selectedPlayground === 'finish') {
      //do the db staff and renew batch with pickBatchFromDb()
      const formattedWords = wordsOnDb.map(item => {
        const foundedWord = batch.find(batchWord => item.id === batchWord.id);
        if (foundedWord) {
          const formattedWord = {...item, level: item.level + 1};
          return formattedWord;
        }
        return item;
      });
      const category = {
        id: category_id,
        words: formattedWords,
      };
      const formattedDb = db.map(item =>
        item.id === category_id ? category : item,
      );
      storage.set('data', JSON.stringify(formattedDb));
      navigation.navigate('CategoryLanding', {data});
      setSelectedPlayground(0);
    }
  }, [selectedPlayground]);

  const init = () => {
    if (isCategoryExistsOnDb) {
      pickBatchFromDb();
    } else {
      //if this category not exists in storage, add
      const words = data.words.map(item => {
        return {
          id: item.id,
          level: 0,
        };
      });
      const category = {
        id: category_id,
        words,
      };

      db.push(category);
      storage.set('data', JSON.stringify(db));
      setBatch(wordsOnDb.slice(0, 3));
    }
  };

  const pickBatchFromDb = () => {
    const sortedWordsOnDb = wordsOnDb.sort((a, b) => a.level - b.level);
    const sortedWordsBatchOnDb = sortedWordsOnDb.slice(0, 3);
    const sortedWordsBatchOnCategory = sortedWordsBatchOnDb.map(item => {
      return data.words.find(word => word.id === item.id);
    });
    setBatch(sortedWordsBatchOnCategory);
  };

  const getSelectedPlayground = () => {
    switch (selectedPlayground) {
      case 0:
        return (
          <Playground_0
            batch={batch}
            selectedWord={selectedWord}
            setSelectedWord={setSelectedWord}
            setSelectedPlayground={setSelectedPlayground}
          />
        );
      case 1:
        return (
          <Playground_1
            batch={batch}
            selectedWord={selectedWord}
            setSelectedWord={setSelectedWord}
            setSelectedPlayground={setSelectedPlayground}
          />
        );
      case 2:
        return (
          <Playground_2
            batch={batch}
            selectedWord={selectedWord}
            setSelectedWord={setSelectedWord}
            setSelectedPlayground={setSelectedPlayground}
          />
        );
      case 3:
        return (
          <Playground_3
            batch={batch}
            selectedWord={selectedWord}
            setSelectedWord={setSelectedWord}
            setSelectedPlayground={setSelectedPlayground}
          />
        );
      default:
        break;
    }
  };

  const getImageOrPlayground = () => {
    const image = (
      <Image
        style={styles.image}
        resizeMode="cover"
        source={{
          uri: `https://targetredapple.web.tr/images/${category_id}/${selectedWord?.word.id}.jpg`,
        }}
      />
    );
    switch (selectedPlayground) {
      case 0:
        return image;
      case 1:
        return image;
      case 2:
        return renderTtsButton();
      default:
        return image;
    }
  };

  const renderTtsButton = () => {
    return (
      <View style={styles.ttsContainer}>
        <TouchableOpacity style={styles.ttsButton} onPress={onTtsButtonPress}>
          <Icon name="microphone" size={30} color={colors.quaternary} />
        </TouchableOpacity>
      </View>
    );
  };

  const onTtsButtonPress = () => {
    Tts.speak(selectedWord.word.name);
  };

  return (
    <ScreenContainer>
      {getImageOrPlayground()}
      {getSelectedPlayground()}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  ttsContainer: {height: '60%', justifyContent: 'center', alignItems: 'center'},
  ttsButton: {
    backgroundColor: colors.primary,
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {width: '100%', height: '75%', position: 'absolute'},
});

export default StudyBoard;
