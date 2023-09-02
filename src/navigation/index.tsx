import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Categories, CategoryLanding, Network, StudyBoard} from '../features';
import {RootStackParamList} from './types';
export * from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function index() {
  const screenOptions = {headerShown: false};

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name="CategoryLanding" component={CategoryLanding} />
        <Stack.Screen name="StudyBoard" component={StudyBoard} />
        <Stack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen name="Network" component={Network} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
