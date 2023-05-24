import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../constants/colors';

const styles = ScaledSheet.create({
  sampleText: {
    color: colors.buttonText,
  },
  loginButtonContainerStyle: {
    paddingHorizontal: '20@ms',
  },
  loginButtonLabelStyle: {
    fontSize: '12@ms',
  },
});

export default styles;
