import React, {FC} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

import CustomBottomSheet from '../bottom-sheet/BottomSheet';
import CustomButton from '../custom-button/CustomButton';

type CreateExerciseBottomSheet = {
  bottomSheetRef: any;
  onClose: () => void;
  categoryName: string | undefined;
};

const CreateExerciseBottomSheet: FC<CreateExerciseBottomSheet> = ({
  bottomSheetRef,
  onClose,
  categoryName,
}) => {
  return (
    <CustomBottomSheet
      bottomSheetRef={bottomSheetRef}
      onClose={onClose}
      height={400}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Add {categoryName} Workout</Text>
        <ScrollView>
          <Text>Text 1</Text>
          <Text>Text 2</Text>
          {/* TODO: add the input fields to create an exercise */}
        </ScrollView>
        <CustomButton label="Create" />
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
});

export default CreateExerciseBottomSheet;
