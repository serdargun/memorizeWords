import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text} from '../../../components';
import {colors, types} from '../../../constants';
import AnimatedProgress from './AnimatedProgress';
import {CategoryLandingProps} from '../../../navigation';

interface Props {
  data: types.Data;
  accurationPct?: number;
}

const Category = ({data, accurationPct}: Props) => {
  type CategoryLandingScreenNavigationProp = CategoryLandingProps['navigation'];
  const navigation = useNavigation<CategoryLandingScreenNavigationProp>();

  const onPress = () => {
    navigation.navigate('CategoryLanding', {data});
  };

  const renderProgressBar = () => {
    return accurationPct ? (
      <View>
        <Text size={12} color={colors.white}>
          {accurationPct + '%'}
        </Text>
        <AnimatedProgress widthPct={accurationPct} />
      </View>
    ) : null;
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
      onPress={onPress}>
      <View>
        <Text size={16} color={colors.white}>
          {data.translate}
        </Text>
        <Text size={14} color={colors.quaternary}>
          {data.words.length + ' Kelime'}
        </Text>
      </View>
      <View style={styles.iconContainer}>
        <Image
          style={styles.icon}
          source={{
            uri: `https://targetredapple.web.tr/icons/${data.id}.png`,
          }}
        />
      </View>
      {renderProgressBar()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 170,
    height: 130,
    borderRadius: 10,
    backgroundColor: colors.primary,
    padding: 10,
    marginRight: 10,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  iconContainer: {
    backgroundColor: colors.quaternary,
    position: 'absolute',
    right: -50,
    bottom: -60,
    height: 120,
    width: 120,
    borderRadius: 120,
    paddingLeft: 25,
    paddingTop: 15,
  },
  icon: {width: 40, height: 40},
});

export default Category;
