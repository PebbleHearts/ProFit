import {FC} from 'react';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

import styles from './styles';

type CustomButtonProps = {
  label: string;
  disabled?: boolean;
};

const CustomButton: FC<CustomButtonProps> = ({label, disabled}) => {
  return (
    <TouchableOpacity
      style={styles.buttonWrapper}
      activeOpacity={0.8}
      disabled={disabled}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
