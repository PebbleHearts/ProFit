import moment from 'moment';

export const getSubtractedDate = (date: Date, offset: number) => {
  return moment(date)
    .subtract(offset, 'day')
    .set('hour', 0)
    .set('minute', 0)
    .set('second', 0)
    .set('millisecond', 0)
    .toDate();
};

export const getPreviousDays = ({
  startDate,
  offset,
  includeStartDay = false,
}: {
  startDate: Date;
  offset: number;
  includeStartDay?: boolean;
}) => {
  const previousDays = [];
  for (let i = includeStartDay ? 0 : 1; i <= offset; i++) {
    const previousDay = getSubtractedDate(startDate, i);
    previousDays.push(previousDay);
  }
  return previousDays;
};

export const getDateStringFromDateObject = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};
