import React from 'react';
import {View, Pressable} from 'react-native';
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
                style={{
                  backgroundColor: isFocused
                    ? Colors.thirdBlue
                    : Colors.secondaryBlue,
                  borderRadius: 20,
                  width: 40,
                  height: 40
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    padding: 10,
                  }}>
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
    paddingHorizontal: '20@ms',
    backgroundColor: 'white',
  },
  innerContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.secondaryBlue,
    borderRadius: 25,
    marginBottom: '5@ms',
  },
  mainItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 1,
    borderColor: 'grey',
  },
});
