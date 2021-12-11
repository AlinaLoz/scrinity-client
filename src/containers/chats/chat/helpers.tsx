/* eslint-disable  import/no-duplicates */
import ru from 'date-fns/locale/ru';
/* eslint-disable  import/no-duplicates */
import { format } from 'date-fns';

import React from 'react';
import cn from 'classnames';
import styles from './chat.module.scss';

/* eslint-disable  @typescript-eslint/no-explicit-any  */
let widget: any = null;

/* eslint-disable  @typescript-eslint/no-explicit-any  */
export const getWidget = async (): Promise<typeof widget> => {
  if (!widget) {
    widget = await import('react-chat-widget');
  }
  /* eslint-disable  @typescript-eslint/no-unsafe-return */
  return widget;
};

export const CustomTimeStampFragment: React.FC<{
  date: string, isResponse: boolean,
}> = ({ date, isResponse }) => (
  <div className={cn('rcw-timestamp', isResponse ? 'rcw-response' : 'rcw-client')}>
    <p>
      {/* <span className={styles.sender}>{sender}</span> */}
      <span className={styles.time}>{format(new Date(date), 'HH:mm')}</span>
    </p>
  </div>
);

export const CustomChatDay: React.FC<{ date: string }> = ({ date }) => (
  <div className="rcw-message-day">
    <p>{format(new Date(date), 'dd MMMM', { locale: ru })}</p>
  </div>
);

export const sendMessage = async (
  item: { content?: string, createdAt: string },
  sender: string, type: 'day' | 'response' | 'userMessage',
): Promise<void> => {
  const chatWidget = await getWidget();
  if (type === 'userMessage') {
    chatWidget.renderCustomComponent(CustomTimeStampFragment, { date: item.createdAt, isResponse: false, sender });
    if (item.content) {
      chatWidget.addUserMessage(item.content);
    }
  } else if (type === 'response') {
    chatWidget.renderCustomComponent(CustomTimeStampFragment, { date: item.createdAt, isResponse: true, sender });
    chatWidget.addResponseMessage(item.content);
  } else {
    chatWidget.renderCustomComponent(CustomChatDay, { date: item.createdAt });
  }
};
