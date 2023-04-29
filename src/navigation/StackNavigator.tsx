import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import HomePage from '../pages/home-page/HomePage';

export type RootParamList = {
  Home: undefined;
};

const Stack = createStackNavigator<RootParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      id="rootStack"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name="Home" component={HomePage} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
