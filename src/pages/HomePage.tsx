import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const HomePage = ({ navigation }) => {
  return (
    <View>
      <Text>Home Page</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Edit')}>
        <Text>Click me</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomePage;
