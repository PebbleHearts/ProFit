import {FC} from 'react';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

import styles from './styles';

type CustomButtonProps = {
  label: string;
  disabled?: boolean;
  containerStyle?: any;
  labelStyle?: any;
  onPress?: () => void;
};

const CustomButton: FC<CustomButtonProps> = ({
  label,
  disabled,
  onPress,
  containerStyle,
  labelStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.buttonWrapper, containerStyle]}
      activeOpacity={0.8}
      disabled={disabled}
      onPress={onPress}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
