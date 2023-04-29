import React, {FC} from 'react';
import {View, Text} from 'react-native';
import PageLayout from '../../Layout/PageLayout';
import {HomePageProps} from './types';

const HomePage: FC<HomePageProps> = () => {
  return (
    <PageLayout title="ProFit">
      <View>
        <Text>Home page</Text>
      </View>
    </PageLayout>
  );
};

export default HomePage;
