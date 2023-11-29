import {FC} from 'react';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

import styles from './styles';

type CustomButtonProps = {
  label: string;
  Icon?: any;
  disabled?: boolean;
  containerStyle?: any;
  labelStyle?: any;
  onPress?: () => void;
};

const CustomButton: FC<CustomButtonProps> = ({
  label,
  Icon,
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
      {Icon && <Icon width={20} height={20} style={styles.iconStyle} />}
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
