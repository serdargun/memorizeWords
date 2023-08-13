import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text} from '../../../components';
import {colors} from '../../../constants';
import AnimatedProgress from './AnimatedProgress';

export default function Category({data, accurationPct}) {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('CategoryLanding', {data});
  };

  const renderProgressBar = () => {
    const hasAccurationPct = Boolean(accurationPct);
    return (
      hasAccurationPct && (
        <View>
          <Text size={12} color={colors.white}>
            {accurationPct + '%'}
          </Text>
          <AnimatedProgress widthPct={accurationPct} />
        </View>
      )
    );
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
      onPress={onPress}>
      <View>
        <Text size={16} color={colors.white}>
          {data.category_name}
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
}

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
