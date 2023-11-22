import React, {FC, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

import CustomBottomSheet from '../bottom-sheet/BottomSheet';
import CustomButton from '../custom-button/CustomButton';
import CustomTextInput from '../custom-text-input/CustomTextInput';
import colors from '../../constants/colors';

type CreateExerciseBottomSheet = {
  bottomSheetRef: any;
  onClose: () => void;
  categoryName: string | undefined;
  handleExerciseCreation: (details: {name: string}) => void;
};

const CreateExerciseBottomSheet: FC<CreateExerciseBottomSheet> = ({
  bottomSheetRef,
  onClose,
  categoryName,
  handleExerciseCreation,
}) => {
  const [exerciseName, setExerciseName] = useState('');
  const resetState = () => {
    setExerciseName('');
  };
  const handleClose = () => {
    resetState();
    onClose();
  };
  return (
    <CustomBottomSheet
      bottomSheetRef={bottomSheetRef}
      onClose={handleClose}
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
          label="Create"
          onPress={() => handleExerciseCreation({name: exerciseName})}
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
  },
  scrollViewContentContainerStyle: {
    paddingRight: 1,
  },
  submitButtonContainer: {
    marginBottom: '10@ms',
    backgroundColor: colors.primaryBlue,
  },
  inputTextStyle: {
    color: colors.buttonText,
  },
  submitButtonText: {
    color: colors.white,
  },
});

export default CreateExerciseBottomSheet;
