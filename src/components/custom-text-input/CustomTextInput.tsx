import React, {FC} from 'react';
import {StyleProp, TextInput, TextStyle, View} from 'react-native';

import styles from './styles';
import colors from '../../constants/colors';

type CustomTextInputProps = {
  value: string;
  secureTextEntry?: boolean;
  inputStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<TextStyle>;
  onChangeText: (val: string) => void;
};
const CustomTextInput: FC<CustomTextInputProps> = ({
  value,
  secureTextEntry = false,
  inputStyle,
  containerStyle,
  onChangeText,
}) => {
  return (
    <View style={containerStyle}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={[styles.textInputWrapper, inputStyle]}
        secureTextEntry={secureTextEntry}
        selectionColor={colors.primary}
      />
    </View>
  );
};

export default CustomTextInput;
