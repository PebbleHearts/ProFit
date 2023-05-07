import React, {FC} from 'react';
import {View, Text} from 'react-native';

import PageLayout from '../../Layout/PageLayout';
import {WORKOUTS} from '../../constants/workouts';
import {CATEGORIES} from '../../constants/categories';

import styles from './styles';
import {CategoryDetailsProps} from './types';
import WorkoutItem from '../../components/workout-item/WorkoutItem';

const CategoryDetails: FC<CategoryDetailsProps> = ({route}) => {
  const {categoryId} = route.params ?? {};
  const category = CATEGORIES.find(item => item.id === categoryId);
  const workouts = WORKOUTS.filter(item => item.categoryId === categoryId);
  return (
    <PageLayout title="ProFit">
      <View style={styles.container}>
        <Text style={styles.title}>{category?.name}</Text>
        <View>
          {workouts.map(item => (
            <WorkoutItem key={item.id} name={item.name} />
          ))}
        </View>
      </View>
    </PageLayout>
  );
};

export default CategoryDetails;
