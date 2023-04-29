import React from 'react';
import {View, Text} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

type PageLayoutProps = {
  children: JSX.Element;
  title: string;
};

const PageLayout = ({children, title}: PageLayoutProps) => {
  return (
    <View style={styles.layoutContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      {children}
    </View>
  );
};

const styles = ScaledSheet.create({
  layoutContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  titleContainer: {
    height: '45@vs',
    backgroundColor: 'green',
    justifyContent: 'center',
    paddingHorizontal: '10@s',
  },
  title: {
    fontSize: '20@ms',
    fontWeight: '900',
    color: 'black',
  },
});

export default PageLayout;
