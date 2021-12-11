import useSWR from 'swr';
import {
  useCallback, useContext, useEffect, useMemo,
} from 'react';
import { useRouter } from 'next/router';

import { CHATS_API } from '@constants/api.constants';
import { getChatByIdAPI, getChatsAPI } from '@api/chats.service';
import { IChat, IChatById } from '@interfaces/chats.intefaces';
import { MODAL } from '@constants/modal.constants';
import { ModalContext } from '@contexts/modal.context';
import { useInstitution } from '@hooks/use-institution.hooks';
import { useMe } from '@hooks/use-me.hooks';
import { CHAT_ROUTE } from '@constants/routes.constants';
import { prepareMessageByDay, TMessagesByDay } from '@helpers/message.helpers';
import { useDataFromQuery } from '@hooks/qury.hooks';

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const useAuthorizedToChat = (error: any): void => {
  const router = useRouter();
  const { setData, modalType } = useContext(ModalContext);
  const [, institution] = useInstitution();

  useEffect(() => {
    if (!error) {
      return;
    }
    if (error.response?.status === 401) {
      if (modalType !== MODAL.SIGN_IN && institution) {
        setData(MODAL.SIGN_IN, { institution, type: 'sign' });
      }
    }
    if (error.response?.status === 404) {
      router.push('/404');
    }
  }, [error, modalType, institution]);
};

export const useChat = (): [boolean, IChatById[], TMessagesByDay] => {
  const parsedQuery = useDataFromQuery();

  const { data, error } = useSWR(
    [CHATS_API, parsedQuery], () => {
      if (!parsedQuery.chatId) {
        return null;
      }
      return getChatByIdAPI(parsedQuery.chatId);
    },
    { refreshWhenHidden: false },
  );
  useAuthorizedToChat(error);
  const isLoading = !error && !data;
  const messagesByDay = useMemo(() => prepareMessageByDay(data?.items || []), [data?.items]);
  return [isLoading, data?.items || [], messagesByDay];
};

type TUseChats = [boolean, number, IChat[]];
export const useChats = (): TUseChats => {
  const parsedQuery = useDataFromQuery();

  const { data, error } = useSWR(
    [CHATS_API, parsedQuery.institutionId],
    () => getChatsAPI(parsedQuery.institutionId),
    { refreshWhenHidden: false },
  );
  useAuthorizedToChat(error);
  const isLoading = !error && !data;

  if (error || !data) {
    return [true, 0, []];
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
