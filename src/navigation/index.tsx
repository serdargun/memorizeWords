import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Categories, CategoryLanding, StudyBoard} from '../features';

export default function index() {
  type RootStackParamList = {
    Categories: {};
    CategoryLanding: undefined;
    StudyBoard: {};
  };
  const Stack = createNativeStackNavigator<RootStackParamList>();

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
