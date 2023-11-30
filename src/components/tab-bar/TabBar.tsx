import React from 'react';
import {View, Pressable, Text} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {ScaledSheet} from 'react-native-size-matters';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {
  CategoriesIcon,
  WorkoutRoutines,
  Settings,
  Dumbell,
} from '../../assets/svg';
import colors from '../../constants/colors';

const TabDetailsMap: Record<string, {Icon: any; label: string}> = {
  HomePage: {
    Icon: Dumbell,
    label: 'Workouts',
  },
  CategoriesStack: {
    Icon: CategoriesIcon,
    label: 'Categories',
  },
  Routines: {
    Icon: WorkoutRoutines,
    label: 'Routines',
  },
  Settings: {
    Icon: Settings,
    label: 'Settings',
  },
};

const TabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {
  console.log(typeof CategoriesIcon);
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.mainContainer, {paddingBottom: insets.bottom}]}>
      <View style={styles.innerContainer}>
        {state.routes.map((route: any, index: number) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const Icon = TabDetailsMap[label].Icon;
          const tabLabel = TabDetailsMap[label].label;
          return (
            <View key={label} style={styles.mainItemContainer}>
              <Pressable onPress={onPress} style={styles.item}>
                <View style={styles.itemIconContainerStyle}>
                  <Icon
                    width={20}
                    height={20}
                    color={isFocused ? '#95adbe' : 'white'}
                  />
                  <Text
                    style={[
                      styles.itemLabel,
                      isFocused && styles.focusedItemLabel,
                    ]}>
                    {tabLabel}
                  </Text>
                </View>
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default TabBar;

const styles = ScaledSheet.create({
  mainContainer: {
    backgroundColor: 'white',
  },
  innerContainer: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: '2@mvs',
  },
  mainItemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1,
    borderColor: 'grey',
  },
  item: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    height: 45,
    backgroundColor: '#503a65',
  },

  itemLabel: {
    fontSize: '8@ms',
    color: colors.white,
  },
  focusedItemLabel: {
    color: '#95adbe',
  },
  itemIconContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 10,
  },
  icon: {
    color: colors.white,
  },
});
