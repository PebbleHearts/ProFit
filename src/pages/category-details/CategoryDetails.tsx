import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

import PageLayout from '../../Layout/PageLayout';
import WorkoutItem from '../../components/workout-item/WorkoutItem';
import CreateExerciseBottomSheet from '../../components/create-exercise-bottom-sheet/CreateExerciseBottomSheet';
import {supabase} from '../../lib/initSupabase';
import {useUserContext} from '../../hooks/UserContext';

import styles from './styles';
import {CategoryDetailsProps} from './types';

const CategoryDetails: FC<CategoryDetailsProps> = ({route}) => {
  const {categoryId, categoryName} = route.params ?? {};

  const {user} = useUserContext();

  const [exercisesList, setExercisesList] = useState<any>([]);
  const bottomSheetRef = useRef<RBSheet>(null);

  const handleCreateExerciseBottomSheetClose = () =>
    bottomSheetRef?.current?.close();
  const handleExerciseCreation = async ({name}: {name: string}) => {
    const {error} = await supabase.from('exercises').insert({
      user_id: user?.id,
      name,
      category: categoryId,
    });
    handleCreateExerciseBottomSheetClose();
  };

  const handleCategoriesFetch = useCallback(async () => {
    if (categoryId) {
      const {data, error} = await supabase
        .from('exercises')
        .select('id,name,created_at')
        .eq('user_id', user?.id)
        .eq('category', categoryId);

      if (!error && data) {
        setExercisesList(data);
      }
    }
  }, [user?.id, categoryId]);

  useEffect(() => {
    if (user?.id) {
      handleCategoriesFetch();
    }
  }, [handleCategoriesFetch, user?.id]);
  return (
    <PageLayout title="ProFit">
      <View style={styles.container}>
        <Text style={styles.title}>{categoryName}</Text>
        <View>
          {exercisesList?.map(({id, name}: {id: string; name: string}) => (
            <WorkoutItem key={id} name={name} />
          ))}
        </View>
        <TouchableOpacity onPress={() => bottomSheetRef?.current?.open()}>
          <Text>Add new</Text>
        </TouchableOpacity>
        <CreateExerciseBottomSheet
          bottomSheetRef={bottomSheetRef}
          onClose={handleCreateExerciseBottomSheetClose}
          categoryName={categoryName}
          handleExerciseCreation={handleExerciseCreation}
        />
      </View>
    </PageLayout>
  );
};

export default CategoryDetails;
