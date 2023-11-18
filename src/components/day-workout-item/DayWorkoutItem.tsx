import React, {FC} from 'react';
import {View, Text} from 'react-native';

import styles from './styles';

type DayWorkoutItemProps = {
  exercise: {
    id: string;
    name: string;
    category: {
      name: string;
    };
  };
  info: {
    info: string;
    count: number;
    weight: number;
  }[];
};

const DayWorkoutItem: FC<DayWorkoutItemProps> = ({exercise, info}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.dayWorkoutName}>{exercise?.name}</Text>

      {/* {info?.map((item, index) => {
        return (
          <Text key={`item${index}`}>
            Weight: {item.weight}, Count{item.count}
          </Text>
        );
      })} */}
    </View>
  );
};

export default DayWorkoutItem;
