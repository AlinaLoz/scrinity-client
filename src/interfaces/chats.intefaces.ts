export interface IGetChatInfoByLinkResponse {
  institutionId: number;
  chatId: number;
  token: string;
}

export interface ISender {
  id: number;
  phoneNumber: string;
}

export interface IChatById {
  id: number;
  sender: ISender | null;
  content: string;
  createdAt: string;
  files: {
    filename: string;
  };
}

export interface IGetChatByIdResponse {
  items: IChatById[];
}

export interface ISendMessageRequest {
  chatId: number;
  message: string;
}

export interface IChat {
  id: number;
  message: string;
  phoneNumber: string;
  isGood: boolean;
  criterion: string[];
  createdAt: string;
}

export interface IGetChatsAPIResponse {
  total: number;
  items: IChat[];
}
