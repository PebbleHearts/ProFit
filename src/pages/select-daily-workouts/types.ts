import {StackScreenProps} from '@react-navigation/stack';
import {HistoryStackParamList} from '../../navigation/HistoryStack';

export type SelectDailyWorkoutsProps = StackScreenProps<
  HistoryStackParamList,
  'SelectDailyWorkouts',
  'historyStack'
>;
