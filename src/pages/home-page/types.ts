import {StackScreenProps} from '@react-navigation/stack';
import {BottomTabBarNavigatorParamList} from '../../navigation/TabNavigator';

export type HomePageProps = StackScreenProps<
  BottomTabBarNavigatorParamList,
  'HomePage',
  'rootStack'
>;
