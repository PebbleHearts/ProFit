import React, {FC} from 'react';
import {Text, View} from 'react-native';

import CustomBottomSheet from '../bottom-sheet/BottomSheet';
import {ScaledSheet} from 'react-native-size-matters';
import {Calendar, DateData} from 'react-native-calendars';

type CalenderBottomSheetProps = {
  bottomSheetRef: any;
  onClose: () => void;
  onDateSelection: (date: DateData) => void;
};

const CalenderBottomSheet: FC<CalenderBottomSheetProps> = ({
  bottomSheetRef,
  onClose,
  onDateSelection,
}) => {
  const resetState = () => {};
  const handleClose = () => {
    resetState();
    onClose();
  };

  return (
    <CustomBottomSheet
      bottomSheetRef={bottomSheetRef}
      onClose={handleClose}
      height={400}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Select Date</Text>
        <Calendar onDayPress={onDateSelection} />
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
    textAlign: 'center',
    marginBottom: '10@vs',
    paddingHorizontal: '20@ms',
    paddingTop: '20@ms',
  },
});

export default CalenderBottomSheet;
