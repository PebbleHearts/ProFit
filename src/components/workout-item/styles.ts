import {ScaledSheet} from 'react-native-size-matters';

import Colors from '../../constants/colors';
import colors from '../../constants/colors';

const styles = ScaledSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '5@vs',
    padding: '10@ms',
    borderRadius: '7@ms',
    elevation: 1,
    backgroundColor: colors.white,
  },
  selectedCard: {
    backgroundColor: '#eee1fa',
  },
  workoutName: {
    fontSize: '17@ms',
    fontWeight: '600',
    color: Colors.gray3,
  },
  ctaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cta: {
    width: '30@ms',
    backgroundColor: '#E2E4E3',
    aspectRatio: 1,
    borderRadius: '30@ms',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
