import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';

import PageLayout from '../../Layout/PageLayout';
import CategoryItem from '../../components/category-item/CategoryItem';
import DailyExerciseSelectionBottomSheet from '../../components/daily-exercise-selection-bottom-sheet/DailyExerciseSelectionBottomSheet';
import {database} from '../../database/init';

import {SelectDailyWorkoutsProps} from './types';
import {CategoryRecord} from '../../database/model/Category';
import {EventsList, emitter} from '../../constants/emitter';
import SelectedWorkoutItem from './SelectedWorkoutItem';
import styles from './styles';
import RBSheet from 'react-native-raw-bottom-sheet';
import {ExerciseRecord} from '../../database/model/Exercise';
import {Q} from '@nozbe/watermelondb';
import CustomButton from '../../components/custom-button/CustomButton';
import {getDateStringFromDateObject} from '../../utils/calender';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SelectDailyWorkouts: FC<SelectDailyWorkoutsProps> = ({
  navigation,
  route,
}) => {
  const [categoriesList, setCategoriesList] = useState<any>([]);
  const [exercisesList, setExercisesList] = useState<any>([]);
  const [selectedExercises, setSelectedExercises] = useState<
    {id: string; name: string; categoryId: string}[]
  >([]);
  const [currentCategory, setCurrentCategory] = useState<string>('');
  const bottomSheetRef = useRef<RBSheet>(null);

  const {selectedDate} = route.params ?? {};

  const handleCategoriesFetch = useCallback(async () => {
    const categoriesCollection = database.get<CategoryRecord>('categories');
    const categories = await categoriesCollection.query().fetch();
    setCategoriesList(categories);
  }, []);

  const handleCategorySelection = async (categoryId: string) => {
    if (categoryId) {
      const exerciseCollection = database.get<ExerciseRecord>('exercises');
      const exercises = await exerciseCollection
        .query(Q.where('category_id', categoryId))
        .fetch();
      setExercisesList(exercises);
      setCurrentCategory(categoryId);
    }
    bottomSheetRef?.current?.open();
  };

  useEffect(() => {
    handleCategoriesFetch();
  }, [handleCategoriesFetch]);

  const handleCategoryClick =
    (categoryId: string, categoryName: string) => () => {
      // navigation.navigate('CategoryDetails', {categoryId, categoryName});
      console.log('category clicked', categoryId, categoryName);
      handleCategorySelection(categoryId);
    };

  useEffect(() => {
    emitter.addListener(EventsList.IMPORT_COMPLETE, () => {
      handleCategoriesFetch();
    });
    return () => {
      emitter.removeListener(EventsList.IMPORT_COMPLETE);
    };
  }, [handleCategoriesFetch]);

  const handleCreateExerciseBottomSheetClose = () => {
    setExercisesList([]);
    bottomSheetRef?.current?.close();
  };

  const onDailyExerciseAddition = (
    exercises: {id: string; name: string; categoryId: string}[],
  ) => {
    console.log(exercises);
    setSelectedExercises(prev => [...prev, ...exercises]);
    handleCreateExerciseBottomSheetClose();
  };

  const handleRemoveSelectedExerciseItem = (exerciseId: string) => {
    setSelectedExercises(prev => {
      return prev.filter(item => item.id !== exerciseId);
    });
  };

  const onSave = async () => {
    const selectedDateObj = new Date(selectedDate);
    const date = getDateStringFromDateObject(selectedDateObj);
    try {
      for (let i = 0; i < selectedExercises.length; i++) {
        const exerciseId = selectedExercises[i].id;
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
      // TODO: fetch data again here in homepage
      emitter.emit(EventsList.HISTORY_ADDED);
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
    bottomSheetRef.current?.close();
  };

  return (
    <PageLayout showBackButton>
      <>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContainerStyle}>
            <View style={styles.headerContainer}>
              <Text style={styles.header}>Choose Workouts</Text>
            </View>
            {categoriesList?.map(({id, name}: {id: string; name: string}) => (
              <CategoryItem
                key={id}
                name={name}
                onPress={handleCategoryClick(id, name)}
              />
            ))}

            <View>
              <Text>Selected Workouts</Text>
              <View>
                {selectedExercises.map(selectedExerciseItem => (
                  <SelectedWorkoutItem
                    key={selectedExerciseItem.id}
                    name={selectedExerciseItem.name}
                    onRemoveClick={() =>
                      handleRemoveSelectedExerciseItem(selectedExerciseItem.id)
                    }
                  />
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles.ctaContainer}>
          <CustomButton
            label="Save"
            onPress={onSave}
            containerStyle={styles.submitButtonContainer}
            labelStyle={styles.submitButtonText}
          />
        </View>
        <DailyExerciseSelectionBottomSheet
          bottomSheetRef={bottomSheetRef}
          onClose={handleCreateExerciseBottomSheetClose}
          exercisesList={exercisesList}
          selectedExercisesItems={selectedExercises}
          currentSelectedCategoryId={currentCategory}
          handleDailyExerciseAddition={onDailyExerciseAddition}
        />
      </>
    </PageLayout>
  );
};

export default SelectDailyWorkouts;
