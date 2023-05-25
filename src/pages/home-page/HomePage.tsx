import React, {FC, useCallback, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import moment from 'moment';

import PageLayout from '../../Layout/PageLayout';
import {HomePageProps} from './types';
import {emitter} from '../../constants/emitter';

import CalenderStrip from '../../components/calender-strip/calenderStrip';

import DAY_WORKOUTS from '../../constants/dayWorkouts';
import DayWorkoutItem from '../../components/day-workout-item/DayWorkoutItem';

import styles from './styles';

const HomePage: FC<HomePageProps> = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    moment(new Date())
      .set('hour', 0)
      .set('minute', 0)
      .set('second', 0)
      .set('millisecond', 0)
      .toISOString(),
  );

  useEffect(() => {
    emitter.addListener('AddNewItem', () => {
      console.log('Trying to add new: homepage');
    });
  }, []);

  const handleDateSelection = useCallback((value: string) => {
    setSelectedDate(value);
  }, []);

  return (
    <PageLayout title="ProFit">
      <View style={styles.container}>
        <Text style={styles.title}>Workouts</Text>
        <View style={styles.workoutsListContainer}>
          {DAY_WORKOUTS[selectedDate]?.map(item => (
            <DayWorkoutItem key={item.name} name={item.name} />
          ))}
        </View>
        <View style={styles.dateSelectionContainer}>
          <CalenderStrip
            selectedDate={selectedDate}
            onDateSelection={handleDateSelection}
          />
        </View>
      </View>
    </PageLayout>
  );
};

export default HomePage;
