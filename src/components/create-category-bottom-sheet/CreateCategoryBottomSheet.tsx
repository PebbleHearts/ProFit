import React, {FC, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

import CustomBottomSheet from '../bottom-sheet/BottomSheet';
import CustomButton from '../custom-button/CustomButton';
import CustomTextInput from '../custom-text-input/CustomTextInput';
import colors from '../../constants/colors';

type CreateCategoryBottomSheet = {
  bottomSheetRef: any;
  onClose: () => void;
  handleExerciseCreation: (details: {name: string}) => void;
};

const CreateCategoryBottomSheet: FC<CreateCategoryBottomSheet> = ({
  bottomSheetRef,
  onClose,
  handleExerciseCreation,
}) => {
  const [categoryName, setCategoryName] = useState('');

  const resetState = () => {
    setCategoryName('');
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
        <Text style={styles.headerText}>Enter Category Name</Text>
        <ScrollView
          contentContainerStyle={styles.scrollViewContentContainerStyle}>
          <CustomTextInput
            value={categoryName}
            onChangeText={val => setCategoryName(val)}
            inputStyle={styles.inputTextStyle}
          />
        </ScrollView>
        <CustomButton
          label="Create"
          onPress={() => handleExerciseCreation({name: categoryName})}
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

export default CreateCategoryBottomSheet;
