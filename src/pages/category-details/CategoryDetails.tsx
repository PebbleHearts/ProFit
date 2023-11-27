import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Q} from '@nozbe/watermelondb';

import PageLayout from '../../Layout/PageLayout';
import WorkoutItem from '../../components/workout-item/WorkoutItem';
import CreateExerciseBottomSheet from '../../components/create-exercise-bottom-sheet/CreateExerciseBottomSheet';
import {database} from '../../database/init';

import styles from './styles';
import {CategoryDetailsProps} from './types';
import {ExerciseRecord} from '../../database/model/Exercise';
import FloatingButton from '../../components/floating-button/FloatingButton';

const CategoryDetails: FC<CategoryDetailsProps> = ({route}) => {
  const {categoryId, categoryName} = route.params ?? {};

  const [exercisesList, setExercisesList] = useState<any>([]);
  const bottomSheetRef = useRef<RBSheet>(null);

  const handleCreateExerciseBottomSheetClose = () =>
    bottomSheetRef?.current?.close();
  const handleExerciseCreation = async ({name}: {name: string}) => {
    try {
      const categoryItem = await database.get('categories').find(categoryId);
      await database.write(async () => {
        database.get('exercises').create((exercise: any) => {
          exercise.name = name;
          exercise.category.set(categoryItem);
        });
      });
      handleExercisesListFetch();
    } catch (e) {
      console.log(e);
    }
    handleCreateExerciseBottomSheetClose();
  };

  const handleExercisesListFetch = useCallback(async () => {
    const exerciseCollection = database.get<ExerciseRecord>('exercises');
    const exercises = await exerciseCollection
      .query(Q.where('category_id', categoryId))
      .fetch();
    setExercisesList(exercises);
  }, [categoryId]);

  useEffect(() => {
    handleExercisesListFetch();
  }, [handleExercisesListFetch]);
  return (
    <PageLayout title="ProFit">
      <View style={styles.container}>
        <Text style={styles.title}>{categoryName}</Text>
        <View>
          {exercisesList?.map(({id, name}: {id: string; name: string}) => (
            <WorkoutItem key={id} name={name} />
          ))}
        </View>
        <FloatingButton
          onClick={() => bottomSheetRef?.current?.open()}
          containerStyle={styles.floatingButtonStyle}
        />
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
