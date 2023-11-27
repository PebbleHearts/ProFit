import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../constants/colors';

const styles = ScaledSheet.create({
  monthYearLabelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthYearLabelCta: {
    paddingVertical: '2@vs',
    paddingHorizontal: '10@mvs',
    borderRadius: 10,
  },
  monthYearLabel: {
    fontSize: '13@ms',
    fontWeight: '700',
    color: colors.buttonText,
    padding: '2@ms',
  },
  itemSeparatorComponentStyle: {
    width: '1@ms',
    height: '100%',
    backgroundColor: '#e1e3e6',
  },
  dateItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '15@ms',
    paddingVertical: '7@ms',
    borderTopRightRadius: '10@ms',
    borderTopLeftRadius: '10@ms',
  },
  selectedDateStyle: {
    backgroundColor: colors.white,
  },
  dateItemWeek: {
    fontSize: '11@ms',
    fontWeight: '700',
    color: colors.buttonText,
  },
  dateItemDay: {
    fontSize: '10@ms',
    fontWeight: '600',
    color: colors.buttonText,
  },
});

export default styles;
