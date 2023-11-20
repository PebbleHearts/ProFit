import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {View, Text, TouchableOpacity} from 'react-native';

import PageLayout from '../../Layout/PageLayout';
import CategoryItem from '../../components/category-item/CategoryItem';
import {useUserContext} from '../../hooks/UserContext';
import {database} from '../../database/init';

import {CategoriesProps} from './types';
import styles from './styles';
import {supabase} from '../../lib/initSupabase';
import CreateCategoryBottomSheet from '../../components/create-category-bottom-sheet/CreateCategoryBottomSheet';
import {CategoryRecord} from '../../database/model/Category';

const Categories: FC<CategoriesProps> = ({navigation}) => {
  const bottomSheetRef = useRef<RBSheet>(null);
  const {user} = useUserContext();

  const [categoriesList, setCategoriesList] = useState<any>([]);

  const handleCreateCategoryBottomSheetClose = () =>
    bottomSheetRef?.current?.close();

  const handleCategoriesFetch = useCallback(async () => {
    const exerciseCollection = database.get<CategoryRecord>('categories');
    const categories = await exerciseCollection.query().fetch();
    setCategoriesList(categories);
  }, []);

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

  const handleCategoryCreation = async ({name}: {name: string}) => {
    const categoriesCollection = database.get<CategoryRecord>('categories');
    try {
      await database.write(async () => {
        categoriesCollection.create(category => {
          category.name = name;
        });
      });
      handleCategoriesFetch();
    } catch (e) {
      console.log(e);
    }
    handleCreateCategoryBottomSheetClose();
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
        <TouchableOpacity onPress={() => bottomSheetRef?.current?.open()}>
          <Text style={styles.addText}>Add new</Text>
        </TouchableOpacity>
        <CreateCategoryBottomSheet
          bottomSheetRef={bottomSheetRef}
          onClose={handleCreateCategoryBottomSheetClose}
          handleExerciseCreation={handleCategoryCreation}
        />
      </View>
    </PageLayout>
  );
};

export default Categories;
