import { isFuture, isDate, isValid, format, differenceInYears } from 'date-fns';
export const isValidDate = (dateStr) => {
  const date = Date.parse(dateStr);
  return isDate(date) && isValid(date) && !isFuture(date) && differenceInYears(Date.now(), date) < 150;
};

export const toDate = (date: Date) => {
  return format(date, 'yyyy-MM-dd');
};
