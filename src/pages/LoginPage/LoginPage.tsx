import React, {FC} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {LoginPageProps} from './types';

export const LoginPage: FC<LoginPageProps> = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Login Page</Text>
      <TouchableOpacity onPress={() => navigation.navigate('TabNavigator')}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginPage;
