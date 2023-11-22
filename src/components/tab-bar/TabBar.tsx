import React from 'react';
import {View, Pressable, Text, TouchableOpacity} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {ScaledSheet} from 'react-native-size-matters';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Colors from '../../constants/colors';
import {
  DumbbellOutline,
  CategoriesIcon,
  WorkoutRoutines,
} from '../../assets/svg';

const TabDetailsMap = {
  HomePage: {
    icon: <DumbbellOutline width={20} height={20} />,
    label: 'Workout',
  },
  CategoriesStack: {
    icon: <CategoriesIcon width={20} height={20} />,
    label: 'Categories',
  },
  Routines: {
    icon: <WorkoutRoutines width={20} height={20} />,
    label: 'Routines',
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

          return (
            <View key={label} style={styles.mainItemContainer}>
              <Pressable
                onPress={onPress}
                style={[styles.item, isFocused && styles.focusedItem]}>
                <View style={styles.itemIconContainerStyle}>
                  {TabDetailsMap[label].icon}
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
    paddingTop: '7@ms',
    backgroundColor: 'white',
  },
  innerContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.secondaryBlue,
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
    backgroundColor: Colors.secondaryBlue,
  },
  focusedItem: {
    backgroundColor: Colors.thirdBlue,
  },
  itemIconContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 10,
  },
});
