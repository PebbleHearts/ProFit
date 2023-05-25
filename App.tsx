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

import StackNavigator from './src/navigation/RootStackNavigator';
import {UserContextProvider} from './src/hooks/UserContext';

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <UserContextProvider>
          <StackNavigator />
        </UserContextProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
