import React, {FC} from 'react';
import {View, Text} from 'react-native';

import styles from './styles';

type DayWorkoutItemProps = {
  name: string;
};

const DayWorkoutItem: FC<DayWorkoutItemProps> = ({name}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.dayWorkoutName}>{name}</Text>
    </View>
  );
};

export default DayWorkoutItem;
