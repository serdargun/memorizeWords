import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {Text} from '../../../components';
import {colors} from '../../../constants';

export default function CategoryCarousel({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <View style={styles.container}>
      <Text size={20} color={colors.black} style={styles.label}>
        {label}
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {marginBottom: 20},
  scrollContainer: {paddingHorizontal: 20},
  label: {paddingHorizontal: 20, marginBottom: 10},
});
