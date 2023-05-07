import {StackScreenProps} from '@react-navigation/stack';
import {CategoriesStackParamList} from '../../navigation/CategoriesStack';

export type CategoryDetailsProps = StackScreenProps<
  CategoriesStackParamList,
  'CategoryDetails',
  'categoryStack'
>;
