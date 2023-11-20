import {ScaledSheet} from 'react-native-size-matters';

import Colors from '../../constants/colors';
import colors from '../../constants/colors';

const styles = ScaledSheet.create({
  card: {
    marginBottom: '5@vs',
    padding: '10@ms',
    borderRadius: '7@ms',
    backgroundColor: Colors.cardBackground,
  },
  cardNameAndCtaRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  dayWorkoutName: {
    fontSize: '15@ms',
    fontWeight: '600',
    color: Colors.buttonText,
  },
  ctaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  deleteButton: {
    paddingHorizontal: '10@ms',
    paddingVertical: '5@ms',
    backgroundColor: 'gray',
  },
  ctaText: {
    color: colors.white,
  },
});

export default styles;
