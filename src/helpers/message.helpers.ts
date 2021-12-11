import { startOfDay } from 'date-fns';
import { IChatById } from '@interfaces/chats.intefaces';

export type TMessagesByDay = Record<string, IChatById[]>;
export const prepareMessageByDay = (items: IChatById[]): TMessagesByDay => items.reduce<TMessagesByDay>((acc, message) => {
  const day = startOfDay(new Date(message.createdAt)).toISOString();
  if (!acc[day]) {
    acc[day] = [];
  }
  acc[day].push(message);
  return acc;
}, {});
