import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {DeleteBin, EditPen} from '../../assets/svg';

import styles from './styles';
import colors from '../../constants/colors';

type WorkoutItemProps = {
  name: string;
  isSelected?: boolean;
  isCTAEnabled?: boolean;
  onPress?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
};

const WorkoutItem: FC<WorkoutItemProps> = ({
  name,
  isSelected = false,
  isCTAEnabled = false,
  onPress,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.selectedCard]}
      activeOpacity={onPress ? 0.9 : 1}
      onPress={onPress}>
      <Text style={styles.workoutName}>{name}</Text>
      {isCTAEnabled ? (
        <View style={styles.ctaContainer}>
          <TouchableOpacity
            style={styles.cta}
            hitSlop={6}
            activeOpacity={0.8}
            onPress={onEditClick}>
            <EditPen width={16} height={16} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cta}
            hitSlop={6}
            activeOpacity={0.8}
            onPress={onDeleteClick}>
            <DeleteBin width={18} height={18} color={colors.errorRed} />
          </TouchableOpacity>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default WorkoutItem;
