import React, {useMemo, useRef} from 'react';
import {View, Text} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

const CustomBottomSheet = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  return (
    <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}>
      <View>
        <Text>Success</Text>
      </View>
    </BottomSheet>
  );
};

export default CustomBottomSheet;
