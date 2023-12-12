import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {CloseOutlined} from '../../assets/svg';
import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../constants/colors';

type SelectedWorkoutItemProps = {
  name: string;
  onRemoveClick: () => void;
};

const SelectedWorkoutItem = ({
  name,
  onRemoveClick,
}: SelectedWorkoutItemProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.workoutName}>{name}</Text>
      <TouchableOpacity onPress={onRemoveClick} activeOpacity={0.8}>
        <CloseOutlined width={20} height={20} color={colors.gray1} />
      </TouchableOpacity>
    </View>
  );
};

const styles = ScaledSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10@ms',
    paddingHorizontal: '15@ms',
    borderRadius: '100@ms',
    elevation: 1,
    backgroundColor: colors.white,
  },
  workoutName: {
    fontSize: '15@ms',
    fontWeight: '400',
    color: colors.gray3,
  },
  rightSide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  ctaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cta: {
    width: '30@ms',
    backgroundColor: '#E2E4E3',
    aspectRatio: 1,
    borderRadius: '30@ms',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SelectedWorkoutItem;
