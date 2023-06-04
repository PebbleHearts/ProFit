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
  AddPlusSquare,
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
        {/* TODO: Make this section animated */}
        <Pressable
          style={[
            styles.addButton,
            state.index !== 0 && styles.hiddenAddButton,
          ]}
          onPress={() => {
            console.log('on Add');
          }}>
          <AddPlusSquare width={27} height={27} />
        </Pressable>
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
  item: {
    borderRadius: 20,
    width: 40,
    height: 40,
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
  addButton: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hiddenAddButton: {
    width: 0,
    overflow: 'hidden',
  },
});
