import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../constants/colors';

const styles = ScaledSheet.create({
  container: {
    paddingTop: '5@s',
    flex: 1,
    flexDirection: 'column',
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '10@vs',
    paddingHorizontal: '10@s',
  },
  title: {
    fontSize: '19@ms',
    fontWeight: 'bold',
    color: colors.buttonText,
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
