import { formatDistanceToNow } from 'date-fns';

export const dateToNow = (date: number) => {
  return formatDistanceToNow(date);
}