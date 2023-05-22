import {FC} from 'react';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

import styles from './styles';

type CustomButtonProps = {
  label: string;
  disabled?: boolean;
  containerStyle: any;
  onPress?: () => void;
};

const CustomButton: FC<CustomButtonProps> = ({
  label,
  disabled,
  onPress,
  containerStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.buttonWrapper, containerStyle]}
      activeOpacity={0.8}
      disabled={disabled}
      onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
