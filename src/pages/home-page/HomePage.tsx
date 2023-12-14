import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {DateData} from 'react-native-calendars';

import {Q} from '@nozbe/watermelondb';
import PageLayout from '../../Layout/PageLayout';
import {HomePageProps} from './types';
import {database} from '../../database/init';
import {
  NestableScrollContainer,
  NestableDraggableFlatList,
  RenderItemParams,
  ScaleDecorator,
  DragEndParams,
} from 'react-native-draggable-flatlist';

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

  const renderItem = ({item, drag, isActive}: RenderItemParams<any>) => {
    return (
      <ScaleDecorator activeScale={0.9}>
        <Pressable onLongPress={drag} disabled={isActive}>
          <DayWorkoutItem
            key={item.id}
            exercise={item.exercise}
            records={item.records}
            info={item.info}
            onEdit={handleEdit(item.id)}
            onDelete={handleDelete(item.id)}
          />
        </Pressable>
      </ScaleDecorator>
    );
  };

  const handleDragEnd = async (params: DragEndParams<any>) => {
    const reOrderedItems = params.data;
    console.log(reOrderedItems);
    const workoutCollection = database.get<WorkoutRecord>('workouts');
    await database.write(async () => {
      for (let i = 0; i < params.data.length; i++) {
        const workoutItem = await workoutCollection.find(
          reOrderedItems[i]?.id || '',
        );
        workoutItem.update((workout: any) => {
          workout.order = i + 1;
        });
      }
    });
    handleWorkoutFetch();
  };

  return (
    <PageLayout title="ProFit">
      <>
        <View style={styles.container}>
          <NestableScrollContainer showsVerticalScrollIndicator={false}>
            <View style={styles.workoutsListContainer}>
              <View style={styles.headerContainer}>
                <Text style={styles.header}>History</Text>
              </View>
              {workouts.length === 0 ? (
                <View style={styles.emptyView}>
                  <Text style={styles.emptyViewText}>Workout Log Empty</Text>
                </View>
              ) : (
                <NestableDraggableFlatList
                  data={workouts}
                  keyExtractor={item => item.id}
                  renderItem={renderItem}
                  onDragEnd={handleDragEnd}
                />
              )}
            </View>
          </NestableScrollContainer>
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
