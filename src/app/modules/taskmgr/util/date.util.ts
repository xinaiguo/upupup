import { isFuture, isDate, isValid, format, differenceInYears, parse } from 'date-fns';
export const isValidDate = (dateStr) => {
  const date = parse(dateStr, 'M/d/yyyy', new Date());
  return isDate(date) && isValid(date) && !isFuture(date) && differenceInYears(Date.now(), date) < 150;
};

export const toDate = (date: Date) => {
  return format(date, 'yyyy-MM-dd');
};
