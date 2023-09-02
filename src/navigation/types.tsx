import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {types} from '../constants';

export type RootStackParamList = {
  Categories: undefined;
  CategoryLanding: {data: types.Data};
  StudyBoard: {data: types.Data};
  Network: undefined;
};

export type CategoriesProps = NativeStackScreenProps<
  RootStackParamList,
  'Categories'
>;

export type CategoryLandingProps = NativeStackScreenProps<
  RootStackParamList,
  'CategoryLanding'
>;

export type StudyBoardProps = NativeStackScreenProps<
  RootStackParamList,
  'StudyBoard'
>;

export type NetworkProps = NativeStackScreenProps<
  RootStackParamList,
  'Network'
>;

export type CategoriesScreenNavigationProp = CategoriesProps['navigation'];
export type CategoryLandingScreenNavigationProp =
  CategoryLandingProps['navigation'];
export type StudyBoardScreenNavigationProp = CategoryLandingProps['navigation'];
export type NetworkScreenNavigationProp = CategoryLandingProps['navigation'];
