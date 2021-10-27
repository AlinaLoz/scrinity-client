import { MESSAGE_MAP } from '@constants/message.constants';

type TMessageMapValue = typeof MESSAGE_MAP[keyof typeof MESSAGE_MAP];

export const convertMessage = (
  message: keyof typeof MESSAGE_MAP,
  defaultMessage: TMessageMapValue,
): TMessageMapValue => MESSAGE_MAP[message] || defaultMessage;

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const getFirstResponseError = (e: any, defaultMessage = MESSAGE_MAP.UNKNOWN_ERROR): TMessageMapValue => {
  if (e?.response?.data?.errors?.length) {
    return convertMessage(e.response.data.errors[0].message, defaultMessage);
  }
  return defaultMessage;

};
