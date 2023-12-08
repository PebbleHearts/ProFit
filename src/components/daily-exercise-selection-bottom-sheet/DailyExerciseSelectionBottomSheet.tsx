import React, {FC, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

import CustomBottomSheet from '../bottom-sheet/BottomSheet';
import CategoryItem from '../category-item/CategoryItem';
import WorkoutItem from '../workout-item/WorkoutItem';
import CustomButton from '../custom-button/CustomButton';

import styles from './styles';
import {BackArrow} from '../../assets/svg';
import colors from '../../constants/colors';

type DailyExerciseSelectionBottomSheetProps = {
  bottomSheetRef: any;
  onClose: () => void;
  categoriesList: any[];
  onCategorySelection: (categoryId: string) => void;
  exercisesList: any[];
  handleDailyExerciseAddition: (exerciseIds: string[]) => void;
};

const DailyExerciseSelectionBottomSheet: FC<
  DailyExerciseSelectionBottomSheetProps
> = ({
  bottomSheetRef,
  categoriesList,
  exercisesList,
  onCategorySelection,
  onClose,
  handleDailyExerciseAddition,
}) => {
  const [showWorkouts, setShowWorkouts] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const resetState = () => {
    setShowWorkouts(false);
    setSelectedExercises([]);
  };
  const handleClose = () => {
    resetState();
    onClose();
  };
  const handleExerciseSelection = (exerciseId: string) => {
    setSelectedExercises(prevState => {
      const index = prevState.findIndex(item => item === exerciseId);

      return index !== -1
        ? prevState.filter(item => item !== exerciseId)
        : [...prevState, exerciseId];
    });
  };
  return (
    <CustomBottomSheet
      bottomSheetRef={bottomSheetRef}
      onClose={handleClose}
      height={400}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              setShowWorkouts(false);
            }}>
            {showWorkouts && (
              <BackArrow width={25} height={25} color={colors.gray3} />
            )}
          </TouchableOpacity>
          <Text style={styles.headerText}>
            {showWorkouts ? 'Select Workouts' : 'Select Category'}
          </Text>
        </View>
        {showWorkouts ? (
          <ScrollView
            contentContainerStyle={styles.scrollViewContentContainerStyle}>
            {exercisesList.map(item => (
              <WorkoutItem
                key={item.name}
                name={item.name}
                isSelected={selectedExercises.includes(item.id)}
                onPress={() => handleExerciseSelection(item.id)}
              />
            ))}
          </ScrollView>
        ) : (
          <ScrollView
            contentContainerStyle={styles.scrollViewContentContainerStyle}>
            {categoriesList.map(item => (
              <CategoryItem
                key={item.name}
                name={item.name}
                onPress={() => {
                  setShowWorkouts(true);
                  onCategorySelection(item.id);
                }}
              />
            ))}
          </ScrollView>
        )}
        <CustomButton
          label="Add"
          onPress={() => {
            setTimeout(() => {
              resetState();
            }, 1000);
            handleDailyExerciseAddition(selectedExercises);
          }}
          containerStyle={styles.submitButtonContainer}
          labelStyle={styles.submitButtonText}
        />
      </View>
    </CustomBottomSheet>
  );
};

export default DailyExerciseSelectionBottomSheet;
