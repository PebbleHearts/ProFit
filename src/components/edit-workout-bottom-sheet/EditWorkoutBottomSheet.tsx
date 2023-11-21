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

  useEffect(() => {
    setWorkouts(selectedWorkout);
  }, [selectedWorkout]);

  const handleEditWeight = (fieldType: string, index: number) => val => {
    setWorkouts(prev => {
      const prevWorkout: WorkoutRecord = {
        records: prev?.records || '',
        info: prev?.info || '',
        id: prev?.id || '',
      };
      if (prevWorkout) {
        prevWorkout.records[index][fieldType] = val;
        console.log(prevWorkout?.records[0]);
      }
      return prevWorkout;
    });
  };

  const handleAddNewSet = () => {
    setWorkouts(prev => {
      const prevWorkout: WorkoutRecord = {
        records: prev?.records || '',
        info: prev?.info || '',
        id: prev?.id || '',
      };
      if (prevWorkout) {
        prevWorkout.records.push({weight: '0', reps: '0'});
      }
      return prevWorkout;
    });
  };

  return (
    <CustomBottomSheet
      bottomSheetRef={bottomSheetRef}
      onClose={handleClose}
      height={400}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Edit Workout Item</Text>
        {selectedWorkout && (
          <ScrollView
            contentContainerStyle={styles.scrollViewContentContainerStyle}>
            <View style={styles.fieldHeadingAndItemsContainer}>
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
                  </View>
                );
              })}
            </View>
            <View>
              <TouchableOpacity onPress={handleAddNewSet}>
                <Text style={styles.addSetText}>Add +</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
        <CustomButton
          label="Save"
          containerStyle={styles.submitButtonContainer}
          onPress={() =>
            onEditSubmit({
              info: 'my description',
              records: workout?.records as any,
            })
          }
        />
      </View>
    </CustomBottomSheet>
  );
};

export default EditWorkoutBottomSheet;
