import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import Categories from '../pages/categories/Categories';
import CategoryDetails from '../pages/category-details/CategoryDetails';

export type CategoriesStackParamList = {
  Categories: undefined;
  CategoryDetails: {
    categoryId: string;
    categoryName: string;
  };
};

const Stack = createStackNavigator<CategoriesStackParamList>();

const CategoriesStackNavigator = () => {
  return (
    <Stack.Navigator
      id="categoryStack"
      initialRouteName="Categories"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen
        name="CategoryDetails"
        component={CategoryDetails}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        }}
      />
    </Stack.Navigator>
  );
};

export default CategoriesStackNavigator;
