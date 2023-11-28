import React, {FC, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

import CustomBottomSheet from '../bottom-sheet/BottomSheet';
import CustomButton from '../custom-button/CustomButton';
import CustomTextInput from '../custom-text-input/CustomTextInput';
import colors from '../../constants/colors';

type CategoryBottomSheet = {
  bottomSheetRef: any;
  selectedCategoryDetails: {name: string; id: string} | null;
  onClose: () => void;
  handleCategoryCreation: (details: {name: string}) => void;
  handleSaveCategory: (details: {name: string}) => void;
};

const CategoryBottomSheet: FC<CategoryBottomSheet> = ({
  bottomSheetRef,
  selectedCategoryDetails,
  onClose,
  handleCategoryCreation,
  handleSaveCategory,
}) => {
  const [categoryName, setCategoryName] = useState('');

  const isEdit = !!selectedCategoryDetails;

  const resetState = () => {
    setCategoryName('');
  };
  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleOpen = () => {
    if (isEdit && !categoryName) {
      setCategoryName(selectedCategoryDetails.name);
    }
  };
  return (
    <CustomBottomSheet
      bottomSheetRef={bottomSheetRef}
      onClose={handleClose}
      onOpen={handleOpen}
      height={200}>
      <View style={styles.container}>
        <Text style={styles.headerText}>
          {isEdit ? 'Edit Category Name' : 'Enter Category Name'}
        </Text>
        <ScrollView
          contentContainerStyle={styles.scrollViewContentContainerStyle}>
          <CustomTextInput
            value={categoryName}
            onChangeText={val => setCategoryName(val)}
            inputStyle={styles.inputTextStyle}
          />
        </ScrollView>
        <CustomButton
          label={isEdit ? 'Save' : 'Create'}
          onPress={
            isEdit
              ? () => handleSaveCategory({name: categoryName})
              : () => handleCategoryCreation({name: categoryName})
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

export default CategoryBottomSheet;
