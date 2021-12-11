export enum ROUTE {
  CHATS = '/chats',
}

export const CHATS_ROUTE = (id: number | string): string => `${ROUTE.CHATS}/${id}`;
export const CHAT_ROUTE = (institutionId: number, chatId: number): string => `${CHATS_ROUTE(institutionId)}/${chatId}`;
