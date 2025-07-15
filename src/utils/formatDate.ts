import { format } from 'date-fns';

export const formatDate = (date: Date | string | undefined) => {
  if (!date) return '';
  return format(new Date(date), 'MMM yyyy');
};
