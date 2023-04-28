import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomePage from '../pages/HomePage';
import EditPage from '../pages/Edit';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="Edit" component={EditPage} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
