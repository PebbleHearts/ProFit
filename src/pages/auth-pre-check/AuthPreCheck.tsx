import React, {FC, useEffect} from 'react';

import {useUserContext} from '../../hooks/UserContext';

import {AuthPreCheckPageProps} from './types';

const AuthPreCheck: FC<AuthPreCheckPageProps> = ({navigation}) => {
  const {user, session} = useUserContext();

  useEffect(() => {
    if (user !== undefined && session !== undefined) {
      if (user && session) {
        navigation.replace('TabNavigator');
      } else {
        navigation.replace('LoginPage');
      }
    }
  }, [navigation, session, user]);

  return <></>;
};

export default AuthPreCheck;
