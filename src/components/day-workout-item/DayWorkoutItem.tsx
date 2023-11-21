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
      <View style={styles.cardHeader}>
        <Text style={styles.cardHeaderText}>{exercise?.name}</Text>
        <View style={styles.ctaContainer}>
          <TouchableOpacity onPress={onEdit} activeOpacity={0.8} hitSlop={5}>
            <Text style={styles.ctaText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete} activeOpacity={0.8} hitSlop={5}>
            <Text style={styles.ctaText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        {records?.map((item, index) => {
          return (
            <View style={styles.setCard}>
              <Text style={styles.setHeader}>Set {index + 1}</Text>
              <View style={styles.setDetail}>
                <Text style={styles.setDetailText}>
                  Weight:{' '}
                  <Text style={styles.setDetailTextBold}>{item.weight}Kg</Text>
                </Text>
                <Text style={styles.setDetailText}>
                  Reps:{' '}
                  <Text style={styles.setDetailTextBold}>{item.reps}</Text>
                </Text>
              </View>
            </View>
          );
        })}
      </View>
      {info && <Text style={styles.infoText}>{info}</Text>}
    </View>
  );
};

export default DayWorkoutItem;
