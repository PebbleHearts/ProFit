import React, {FC} from 'react';
import {TouchableOpacity, Text} from 'react-native';

import styles from './styles';

type CategoryItemProps = {
  name: string;
  onPress: () => void;
};

const CategoryItem: FC<CategoryItemProps> = ({name, onPress}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.categoryName}>{name}</Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;
