import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {View, Text} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Q} from '@nozbe/watermelondb';

import PageLayout from '../../Layout/PageLayout';
import WorkoutItem from '../../components/workout-item/WorkoutItem';
import ExerciseBottomSheet from '../../components/create-exercise-bottom-sheet/CreateExerciseBottomSheet';
import {database} from '../../database/init';

import styles from './styles';
import {CategoryDetailsProps} from './types';
import {ExerciseRecord} from '../../database/model/Exercise';
import FloatingButton from '../../components/floating-button/FloatingButton';
import {EventsList, emitter} from '../../constants/emitter';

const CategoryDetails: FC<CategoryDetailsProps> = ({route}) => {
  const {categoryId, categoryName} = route.params ?? {};

  const [exercisesList, setExercisesList] = useState<any>([]);
  const [selectedExerciseDetails, setSelectedExerciseDetails] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const bottomSheetRef = useRef<RBSheet>(null);

  const handleExerciseBottomSheetClose = () => bottomSheetRef?.current?.close();
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
    handleExerciseBottomSheetClose();
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

  const handleEditClick = async (id: string) => {
    const exerciseItem = await database
      .get<ExerciseRecord>('exercises')
      .find(id);
    setSelectedExerciseDetails({id: exerciseItem.id, name: exerciseItem.name});
    bottomSheetRef.current?.open();
  };

  const handleDeleteClick = async (id: string) => {
    const exerciseItem = await database
      .get<ExerciseRecord>('exercises')
      .find(id);
    await database.write(async () => {
      await exerciseItem.markAsDeleted();
    });
    handleExercisesListFetch();
  };

  const handleSaveExercise = async ({name}: {name: string}) => {
    const categoryItem = await database
      .get<ExerciseRecord>('exercises')
      .find(selectedExerciseDetails?.id || '');
    try {
      await database.write(async () => {
        await categoryItem.update((workout: any) => {
          workout.name = name;
        });
      });
      handleExercisesListFetch();
    } catch (e) {
      console.log(e);
    }
    handleExerciseBottomSheetClose();
  };

  useEffect(() => {
    emitter.addListener(EventsList.IMPORT_COMPLETE, () => {
      handleExercisesListFetch();
    });
    return () => {
      emitter.removeListener(EventsList.IMPORT_COMPLETE);
    };
  }, [handleExercisesListFetch]);
  return (
    <PageLayout showBackButton>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>{categoryName}</Text>
        </View>
        <View>
          {exercisesList?.map(({id, name}: {id: string; name: string}) => (
            <WorkoutItem
              key={id}
              name={name}
              onEditClick={() => handleEditClick(id)}
              onDeleteClick={() => handleDeleteClick(id)}
              isCTAEnabled={true}
            />
          ))}
        </View>
        <FloatingButton
          onClick={() => bottomSheetRef?.current?.open()}
          containerStyle={styles.floatingButtonStyle}
        />
        <ExerciseBottomSheet
          bottomSheetRef={bottomSheetRef}
          categoryName={categoryName}
          selectedExerciseDetails={selectedExerciseDetails}
          onClose={handleExerciseBottomSheetClose}
          handleExerciseCreation={handleExerciseCreation}
          handleSaveExercise={handleSaveExercise}
        />
      </View>
    </PageLayout>
  );
};

export default CategoryDetails;
