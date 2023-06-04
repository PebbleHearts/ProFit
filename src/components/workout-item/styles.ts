import {ScaledSheet} from 'react-native-size-matters';

import Colors from '../../constants/colors';

const styles = ScaledSheet.create({
  card: {
    marginBottom: '5@vs',
    padding: '10@ms',
    borderRadius: '7@ms',
    backgroundColor: Colors.cardBackground,
  },
  selectedCard: {
    backgroundColor: Colors.fourthBlue,
  },
  workoutName: {
    fontSize: '15@ms',
    fontWeight: '600',
    color: Colors.buttonText,
  },
});

export default styles;
