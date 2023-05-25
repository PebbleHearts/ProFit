import React, {FC} from 'react';
import {View, Text} from 'react-native';

import {LoginPageProps} from './types';

import styles from './styles';
import CustomButton from '../../components/custom-button/CustomButton';
import {supabase} from '../../lib/initSupabase';

export const LoginPage: FC<LoginPageProps> = ({navigation}) => {
  const handleLogin = async () => {
    const {data, error} = await supabase.auth.signUp({
      email: 'nirmalmichelp@gmail.com',
      password: 'abcd',
    });
    console.log({data, error});
    if (data && !error) {
      navigation.navigate('TabNavigator');
    }
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={styles.sampleText}>Login Page</Text>
      <CustomButton
        label="Login"
        onPress={handleLogin}
        containerStyle={styles.loginButtonContainerStyle}
        labelStyle={styles.loginButtonLabelStyle}
      />
    </View>
  );
};

export default LoginPage;
