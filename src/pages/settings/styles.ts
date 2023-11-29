import {ScaledSheet, ms} from 'react-native-size-matters';
import colors from '../../constants/colors';

const styles = ScaledSheet.create({
  flatListContentContainerStyle: {
    flex: 1,
  },
  headerContainer: {
    height: '20%',
    backgroundColor: colors.primary,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: '19@ms',
    fontWeight: 'bold',
    marginBottom: '10@vs',
    color: colors.white,
  },
  contentContainer: {
    paddingHorizontal: 15,
    flex: 1,
  },
  contentInnerContainer: {
    top: -30,
    elevation: 5,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: '20@ms',
    paddingTop: '30@ms',
    gap: 15,
  },
  loggedInContentInnerContainer: {
    flex: 1,
  },
  info: {
    color: colors.gray2,
    textAlign: 'center',
  },
  logoutButtonStyle: {
    backgroundColor: colors.errorRed,
    height: '40@mvs',
  },
  logoutButtonLabelStyle: {
    color: colors.white,
  },
  loggedInContent: {
    flexDirection: 'column',
    flex: 1,
  },
  imageAndNameContainer: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'flex-end',
    padding: '10@ms',
    borderRadius: '5@ms',
    elevation: 2,
    backgroundColor: colors.white,
  },
  imageContainer: {
    width: '56@ms',
    height: '56@ms',
    borderRadius: '50@ms',
    borderWidth: '3@ms',
    borderColor: colors.gray2,
  },
  image: {
    width: '50@ms',
    height: '50@ms',
    borderRadius: '50@ms',
  },
  email: {
    color: colors.gray1,
    fontSize: '13@ms',
    fontWeight: '500',
  },
  userName: {
    color: colors.gray2,
    fontSize: '15@ms',
    fontWeight: '700',
  },
  cardsContainer: {
    flex: 1,
    paddingTop: '15@mvs',
    gap: 10,
  },
  card: {
    elevation: 2,
    backgroundColor: colors.white,
    borderRadius: '5@ms',
    padding: '12@ms',
    paddingLeft: '16@ms',
    flexDirection: 'row',
    alignItems: 'center',
    gap: ms(16),
  },
  cardText: {
    fontSize: '14@ms',
    fontWeight: '500',
    color: colors.buttonText,
  },
  cardInfoText: {
    fontSize: '11@ms',
    color: colors.gray1,
  },
});

export default styles;
