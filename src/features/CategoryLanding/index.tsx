import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {colors} from '../../constants';
import {storage} from '../../helpers';
import {ScreenContainer} from '../../wrappers';
import {Button, Text} from '../../components';
import {WordListItem} from './components';

export default function CategoryLanding({route, navigation}) {
  const {data} = route.params;
  const jsonDb = storage.getString('data') || JSON.stringify([]);
  const db = JSON.parse(jsonDb);
  const category_id = data.id;
  const isCategoryExistsOnDb = db.some(item => item.id === category_id);
  const categoryOnDb = db.find(item => item.id === category_id);

  const [wordsOnDb, setWordsOnDb] = useState(null);

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

  const renderItem = item => {
    const word = wordsOnDb.find(word => word.id === item.item.id);
    return <WordListItem item={item.item} level={word.level} />;
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
      {wordsOnDb && (
        <FlatList
          contentContainerStyle={styles.list}
          data={data.words}
          renderItem={renderItem}
        />
      )}
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
