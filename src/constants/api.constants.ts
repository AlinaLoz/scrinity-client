export const INSTITUTION_API = '/institution';
export const INSTITUTION_BY_ID_API = (id: string | number): string => `${INSTITUTION_API}/${id}`;

export const REQUEST_CONFIRM_CODE_API = '/auth/request-confirm-code';
export const VERIFY_CONFIRM_CODE_API = '/auth/verify-confirm-code';
export const SIGN_OUT_API = '/auth/sign-out';

export const CHATS_API = '/chats';
export const CHATS_LIST_API = '/chats/list';
export const CHATS_BY_ID_API = (id: number): string => `/chats/${ id}`;
export const SEND_CHATS_IMAGES_API = `${CHATS_API}/images`;
export const CHATS_MESSAGE_API = '/chats/message';

export const ME_API = '/user';

export const CONFIG_API = '/config';

export const CRITERIONS_API = '/config/criterions';
