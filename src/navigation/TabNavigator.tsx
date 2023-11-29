import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomePage from '../pages/home-page/HomePage';
import TabBar from '../components/tab-bar/TabBar';
import CategoriesStackNavigator from './CategoriesStack';
import {DumbellOutline, CategoriesIcon} from '../assets/svg';
import Routines from '../pages/routines/Routines';
import Settings from '../pages/settings/Settings';

export type BottomTabBarNavigatorParamList = {
  HomePage: undefined;
  CategoriesStack: undefined;
  Routines: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<BottomTabBarNavigatorParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      id="tabNavigator"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <TabBar {...props} />}>
      <Tab.Screen
        name="HomePage"
        component={HomePage}
        options={{tabBarIcon: DumbellOutline}}
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
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{tabBarIcon: CategoriesIcon}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
