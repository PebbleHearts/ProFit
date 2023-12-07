import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../constants/colors';

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: '5@s',
    paddingTop: '5@s',
    flex: 1,
    backgroundColor: '#fbf7ff',
  },
  title: {
    fontSize: '19@ms',
    fontWeight: 'bold',
    marginBottom: '10@vs',
    color: colors.buttonText,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  comingSoonText: {
    color: colors.buttonText,
  },
});

export default styles;
