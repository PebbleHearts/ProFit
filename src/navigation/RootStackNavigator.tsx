import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import LoginPage from '../pages/LoginPage/LoginPage';
import AuthPreCheck from '../pages/auth-pre-check/AuthPreCheck';
import TabNavigator from './TabNavigator';

export type RootStackParamList = {
  LoginPage: undefined;
  TabNavigator: undefined;
  AuthPreCheck: undefined;
};

// TODO: replace @react-navigation/stack with  @react-navigation/native-stack in order to remove the warning that show at the beginning

const Stack = createStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  return (
    <Stack.Navigator
      id="rootStack"
      initialRouteName="AuthPreCheck"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name="AuthPreCheck" component={AuthPreCheck} />
      <Stack.Screen name="LoginPage" component={LoginPage} />
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
