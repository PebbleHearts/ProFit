import React, {FC} from 'react';
import {TextInput} from 'react-native';

import styles from './styles';

type CustomTextInputProps = {
  value: string;
  onChangeText: (val: string) => void;
};
const CustomTextInput: FC<CustomTextInputProps> = ({value, onChangeText}) => {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      style={styles.textInputWrapper}
    />
  );
};

export default CustomTextInput;
