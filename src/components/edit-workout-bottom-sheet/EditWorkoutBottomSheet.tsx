import React, {FC, useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

import CustomBottomSheet from '../bottom-sheet/BottomSheet';
import CustomButton from '../custom-button/CustomButton';

import styles from './styles';
import {WorkoutRecord} from '../../database/model/Workout';
import CustomTextInput from '../custom-text-input/CustomTextInput';

type EditWorkoutBottomSheetProps = {
  bottomSheetRef: any;
  selectedWorkout: WorkoutRecord | null;
  onClose: () => void;
  onEditSubmit: (editData: {info: string; records: any[]}) => void;
};

const EditWorkoutBottomSheet: FC<EditWorkoutBottomSheetProps> = ({
  bottomSheetRef,
  selectedWorkout,
  onClose,
  onEditSubmit,
}) => {
  const [workout, setWorkouts] = useState<WorkoutRecord | null>(null);
  const resetState = () => {
    setWorkouts(null);
  };
  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleOpen = () => {
    if (selectedWorkout && !workout) {
      setWorkouts(selectedWorkout);
    }
  };

  const handleDescriptionEdit = (description: string) => {
    setWorkouts(prev => {
      const prevWorkout: WorkoutRecord = {
        records: prev?.records || '',
        info: prev?.info || '',
        id: prev?.id || '',
      };
      if (prevWorkout) {
        prevWorkout.info = description;
      }
      return prevWorkout;
    });
  };

  const handleEditWeight = (fieldType: string, index: number) => val => {
    setWorkouts(prev => {
      const prevWorkout: WorkoutRecord = {
        records: prev?.records || '',
        info: prev?.info || '',
        id: prev?.id || '',
      };
      if (prevWorkout) {
        prevWorkout.records[index][fieldType] = val;
      }
      return prevWorkout;
    });
  };

  const handleAddNewSet = () => {
    setWorkouts(prev => {
      const prevWorkout: WorkoutRecord = {
        records: prev?.records || [],
        info: prev?.info || '',
        id: prev?.id || '',
      };
      if (prevWorkout) {
        prevWorkout.records.push({weight: '0', reps: '0'});
      }
      return prevWorkout;
    });
  };

  // TODO: replace the 600 with the 60 or 70 percent of the height of the device
  const bottomSheetHeight = Math.min(
    Math.max((selectedWorkout?.records.length || 1) * 58 + 250, 300),
    600,
  );
  console.log({bottomSheetHeight});
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
              <Text style={styles.setItemInputField}>Description</Text>
              <CustomTextInput
                value={workout?.info || ''}
                onChangeText={handleDescriptionEdit}
                containerStyle={styles.setItemInput}
                inputStyle={styles.setItemInputField}
              />
              <View style={styles.setItemRow}>
                <Text style={styles.setItemInputField}>Weight</Text>
                <Text style={styles.setItemInputField}>Reps</Text>
              </View>
              {workout?.records?.map((recordItem, index) => {
                return (
                  <View style={styles.setItemRow} key={`${index}`}>
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
                    <TouchableOpacity hitSlop={5}>
                      <Text>X</Text>
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
