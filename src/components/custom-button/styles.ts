import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../constants/colors';

const styles = ScaledSheet.create({
  buttonWrapper: {
    backgroundColor: colors.thirdBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10@ms',
    paddingVertical: '5@vs',
    flexDirection: 'row',
    gap: 10,
  },
  label: {
    color: colors.buttonText,
    fontSize: '17@ms',
    fontWeight: '600',
  },
  iconStyle: {
    color: 'white',
  },
});

export default styles;
