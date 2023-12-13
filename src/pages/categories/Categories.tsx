import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {View, Text} from 'react-native';

import PageLayout from '../../Layout/PageLayout';
import CategoryItem from '../../components/category-item/CategoryItem';
import {database} from '../../database/init';

import {CategoriesProps} from './types';
import styles from './styles';
import CategoryBottomSheet from '../../components/create-category-bottom-sheet/CreateCategoryBottomSheet';
import FloatingButton from '../../components/floating-button/FloatingButton';
import {CategoryRecord} from '../../database/model/Category';
import {EventsList, emitter} from '../../constants/emitter';

const Categories: FC<CategoriesProps> = ({navigation}) => {
  const bottomSheetRef = useRef<RBSheet>(null);

  const [categoriesList, setCategoriesList] = useState<any>([]);
  const [selectedCategoryDetails, setSelectedCategoryDetails] = useState<{
    name: string;
    id: string;
  } | null>(null);

  const handleCategoryBottomSheetClose = () => {
    bottomSheetRef?.current?.close();
    setSelectedCategoryDetails(null);
  };

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

  const handleEditClick = async (id: string) => {
    const workoutItem = await database
      .get<CategoryRecord>('categories')
      .find(id);
    setSelectedCategoryDetails({id: workoutItem.id, name: workoutItem.name});
    bottomSheetRef.current?.open();
  };

  const handleDeleteClick = async (id: string) => {
    const workoutItem = await database
      .get<CategoryRecord>('categories')
      .find(id);
    await database.write(async () => {
      await workoutItem.markAsDeleted();
    });
    handleCategoriesFetch();
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
    handleCategoryBottomSheetClose();
  };

  const handleSaveCategory = async ({name}: {name: string}) => {
    const categoryItem = await database
      .get<CategoryRecord>('categories')
      .find(selectedCategoryDetails?.id || '');
    try {
      await database.write(async () => {
        await categoryItem.update((workout: any) => {
          workout.name = name;
        });
      });
      handleCategoriesFetch();
    } catch (e) {
      console.log(e);
    }
    handleCategoryBottomSheetClose();
  };

  useEffect(() => {
    emitter.addListener(EventsList.IMPORT_COMPLETE, () => {
      handleCategoriesFetch();
    });
    return () => {
      emitter.removeListener(EventsList.IMPORT_COMPLETE);
    };
  }, [handleCategoriesFetch]);

  return (
    <PageLayout title="ProFit">
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Categories</Text>
        </View>
        {categoriesList?.map(({id, name}: {id: string; name: string}) => (
          <CategoryItem
            key={id}
            name={name}
            onPress={handleCategoryClick(id, name)}
            onEditClick={() => handleEditClick(id)}
            onDeleteClick={() => handleDeleteClick(id)}
            isCTAEnabled={true}
          />
        ))}
        <FloatingButton
          onClick={() => bottomSheetRef?.current?.open()}
          containerStyle={styles.floatingButtonStyle}
        />
        <CategoryBottomSheet
          bottomSheetRef={bottomSheetRef}
          selectedCategoryDetails={selectedCategoryDetails}
          onClose={handleCategoryBottomSheetClose}
          handleCategoryCreation={handleCategoryCreation}
          handleSaveCategory={handleSaveCategory}
        />
      </View>
    </PageLayout>
  );
};

export default Categories;
