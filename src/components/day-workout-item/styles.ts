import {ScaledSheet, ms} from 'react-native-size-matters';

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
    paddingTop: '10@mvs',
    paddingBottom: '3@mvs',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '15@ms',
  },
  cardHeaderText: {
    color: Colors.gray3,
    fontWeight: '500',
    fontSize: '16@ms',
  },
  ctaContainer: {
    flexDirection: 'row',
    gap: ms(15),
  },
  ctaText: {
    color: Colors.gray3,
  },
  cta: {
    padding: 5,
    backgroundColor: '#E2E4E3',
    borderRadius: '50@ms',
  },
  setCard: {
    flexDirection: 'column',
    borderBottomWidth: '1@mvs',
    paddingVertical: '6@mvs',
    paddingHorizontal: '15@ms',
    borderBottomColor: Colors.cardBackground,
  },
  lastSetCard: {
    borderBottomWidth: 0,
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
