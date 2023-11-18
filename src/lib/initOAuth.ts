import {GoogleSignin} from '@react-native-google-signin/google-signin';
import ENV from '../constants/env';

GoogleSignin.configure({
  webClientId: ENV.OAUTH_CLIENT_WEB_ID,
  scopes: ['profile', 'email'],
});
