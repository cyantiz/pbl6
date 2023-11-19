import moment from 'moment';

// 21 Oct 2019
const DEFAULT_DATE_FORMAT = 'DD MMM YYYY';

export const getFormattedDate = (date: Date, format = DEFAULT_DATE_FORMAT): string => {
  return moment(date).format(format);
};
