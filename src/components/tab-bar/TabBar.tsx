import React from 'react';
import {View, Pressable} from 'react-native';
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

const TabDetailsMap = {
  HomePage: {
    Icon: Dumbell,
    label: 'Workout',
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
          return (
            <View key={label} style={styles.mainItemContainer}>
              <Pressable
                onPress={onPress}
                style={[styles.item, isFocused && styles.focusedItem]}>
                <View style={styles.itemIconContainerStyle}>
                  <Icon
                    width={20}
                    height={20}
                    color={isFocused ? '#503a65' : 'white'}
                  />
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
    backgroundColor: '#503a65',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
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
  focusedItem: {
    backgroundColor: '#95adbe',
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
