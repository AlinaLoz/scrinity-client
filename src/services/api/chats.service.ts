import { get, post } from '@helpers/axios.helpers';
import {
  CHATS_API, CHATS_BY_ID_API, CHATS_LIST_API, CHATS_MESSAGE_API,
} from '@constants/api.constants';
import {
  IGetChatByIdResponse, IGetChatInfoByLinkResponse, IGetChatsAPIResponse, ISendMessageRequest,
} from '@interfaces/chats.intefaces';

// todo добавить либу про которую писал Витя
export function getChatInfoByLinkAPI(link: string): Promise<IGetChatInfoByLinkResponse> {
  return get(CHATS_API, { link });
}

export function getChatByIdAPI(chatId: number): Promise<IGetChatByIdResponse> {
  return get(CHATS_BY_ID_API(chatId));
}

export function getChatsAPI(institutionId: number): Promise<IGetChatsAPIResponse> {
  return get(CHATS_LIST_API, { institutionId });
}

export function sendMessageAPI(data: ISendMessageRequest): Promise<IGetChatByIdResponse> {
  return post(CHATS_MESSAGE_API, data);
}
