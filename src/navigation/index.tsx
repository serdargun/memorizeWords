import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {Categories, CategoryLanding, StudyBoard} from '../features';
import {types} from '../constants';

type RootStackParamList = {
  Categories: {};
  CategoryLanding: {data: types.Data};
  StudyBoard: {data: types.Data};
};
const Stack = createNativeStackNavigator<RootStackParamList>();

export type CategoryLandingProps = NativeStackScreenProps<
  RootStackParamList,
  'CategoryLanding'
>;

export type StudyBoardProps = NativeStackScreenProps<
  RootStackParamList,
  'StudyBoard'
>;

export default function index() {
  const screenOptions = {headerShown: false};

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name="CategoryLanding" component={CategoryLanding} />
        <Stack.Screen name="StudyBoard" component={StudyBoard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
