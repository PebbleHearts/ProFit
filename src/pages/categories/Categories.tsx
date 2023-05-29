import React, {FC, useCallback, useEffect, useState} from 'react';
import {View, Text} from 'react-native';

import PageLayout from '../../Layout/PageLayout';
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

  const handleCategoryClick =
    (categoryId: string, categoryName: string) => () => {
      navigation.navigate('CategoryDetails', {categoryId, categoryName});
    };

  // TODO: use this function to create a category when needed
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onAddCategory = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {error} = await supabase
      .from('categories')
      .insert({user_id: user?.id, name: 'Chest'});
  };

  // TODO: show an alert while deleting saying, deleting the category will delete the exercises related to it.

  return (
    <PageLayout title="ProFit">
      <View style={styles.container}>
        <Text style={styles.title}>Categories</Text>
        {categoriesList?.map(({id, name}: {id: string; name: string}) => (
          <CategoryItem
            key={id}
            name={name}
            onPress={handleCategoryClick(id, name)}
          />
        ))}
      </View>
    </PageLayout>
  );
};

export default Categories;
