import React, {FC} from 'react';
import {Text, TouchableOpacity} from 'react-native';

import styles from './styles';

type WorkoutItemProps = {
  name: string;
  isSelected?: boolean;
  onPress?: () => void;
};

const WorkoutItem: FC<WorkoutItemProps> = ({
  name,
  isSelected = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.card, isSelected && styles.selectedCard]}
      onPress={() => onPress?.()}>
      <Text style={styles.workoutName}>{name}</Text>
    </TouchableOpacity>
  );
};

export default WorkoutItem;
