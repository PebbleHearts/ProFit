import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../constants/colors';

const styles = ScaledSheet.create({
  container: {
    paddingTop: '5@s',
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    fontSize: '19@ms',
    fontWeight: 'bold',
    marginBottom: '10@vs',
    color: colors.buttonText,
    marginLeft: '5@s',
  },
  workoutsListContainer: {
    flex: 1,
    paddingHorizontal: '5@s',
  },
  dateSelectionContainer: {
    flexDirection: 'row',
    elevation: 10,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  addText: {
    color: colors.buttonText,
  },
});

export default styles;
