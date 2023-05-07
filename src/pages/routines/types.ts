import {StackScreenProps} from '@react-navigation/stack';
import {BottomTabBarNavigatorParamList} from '../../navigation/TabNavigator';

export type RoutinesProps = StackScreenProps<
  BottomTabBarNavigatorParamList,
  'Routines',
  'rootStack'
>;
