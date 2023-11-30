import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../constants/colors';
import {PlusOutlined} from '../../assets/svg';

type FloatingButtonProps = {
  containerStyle: any;
  onClick: () => void;
};

const FloatingButton = ({containerStyle, onClick}: FloatingButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.floatingButtonContainer, containerStyle]}
      onPress={onClick}>
      <PlusOutlined width={26} height={26} color="white" />
    </TouchableOpacity>
  );
};

export default FloatingButton;

const styles = ScaledSheet.create({
  floatingButtonContainer: {
    width: '45@ms',
    height: '45@ms',
    borderRadius: '40@ms',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    position: 'absolute',
    zIndex: 999,
  },
});
