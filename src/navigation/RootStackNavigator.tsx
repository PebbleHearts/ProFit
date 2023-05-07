import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import LoginPage from '../pages/LoginPage/LoginPage';
import TabNavigator from './TabNavigator';

export type RootStackParamList = {
  LoginPage: undefined;
  TabNavigator: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  return (
    <Stack.Navigator
      id="rootStack"
      initialRouteName="LoginPage"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name="LoginPage" component={LoginPage} />
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
