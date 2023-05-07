import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootStackNavigator';

export type LoginPageProps = StackScreenProps<
  RootStackParamList,
  'LoginPage',
  'rootStack'
>;
