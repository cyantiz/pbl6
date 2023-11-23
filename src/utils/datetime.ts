import moment from 'moment';

// 21 Oct 2019
export const DEFAULT_DATE_FORMAT = 'MMM DD YYYY';
export const FULL_DATETIME_FORMAT = 'MMM DD YYYY HH:mm';

export const getFormattedDate = (date: Date | number, format = DEFAULT_DATE_FORMAT): string => {
  return moment(date).format(format);
};
