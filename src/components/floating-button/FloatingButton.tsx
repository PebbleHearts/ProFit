import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../constants/colors';

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
      <Text style={styles.ctaText}>+</Text>
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
    backgroundColor: colors.primaryBlue,
    position: 'absolute',
    zIndex: 999,
  },
  ctaText: {
    color: colors.white,
    fontSize: '20@ms',
  },
});
