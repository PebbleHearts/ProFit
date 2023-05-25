import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../constants/colors';

const styles = ScaledSheet.create({
  textInputWrapper: {
    padding: '10@ms',
    borderRadius: '5@ms',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: colors.white,
  },
});

export default styles;
