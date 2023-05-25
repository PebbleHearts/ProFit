import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootStackNavigator';

export type AuthPreCheckPageProps = StackScreenProps<
  RootStackParamList,
  'AuthPreCheck',
  'rootStack'
>;
