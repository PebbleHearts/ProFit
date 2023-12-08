import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import HomePage from '../pages/home-page/HomePage';
import SelectDailyWorkouts from '../pages/select-daily-workouts/SelectDailyWorkouts';

export type HistoryStackParamList = {
  HomePage: undefined;
  SelectDailyWorkouts: {selectedDate: string};
};

const Stack = createStackNavigator<HistoryStackParamList>();

const HistoryStackNavigator = () => {
  return (
    <Stack.Navigator
      id="historyStack"
      initialRouteName="HomePage"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen
        name="SelectDailyWorkouts"
        component={SelectDailyWorkouts}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        }}
      />
    </Stack.Navigator>
  );
};

export default HistoryStackNavigator;
