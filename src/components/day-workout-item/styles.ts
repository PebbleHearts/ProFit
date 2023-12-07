import {ScaledSheet, ms} from 'react-native-size-matters';

import Colors from '../../constants/colors';

const styles = ScaledSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: '7@ms',
    overflow: 'hidden',
    elevation: 1,
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
    fontSize: '14@mvs',
    fontWeight: '700',
    color: Colors.gray2,
    flex: 1,
  },
  setDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weightAndRepsContainer: {
    flexDirection: 'row',
    flex: 3,
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
    paddingTop: '5@mvs',
    paddingBottom: '5@mvs',
    color: Colors.gray1,
  },
});

export default styles;
