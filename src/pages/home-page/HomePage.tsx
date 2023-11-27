import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

import {Q} from '@nozbe/watermelondb';
import PageLayout from '../../Layout/PageLayout';
import {HomePageProps} from './types';
import {database} from '../../database/init';

import CalenderStrip from '../../components/calender-strip/calenderStrip';
import FloatingButton from '../../components/floating-button/FloatingButton';

import DayWorkoutItem from '../../components/day-workout-item/DayWorkoutItem';
import DailyExerciseSelectionBottomSheet from '../../components/daily-exercise-selection-bottom-sheet/DailyExerciseSelectionBottomSheet';

import styles from './styles';
import {WorkoutRecord} from '../../database/model/Workout';
import {CategoryRecord} from '../../database/model/Category';
import {ExerciseRecord} from '../../database/model/Exercise';
import {getDateStringFromDateObject} from '../../utils/calender';
import EditWorkoutBottomSheet from '../../components/edit-workout-bottom-sheet/EditWorkoutBottomSheet';

const HomePage: FC<HomePageProps> = () => {
  const [categoriesList, setCategoriesList] = useState<any>([]);
  const [workouts, setWorkouts] = useState<any>([]);
  const [exercisesList, setExercisesList] = useState<any>([]);
  const bottomSheetRef = useRef<RBSheet>(null);
  const editBottomSheetRef = useRef<RBSheet>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutRecord | null>(
    null,
  );

  const handleCategoriesFetch = useCallback(async () => {
    const exerciseCollection = database.get<CategoryRecord>('categories');
    const categories = await exerciseCollection.query().fetch();
    setCategoriesList(categories);
  }, []);

  const handleWorkoutFetch = useCallback(async () => {
    const date = getDateStringFromDateObject(selectedDate);
    const exerciseCollection = database.get<WorkoutRecord>('workouts');
    const workoutsList = await exerciseCollection
      .query(Q.where('date', date))
      .fetch();

    const formattedCurrentWorkout = [];
    for (let i = 0; i < workoutsList.length; i++) {
      const currentExercise = workoutsList[i];
      const exercise = await currentExercise.exercise;
      const workout = {
        id: currentExercise.id,
        info: currentExercise.info,
        records: currentExercise.records,
        exercise: {
          id: exercise.id,
          name: exercise.name,
        },
      };
      formattedCurrentWorkout.push(workout);
    }
    setWorkouts(formattedCurrentWorkout);
  }, [selectedDate]);

  useEffect(() => {
    handleCategoriesFetch();
  }, [handleCategoriesFetch]);

  useEffect(() => {
    handleWorkoutFetch();
  }, [handleWorkoutFetch]);

  const handleCategorySelection = async (categoryId: string) => {
    if (categoryId) {
      const exerciseCollection = database.get<ExerciseRecord>('exercises');
      const exercises = await exerciseCollection
        .query(Q.where('category_id', categoryId))
        .fetch();
      setExercisesList(exercises);
    }
  };

  const handleCreateExerciseBottomSheetClose = () => {
    setExercisesList([]);
    bottomSheetRef?.current?.close();
  };

  const handleDateSelection = useCallback((value: Date) => {
    setSelectedDate(value);
  }, []);

  const onDailyExerciseAddition = async (exerciseIds: string[]) => {
    const date = getDateStringFromDateObject(selectedDate);
    try {
      for (let i = 0; i < exerciseIds.length; i++) {
        const exerciseId = exerciseIds[i];
        const exerciseItem = await database.get('exercises').find(exerciseId);
        await database.write(async () => {
          database.get('workouts').create((workout: any) => {
            workout.date = date;
            workout.exercise.set(exerciseItem);
            workout.records = [{weight: '0', reps: '0'}];
            workout.info = '';
          });
        });
      }
      handleWorkoutFetch();
    } catch (e) {
      console.log(e);
    }
    bottomSheetRef.current?.close();
  };

  const handleDelete = (workoutId: string) => async () => {
    const workoutItem = await database
      .get<WorkoutRecord>('workouts')
      .find(workoutId);
    await database.write(async () => {
      await workoutItem.destroyPermanently();
    });
    handleWorkoutFetch();
  };

  const handleEdit = (workoutId: string) => async () => {
    const workoutItem = await database
      .get<WorkoutRecord>('workouts')
      .find(workoutId);
    setSelectedWorkout(workoutItem);
    editBottomSheetRef?.current?.open();
  };

  const handleEditExerciseBottomSheetClose = () => {
    setExercisesList([]);
    editBottomSheetRef?.current?.close();
  };

  const completeWorkoutEdit = async ({
    info,
    records,
  }: {
    info: string;
    records: any[];
  }) => {
    const workoutItem = await database
      .get<WorkoutRecord>('workouts')
      .find(selectedWorkout?.id || '');
    await database.write(async () => {
      await workoutItem.update((workout: any) => {
        workout.records = records;
        workout.info = info;
      });
    });
    setSelectedWorkout(null);
    handleEditExerciseBottomSheetClose();
    handleWorkoutFetch();
  };

  return (
    <PageLayout title="ProFit">
      <>
        <View style={styles.container}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>Workouts</Text>
          </View>
          <ScrollView>
            <View style={styles.workoutsListContainer}>
              {workouts?.map((item: any) => (
                <DayWorkoutItem
                  key={item.id}
                  exercise={item.exercise}
                  records={item.records}
                  info={item.info}
                  onEdit={handleEdit(item.id)}
                  onDelete={handleDelete(item.id)}
                />
              ))}
            </View>
          </ScrollView>
          <FloatingButton
            onClick={() => bottomSheetRef?.current?.open()}
            containerStyle={styles.floatingButtonStyle}
          />
          <View style={styles.dateSelectionContainer}>
            <CalenderStrip
              selectedDate={selectedDate}
              onDateSelection={handleDateSelection}
            />
          </View>
        </View>
        <DailyExerciseSelectionBottomSheet
          bottomSheetRef={bottomSheetRef}
          onClose={handleCreateExerciseBottomSheetClose}
          categoriesList={categoriesList}
          onCategorySelection={handleCategorySelection}
          exercisesList={exercisesList}
          handleDailyExerciseAddition={onDailyExerciseAddition}
        />
        {selectedWorkout && (
          <EditWorkoutBottomSheet
            bottomSheetRef={editBottomSheetRef}
            selectedWorkout={selectedWorkout}
            onClose={handleEditExerciseBottomSheetClose}
            onEditSubmit={completeWorkoutEdit}
          />
        )}
      </>
    </PageLayout>
  );
};

export default HomePage;
