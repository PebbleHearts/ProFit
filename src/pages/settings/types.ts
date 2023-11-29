import {StackScreenProps} from '@react-navigation/stack';
import {BottomTabBarNavigatorParamList} from '../../navigation/TabNavigator';

export type SettingsProps = StackScreenProps<
  BottomTabBarNavigatorParamList,
  'Settings',
  'rootStack'
>;
