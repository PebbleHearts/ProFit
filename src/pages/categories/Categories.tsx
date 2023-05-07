import React, {FC} from 'react';
import {View, Text} from 'react-native';

import PageLayout from '../../Layout/PageLayout';
import {CATEGORIES} from '../../constants/categories';
import CategoryItem from '../../components/category-item/CategoryItem';

import {CategoriesProps} from './types';
import styles from './styles';

const Categories: FC<CategoriesProps> = ({navigation}) => {
  const handleCategoryClick = (categoryId: number) => () => {
    navigation.navigate('CategoryDetails', {categoryId});
  };
  return (
    <PageLayout title="ProFit">
      <View style={styles.container}>
        <Text style={styles.title}>Categories</Text>
        {CATEGORIES.map(({id, name}) => (
          <CategoryItem
            key={id}
            name={name}
            onPress={handleCategoryClick(id)}
          />
        ))}
      </View>
    </PageLayout>
  );
};

export default Categories;
