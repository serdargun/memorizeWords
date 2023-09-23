import React, {useEffect, useState} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Tts from 'react-native-tts';
import Icon from 'react-native-vector-icons/AntDesign';
import {ScreenContainer} from '../../wrappers';
import {storage, system} from '../../helpers';
import {colors} from '../../constants';
import {
  Playground_0,
  Playground_1,
  Playground_2,
  Playground_3,
} from './components';
import {StudyBoardProps} from '../../navigation';
import {
  CategoryOnDb,
  Data,
  Playground,
  Word,
  WordOnDb,
  WordWithIndex,
} from '../../constants/types';
import {useInterstitial} from '../../hooks';
import {Loading} from '../../components';

Tts.setDefaultLanguage('en-US');
Tts.setDefaultVoice('en-us-x-tpc-network');

const StudyBoard = ({navigation, route}: StudyBoardProps) => {
  const {data} = route.params;
  const jsonDb = storage.getString('data') || '';
  const db = JSON.parse(jsonDb);
  const category_id = data.id;
  const isCategoryExistsOnDb = db.some(
    (item: CategoryOnDb) => item.id === category_id,
  );
  const categoryOnDb = db.find((item: CategoryOnDb) => item.id === category_id);
  const wordsOnDb = categoryOnDb.words;

  const [batch, setBatch] = useState<Word[] | null>(null);
  const [selectedWord, setSelectedWord] = useState<WordWithIndex | null>(null);
  const [selectedPlayground, setSelectedPlayground] = useState<Playground>(0);

  const onAdClosed = () => {
    navigation.navigate('CategoryLanding', {data});
  };

  const {loadingAd, setLoadingAd} = useInterstitial(onAdClosed);

  const {shuffle} = system;

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
      const formattedWords = wordsOnDb.map((item: WordOnDb) => {
        const foundedWord = batch?.find(
          (batchWord: Word) => item.id === batchWord.id,
        );
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
      const formattedDb = db.map((item: Data) =>
        item.id === category_id ? category : item,
      );
      storage.set('data', JSON.stringify(formattedDb));
      setLoadingAd(true);
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
      setBatch(shuffle(wordsOnDb.slice(0, 3)));
    }
  };

  const pickBatchFromDb = () => {
    const sortedWordsOnDb = wordsOnDb.sort(
      (a: WordOnDb, b: WordOnDb) => a.level - b.level,
    );
    const sortedWordsBatchOnDb = sortedWordsOnDb.slice(0, 3);
    const sortedWordsBatchOnCategory = sortedWordsBatchOnDb.map(
      (item: WordOnDb) => {
        return data.words.find(word => word.id === item.id);
      },
    );
    setBatch(shuffle(sortedWordsBatchOnCategory));
  };

  const getSelectedPlayground = () => {
    if (!batch || !selectedWord) {
      return null;
    }

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
          <Icon name="sound" size={40} color={colors.quaternary} />
        </TouchableOpacity>
      </View>
    );
  };

  const onTtsButtonPress = () => {
    if (selectedWord) {
      Tts.speak(selectedWord.word.name);
    }
  };

  const renderContent = () => {
    return !loadingAd ? (
      <>
        {getImageOrPlayground()}
        {getSelectedPlayground()}
      </>
    ) : (
      <Loading />
    );
  };

  return (
    <ScreenContainer>
      <StatusBar backgroundColor={colors.transparent} translucent />
      {renderContent()}
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
