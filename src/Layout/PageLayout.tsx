import React from 'react';
import {View, Text, Image} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import colors from '../constants/colors';
import {useUser} from '../context/ UserContext';

type PageLayoutProps = {
  children: JSX.Element;
  title?: string;
  hideAccountIcon?: boolean;
};

const PageLayout = ({
  children,
  title,
  hideAccountIcon = false,
}: PageLayoutProps) => {
  const insets = useSafeAreaInsets();

  const {user, isSignedIn} = useUser();
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
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title || ''}</Text>
        {!hideAccountIcon && isSignedIn && (
          <View style={styles.imageContainer}>
            {user?.photo && (
              <Image source={{uri: user?.photo}} style={styles.image} />
            )}
          </View>
        )}
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
    backgroundColor: colors.primary,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '10@s',
  },
  title: {
    fontSize: '20@ms',
    fontWeight: '900',
    color: '#f7faf8',
  },
  imageContainer: {
    width: '36@ms',
    height: '36@ms',
    borderRadius: '50@ms',
    borderWidth: '1@ms',
    borderColor: '#976fbd',
  },
  image: {
    width: '34@ms',
    height: '34@ms',
    borderRadius: '50@ms',
  },
});

export default PageLayout;
