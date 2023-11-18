import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

import {Q} from '@nozbe/watermelondb';
import PageLayout from '../../Layout/PageLayout';
import {HomePageProps} from './types';
import {database} from '../../database/init';

import CalenderStrip from '../../components/calender-strip/calenderStrip';

import DayWorkoutItem from '../../components/day-workout-item/DayWorkoutItem';
import DailyExerciseSelectionBottomSheet from '../../components/daily-exercise-selection-bottom-sheet/DailyExerciseSelectionBottomSheet';

import styles from './styles';
import {WorkoutRecord} from '../../database/model/Workout';
import {CategoryRecord} from '../../database/model/Category';
import {ExerciseRecord} from '../../database/model/Exercise';
import {getDateStringFromDateObject} from '../../utils/calender';

const HomePage: FC<HomePageProps> = () => {
  const [categoriesList, setCategoriesList] = useState<any>([]);
  const [workouts, setWorkouts] = useState<any>([]);
  const [exercisesList, setExercisesList] = useState<any>([]);
  const bottomSheetRef = useRef<RBSheet>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

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

  console.log(workouts);

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
            workout.records = 'record';
            workout.info = 'info';
          });
        });
      }
      handleWorkoutFetch();
    } catch (e) {
      console.log(e);
    }
    bottomSheetRef.current?.close();
  };

  return (
    <PageLayout title="ProFit">
      <>
        <View style={styles.container}>
          <Text style={styles.title}>Workouts</Text>
          <View style={styles.workoutsListContainer}>
            {workouts?.map((item: any) => (
              <DayWorkoutItem
                key={item.id}
                exercise={item.exercise}
                info={item.info}
              />
            ))}
            <TouchableOpacity
              key="add button"
              onPress={() => bottomSheetRef?.current?.open()}>
              <Text>Add</Text>
            </TouchableOpacity>
          </View>
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
      </>
    </PageLayout>
  );
};

export default HomePage;
