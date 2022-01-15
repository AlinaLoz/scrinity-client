export enum LINK_CHANNEL {
  SMS = 'sms',
  EMAIL = 'email',
}

export interface IGetConfigAPIResponse {
  CHAT_LINK_CHANNEL: LINK_CHANNEL
}
