import React, {FC, memo} from 'react';
import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import 'react-native-gesture-handler';

import styles from './styles';
import {DeleteBin, EditPen} from '../../assets/svg';
import colors from '../../constants/colors';

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
  disabled: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onLongPress: () => void;
};

const DayWorkoutItem: FC<DayWorkoutItemProps> = ({
  exercise,
  info,
  records,
  disabled,
  onEdit,
  onDelete,
  onLongPress,
}) => {
  return (
    <Pressable onLongPress={onLongPress} disabled={disabled}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderText}>{exercise?.name}</Text>
          <View style={styles.ctaContainer}>
            <TouchableOpacity
              style={styles.cta}
              onPress={onEdit}
              activeOpacity={0.8}
              hitSlop={7}>
              <EditPen width={16} height={16} color="#503a65" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cta}
              onPress={onDelete}
              activeOpacity={0.8}
              hitSlop={7}>
              <DeleteBin width={16} height={16} color={colors.errorRed} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          {records?.map((item, index) => {
            const isLastCard = index === records.length - 1;
            return (
              <View
                style={[
                  styles.setCard,
                  !info && isLastCard && styles.lastSetCard,
                ]}
                key={`${index}`}>
                <View style={styles.setDetail}>
                  <Text style={styles.setHeader}>Set {index + 1}</Text>
                  <View style={styles.weightAndRepsContainer}>
                    <Text style={styles.setDetailText}>
                      Weight:{' '}
                      <Text style={styles.setDetailTextBold}>
                        {item.weight}Kg
                      </Text>
                    </Text>
                    <Text style={styles.setDetailText}>
                      Reps:{' '}
                      <Text style={styles.setDetailTextBold}>{item.reps}</Text>
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
        {info && <Text style={styles.infoText}>{info}</Text>}
      </View>
    </Pressable>
  );
};

export default memo(DayWorkoutItem);
