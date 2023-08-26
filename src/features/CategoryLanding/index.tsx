import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {colors} from '../../constants';
import {storage} from '../../helpers';
import {ScreenContainer} from '../../wrappers';
import {Button, Text} from '../../components';
import {WordListItem} from './components';
import {CategoryLandingProps} from '../../navigation';
import {CategoryOnDb, Word, WordOnDb} from '../../constants/types';

export default function CategoryLanding({
  route,
  navigation,
}: CategoryLandingProps) {
  const {data} = route.params;
  const jsonDb = storage.getString('data') || JSON.stringify([]);
  const db = JSON.parse(jsonDb);
  const category_id = data.id;
  const isCategoryExistsOnDb = db.some(
    (item: CategoryOnDb) => item.id === category_id,
  );
  const categoryOnDb = db.find((item: CategoryOnDb) => item.id === category_id);

  const [wordsOnDb, setWordsOnDb] = useState<WordOnDb[] | null>(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isCategoryExistsOnDb) {
      //if this category not exists in storage, add
      const words = data.words.map(item => {
        return {id: item.id, level: 0};
      });
      const category = {id: category_id, words};

      db.push(category);
      storage.set('data', JSON.stringify(db));
      setWordsOnDb(words);
    }
    if (isFocused && isCategoryExistsOnDb) {
      setWordsOnDb(categoryOnDb.words);
    }
  }, [isFocused]);

  const renderItem = (item: Word) => {
    if (wordsOnDb) {
      const word = wordsOnDb.find(word => word.id === item.id);
      if (word) {
        return <WordListItem item={item} level={word.level} />;
      }
      return null;
    }
    return null;
  };

  {
    /**
notification system olusturulacak MVP sonrasi
internetsiz resimler yuklenemeyecegi icin internet uyarisi koyulacak
**/
  }

  return (
    <ScreenContainer>
      <Text size={36} color={colors.primary} style={styles.title}>
        {data.category_name}
      </Text>
      <FlatList
        contentContainerStyle={styles.list}
        data={data.words}
        renderItem={item => renderItem(item.item)}
      />
      <Button
        label="Başla"
        onPress={() => navigation.navigate('StudyBoard', {data})}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {paddingHorizontal: 20},
  list: {paddingHorizontal: 20, paddingVertical: 20},
});
