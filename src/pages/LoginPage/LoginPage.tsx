import React, {FC} from 'react';
import {View, Text} from 'react-native';

import {LoginPageProps} from './types';

import styles from './styles';
import CustomButton from '../../components/custom-button/CustomButton';

export const LoginPage: FC<LoginPageProps> = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={styles.sampleText}>Login Page</Text>
      <CustomButton
        label="Login"
        onPress={() => navigation.navigate('TabNavigator')}
        containerStyle={styles.loginButtonContainerStyle}
        labelStyle={styles.loginButtonLabelStyle}
      />
    </View>
  );
};

export default LoginPage;
