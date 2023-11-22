import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import TabNavigator from './TabNavigator';

export type RootStackParamList = {
  TabNavigator: undefined;
};

// TODO: replace @react-navigation/stack with  @react-navigation/native-stack in order to remove the warning that show at the beginning

const Stack = createStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  return (
    <Stack.Navigator
      id="rootStack"
      initialRouteName="TabNavigator"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
