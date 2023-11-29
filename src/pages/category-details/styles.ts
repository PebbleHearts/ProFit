import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../constants/colors';

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: '5@s',
    paddingTop: '5@s',
    flex: 1,
  },
  headerContainer: {
    height: '175@mvs',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: '25@ms',
    fontWeight: '700',
    color: colors.gray3,
  },
  addText: {
    color: colors.buttonText,
  },
  floatingButtonStyle: {
    right: '10@ms',
    bottom: '10@ms',
  },
});

export default styles;
