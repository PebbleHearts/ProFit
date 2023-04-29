import {StackScreenProps} from '@react-navigation/stack';
import {RootParamList} from '../../navigation/StackNavigator';

export type HomePageProps = StackScreenProps<
  RootParamList,
  'Home',
  'rootStack'
>;
