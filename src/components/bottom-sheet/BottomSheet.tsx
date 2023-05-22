import React, {FC} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {ScaledSheet} from 'react-native-size-matters';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type CustomBottomSheetProps = {
  bottomSheetRef: any;
  children: JSX.Element;
  height: number;
  onClose: () => void;
};

const CustomBottomSheet: FC<CustomBottomSheetProps> = ({
  bottomSheetRef,
  children,
  height,
  onClose,
}) => {
  const insets = useSafeAreaInsets();
  return (
    <RBSheet
      ref={ref => {
        bottomSheetRef.current = ref;
      }}
      height={height}
      closeDuration={300}
      openDuration={300}
      customStyles={{
        container: [styles.containerStyle, {paddingBottom: insets.bottom}],
      }}>
      <>
        <TouchableOpacity
          style={styles.closeIconView}
          onPress={onClose}
          activeOpacity={0.7}>
          <Text>X</Text>
        </TouchableOpacity>
        {children}
      </>
    </RBSheet>
  );
};

const styles = ScaledSheet.create({
  closeIconView: {
    width: '30@ms',
    height: '30@ms',
    borderRadius: '30@ms',
    position: 'absolute',
    top: '-40@ms',
    right: '5@ms',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerStyle: {
    padding: '20@ms',
    borderTopRightRadius: '20@ms',
    borderTopLeftRadius: '20@ms',
    overflow: 'visible',
  },
});

export default CustomBottomSheet;
