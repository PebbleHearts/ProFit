import {ScaledSheet} from 'react-native-size-matters';

const styles = ScaledSheet.create({
  textInputWrapper: {
    padding: '10@ms',
    borderRadius: '5@ms',
    backgroundColor: '#f7f0fc',
  },
  focusedTextInputBorderContainer: {
    position: 'absolute',
    backgroundColor: '#ebdaf7',
    top: '-1.5@ms',
    bottom: '-1.5@ms',
    left: '-1.5@ms',
    right: '-1.5@ms',
    borderRadius: '6@ms',
  },
});

export default styles;
