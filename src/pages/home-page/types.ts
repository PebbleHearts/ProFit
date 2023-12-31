import {StackScreenProps} from '@react-navigation/stack';
import {HistoryStackParamList} from '../../navigation/HistoryStack';

export type HomePageProps = StackScreenProps<
  HistoryStackParamList,
  'HomePage',
  'rootStack'
>;
