import React, {FC, useCallback, useEffect, useState} from 'react';
import {View, Text} from 'react-native';

import PageLayout from '../../Layout/PageLayout';
import {CATEGORIES} from '../../constants/categories';
import CategoryItem from '../../components/category-item/CategoryItem';
import {useUserContext} from '../../hooks/UserContext';

import {CategoriesProps} from './types';
import styles from './styles';
import {supabase} from '../../lib/initSupabase';

const Categories: FC<CategoriesProps> = ({navigation}) => {
  const {user} = useUserContext();

  const [categoriesList, setCategoriesList] = useState<any>([]);

  const handleCategoriesFetch = useCallback(async () => {
    const {data, error} = await supabase
      .from('categories')
      .select('id,name,created_at')
      .eq('user_id', user?.id);

    if (!error && data) {
      setCategoriesList(data);
    }
  }, [user?.id]);

  useEffect(() => {
    if (user?.id) {
      handleCategoriesFetch();
    }
  }, [handleCategoriesFetch, user?.id]);

  const handleCategoryClick = (categoryId: number) => () => {
    navigation.navigate('CategoryDetails', {categoryId});
  };

  // TODO: use this function to create a category when needed
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onAddCategory = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {error} = await supabase
      .from('categories')
      .insert({user_id: user?.id, name: 'Chest'});
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
        <Text>dddd</Text>
        {categoriesList?.map(({id, name}) => (
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
