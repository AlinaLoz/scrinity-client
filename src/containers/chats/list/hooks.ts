import useSWR from 'swr';
import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';

import { CHATS_API } from '@constants/api.constants';
import { getChatByIdAPI, getChatsAPI } from '@api/chats.service';
import { IChat, IChatById } from '@interfaces/chats.intefaces';
import { use404 } from '@hooks/use-institution.hooks';
import { useMe } from '@hooks/use-me.hooks';
import { CHAT_ROUTE } from '@constants/routes.constants';
import { prepareMessageByDay, TMessagesByDay } from '@helpers/message.helpers';
import { useDataFromQuery } from '@hooks/query.hooks';

export const useChat = (): [boolean, IChatById[], TMessagesByDay] => {
  const parsedQuery = useDataFromQuery();

  const swrToken = [CHATS_API, parsedQuery?.chatId];
  useMe({ swrToken, openModal: true });

  const { data, error } = useSWR(
    swrToken,
    () => getChatByIdAPI(parsedQuery.chatId),
    { refreshWhenHidden: false, errorRetryCount: 0 },
  );
  use404(error);
  const isLoading = !error && !data;
  const messagesByDay = useMemo(() => prepareMessageByDay(data?.items || []), [data?.items]);
  return [isLoading, data?.items || [], messagesByDay];
};

type TUseChats = [boolean, number, IChat[]];
export const useChats = (): TUseChats => {
  const parsedQuery = useDataFromQuery();
  const swrToken = [CHATS_API, parsedQuery.institutionId];
  useMe({ swrToken, openModal: true });

  const { data, error } = useSWR(swrToken,
    () => getChatsAPI(parsedQuery.institutionId),
    { refreshWhenHidden: false, errorRetryCount: 0 });
  const isLoading = !error && !data;

  if (error || !data) {
    return [false, 0, []];
  }

  return [isLoading, data.total, data.items];
};

type TUseOpenChatReturn = [
  (chatId: number) => void,
];
export const useOpenChat = (): TUseOpenChatReturn => {
  const router = useRouter();
  const [userId] = useMe();
  const parsedQuery = useDataFromQuery();

  const onOpenChat = useCallback((chatId: number) => {
    router.push(CHAT_ROUTE(parsedQuery.institutionId, chatId));
  }, [userId, parsedQuery]);

  return [onOpenChat];
};
