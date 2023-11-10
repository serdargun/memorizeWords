import React from 'react';
import {ScrollView, StatusBar, StyleSheet} from 'react-native';
import data from '../../assets/data.json';
import {Category, CategoryCarousel} from './components';
import {Banner, Header} from '../../components';
import {ScreenContainer} from '../../wrappers';
import {storage} from '../../helpers';
import {Data, WordOnDb} from '../../constants/types';
import {CategoriesProps} from '../../navigation';
import {colors} from '../../constants';

const Categories = ({navigation, route}: CategoriesProps) => {
  const jsonDb = storage.getString('data') || JSON.stringify([]);
  const db = JSON.parse(jsonDb);

  const calcAccurationPct = (category: Data) => {
    const category_id = category.id;
    const isCategoryExistsOnDb = db.some(
      (item: Data) => item.id === category_id,
    );
    const categoryOnDb = db.find((item: WordOnDb) => item.id === category_id);

    type Total = {levelSum: number; wordLength: number};
    if (isCategoryExistsOnDb) {
      const getLevelSum = (
        total: Total,
        item: WordOnDb,
        currentIndex: number,
        arr: WordOnDb[],
      ) => {
        return {levelSum: total.levelSum + item.level, wordLength: arr.length};
      };

      const result = categoryOnDb.words.reduce(getLevelSum, {levelSum: 0});

      const {levelSum, wordLength} = result;

      const calculation = (levelSum * 100) / (wordLength * 3);
      return parseInt(calculation.toFixed(0), 10);
    } else {
      return 0;
    }
  };

  const renderCategories = (top_category: number) => {
    return data.data
      .filter(item => item.top_category === top_category)
      .map((item, index) => {
        const accurationPct = calcAccurationPct(item);

        return (
          <Category key={index} data={item} accurationPct={accurationPct} />
        );
      });
  };

  const renderOngoingCategories = () => {
    const ongoingCategories = data.data.filter(item => {
      const isOngoingCategory = db?.some(
        (dbCategory: Data) => dbCategory.id === item.id,
      );
      if (isOngoingCategory) {
        return true;
      }
    });
    const sortedOngoingCategories = ongoingCategories
      .map(item => {
        const accurationPct = calcAccurationPct(item);
        return {...item, accurationPct};
      })
      .sort((a, b) => b.accurationPct - a.accurationPct);
    return (
      sortedOngoingCategories.length >= 1 && (
        <CategoryCarousel label="Devam ediyor">
          {sortedOngoingCategories.map((item, index) => {
            const accurationPct = calcAccurationPct(item);
            return (
              <Category key={index} data={item} accurationPct={accurationPct} />
            );
          })}
        </CategoryCarousel>
      )
    );
  };

  return (
    <ScreenContainer>
      <StatusBar backgroundColor={colors.tertiary} />
      <Header title="Kategoriler" />
      <ScrollView contentContainerStyle={styles.content}>
        {renderOngoingCategories()}
        <CategoryCarousel label="Yaşam">{renderCategories(0)}</CategoryCarousel>
        <CategoryCarousel label="Kişisel">
          {renderCategories(1)}
        </CategoryCarousel>
        <CategoryCarousel label="Hobiler">
          {renderCategories(2)}
        </CategoryCarousel>
        <CategoryCarousel label="Yerleşim Yeri">
          {renderCategories(3)}
        </CategoryCarousel>
        <CategoryCarousel label="Dünya">{renderCategories(4)}</CategoryCarousel>
        <CategoryCarousel label="Eğitim">
          {renderCategories(5)}
        </CategoryCarousel>
      </ScrollView>
      <Banner />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {marginTop: 20},
});

export default Categories;

//0 Life ids: 1, 2, 6, 7, 9, 15, 16, 19, 20, 21, 22
//1 Personal ids: 0, 11
//2 Hobbies ids: 4, 8, 17
//3 Places ids: 12, 13, 14
//4 World ids: 5, 18
//5 Education: 3, 10
