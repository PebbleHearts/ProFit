import {ScaledSheet} from 'react-native-size-matters';

import Colors from '../../constants/colors';

const styles = ScaledSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: '7@ms',
    overflow: 'hidden',
    elevation: 2,
    marginBottom: '10@mvs',
  },
  cardHeader: {
    backgroundColor: Colors.sixthBlue,
    paddingVertical: '10@mvs',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '15@ms',
  },
  cardHeaderText: {
    color: Colors.white,
    fontWeight: '500',
    fontSize: '16@ms',
  },
  ctaContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  ctaText: {
    color: Colors.white,
  },
  setCard: {
    flexDirection: 'column',
    borderBottomWidth: '1@mvs',
    borderBottomColor: Colors.cardBackground,
    paddingVertical: '4@mvs',
    paddingHorizontal: '15@ms',
  },
  setHeader: {
    fontSize: '15@mvs',
    fontWeight: '900',
    color: Colors.gray2,
  },
  setDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  setDetailText: {
    fontSize: '13@mvs',
    color: Colors.gray2,
  },
  setDetailTextBold: {
    fontWeight: '700',
  },
  infoText: {
    paddingHorizontal: '15@ms',
    fontSize: '11@ms',
    paddingTop: '10@mvs',
    paddingBottom: '10@mvs',
    color: Colors.gray1,
  },
});

export default styles;
