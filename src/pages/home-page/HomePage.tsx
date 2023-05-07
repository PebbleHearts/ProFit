import React, {FC, useEffect} from 'react';
import {View, Text} from 'react-native';
import PageLayout from '../../Layout/PageLayout';
import {HomePageProps} from './types';
import {emitter} from '../../constants/emitter';

const HomePage: FC<HomePageProps> = () => {
  useEffect(() => {
    emitter.addListener('AddNewItem', () => {
      console.log('Trying to add new: homepage');
    });
  }, []);

  return (
    <PageLayout title="ProFit">
      <View>
        <Text>Home page</Text>
      </View>
    </PageLayout>
  );
};

export default HomePage;
