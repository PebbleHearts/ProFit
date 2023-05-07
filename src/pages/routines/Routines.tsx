import React, {FC} from 'react';
import {View, Text} from 'react-native';
import PageLayout from '../../Layout/PageLayout';
import {RoutinesProps} from './types';

const Routines: FC<RoutinesProps> = () => {
  return (
    <PageLayout title="ProFit">
      <View>
        <Text>Routines</Text>
      </View>
    </PageLayout>
  );
};

export default Routines;
