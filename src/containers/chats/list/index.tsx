import React from 'react';
import cn from 'classnames';

import { useInstitution } from '@hooks/use-institution.hooks';
import { PageLoader } from '@components/page-loader';
import { useChats } from '@containers/chats/list/hooks';
import { Page } from './page';
import styles from './style.module.scss';

interface IListMessagesProps {
  className?: string;
}

export const ChatsList: React.FC<IListMessagesProps> = ({
  className,
}) => {
  const [, institution] = useInstitution();
  const [isLoading] = useChats();

  return (
    <div id="scrollableDiv" className={cn(className, styles.scrollableDiv)}>
      <p className={styles.title}>{institution?.name}</p>
      {isLoading ? <PageLoader /> : <Page />}
    </div>
  );
};
