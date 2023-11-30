import React, {FC} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {ScaledSheet} from 'react-native-size-matters';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {CloseOutlined} from '../../assets/svg';
import colors from '../../constants/colors';

type CustomBottomSheetProps = {
  bottomSheetRef: any;
  children: JSX.Element;
  height: number;
  onOpen?: () => void;
  onClose: () => void;
};

const CustomBottomSheet: FC<CustomBottomSheetProps> = ({
  bottomSheetRef,
  children,
  height,
  onOpen,
  onClose,
}) => {
  const insets = useSafeAreaInsets();
  const styles = stylesFunc(insets);
  return (
    <RBSheet
      ref={ref => {
        bottomSheetRef.current = ref;
      }}
      height={height}
      closeOnPressMask={false}
      closeDuration={300}
      openDuration={300}
      onOpen={onOpen}
      customStyles={{
        container: styles.containerStyle,
      }}>
      <>
        <TouchableOpacity
          style={styles.closeIconView}
          onPress={onClose}
          activeOpacity={0.7}>
          {/* <Text style={styles.closeIconViewText}>X</Text> */}
          <CloseOutlined width={16} height={16} color={colors.gray3} />
        </TouchableOpacity>
        {children}
      </>
    </RBSheet>
  );
};

const stylesFunc = (insets: any) =>
  ScaledSheet.create({
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
      borderTopRightRadius: '20@ms',
      borderTopLeftRadius: '20@ms',
      overflow: 'visible',
      paddingBottom: insets.bottom,
    },
  });

export default CustomBottomSheet;
