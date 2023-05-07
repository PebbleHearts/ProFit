import React, {FC} from 'react';
import {View, Text} from 'react-native';

import styles from './styles';

type WorkoutItemProps = {
  name: string;
};

const WorkoutItem: FC<WorkoutItemProps> = ({name}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.workoutName}>{name}</Text>
    </View>
  );
};

export default WorkoutItem;
