import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../constants/colors';

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: '15@ms',
    paddingTop: '5@s',
    flex: 1,
    backgroundColor: '#fbf7ff',
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
