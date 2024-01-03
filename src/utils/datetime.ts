import moment from 'moment';

// 21 Oct 2019
export const DEFAULT_DATE_FORMAT = 'MMM DD, YYYY';
export const FULL_DATETIME_FORMAT = 'MMM DD YYYY HH:mm';

export const getFormattedDate = (
  date: Date | number | string,
  format = DEFAULT_DATE_FORMAT,
): string => {
  const today = moment();

  if (moment(date).isSame(today, 'day')) {
    return 'Hôm nay ' + moment(date).format('HH:mm');
  }

  if (moment(date).isSame(today.subtract(1, 'day'), 'day')) {
    return `Hôm qua ${moment(date).format('HH:mm')}`;
  }

  return moment(date).format(format);
};
