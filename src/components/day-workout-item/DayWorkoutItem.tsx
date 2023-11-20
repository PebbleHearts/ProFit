import React, {FC} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import styles from './styles';

type DayWorkoutItemProps = {
  exercise: {
    id: string;
    name: string;
    category: {
      name: string;
    };
  };
  info: string;
  records: any[];
  onEdit: () => void;
  onDelete: () => void;
};

const DayWorkoutItem: FC<DayWorkoutItemProps> = ({
  exercise,
  info,
  records,
  onEdit,
  onDelete,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardNameAndCtaRow}>
        <Text style={styles.dayWorkoutName}>{exercise?.name}</Text>
        <View>
          <View style={styles.ctaContainer}>
            <TouchableOpacity
              onPress={onEdit}
              style={styles.deleteButton}
              activeOpacity={0.8}>
              <Text style={styles.ctaText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onDelete}
              style={styles.deleteButton}
              activeOpacity={0.8}>
              <Text style={styles.ctaText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        {records?.map((item, index) => {
          return (
            <Text key={`item${index}`}>
              Set {index + 1} :- Weight: {item.weight}, Count: {item.reps}
            </Text>
          );
        })}
        {info && <Text>{info}</Text>}
      </View>
    </View>
  );
};

export default DayWorkoutItem;
