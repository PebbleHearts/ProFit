import React from 'react';
import {View, Text} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

import Colors from '../constants/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type PageLayoutProps = {
  children: JSX.Element;
  title?: string;
};

const PageLayout = ({children, title}: PageLayoutProps) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.layoutContainer,
        {
          paddingTop: insets.top,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}>
      {title && (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      )}
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
    backgroundColor: Colors.primaryBlue,
    justifyContent: 'center',
    paddingHorizontal: '10@s',
  },
  title: {
    fontSize: '20@ms',
    fontWeight: '900',
    color: '#f7faf8',
  },
});

export default PageLayout;
