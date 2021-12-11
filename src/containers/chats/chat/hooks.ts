import React, { useCallback, useEffect, useState } from 'react';
import { startOfDay } from 'date-fns';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { IChatById, ISendMessageRequest } from '@interfaces/chats.intefaces';
import { useChat } from '@containers/chats/list/hooks';
import { useMe } from '@hooks/use-me.hooks';
import { useInstitution } from '@hooks/use-institution.hooks';

import { getFirstResponseError } from '@helpers/message.helper';
import { sendMessageAPI } from '@api/chats.service';
import { CHATS_ROUTE } from '@constants/routes.constants';
import { useDataFromQuery } from '@hooks/qury.hooks';
import { getWidget, sendMessage } from './helpers';

export const useChangeOpenedChat = (messages: IChatById[]): void => {
  useEffect(() => {
    if (!messages.length) {
      return;
    }
    (async () => {
      const chatWidget = await getWidget();
      if (!chatWidget.isWidgetOpened()) {
        chatWidget.toggleWidget();
      }
      chatWidget.dropMessages();
    })();
  }, [messages]);
};

export const useUpdateChatMessages = (): void => {
  const [userId] = useMe();
  const [, institution] = useInstitution();
  const [, messages, messagesById] = useChat();

  useEffect(() => {
    if (!messages.length || !userId) {
      return;
    }
    (async () => {
      const entries = Object.entries(messagesById);
      await entries.reduce(async (promise, [day, dayMessages]) => {
        await promise;
        await sendMessage({ createdAt: day, content: '' }, '', 'day');
        await dayMessages.reduce(async (insidePromise, item) => {
          await insidePromise;
          if (userId === item.sender?.id) {
            await sendMessage(item, 'Вы', 'userMessage');
          } else {
            await sendMessage(item, '', 'response');
          }
          return insidePromise;
        }, Promise.resolve());
        return promise;
      }, Promise.resolve());
    })();
  }, [messages, userId, institution]);
};

export const useSendMessageToBack = (): [(data: ISendMessageRequest) => Promise<void>] => {
  const [, manager] = useMe();

  const cb = useCallback(async (data: ISendMessageRequest) => {
    try {
      await sendMessageAPI(data);
    } catch (err) {
      toast.error(getFirstResponseError(err));
    }
  }, [manager]);
  return [cb];
};

export const useSubmitChat = (newMessage: string): [(event: React.MouseEvent) => Promise<void>] => {
  const router = useRouter();
  const [userId] = useMe();
  const parsedQuery = useDataFromQuery();
  const chatId = parsedQuery?.chatId || 0;
  const institutionId = parsedQuery?.institutionId || 0;
  const [,, messagesById] = useChat();
  const [onSendToBack] = useSendMessageToBack();

  const [isTodaySend, setIsTodaySend] = useState(false);

  const onClickWrapper = useCallback(async (event: React.MouseEvent) => {
    if ((event.target as HTMLButtonElement).classList.contains('rcw-close-button')) {
      router.push(CHATS_ROUTE(institutionId));
      return;
    }
    if (chatId && (event.target as HTMLButtonElement).classList.contains('rcw-send')) {
      if (!newMessage?.trim().length) {
        event.preventDefault();
        return;
      }
      const today = startOfDay(new Date()).toISOString();
      if (!isTodaySend && !messagesById[today]) {
        await sendMessage({ createdAt: today, content: '' }, '', 'day');
      }
      await sendMessage({ createdAt: (new Date()).toISOString() }, 'Вы', 'userMessage');
      await onSendToBack({ chatId, message: newMessage.trim() });
      setIsTodaySend(true);
    }
  }, [userId, newMessage, messagesById]);

  return [onClickWrapper];
};
