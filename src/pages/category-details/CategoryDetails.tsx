import React, {FC, useRef} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

import PageLayout from '../../Layout/PageLayout';
import {WORKOUTS} from '../../constants/workouts';
import {CATEGORIES} from '../../constants/categories';

import styles from './styles';
import {CategoryDetailsProps} from './types';
import WorkoutItem from '../../components/workout-item/WorkoutItem';
import CreateExerciseBottomSheet from '../../components/create-exercise-bottom-sheet/CreateExerciseBottomSheet';

const CategoryDetails: FC<CategoryDetailsProps> = ({route}) => {
  const {categoryId} = route.params ?? {};
  const category = CATEGORIES.find(item => item.id === categoryId);
  const workouts = WORKOUTS.filter(item => item.categoryId === categoryId);

  const bottomSheetRef = useRef<RBSheet>(null);
  return (
    <PageLayout title="ProFit">
      <View style={styles.container}>
        <Text style={styles.title}>{category?.name}</Text>
        <View>
          {workouts.map(item => (
            <WorkoutItem key={item.id} name={item.name} />
          ))}
        </View>
        <TouchableOpacity onPress={() => bottomSheetRef?.current?.open()}>
          <Text>Add new</Text>
        </TouchableOpacity>
        <CreateExerciseBottomSheet
          bottomSheetRef={bottomSheetRef}
          onClose={() => bottomSheetRef?.current?.close()}
          categoryName={category?.name}
        />
      </View>
    </PageLayout>
  );
};

export default CategoryDetails;
