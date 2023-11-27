import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {View, Text, TouchableOpacity} from 'react-native';

import PageLayout from '../../Layout/PageLayout';
import CategoryItem from '../../components/category-item/CategoryItem';
import {database} from '../../database/init';

import {CategoriesProps} from './types';
import styles from './styles';
import CreateCategoryBottomSheet from '../../components/create-category-bottom-sheet/CreateCategoryBottomSheet';
import FloatingButton from '../../components/floating-button/FloatingButton';
import {CategoryRecord} from '../../database/model/Category';

const Categories: FC<CategoriesProps> = ({navigation}) => {
  const bottomSheetRef = useRef<RBSheet>(null);

  const [categoriesList, setCategoriesList] = useState<any>([]);

  const handleCreateCategoryBottomSheetClose = () =>
    bottomSheetRef?.current?.close();

  const handleCategoriesFetch = useCallback(async () => {
    const categoriesCollection = database.get<CategoryRecord>('categories');
    const categories = await categoriesCollection.query().fetch();
    setCategoriesList(categories);
  }, []);

  useEffect(() => {
    handleCategoriesFetch();
  }, [handleCategoriesFetch]);

  const handleCategoryClick =
    (categoryId: string, categoryName: string) => () => {
      navigation.navigate('CategoryDetails', {categoryId, categoryName});
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
        <FloatingButton
          onClick={() => bottomSheetRef?.current?.open()}
          containerStyle={styles.floatingButtonStyle}
        />
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
