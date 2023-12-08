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
      <TouchableOpacity onPress={onRemoveClick}>
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
    marginBottom: '5@vs',
    padding: '10@ms',
    borderRadius: '7@ms',
    elevation: 1,
    backgroundColor: colors.white,
  },
  workoutName: {
    fontSize: '17@ms',
    fontWeight: '600',
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
