import React, {FC, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

import CustomBottomSheet from '../bottom-sheet/BottomSheet';
import CustomButton from '../custom-button/CustomButton';

import styles from './styles';
import {WorkoutRecord} from '../../database/model/Workout';
import CustomTextInput from '../custom-text-input/CustomTextInput';
import {DeleteBin} from '../../assets/svg';
import colors from '../../constants/colors';

type EditWorkoutBottomSheetProps = {
  bottomSheetRef: any;
  selectedWorkout: WorkoutRecord | null;
  onClose: () => void;
  onEditSubmit: (editData: {info: string; records: any[]}) => void;
};

type WorkoutItem = {
  id: string;
  records: any[];
  info: string;
};

const EditWorkoutBottomSheet: FC<EditWorkoutBottomSheetProps> = ({
  bottomSheetRef,
  selectedWorkout,
  onClose,
  onEditSubmit,
}) => {
  const [workout, setWorkouts] = useState<WorkoutItem | null>(null);
  const resetState = () => {
    setWorkouts(null);
  };
  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleOpen = () => {
    if (selectedWorkout && !workout) {
      const currentWorkoutItem: WorkoutItem = {
        records: (selectedWorkout?.records as unknown as any[]) || [],
        info: selectedWorkout?.info || '',
        id: selectedWorkout?.id || '',
      };
      setWorkouts(currentWorkoutItem);
    }
  };

  const handleDescriptionEdit = (description: string) => {
    setWorkouts(prev => {
      const prevWorkout: WorkoutItem = {...prev} as WorkoutItem;
      if (prevWorkout) {
        prevWorkout.info = description;
      }
      return prevWorkout;
    });
  };

  const handleDeleteSet = (index: number) => () => {
    setWorkouts(prev => {
      const prevWorkout: WorkoutItem = {...prev} as WorkoutItem;
      if (prevWorkout) {
        prevWorkout.records.splice(index, 1);
      }
      return prevWorkout;
    });
  };

  const handleEditWeight =
    (fieldType: string, index: number) => (val: string) => {
      setWorkouts(prev => {
        const prevWorkout: WorkoutItem = {...prev} as WorkoutItem;
        if (prevWorkout) {
          prevWorkout.records[index][fieldType] = val;
        }
        return prevWorkout;
      });
    };

  const handleAddNewSet = () => {
    setWorkouts(prev => {
      const prevWorkout: WorkoutItem = {...prev} as WorkoutItem;
      if (prevWorkout) {
        const lastSet = prev?.records[prev.records.length - 1 || 0];
        prevWorkout.records.push({
          weight: lastSet?.weight || '0',
          reps: lastSet?.reps || '0',
        });
      }
      return prevWorkout;
    });
  };

  // TODO: replace the 600 with the 60 or 70 percent of the height of the device
  const bottomSheetHeight = Math.min(
    Math.max((selectedWorkout?.records.length || 1) * 58 + 260, 300),
    600,
  );
  return (
    <CustomBottomSheet
      bottomSheetRef={bottomSheetRef}
      onOpen={handleOpen}
      onClose={handleClose}
      height={bottomSheetHeight}>
      <View style={styles.container}>
        <View style={styles.headingRow}>
          <Text style={styles.headerText}>Edit Workout Item</Text>
          <TouchableOpacity onPress={handleAddNewSet}>
            <Text style={styles.addSetText}>+ Add Set</Text>
          </TouchableOpacity>
        </View>
        {selectedWorkout && (
          <ScrollView
            contentContainerStyle={styles.scrollViewContentContainerStyle}>
            <View style={styles.fieldHeadingAndItemsContainer}>
              <Text style={styles.setItemInputFieldHeader}>Description</Text>
              <CustomTextInput
                value={workout?.info || ''}
                onChangeText={handleDescriptionEdit}
                containerStyle={styles.setItemInput}
                inputStyle={styles.setItemInputField}
              />
              <View style={styles.setItemRow}>
                <Text style={styles.hiddenSetItemInputFieldHeader}>Set 1</Text>
                <Text style={styles.setItemInputFieldHeader}>Weight</Text>
                <Text style={styles.setItemInputFieldHeader}>Reps</Text>
                <View
                  style={[styles.removeSetButton, styles.dummyRemoveSetButton]}>
                  <DeleteBin width={18} height={18} color={colors.errorRed} />
                </View>
              </View>
              {workout?.records?.map((recordItem, index) => {
                return (
                  <View style={styles.setItemRow} key={`${index}`}>
                    <Text style={styles.setItemRowIndicatorText}>
                      Set {index + 1}
                    </Text>
                    <CustomTextInput
                      value={recordItem.weight}
                      onChangeText={handleEditWeight('weight', index)}
                      containerStyle={styles.setItemInput}
                      inputStyle={styles.setItemInputField}
                    />
                    <CustomTextInput
                      value={recordItem.reps}
                      onChangeText={handleEditWeight('reps', index)}
                      containerStyle={styles.setItemInput}
                      inputStyle={styles.setItemInputField}
                    />
                    <TouchableOpacity
                      hitSlop={5}
                      style={styles.removeSetButton}
                      onPress={handleDeleteSet(index)}>
                      <DeleteBin
                        width={18}
                        height={18}
                        color={colors.errorRed}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        )}
        <CustomButton
          label="Save"
          containerStyle={styles.submitButtonContainer}
          labelStyle={styles.submitButtonText}
          onPress={() =>
            onEditSubmit({
              info: workout?.info ?? '',
              records: workout?.records as any,
            })
          }
        />
      </View>
    </CustomBottomSheet>
  );
};

export default EditWorkoutBottomSheet;
