import React, {FC} from 'react';
import {View, Text} from 'react-native';
import PageLayout from '../../Layout/PageLayout';
import {RoutinesProps} from './types';

import styles from './styles';

const Routines: FC<RoutinesProps> = () => {
  return (
    <PageLayout title="ProFit">
      <View style={styles.container}>
        <Text style={styles.title}>Routines</Text>
        <View style={styles.contentContainer}>
          <Text style={styles.comingSoonText}>Coming soon...</Text>
        </View>
      </View>
    </PageLayout>
  );
};

export default Routines;
