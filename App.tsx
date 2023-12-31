/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import './src/database/init';
import './src/lib/initOAuth';

import StackNavigator from './src/navigation/RootStackNavigator';
import {UserProvider} from './src/context/ UserContext';

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <UserProvider>
          <StackNavigator />
        </UserProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
