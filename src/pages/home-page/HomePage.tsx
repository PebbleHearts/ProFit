import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {DateData} from 'react-native-calendars';

import {Q} from '@nozbe/watermelondb';
import PageLayout from '../../Layout/PageLayout';
import {HomePageProps} from './types';
import {database} from '../../database/init';

import CalenderStrip from '../../components/calender-strip/CalenderStrip';
import FloatingButton from '../../components/floating-button/FloatingButton';

import DayWorkoutItem from '../../components/day-workout-item/DayWorkoutItem';

import styles from './styles';
import {WorkoutRecord} from '../../database/model/Workout';
import {getDateStringFromDateObject} from '../../utils/calender';
import EditWorkoutBottomSheet from '../../components/edit-workout-bottom-sheet/EditWorkoutBottomSheet';
import CalenderBottomSheet from '../../components/calender-bottom-sheet/CalenderBottomSheet';
import {emitter, EventsList} from '../../constants/emitter';

const HomePage: FC<HomePageProps> = ({navigation}: HomePageProps) => {
  const [workouts, setWorkouts] = useState<any>([]);
  const calenderStripRef = useRef<any>(null);
  const editBottomSheetRef = useRef<RBSheet>(null);
  const calenderBottomSheetRef = useRef<RBSheet>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutRecord | null>(
    null,
  );

  const handleWorkoutFetch = useCallback(async () => {
    const date = getDateStringFromDateObject(selectedDate);
    const exerciseCollection = database.get<WorkoutRecord>('workouts');
    const workoutsList = await exerciseCollection
      .query(Q.where('date', date), Q.sortBy('order', Q.asc))
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
    handleWorkoutFetch();
  }, [handleWorkoutFetch]);

  const handleCalenderBottomSheetClose = () => {
    calenderBottomSheetRef?.current?.close();
  };

  const handleDateSelection = useCallback((value: Date) => {
    setSelectedDate(value);
  }, []);

  const handleCalenderBottomSheetDateSelection = (date: DateData) => {
    calenderStripRef.current.resetInitialDate(date.dateString);
    handleCalenderBottomSheetClose();
  };

  const handleDelete = useCallback(
    (workoutId: string) => async () => {
      const workoutItem = await database
        .get<WorkoutRecord>('workouts')
        .find(workoutId);
      await database.write(async () => {
        await workoutItem.destroyPermanently();
      });
      handleWorkoutFetch();
    },
    [handleWorkoutFetch],
  );

  const handleEdit = useCallback(
    (workoutId: string) => async () => {
      const workoutItem = await database
        .get<WorkoutRecord>('workouts')
        .find(workoutId);
      setSelectedWorkout(workoutItem);
      editBottomSheetRef?.current?.open();
    },
    [],
  );

  const handleEditExerciseBottomSheetClose = () => {
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

  useEffect(() => {
    emitter.addListener(EventsList.IMPORT_COMPLETE, () => {
      handleWorkoutFetch();
    });
    emitter.addListener(EventsList.HISTORY_ADDED, () => {
      handleWorkoutFetch();
    });
    return () => {
      emitter.removeListener(EventsList.IMPORT_COMPLETE);
      emitter.removeListener(EventsList.HISTORY_ADDED);
    };
  }, [handleWorkoutFetch]);

  const renderItem = useCallback(
    (item: any) => {
      return (
        <DayWorkoutItem
          key={item.id}
          exercise={item.exercise}
          records={item.records}
          info={item.info}
          onEdit={handleEdit(item.id)}
          onDelete={handleDelete(item.id)}
        />
      );
    },
    [handleDelete, handleEdit],
  );

  return (
    <PageLayout title="ProFit">
      <>
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.workoutsListContainer}>
              <View style={styles.headerContainer}>
                <Text style={styles.header}>History</Text>
              </View>
              {workouts.length === 0 ? (
                <View style={styles.emptyView}>
                  <Text style={styles.emptyViewText}>Workout Log Empty</Text>
                </View>
              ) : (
                workouts.map(renderItem)
              )}
            </View>
          </ScrollView>
          <FloatingButton
            onClick={() =>
              navigation.navigate('SelectDailyWorkouts', {
                selectedDate: selectedDate.toISOString(),
              })
            }
            containerStyle={styles.floatingButtonStyle}
          />
          <View style={styles.dateSelectionContainer}>
            <CalenderStrip
              ref={calenderStripRef}
              selectedDate={selectedDate}
              onDateSelection={handleDateSelection}
              handleMonthYearLabelClick={() => {
                calenderBottomSheetRef.current?.open();
              }}
            />
          </View>
        </View>
        <CalenderBottomSheet
          bottomSheetRef={calenderBottomSheetRef}
          onClose={handleCalenderBottomSheetClose}
          onDateSelection={handleCalenderBottomSheetDateSelection}
          selectedDate={selectedDate}
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
