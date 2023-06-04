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
  scrollViewContentContainerStyle: {
    paddingRight: 1,
  },
  submitButtonContainer: {
    marginBottom: '10@ms',
  },
});

export default styles;
