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
  },
  headerText: {
    fontSize: '15@ms',
    fontWeight: 'bold',
    color: 'black',
    marginBottom: '10@vs',
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
  setItemInputField: {
    flex: 1,
    color: colors.gray3,
    borderColor: colors.gray3,
  },
  scrollViewContentContainerStyle: {
    paddingRight: 1,
  },
  fieldHeadingAndItemsContainer: {
    gap: 5,
  },
  addSetText: {
    color: colors.buttonText,
  },
  submitButtonContainer: {
    marginBottom: '10@ms',
  },
});

export default styles;
