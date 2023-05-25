import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../constants/colors';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fourthBlue,
    justifyContent: 'center',
    paddingHorizontal: '20@s',
  },
  title: {
    fontSize: '19@ms',
    fontWeight: 'bold',
    marginBottom: '50@vs',
    color: colors.buttonText,
    alignSelf: 'center',
  },
  passwordContainerStyle: {
    marginTop: '10@vs',
  },
  errorMessage: {
    color: colors.primaryRed,
  },
  loginErrorMessageStyle: {
    marginTop: '2@vs',
  },
  loginButtonContainerStyle: {
    paddingHorizontal: '20@ms',
    backgroundColor: colors.secondaryBlue,
    marginTop: '30@vs',
  },
  loginButtonLabelStyle: {
    fontSize: '12@ms',
  },
});

export default styles;
