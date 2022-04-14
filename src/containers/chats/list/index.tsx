import React from 'react';
import cn from 'classnames';
import { Badge } from 'react-bootstrap';

import { useInstitution } from '@hooks/use-institution.hooks';
import { PageLoader } from '@components/page-loader';
import { useChats, useOpenChat } from '@containers/chats/list/hooks';
import { timeAgo } from '@utils/time-ago';

import { Touchable } from '@components/touchable';
import { useMe } from '@hooks/use-me.hooks';
import { userCriterions } from '@hooks/use-criterions.hooks';
import styles from './style.module.scss';

interface IListMessagesProps {
  className?: string;
}

export const ChatsList: React.FC<IListMessagesProps> = ({
  className,
}) => {
  useMe();
  const [, institution] = useInstitution();
  const [isLoading,, items] = useChats();
  const [onOpenChat] = useOpenChat();
  const [, criterions] = userCriterions();

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div id="scrollableDiv" className={cn(className, styles.scrollableDiv)}>
      <p className={styles.title}>{institution?.name}</p>
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
                  <Badge key={criterion} pill bg={item.isGood ? 'success' : 'danger'}>{criterions[criterion]}</Badge>
                ))}
              </p>
            </div>
            <p className={styles.time}>{timeAgo.format(new Date(item.createdAt))}</p>
          </Touchable>
        ))}
      </div>
    </div>
  );
};
