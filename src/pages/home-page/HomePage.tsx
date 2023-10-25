import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import moment from 'moment';
import RBSheet from 'react-native-raw-bottom-sheet';

import PageLayout from '../../Layout/PageLayout';
import {HomePageProps} from './types';
import {emitter} from '../../constants/emitter';

import CalenderStrip from '../../components/calender-strip/calenderStrip';

import DayWorkoutItem from '../../components/day-workout-item/DayWorkoutItem';
import DailyExerciseSelectionBottomSheet from '../../components/daily-exercise-selection-bottom-sheet/DailyExerciseSelectionBottomSheet';
import {supabase} from '../../lib/initSupabase';
import {useUserContext} from '../../hooks/UserContext';

import styles from './styles';

const HomePage: FC<HomePageProps> = () => {
  const {user} = useUserContext();
  const [categoriesList, setCategoriesList] = useState<any>([]);
  const [workouts, setWorkouts] = useState<any>([]);
  const [exercisesList, setExercisesList] = useState<any>([]);
  const bottomSheetRef = useRef<RBSheet>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    moment(new Date())
      .set('hour', 0)
      .set('minute', 0)
      .set('second', 0)
      .set('millisecond', 0)
      .toISOString(),
  );

  const handleCategoriesFetch = useCallback(async () => {
    const {data, error} = await supabase
      .from('categories')
      .select('id,name,created_at')
      .eq('user_id', user?.id);

    if (!error && data) {
      setCategoriesList(data);
    }
  }, [user?.id]);

  const handleWorkoutFetch = useCallback(async () => {
    const date = selectedDate.substring(0, 10);
    const {data, error} = await supabase
      .from('workouts')
      .select('id,exercise (id,name, category(name)),info')
      .eq('user_id', user?.id)
      .eq('date', date);

    if (!error && data) {
      console.log('inside workout fetch');
      console.log(JSON.stringify(data));
      setWorkouts(data);
    }
  }, [selectedDate, user?.id]);

  useEffect(() => {
    if (user?.id) {
      handleCategoriesFetch();
    }
  }, [handleCategoriesFetch, user?.id]);

  useEffect(() => {
    if (user?.id) {
      handleWorkoutFetch();
    }
  }, [handleWorkoutFetch, user?.id]);

  const handleCategorySelection = async (categoryId: string) => {
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
  };

  const handleCreateExerciseBottomSheetClose = () => {
    setExercisesList([]);
    bottomSheetRef?.current?.close();
  };

  useEffect(() => {
    emitter.addListener('AddNewItem', () => {
      console.log('Trying to add new: homepage');
    });
  }, []);

  const handleDateSelection = useCallback((value: string) => {
    setSelectedDate(value);
  }, []);

  const onDailyExerciseAddition = async (exerciseIds: string[]) => {
    console.log(exerciseIds);
    const date = selectedDate.substring(0, 10);
    await supabase.from('workouts').insert({
      user_id: user?.id,
      date,
      exercise: exerciseIds[0],
      info: [],
    });
    bottomSheetRef.current?.close();
  };

  return (
    <PageLayout title="ProFit">
      <>
        <View style={styles.container}>
          <Text style={styles.title}>Workouts</Text>
          <View style={styles.workoutsListContainer}>
            {workouts?.map((item: any) => (
              <DayWorkoutItem key={item.id} name={item.exercise.name} />
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
