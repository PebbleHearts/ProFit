import {ScaledSheet} from 'react-native-size-matters';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: '15@ms',
    fontWeight: 'bold',
    color: 'black',
    marginBottom: '10@vs',
  },
  setItemRow: {
    flexDirection: 'row',
    gap: 10,
  },
  setItemInputField: {
    flex: 1,
  },
  scrollViewContentContainerStyle: {
    paddingRight: 1,
  },
  fieldHeadingAndItemsContainer: {
    gap: 5,
  },
  submitButtonContainer: {
    marginBottom: '10@ms',
  },
});

export default styles;
