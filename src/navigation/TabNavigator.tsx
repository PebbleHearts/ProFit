import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomePage from '../pages/home-page/HomePage';
import TabBar from '../components/tab-bar/TabBar';
import CategoriesStackNavigator from './CategoriesStack';
import {DumbbellOutline, CategoriesIcon} from '../assets/svg';
import Routines from '../pages/routines/Routines';

export type BottomTabBarNavigatorParamList = {
  HomePage: undefined;
  CategoriesStack: undefined;
  Routines: undefined;
};

const Tab = createBottomTabNavigator<BottomTabBarNavigatorParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <TabBar {...props} />}>
      <Tab.Screen
        name="HomePage"
        component={HomePage}
        options={{tabBarIcon: DumbbellOutline}}
      />
      <Tab.Screen
        name="CategoriesStack"
        component={CategoriesStackNavigator}
        options={{tabBarIcon: CategoriesIcon}}
      />
      <Tab.Screen
        name="Routines"
        component={Routines}
        options={{tabBarIcon: CategoriesIcon}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
