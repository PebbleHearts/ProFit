import React, {FC, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

import CustomBottomSheet from '../bottom-sheet/BottomSheet';
import CustomButton from '../custom-button/CustomButton';
import CustomTextInput from '../custom-text-input/CustomTextInput';

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
  return (
    <CustomBottomSheet
      bottomSheetRef={bottomSheetRef}
      onClose={onClose}
      height={200}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContentContainerStyle}>
          <CustomTextInput
            value={categoryName}
            onChangeText={val => setCategoryName(val)}
          />
        </ScrollView>
        <CustomButton
          label="Create"
          onPress={() => handleExerciseCreation({name: categoryName})}
          containerStyle={styles.submitButtonContainer}
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
    fontSize: '15@ms',
    fontWeight: 'bold',
    color: 'black',
    marginBottom: '10@vs',
  },
  scrollViewContentContainerStyle: {
    paddingRight: 1,
  },
  submitButtonContainer: {
    marginBottom: '10@ms',
  },
});

export default CreateCategoryBottomSheet;
