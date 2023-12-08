import React, {FC, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';

import CustomBottomSheet from '../bottom-sheet/BottomSheet';
import WorkoutItem from '../workout-item/WorkoutItem';
import CustomButton from '../custom-button/CustomButton';

import styles from './styles';

type DailyExerciseSelectionBottomSheetProps = {
  bottomSheetRef: any;
  onClose: () => void;
  exercisesList: any[];
  selectedExercisesItems: {id: string; name: string; categoryId: string}[];
  currentSelectedCategoryId: string;
  handleDailyExerciseAddition: (
    exercises: {id: string; name: string; categoryId: string}[],
  ) => void;
};

const DailyExerciseSelectionBottomSheet: FC<
  DailyExerciseSelectionBottomSheetProps
> = ({
  bottomSheetRef,
  exercisesList,
  selectedExercisesItems,
  currentSelectedCategoryId,
  onClose,
  handleDailyExerciseAddition,
}) => {
  const [selectedExercises, setSelectedExercises] = useState<
    {id: string; name: string; categoryId: string}[]
  >([]);
  const resetState = () => {
    setSelectedExercises([]);
  };
  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleOpen = () => {
    setSelectedExercises(
      selectedExercisesItems.filter(
        item => item.categoryId === currentSelectedCategoryId,
      ),
    );
  };
  const handleExerciseSelection = (exerciseId: string) => {
    setSelectedExercises(prevState => {
      const index = prevState.findIndex(item => item.id === exerciseId);

      if (index !== -1) {
        return prevState.filter(item => item.id !== exerciseId);
      }
      const selectedExerciseItem = exercisesList.find(
        item => item.id === exerciseId,
      );
      return [
        ...prevState,
        {
          id: selectedExerciseItem.id,
          name: selectedExerciseItem.name,
          categoryId: currentSelectedCategoryId,
        },
      ];
    });
  };
  return (
    <CustomBottomSheet
      bottomSheetRef={bottomSheetRef}
      onClose={handleClose}
      onOpen={handleOpen}
      height={400}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Select Exercise</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollViewContentContainerStyle}>
          {exercisesList.map(item => {
            const isSelected = selectedExercises.findIndex(
              selectedItem => selectedItem.id === item.id,
            );
            return (
              <WorkoutItem
                key={item.name}
                name={item.name}
                isSelected={isSelected !== -1}
                onPress={() => handleExerciseSelection(item.id)}
              />
            );
          })}
        </ScrollView>
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
