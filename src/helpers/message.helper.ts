import { MESSAGE_MAP } from '@constants/message.constants';

type TMessageMapValue = typeof MESSAGE_MAP[keyof typeof MESSAGE_MAP];

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const getFirstResponseError = (e: any, defaultMessage = MESSAGE_MAP.UNKNOWN_ERROR): TMessageMapValue => {
  if (e?.response?.data?.errors?.length) {
    const error = e.response.data.errors[0].message as string;
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return MESSAGE_MAP[error] || error;
  }
  return defaultMessage;

};
