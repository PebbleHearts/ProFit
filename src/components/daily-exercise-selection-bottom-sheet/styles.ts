import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../constants/colors';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: '17@ms',
    fontWeight: 'bold',
    color: colors.gray3,
    marginBottom: '10@vs',
    paddingHorizontal: '20@ms',
    paddingTop: '20@ms',
  },
  scrollViewContentContainerStyle: {
    padding: '20@ms',
    paddingTop: '5@ms',
  },
  submitButtonContainer: {
    backgroundColor: colors.primary,
    margin: '20@ms',
    paddingTop: '5@ms',
    marginBottom: '10@ms',
    height: '40@mvs',
  },
  submitButtonText: {
    color: colors.white,
  },
});

export default styles;
