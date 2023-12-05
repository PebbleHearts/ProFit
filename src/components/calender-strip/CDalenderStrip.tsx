import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {
  FlatList,
  ViewToken,
  View,
  Text,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {debounce} from 'lodash-es';

import {
  getAfterDays,
  getDateStringFromDateObject,
  getPreviousDays,
} from '../../utils/calender';
import DateItem from './DateItem';

import styles from './styles';
import moment from 'moment';

type CalenderStripProps = {
  selectedDate: Date;
  onDateSelection: (date: Date) => void;
  handleMonthYearLabelClick: () => void;
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

// eslint-disable-next-line no-spaced-func
const CalenderStrip = forwardRef<
  {resetInitialDate: (dateString: string) => void},
  CalenderStripProps
>((props, ref) => {
  const {selectedDate, onDateSelection, handleMonthYearLabelClick} = props;
  const flatListRef = useRef<FlatList>(null);
  const prevScrollXOffsetValue = useRef<number | null>(null);
  const hasTriggeredOnStartReached = useRef<boolean>(false);

  useImperativeHandle(ref, () => ({
    resetInitialDate(dateString: string) {
      let dateObject = new Date(dateString);
      const nextList = getPreviousDays({
        startDate: dateObject,
        offset: 60,
      });
      setDateList(nextList);
    },
  }));

  const [dateList, setDateList] = useState(
    getPreviousDays({
      startDate: new Date(),
      offset: 60,
      includeStartDay: true,
    }),
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

  const handleCalenderScrollStartReached = () => {
    const nextList = getAfterDays({
      startDate: new Date(dateList[0]),
      offset: 30,
    });
    setDateList(prevDateList => [...nextList, ...prevDateList]);
    flatListRef.current?.scrollToIndex({index: 30, animated: false});
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
  const debounceOonViewableItemsChanged = debounce(onViewableItemsChanged, 500);

  const viewabilityConfig = {
    waitForInteraction: true,
    viewAreaCoveragePercentThreshold: 95,
  };
  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig,
      onViewableItemsChanged: debounceOonViewableItemsChanged,
    },
  ]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    let direction: string;
    const xOffset = event.nativeEvent.contentOffset.x;
    if (prevScrollXOffsetValue.current === null) {
      prevScrollXOffsetValue.current = xOffset;
      return;
    }
    if (xOffset < prevScrollXOffsetValue.current) {
      direction = 'RIGHT';
    } else {
      direction = 'LEFT';
    }

    if (
      direction === 'RIGHT' &&
      xOffset < 2 &&
      !hasTriggeredOnStartReached.current
    ) {
      handleCalenderScrollStartReached();
      hasTriggeredOnStartReached.current = true;
    } else if (direction === 'LEFT' && hasTriggeredOnStartReached.current) {
      hasTriggeredOnStartReached.current = false;
    }

    prevScrollXOffsetValue.current = xOffset;
  };

  return (
    <View>
      <View style={styles.monthYearLabelContainer}>
        <TouchableOpacity
          style={styles.monthYearLabelCta}
          onPress={handleMonthYearLabelClick}>
          <Text style={styles.monthYearLabel}>{range}</Text>
        </TouchableOpacity>
      </View>
      {/* TODO: make the monthYearLabel update automatically when resetInitialDate function is called */}
      <FlatList
        ref={flatListRef}
        data={dateList}
        renderItem={renderDate}
        horizontal={true}
        inverted={true}
        onEndReachedThreshold={0.7}
        onEndReached={handleCalenderScrollEndReached}
        showsHorizontalScrollIndicator={false}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        disableIntervalMomentum
        onScroll={handleScroll}
        bounces={false}
        onLayout={() => {
          setTimeout(() => {
            handleCalenderScrollStartReached();
          }, 1000);
        }}
      />
    </View>
  );
});

export default CalenderStrip;
