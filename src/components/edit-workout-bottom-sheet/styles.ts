import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../constants/colors';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '10@vs',
    paddingHorizontal: '20@ms',
    paddingTop: '20@ms',
  },
  headerText: {
    fontSize: '17@ms',
    fontWeight: 'bold',
    color: 'black',
  },
  setItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  setItemInput: {
    flex: 1,
    color: colors.gray3,
  },
  setItemInputFieldHeader: {
    flex: 1,
    fontSize: '15@ms',
    fontWeight: '500',
    color: colors.gray3,
    borderColor: colors.gray3,
  },
  setItemInputField: {
    flex: 1,
    fontSize: '14@ms',
    color: colors.gray3,
    borderColor: colors.gray3,
  },
  scrollViewContentContainerStyle: {
    paddingRight: 1,
    paddingBottom: 10,
  },
  fieldHeadingAndItemsContainer: {
    gap: 5,
    padding: '20@ms',
    paddingTop: '5@ms',
  },
  addSetText: {
    fontSize: '15@ms',
    fontWeight: '500',
    color: colors.gray3,
  },
  removeSetButton: {
    backgroundColor: colors.fifthBlue,
    width: '25@ms',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '25@ms',
  },
  removeSetButtonText: {
    color: colors.gray3,
  },
  submitButtonContainer: {
    margin: '20@ms',
    paddingTop: '5@ms',
    marginBottom: '10@ms',
    height: '40@mvs',
    backgroundColor: colors.primary,
  },
  submitButtonText: {
    color: colors.white,
  },
});

export default styles;
