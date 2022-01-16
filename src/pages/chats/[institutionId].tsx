import React from 'react';
import { serialize } from 'cookie';

import { GetServerSideProps } from 'next';
import { isNumber } from '@helpers/validators';
import { CHAT_ROUTE } from '@constants/routes.constants';
import { ChatsList } from '@containers/chats/list';
import { getChatInfoByLinkAPI } from '@api/chats.service';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { LANGUAGE } from '@constants/locales.constants';

const ChatPage: React.FC = () => <ChatsList />;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const institutionId = ctx.query.institutionId as string;
  if (!isNumber(institutionId)) {
    try {
      const info = await getChatInfoByLinkAPI(institutionId);
      ctx.res.setHeader('location', CHAT_ROUTE(info.institutionId, info.chatId));
      ctx.res.statusCode = 302;
      ctx.res.setHeader('Set-Cookie', serialize('Authorization', info.token, { path: '/', expires: new Date('2030-02-15T12:17:45.361Z') }));
      ctx.res.end();
      return {
        props: {
          ...(await serverSideTranslations(ctx.locale || LANGUAGE.RU)),
        },
      };
    } catch (err) {
      return {
        notFound: true,
      };
    }
  }
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || LANGUAGE.RU)),
    },
  };
};

export default ChatPage;
