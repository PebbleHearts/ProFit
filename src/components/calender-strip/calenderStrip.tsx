import React, {FC, useRef, useState} from 'react';
import {FlatList, ViewToken, View, Text} from 'react-native';

import {
  getDateStringFromDateObject,
  getPreviousDays,
} from '../../utils/calender';
import DateItem from './DateItem';

import styles from './styles';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../constants/colors';

type CalenderStripProps = {
  selectedDate: Date;
  onDateSelection: (date: Date) => void;
};

const getLabelString = ({
  firstMonth,
  firstYear,
  lastMonth,
  lastYear,
}: {
  firstMonth: string;
  firstYear: string;
  lastMonth: string;
  lastYear: string;
}) => {
  let labelString = '';
  if (firstYear === lastYear && firstMonth === lastMonth) {
    labelString = `${firstYear} ${firstMonth}`;
  } else if (firstYear === lastYear) {
    labelString = `${firstYear} ${firstMonth}/${lastMonth}`;
  } else {
    labelString = `${firstYear} ${firstMonth} / ${lastYear} ${lastMonth}`;
  }
  return labelString;
};

const getInitialRangeString = () => {
  const initialDateRangeArray = getPreviousDays({
    startDate: new Date(),
    offset: 7,
  });
  const firstItem = initialDateRangeArray[initialDateRangeArray.length - 1];
  const lastItem = initialDateRangeArray[0];
  const firstYear = moment(firstItem).format('YYYY');
  const firstMonth = moment(firstItem).format('MMM');
  const lastYear = moment(lastItem).format('YYYY');
  const lastMonth = moment(lastItem).format('MMM');
  const labelString = getLabelString({
    firstMonth,
    firstYear,
    lastMonth,
    lastYear,
  });
  return labelString;
};
const CalenderStrip: FC<CalenderStripProps> = ({
  selectedDate,
  onDateSelection,
}) => {
  const [dateList, setDateList] = useState(
    getPreviousDays({startDate: new Date(), offset: 30, includeStartDay: true}),
  );
  const [range, setRange] = useState<string>(getInitialRangeString());

  const renderDate = ({item}: {item: Date}) => {
    return (
      <DateItem
        item={item}
        isSelected={
          getDateStringFromDateObject(selectedDate) ===
          getDateStringFromDateObject(item)
        }
        onDateSelection={onDateSelection}
      />
    );
  };

  const handleCalenderScrollEndReached = () => {
    const nextList = getPreviousDays({
      startDate: new Date(dateList[dateList.length - 1]),
      offset: 30,
    });
    setDateList(prevDateList => [...prevDateList, ...nextList]);
  };

  const onViewableItemsChanged = (info: {viewableItems: ViewToken[]}) => {
    const firstItem = info.viewableItems[info.viewableItems.length - 1].item;
    const lastItem = info.viewableItems[0].item;
    const firstYear = moment(firstItem).format('YYYY');
    const firstMonth = moment(firstItem).format('MMM');
    const lastYear = moment(lastItem).format('YYYY');
    const lastMonth = moment(lastItem).format('MMM');
    const labelString = getLabelString({
      firstMonth,
      firstYear,
      lastMonth,
      lastYear,
    });
    setRange(labelString);
  };

  const viewabilityConfig = {
    waitForInteraction: true,
    viewAreaCoveragePercentThreshold: 95,
  };
  const viewabilityConfigCallbackPairs = useRef([
    {viewabilityConfig, onViewableItemsChanged},
  ]);
  return (
    <LinearGradient colors={[colors.thirdBlue, colors.fifthBlue, colors.white]}>
      <View style={styles.monthYearLabelContainer}>
        <Text style={styles.monthYearLabel}>{range}</Text>
      </View>
      <FlatList
        data={dateList}
        renderItem={renderDate}
        horizontal={true}
        inverted={true}
        onEndReachedThreshold={0.7}
        showsHorizontalScrollIndicator={false}
        onEndReached={handleCalenderScrollEndReached}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        disableIntervalMomentum
      />
    </LinearGradient>
  );
};

export default CalenderStrip;
