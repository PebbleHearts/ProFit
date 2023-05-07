import {StackScreenProps} from '@react-navigation/stack';
import {CategoriesStackParamList} from '../../navigation/CategoriesStack';

export type CategoriesProps = StackScreenProps<
  CategoriesStackParamList,
  'Categories',
  'categoryStack'
>;
