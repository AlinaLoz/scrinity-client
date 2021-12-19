import React, { useState } from 'react';
import cn from 'classnames';

import ChatWidget from '@components/chat-widget';
import { PageLoader } from '@components/page-loader';
import { useInstitution } from '@hooks/use-institution.hooks';
import { useMe } from '@hooks/use-me.hooks';
import { useChat } from '../list/hooks';
import { useChangeOpenedChat, useSubmitChat, useUpdateChatMessages } from './hooks';
import styles from './chat.module.scss';

export const Chat: React.FC = () => {
  const [userId] = useMe();
  const [isLoading, messages] = useChat();
  const [newUserMessage, setNewUserMessage] = useState('');
  const [onSubmitChat] = useSubmitChat(newUserMessage);
  useChangeOpenedChat(messages);
  useUpdateChatMessages();
  const [, institution] = useInstitution();

  if ((userId && !messages.length)
    || isLoading
  ) {
    return <PageLoader />;
  }

  return (
    <div
      role="button"
      /* eslint-disable @typescript-eslint/no-empty-function */
      onKeyPress={() => {}}
      onClick={(event) => onSubmitChat(event)}
      tabIndex={-1}
      className={cn(styles.wrapper)}
    >
      <ChatWidget
        /* eslint-disable @typescript-eslint/no-empty-function */
        handleNewUserMessage={() => {}}
        handleTextInputChange={(event) => setNewUserMessage(event.target.value)}
        showTimeStamp={false}
        showCloseButton
        senderPlaceHolder="Напишите сообщение"
        title={institution?.manager?.roleTitle || 'администратор'}
        launcher={() => <div />}
      />
    </div>
  );
};
