import React, {FC, memo} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {isEqual} from 'lodash-es';
import moment from 'moment';

import styles from './styles';

type DateItemProps = {
  item: Date;
  onDateSelection: (date: Date) => void;
  isSelected: boolean;
};
const DateItem: FC<DateItemProps> = ({item, onDateSelection, isSelected}) => {
  return (
    <TouchableOpacity
      style={[styles.dateItem, isSelected && styles.selectedDateStyle]}
      onPress={() => onDateSelection(item)}
      activeOpacity={0.8}>
      <Text
        style={[
          styles.dateItemWeek,
          isSelected && styles.selectedDateTextStyle,
        ]}>
        {moment(item).format('ddd')}
      </Text>
      <Text
        style={[
          styles.dateItemDay,
          isSelected && styles.selectedDateTextStyle,
        ]}>
        {moment(item).format('D')}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(DateItem, isEqual);
