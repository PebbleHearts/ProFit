import React, {FC, useState} from 'react';
import {View, Text} from 'react-native';

import {LoginPageProps} from './types';

import styles from './styles';
import CustomButton from '../../components/custom-button/CustomButton';
import {supabase} from '../../lib/initSupabase';
import CustomTextInput from '../../components/custom-text-input/CustomTextInput';
import PageLayout from '../../Layout/PageLayout';

export const LoginPage: FC<LoginPageProps> = ({navigation}) => {
  const [email, setEmail] = useState('nirmalmichelp@gmail.com');
  const [password, setPassword] = useState('abcdefg');
  const [authError, setAuthError] = useState('');

  const handleLogin = async () => {
    const {data, error} = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setAuthError(error.message as string);
    }
    if (data && !error) {
      navigation.replace('TabNavigator');
    }
  };
  return (
    <PageLayout>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <View>
          <CustomTextInput value={email} onChangeText={val => setEmail(val)} />
          <CustomTextInput
            value={password}
            secureTextEntry={true}
            onChangeText={val => setPassword(val)}
            containerStyle={styles.passwordContainerStyle}
          />
          <Text style={[styles.errorMessage, styles.loginErrorMessageStyle]}>
            {authError}
          </Text>
          <CustomButton
            label="Login"
            onPress={handleLogin}
            containerStyle={styles.loginButtonContainerStyle}
            labelStyle={styles.loginButtonLabelStyle}
          />
        </View>
      </View>
    </PageLayout>
  );
};

export default LoginPage;
