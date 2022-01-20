import React from 'react';
import dynamic from 'next/dynamic';
import { PageLoader } from '@components/page-loader';
import { useInstitution } from '@hooks/use-institution.hooks';
import { useMe } from '@hooks/use-me.hooks';
import { sendFeedbackImagesAPI } from '@api/companies.service';
import { sendMessageAPI } from '@api/chats.service';
import { useDataFromQuery } from '@hooks/query.hooks';
import { useChat } from '../list/hooks';

// @ts-ignore
const ChatWidget = dynamic(() => import('scrinity-chat')
  .then((mod) => mod.CustomWidget), {
  loading: () => <PageLoader />,
  ssr: false,
});

export const Chat: React.FC = () => {
  const [userId] = useMe();
  const parsedQuery = useDataFromQuery();
  const [isLoading, messages, messagesById] = useChat();
  const [, institution] = useInstitution();

  if ((userId && !messages.length)
    || isLoading
  ) {
    return <PageLoader />;
  }

  return (
    <ChatWidget
      userId={userId}
      chatId={parsedQuery.chatId || undefined}
      sendMessageAPI={sendMessageAPI}
      uploadImagesAPI={sendFeedbackImagesAPI}
      title={institution?.manager?.roleTitle || 'администратор'}
      messagesById={messagesById}
      institution={{ id: institution?.id }}
      messages={messages}
    />
  );
};
