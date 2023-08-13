import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import data from '../../assets/data.json';
import {Category, CategoryCarousel} from './components';
import {Text} from '../../components';
import {ScreenContainer} from '../../wrappers';
import {colors} from '../../constants';
import {storage} from '../../helpers';

const Categories = () => {
  const jsonDb = storage.getString('data') || JSON.stringify([]);
  const db = JSON.parse(jsonDb);

  const calcAccurationPct = category => {
    const category_id = category.id;
    const isCategoryExistsOnDb = db.some(item => item.id === category_id);
    const categoryOnDb = db.find(item => item.id === category_id);

    if (isCategoryExistsOnDb) {
      const getLevelSum = (total, item, currentIndex, arr) => {
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

  const renderCategories = top_category => {
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
        dbCategory => dbCategory.id === item.id,
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

    return sortedOngoingCategories.map((item, index) => {
      const accurationPct = calcAccurationPct(item);
      return <Category key={index} data={item} accurationPct={accurationPct} />;
    });
  };

  return (
    <ScreenContainer>
      <Text size={36} color={colors.primary} style={styles.title}>
        Kelimeler
      </Text>
      <ScrollView>
        <CategoryCarousel label="Devam ediyor">
          {renderOngoingCategories()}
        </CategoryCarousel>
        <CategoryCarousel label="Life">{renderCategories(0)}</CategoryCarousel>
        <CategoryCarousel label="Personal">
          {renderCategories(1)}
        </CategoryCarousel>
        <CategoryCarousel label="Hobbies">
          {renderCategories(2)}
        </CategoryCarousel>
        <CategoryCarousel label="Places">
          {renderCategories(3)}
        </CategoryCarousel>
        <CategoryCarousel label="World">{renderCategories(4)}</CategoryCarousel>
        <CategoryCarousel label="Education">
          {renderCategories(5)}
        </CategoryCarousel>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  title: {paddingHorizontal: 20, marginBottom: 20},
});

export default Categories;

//0 Life ids: 1, 2, 6, 7, 9, 15, 16, 19, 20, 21, 22
//1 Personal ids: 0, 11
//2 Hobbies ids: 4, 8, 17
//3 Places ids: 12, 13, 14
//4 World ids: 5, 18
//5 Education: 3, 10
