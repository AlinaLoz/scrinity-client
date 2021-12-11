import { Touchable } from '@components/touchable';
import cn from 'classnames';
import React from 'react';
import { Badge } from 'react-bootstrap';

import { timeAgo } from '@utils/time-ago';
import { useChats, useOpenChat } from './hooks';
import { CRITERIONS } from '../../../assets/criterions';
import styles from './style.module.scss';

export const Page: React.FC = () => {
  const [,, items] = useChats();
  const [onOpenChat] = useOpenChat();

  return (
    <div className={styles.messages}>
      {items.map((item) => (
        <Touchable
          className={cn(styles.chat)}
          key={item.id}
          onClick={() => onOpenChat(item.id)}
        >
          <div className={styles.text}>
            <p className={styles.message}>{item.message}</p>
            <p className={styles.criterion}>
              {item.criterion.map((criterion) => (
                <Badge key={criterion} pill bg={item.isGood ? 'success' : 'danger'}>{CRITERIONS[criterion]}</Badge>
              ))}
            </p>
          </div>
          <p className={styles.time}>{timeAgo.format(new Date(item.createdAt))}</p>
        </Touchable>
      ))}
    </div>
  );
};
