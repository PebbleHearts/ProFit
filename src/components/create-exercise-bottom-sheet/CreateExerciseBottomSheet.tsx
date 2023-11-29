import React, {FC, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

import CustomBottomSheet from '../bottom-sheet/BottomSheet';
import CustomButton from '../custom-button/CustomButton';
import CustomTextInput from '../custom-text-input/CustomTextInput';
import colors from '../../constants/colors';

type ExerciseBottomSheetProps = {
  bottomSheetRef: any;
  categoryName: string | undefined;
  selectedExerciseDetails: {id: string; name: string} | null;
  onClose: () => void;
  handleExerciseCreation: (details: {name: string}) => void;
  handleSaveExercise: (details: {name: string}) => void;
};

const ExerciseBottomSheet: FC<ExerciseBottomSheetProps> = ({
  bottomSheetRef,
  categoryName,
  selectedExerciseDetails,
  onClose,
  handleExerciseCreation,
  handleSaveExercise,
}) => {
  const [exerciseName, setExerciseName] = useState('');

  const isEdit = !!selectedExerciseDetails;

  const resetState = () => {
    setExerciseName('');
  };
  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleOpen = () => {
    if (isEdit && selectedExerciseDetails) {
      setExerciseName(selectedExerciseDetails.name);
    }
  };
  return (
    <CustomBottomSheet
      bottomSheetRef={bottomSheetRef}
      onClose={handleClose}
      onOpen={handleOpen}
      height={200}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Add {categoryName} Workout</Text>
        <ScrollView
          contentContainerStyle={styles.scrollViewContentContainerStyle}>
          <CustomTextInput
            value={exerciseName}
            onChangeText={val => setExerciseName(val)}
            inputStyle={styles.inputTextStyle}
          />
        </ScrollView>
        <CustomButton
          label={isEdit ? 'Save' : 'Create'}
          onPress={
            isEdit
              ? () => handleSaveExercise({name: exerciseName})
              : () => handleExerciseCreation({name: exerciseName})
          }
          containerStyle={styles.submitButtonContainer}
          labelStyle={styles.submitButtonText}
        />
      </View>
    </CustomBottomSheet>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: '17@ms',
    fontWeight: 'bold',
    color: 'black',
    marginBottom: '10@vs',
    paddingHorizontal: '20@ms',
    paddingTop: '20@ms',
  },
  scrollViewContentContainerStyle: {
    padding: '20@ms',
    paddingTop: '5@ms',
  },
  submitButtonContainer: {
    backgroundColor: colors.primary,
    margin: '20@ms',
    paddingTop: '5@ms',
    marginBottom: '10@ms',
    height: '40@mvs',
  },
  inputTextStyle: {
    color: colors.buttonText,
  },
  submitButtonText: {
    color: colors.white,
  },
});

export default ExerciseBottomSheet;
