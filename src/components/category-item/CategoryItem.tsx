import React, {FC} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';

import {DeleteBin, EditPen, ChevronRight} from '../../assets/svg';

import styles from './styles';

type CategoryItemProps = {
  name: string;
  isCTAEnabled?: boolean;
  onPress: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
};

const CategoryItem: FC<CategoryItemProps> = ({
  name,
  isCTAEnabled = false,
  onPress,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.categoryName}>{name}</Text>
      {isCTAEnabled ? (
        <View style={styles.rightSide}>
          <View style={styles.ctaContainer}>
            <TouchableOpacity
              style={styles.cta}
              hitSlop={6}
              activeOpacity={0.8}
              onPress={onEditClick}>
              <EditPen width={18} height={18} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cta}
              hitSlop={6}
              activeOpacity={0.8}
              onPress={onDeleteClick}>
              <DeleteBin width={20} height={20} />
            </TouchableOpacity>
          </View>
          <ChevronRight width={18} height={18} />
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default CategoryItem;
